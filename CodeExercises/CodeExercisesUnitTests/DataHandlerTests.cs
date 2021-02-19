using CodeExerciese.Controllers;
using CodeExerciese.Core.Interfaces;
using Moq;
using NUnit.Framework;

namespace CodeExercisesUnitTests
{
    public class DataHandlerTests
    {
        private DataHandlerController _dataHandlerController;
        private Mock<IStringTransformer> _stringTransformerMock;
        private Mock<IArraySearcher> _arraySearcherMock;

        [SetUp]
        public void Setup()
        {            
            _stringTransformerMock = new Mock<IStringTransformer>();
            _arraySearcherMock = new Mock<IArraySearcher>();
            _dataHandlerController = new DataHandlerController(_arraySearcherMock.Object, _stringTransformerMock.Object);
        }

        [TestCase("MyString", 2, "ngMyStri")]
        [TestCase("Test", 1, "tTes")]
        [TestCase("AnotherTest", 4, "TestAnother")]
        [TestCase("HelloWorld", 3, "rldHelloWo")]
        [TestCase("Hello", 31, "oHell")]
        public void StringTransformer_ShouldReturn_ProperlyRotatedString(string data, int rotations, string expectedResult)
        {
            _stringTransformerMock.Setup(p => p.Rotate(data, rotations)).Returns(expectedResult);
            var result = _dataHandlerController.RotateString(data, rotations.ToString());
            Assert.That(result, Is.EqualTo(expectedResult));
            _stringTransformerMock.VerifyAll();
        }

        [TestCase(6, "above: 1, below: 4", 1, 5, 2, 1, 10)]
        [TestCase(3, "above: 2, below: 3", 1, 5, 2, 1, 10)]
        [TestCase(9, "above: 1, below: 4", 1, 5, 2, 1, 10)]
        [TestCase(6, "above: 2, below: 4", 1, 5, 2, 1, 10, 11)]
        public void ArraySearcher_ShouldReturn_CorrectCountOfIntsAboveAndBelowProvidedInt(int comparisonValue, string expectedResult, params int[] data)
        {
            _arraySearcherMock.Setup(p => p.GetAboveAndBelow(data, comparisonValue)).Returns(expectedResult);
            var result = _dataHandlerController.GetAboveAndBelow(string.Join(',', data), comparisonValue.ToString());
            Assert.That(result, Is.EqualTo(expectedResult));
            _arraySearcherMock.VerifyAll();
        }
    }
}