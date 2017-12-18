using NUnit.Framework;
using SnivellingGit.LayoutEngine;

namespace Sg.Unit.Tests
{
    [TestFixture]
    public class LoopPlacerTests
    {
        [Test]
        public void finding_the_maximum_occupancy(){
            var data = (1u<<10) | (1u<<5) | (1u<<2);

            var expected = 10;

            var actual = LoopPlacer.MaxOccupied(data);

            Assert.That(actual, Is.EqualTo(expected));
        }
        
        [Test]
        public void finding_the_maximum_occupancy_2(){
            var data = (1u<<10) | (1u<<5);// | (1u<<2);

            var expected = 10;

            var actual = LoopPlacer.MaxOccupied(data);

            Assert.That(actual, Is.EqualTo(expected));
        }
    }
}