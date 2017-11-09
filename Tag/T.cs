using System.Collections.Generic;

namespace Tag
{
    /// <summary>
    /// HTML/XML Tag creator
    /// </summary>
    public static class T
    {
#pragma warning disable IDE1006 // Naming Styles
        // ReSharper disable InconsistentNaming

        /// <summary>
        /// Create a new tag.
        /// <para>Example: <code>T.g("div", "class", "plain")</code> would give <code>&lt;div class="plain"&gt;&lt;/div&gt;</code> </para>
        /// </summary>
        /// <param name="tagName">Name of the tag</param>
        /// <param name="properties">list alternating between property name and value</param>
        public static TagContent g(string tagName, params string[] properties)
        {
            var t = new TagContent
            {
                Tag = tagName,
                IsEmpty = false,
                Properties = new Dictionary<string, string>()
            };

            var limit = properties.Length - (properties.Length % 2);
            for (int i = 0; i < limit; i += 2)
            {
                t.Properties.Add(properties[i], properties[i + 1]);
            }

            return t;
        }

        /// <summary>
        /// Create a new tag and mark it as empty
        /// </summary>
        public static TagContent gEmpty(string tagName, params string[] properties)
        {
            return g(tagName, properties).Empty();
        }

        /// <summary>
        /// Create a blank tag. This is only used to intersperse plain text and tagged content in a parent
        /// </summary>
        public static TagContent g()
        {
            return new TagContent
            {
                Tag = null,
                IsEmpty = false,
                Properties = null
            };
        }
    }
}
