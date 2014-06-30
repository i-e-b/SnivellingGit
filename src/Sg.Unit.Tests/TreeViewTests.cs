namespace Sg.Unit.Tests
{
    using System;
    using System.Linq;
    using NUnit.Framework;
    using SnivellingGit;

    [TestFixture]
    public class TreeViewTests
    {
        CommitGraph _subject;

        [SetUp]
        public void setup()
        {
            _subject = new CommitGraph();
            _subject.AddBranch("a", "A", 2);
            _subject.AddBranch("d", "D", 1);
            _subject.AddBranch("g", "G", 3);

            _subject.AddCommit("A", "B");
            _subject.AddCommit("B", "C", "D");
            _subject.AddCommit("D", "E");
            _subject.AddCommit("C", "G", "F");
            _subject.AddCommit("E", "F");
            _subject.AddCommit("G", "F");
            _subject.AddCommit("F", "");
        }

        [Test]
        public void column_1_contains_D_and_E()
        {
            Assert.That(_subject.Cells.Where(c => c.Column == 1).Select(c => c.Id).SequenceEqual(new[] { "D", "E" }));
        }

        [Test]
        public void column_2_contains_A_B_C_F()
        {
            Assert.That(_subject.Cells.Where(c => c.Column == 2).Select(c => c.Id).SequenceEqual(new[] { "A", "B", "C", "F" }));
        }

        [Test]
        public void column_3_contains_G()
        {
            Assert.That(_subject.Cells.Where(c => c.Column == 3).Select(c => c.Id).SequenceEqual(new[] { "G" }));
        }

        [Test]
        public void adding_an_orphan_throws()
        {
            Assert.Throws<Exception>(() => _subject.AddCommit("Z", "F"));
        }

    }
}