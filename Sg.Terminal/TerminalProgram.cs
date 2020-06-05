using System;
using System.IO;
using System.Linq;
using System.Text;
using SnivellingGit;
using SnivellingGit.Interfaces;
using SnivellingGit.LayoutEngine;
using StructureMap;

namespace Sg.Terminal
{
    internal class TerminalProgram
    {
        public static void Main(string[] args)
        {
            Entry.Configure();
            Run(args);
        }

        static void Run(string[] args)
        {
            var target = (args?.Length > 0) ? args[0] : Directory.GetCurrentDirectory();

            using (var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(target))
            {
                if (repo == null)
                {
                    Console.WriteLine($"No repo found in {target}");
                    return;
                }

                ICommitGraph table = new ColumnsCommitGraph();
                HistoryWalker.BuildCommitGraph(repo, table, false, true);
                var defaultColor = Console.ForegroundColor;

                var cells = table.Cells().OrderBy(c => c.Row).Take(20).ToList();
                var maxCol = cells.Max(c => c.Column) + 1;
                var col = "│";
                var activeCols = new bool[maxCol];

                foreach (var cell in cells)
                {
                    for (int i = 0; i < cell.Column; i++) Console.Write(activeCols[i] ? col : " ");
                    Console.Write(cell.IsMerge ? "┼" : "├");
                    for (int i = cell.Column+1; i < maxCol; i++) Console.Write(activeCols[i] ? col : " ");
                    
                    activeCols[cell.Column] = true; // need turn-off logic

                    Console.Write(cell.CommitPoint.Message);

                    Console.ForegroundColor = ConsoleColor.Green;
                    foreach (var branch in cell.BranchNames)
                    {
                        Console.Write(" " + branch);
                    }

                    Console.ForegroundColor = defaultColor;
                    Console.WriteLine();
                }
            }
        }
    }
}