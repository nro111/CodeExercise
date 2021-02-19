using CodeExerciese.Core.Interfaces;
using System.Linq;

namespace CodeExerciese.Core
{
    public class ArraySearcher : IArraySearcher
    {
        public string GetAboveAndBelow(int[] data, int comparisonValue)
        {
            var result = string.Empty;
            var lowerCount = data.Where(x => x < comparisonValue).Count();
            var upperCount = data.Where(x => x > comparisonValue).Count();
            return string.Format("above: {0}, below {1}", upperCount, lowerCount);
        }
    }
}