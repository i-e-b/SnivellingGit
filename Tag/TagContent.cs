using System.Collections.Generic;
using System.IO;

namespace Tag
{
    /// <summary>
    /// Represents the contents of a HTML/XML tag.
    /// Use T.g(...) to create one.
    /// </summary>
    public class TagContent
    {
        /// <summary>
        /// Name of the tag. If null, only the contents are rendered (a plain text section)
        /// </summary>
        public string Tag { get; set; }

        /// <summary>
        /// Contents of the tag, including all sub-tags
        /// </summary>
        public List<TagContent> Contents { get; set; }

        /// <summary>
        /// Raw text content of this tag, used only if `Contents` is empty
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// If true, the tag is rendered as an empty tag, and content are not rendered even if they are supplied.
        /// </summary>
        public bool IsEmpty { get; set; }

        /// <summary>
        /// List of property names and values
        /// </summary>
        public Dictionary<string, string> Properties { get; set; }

        /// <summary>
        /// Render this tag and its contents as a HTML/XML string
        /// </summary>
        public override string ToString()
        {
            var sb = new StringWriter();
            StreamTo(sb);
            return sb.ToString();
        }

        /// <summary>
        /// Stream to a text writer.
        /// </summary><remarks>Saves some string generation over multiple 'ToString' calls?</remarks>
        public void StreamTo(TextWriter tw)
        {
            if (Tag != null)
            {
                tw.Write("<");
                tw.Write(Tag);
                foreach (var property in Properties)
                {
                    tw.Write(" ");
                    tw.Write(property.Key);
                    tw.Write("=\"");
                    tw.Write(property.Value);
                    tw.Write("\"");
                }

                if (IsEmpty)
                {
                    tw.Write("/>");
                    return;
                }

                tw.Write(">");
            }
            if (Contents != null)
            {
                foreach (var tag in Contents)
                {
                    tw.Write(tag);
                }
            }
            else if (Text != null)
            {
                tw.Write(Text);
            }

            if (Tag != null)
            {
                tw.Write("</");
                tw.Write(Tag);
                tw.Write(">");
            }
        }

        /// <summary>
        /// Mark this as an empty tag. Will render as &lt;Tag/&gt; instead of &lt;Tag&gt;&lt;/Tag&gt;
        /// </summary>
        public TagContent Empty()
        {
            IsEmpty = true;
            return this;
        }

        /// <summary>
        /// Implicitly render to a string
        /// </summary>
        public static implicit operator string(TagContent t) => t.ToString();

        /// <summary>
        /// Implicitly convert a string to a content-only tag
        /// </summary>
        public static implicit operator TagContent(string s) {
            return T.g()[s];
        }

        /// <summary>
        /// Supply the contents of the tag. These will not be rendered if `IsEmpty` is true.
        /// Additional tags will be added after existing ones.
        /// </summary>
        public TagContent Add(params TagContent[] content)
        {
            Add((IEnumerable<TagContent>)content);
            return this;
        }

        public TagContent Add(IEnumerable<TagContent> content)
        {
            if (content == null) return this;

            IsEmpty = false;
            if (Contents == null) Contents = new List<TagContent>();

            Contents.AddRange(content);

            return this;
        }

        /// <summary>
        /// Supply the contents of the tag. These will not be rendered if `IsEmpty` is true.
        /// Additional tags will be added after existing ones.
        /// </summary>
        public TagContent this[params TagContent[] content]
        {
            get { return Add(content); }
        }
        
        /// <summary>
        /// Supply the text contents of the tag. These will not be rendered if `IsEmpty` is true or if child tags are added.
        /// </summary>
        public TagContent this[string content]
        {
            get
            {
                Text = content;
                return this;
            }
        }
    }
}