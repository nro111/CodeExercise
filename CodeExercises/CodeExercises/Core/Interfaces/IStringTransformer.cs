using CodeExerciese.Models;

namespace CodeExerciese.Core.Interfaces
{
    public interface IStringTransformer
    {
        public string Rotate(string data, int timesToRotate);
    }
}