namespace Sg.Unit.Tests
{
    using System;
    using System.IO.Abstractions;
    using NUnit.Framework;

    [TestFixture]
    public class DriveInfoTests
    {
        [Test]
        public void logical_drive_names_call_gives_letter_colon_backslash()
        {
            var drives = 
                new FileSystem().Directory.GetLogicalDrives();
            Console.WriteLine(string.Join("\r\n", drives));

            foreach (var drive in drives)
            {
                Assert.That(char.IsLetter(drive[0]));
                Assert.That(drive.Substring(1), Is.EqualTo(":\\"));
            }
        }
    }
}