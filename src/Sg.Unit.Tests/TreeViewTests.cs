namespace Sg.Unit.Tests
{
    using System;
    using System.Linq;
    using NUnit.Framework;
    using SnivellingGit;

    [TestFixture]
    public class TreeViewTests
    {
        ICommitGraph _subject;

        [SetUp]
        public void setup()
        {
            _subject = new ColumnsCommitGraph();
            _subject.AddBranch("d", "D", "");
            _subject.AddBranch("a", "A", "");
            _subject.AddBranch("g", "G", "");

            _subject.AddCommit("A", "msg", "B");
            _subject.AddCommit("B", "msg", "C", "D");
            _subject.AddCommit("D", "msg", "E");
            _subject.AddCommit("C", "msg", "G", "F");
            _subject.AddCommit("E", "msg", "F");
            _subject.AddCommit("G", "msg", "F");
            _subject.AddCommit("F", "msg", "");
        }

        [Test]
        public void column_1_contains_D_and_E()
        {
            Assert.That(_subject.Cells().Where(c => c.Column == 1).Select(c => c.Id).SequenceEqual(new[] { "D", "E" }));
        }

        [Test]
        public void column_2_contains_A_B_C_F()
        {
            Assert.That(_subject.Cells().Where(c => c.Column == 2).Select(c => c.Id).SequenceEqual(new[] { "A", "B", "C", "F" }));
        }

        [Test]
        public void column_3_contains_G()
        {
            Assert.That(_subject.Cells().Where(c => c.Column == 3).Select(c => c.Id).SequenceEqual(new[] { "G" }));
        }

        [Test]
        public void adding_an_orphan_throws()
        {
            Assert.Throws<Exception>(() => _subject.AddCommit("Z", "F"));
        }

    }
}