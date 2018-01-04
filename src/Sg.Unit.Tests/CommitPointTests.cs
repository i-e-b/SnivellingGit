using System;
using NUnit.Framework;
using SnivellingGit.LayoutEngine;

namespace Sg.Unit.Tests
{
    [TestFixture]
    public class CommitPointTests {
        [Test]
        public void commit_messages_are_HTML_encoded()
        {
            var expected = "Changed &lt;br/&gt; to &lt;p&gt;";
            var actual = new CommitPoint("anyid", "Changed <br/> to <p>", DateTimeOffset.Now, new string[] { });

            Assert.That(actual.Message, Is.EqualTo(expected));
        }
    }
}