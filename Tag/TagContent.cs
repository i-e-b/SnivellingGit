using System.Collections.Generic;
using System.Linq;
using System.Text;

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
        public string Contents { get; set; }

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
            var sb = new StringBuilder();
            if (Tag != null)
            {
                sb.Append("<");
                sb.Append(Tag);
                foreach (var property in Properties)
                {
                    sb.Append(" ");
                    sb.Append(property.Key);
                    sb.Append("=\"");
                    sb.Append(property.Value);
                    sb.Append("\"");
                }

                if (IsEmpty)
                {
                    sb.Append("/>");
                    return sb.ToString();
                }

                sb.Append(">");
            }
            sb.Append(Contents ?? "");

            if (Tag != null)
            {
                sb.Append("</");
                sb.Append(Tag);
                sb.Append(">");
            }
            return sb.ToString();
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
        /// Supply the contents of the tag. These will not be rendered if `IsEmpty` is true
        /// </summary>
        public TagContent Fill(string content)
        {
            IsEmpty = false;
            Contents = content;
            return this;
        }
        
        /// <summary>
        /// Supply the contents of the tag. These will not be rendered if `IsEmpty` is true
        /// </summary>
        public TagContent Fill(params TagContent[] content)
        {
            if (content == null) return this;
            return Fill(string.Join("", content.Select(t=>t.ToString())));
        }

        /// <summary>
        /// Supply the contents of the tag. These will not be rendered if `IsEmpty` is true
        /// </summary>
        public TagContent this[params TagContent[] content]
        {
            get { return Fill(content); }
        }
        
        /// <summary>
        /// Supply the contents of the tag. These will not be rendered if `IsEmpty` is true
        /// </summary>
        public TagContent this[string content]
        {
            get { return Fill(content); }
        }
    }
}