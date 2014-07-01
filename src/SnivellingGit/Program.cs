namespace SnivellingGit
{
    using System;
    using StructureMap;
    using System.IO.Abstractions;

    class Program
    {
        static void Main(string[] args)
        {
            Configure();
            Run();

            //Console.WriteLine("Done. Press [enter] to exit");
            //Console.ReadLine();
        }

        static void Run()
        {
            ObjectFactory.GetInstance<IEntryPoint>().Render(@"C:\Gits\repo-sample");
        }

        static void Configure()
        {
            ObjectFactory.Configure(map =>
            {
                map.For<IEntryPoint>().Use<EntryPoint>();
                map.For<IFileSystem>().Use<FileSystem>();
            });
        }
    }
}
