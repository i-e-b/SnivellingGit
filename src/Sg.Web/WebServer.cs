namespace Sg.Web
{
    using System;
    using System.Net;
    using System.Text;
    using System.Threading;

    public class WebServer : IDisposable
    {
        private readonly HttpListener _listener = new HttpListener();
        private readonly Func<HttpListenerRequest, string> _responderMethod;

        public WebServer(Func<HttpListenerRequest, string> method, params string[] prefixes)
        {
            if (!HttpListener.IsSupported) throw new NotSupportedException("Needs Windows XP SP2, Server 2003 or later.");
            if (prefixes == null || prefixes.Length == 0) throw new ArgumentException("Listening prefixes must be provided (for example, http://localhost:8080/index/ )", "prefixes");
            if (method == null) throw new ArgumentException("A responder method must be provided", "method");

            foreach (var s in prefixes) _listener.Prefixes.Add(s);

            _responderMethod = method;
            _listener.Start();
            ListenerLoop();
        }

        void ListenerLoop()
        {
            ThreadPool.QueueUserWorkItem(o => {
                try
                {
                    while (_listener.IsListening)
                        ThreadPool.QueueUserWorkItem(c =>
                        {
                            var ctx = c as HttpListenerContext;
                            if (ctx == null) return;
                            Run(ctx);
                        }, _listener.GetContext());
                }
                catch (HttpListenerException)
                {
                    Ignore();
                }
            });

        }

        void Run(HttpListenerContext ctx)
        {
            try
            {
                var rstr = _responderMethod(ctx.Request);
                var buf = Encoding.UTF8.GetBytes(rstr);
                ctx.Response.ContentLength64 = buf.Length;
                ctx.Response.OutputStream.Write(buf, 0, buf.Length);
            }
            catch (Exception ex_inner)
            {
                Console.WriteLine("Error: " + ex_inner);
            }
            finally
            {
                ctx.Response.OutputStream.Close();
            }
        }

        void Stop()
        {
            _listener.Stop();
            _listener.Close();
        }

        public void Dispose()
        {
            Stop();
        }

        static void Ignore() { }
    }
}