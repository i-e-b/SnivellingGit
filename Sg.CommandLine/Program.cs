using System;
using SnivellingGit.Interfaces;
using SnivellingGit.LayoutEngine;
using StructureMap;

namespace Sg.CommandLine
{
    class Program
    {
        static void Main(string[] args)
        {
            var target = (args?.Length > 0) ? args[0] : @"C:\Clients\Goal-GTRS\GT2S";
            SnivellingGit.Entry.Configure();
            
            
            using (var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(target))
            {
                ICommitGraph table = new ColumnsCommitGraph();
                HistoryWalker.BuildCommitGraph(repo, table, false, true);

                foreach (var cell in table.Cells())
                {
                    Console.WriteLine(cell.CommitPoint.Message);
                }
            }
        }
    }
}