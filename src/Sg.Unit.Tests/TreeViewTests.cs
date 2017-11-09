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
            _subject = new ColumnsCommitGraph("");
            var tA = TestTime(1);
            var tB = TestTime(2);
            var tD = TestTime(3);
            var tC = TestTime(4);
            var tE = TestTime(5);
            var tG = TestTime(6);
            var tF = TestTime(7);

            // 'a' is head
            _subject.AddCommit(new CommitPoint("A", "msg", tA, new []{"B"}), "a", "B");
            _subject.AddCommit(new CommitPoint("B", "msg", tB, new []{"C"}), "a", "B");
            _subject.AddCommit(new CommitPoint("C", "msg", tC, new []{"G", "F"}), "a", "B");
            _subject.AddCommit(new CommitPoint("G", "msg", tG, new []{"F"}), "a", "B");
            _subject.AddCommit(new CommitPoint("F", "msg", tF, new string[0]), "a", "B");

            // 'd' is unmerged
            _subject.AddCommit(new CommitPoint("D", "msg", tD, new []{"E"}), "d", "D");
            _subject.AddCommit(new CommitPoint("E", "msg", tE, new []{"F"}), "d", "D");
        }

        [Test]
        [TestCase(0, new[] { "A", "B", "C", "G", "F" })]
        [TestCase(1, new[] { "D", "E" })]
        public void column_contents(int col, string[] order)
        {
            Console.WriteLine(string.Join(" -> ", _subject.Cells().Where(c => c.Column == col).Select(c => c.CommitPoint.Id)));

            Assert.That(_subject.Cells().Where(c => c.Column == col).Select(c => c.CommitPoint.Id).SequenceEqual(order));
        }

        [Test]
        public void overall_ordering_is_by_time()
        {
            Console.WriteLine(string.Join(" -> ", _subject.Cells().Select(c => c.CommitPoint.Id)));

            Assert.That(_subject.Cells().Select(c => c.CommitPoint.Id).SequenceEqual(new[] { "A", "B", "D", "C", "E", "G", "F" }));
        }

        [Test]
        public void commit_A_is_before_the_tide()
        {
            Assert.That(_subject.Cells().Single(c => c.CommitPoint.Id == "A").LocalOnly, Is.True);
        }

        [Test]
        public void commit_B_is_after_the_tide()
        {
            Assert.That(_subject.Cells().Single(c => c.CommitPoint.Id == "B").LocalOnly, Is.False);
        }

        [Test]
        public void commit_D_is_after_the_tide()
        {
            Assert.That(_subject.Cells().Single(c => c.CommitPoint.Id == "D").LocalOnly, Is.False);
        }


        static DateTimeOffset TestTime(int i)
        {
            return new DateTimeOffset(2014, 9, 2, 23 - i, 0, 0, TimeSpan.Zero);
        }

    }
}