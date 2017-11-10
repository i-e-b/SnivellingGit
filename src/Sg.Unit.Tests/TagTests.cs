﻿using System.IO;
using System.Linq;

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

        [Test]
        public void tag_containing_multiple_children_and_plain_content_with_implicit_conversion(){
            var expected = "<div>1<p>2</p>3</div>";

            var subject = T.g("div")[ "1", T.g("p")["2"], "3" ];
            
            var actual = subject.ToString();
            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public void stream_to_a_text_writer() {
            var expected = "<div>1<p>2</p>3</div>";

            var outp = new StringWriter();
            var subject = T.g("div")[ "1", T.g("p")["2"], "3" ];

            subject.StreamTo(outp);

            Assert.That(outp.ToString(), Is.EqualTo(expected));
        }

        [Test]
        public void tag_contents_replace_text_contents()
        {
            var subject = T.g("p")["Hello"];

            var one = subject.ToString();

            subject.Add("Bingo", T.g("i")["Bango"]);
            var two = subject.ToString();

            Assert.That(one, Is.EqualTo("<p>Hello</p>"));
            Assert.That(two, Is.EqualTo("<p>Bingo<i>Bango</i></p>"));
        }

        [Test]
        public void adding_tag_content_from_linq()
        {
            var src = new[] { "a", "b", "c" };

            var subject = T.g("x");
            subject.Add(src.Select(s => T.g()[s]));

            Assert.That(subject.ToString(), Is.EqualTo("<x>abc</x>"));
        }
    }
}