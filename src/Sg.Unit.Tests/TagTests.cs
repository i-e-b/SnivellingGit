namespace Sg.Unit.Tests
{
    using NUnit.Framework;
    using Tag;

    [TestFixture]
    public class TagTests
    {
        [Test]
        public void simple_tag_output()
        {
            var expected =    "<div class=\"glass\">Hello, world</div>";
            var actual = T.g("div", "class","glass")["Hello, world"].ToString();

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public void empty_tag()
            {
            var expected = "<br/>";
            var actual = T.g("br").Empty().ToString();

            Assert.That(actual, Is.EqualTo(expected));
        }
        

        [Test]
        public void empty_tag_other_way()
        {
            var expected = "<br/>";
            var actual = T.gEmpty("br").ToString();

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public void tag_with_tag_as_contents(){
            var expected =  "<div class=\"glass\"><a href=\"#\">Fish</a></div>";
            var subject = T.g("div", "class","glass")[
                            T.g("a", "href", "#")["Fish"]
                          ];

            var actual = subject.ToString();
            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public void tag_containing_multiple_children(){
            var expected = "<div><i>1</i><br/><i>2</i></div>";

            var subject = T.g("div")[ T.g("i")["1"], T.gEmpty("br"), T.g("i")["2"] ];
            
            var actual = subject.ToString();
            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public void tag_containing_multiple_children_and_plain_content(){
            var expected = "<div>1<p>2</p>3</div>";

            var subject = T.g("div")[ T.g()["1"], T.g("p")["2"], T.g()["3"] ];
            
            var actual = subject.ToString();
            Assert.That(actual, Is.EqualTo(expected));
        }
    }
}