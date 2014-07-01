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

            _subject.AddCommit(new CommitPoint("A", "msg", new []{"B"}));
            _subject.AddCommit(new CommitPoint("B", "msg", new []{"C", "D"}));
            _subject.AddCommit(new CommitPoint("D", "msg", new []{"E"}));
            _subject.AddCommit(new CommitPoint("C", "msg", new []{"G", "F"}));
            _subject.AddCommit(new CommitPoint("E", "msg", new []{"F"}));
            _subject.AddCommit(new CommitPoint("G", "msg", new []{"F"}));
            _subject.AddCommit(new CommitPoint("F", "msg", new string[0]));
        }

        [Test]
        [TestCase(0, new[] { "D", "E" })]
        [TestCase(1, new[] { "A", "B", "C", "F" })]
        [TestCase(2, new[] { "G" })]
        public void column_contents(int col, string[] order)
        {
            Console.WriteLine(string.Join(" -> ", _subject.Cells().Where(c => c.Column == col).Select(c => c.CommitPoint.Id)));

            Assert.That(_subject.Cells().Where(c => c.Column == col).Select(c => c.CommitPoint.Id).SequenceEqual(order));
        }

        [Test]
        public void adding_an_orphan_throws()
        {
            Assert.Throws<Exception>(() => _subject.AddCommit(new CommitPoint("Z", "msg", new[] { "B" })));
        }

    }
}