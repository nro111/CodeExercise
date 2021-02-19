using CodeExerciese.Core.Interfaces;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace CodeExerciese.Controllers
{
    [ApiController]
    [Route("api/")]
    public class DataHandlerController : Controller
    {
        private readonly IArraySearcher _arraySearcher;
        private readonly IStringTransformer _stringTransformer;

        public DataHandlerController(IArraySearcher arraySearcher, IStringTransformer stringTransformer)
        {
            _arraySearcher = arraySearcher;
            _stringTransformer = stringTransformer;
        }

        [HttpGet]
        [Route("getAboveAndBelow/{data}/comparisonValue/{comparisonValue}")]
        public string GetAboveAndBelow(string data, string comparisonValue)
        {
            return _arraySearcher.GetAboveAndBelow(data.Split(',').Select(x => int.Parse(x)).ToArray(), int.Parse(comparisonValue));
        }

        [HttpGet]
        [Route("rotateString/{data}/timesToRotate/{timesToRotate}")]
        public string RotateString(string data, string timesToRotate)
        {
            return _stringTransformer.Rotate(data, int.Parse(timesToRotate));
        }
    }
}