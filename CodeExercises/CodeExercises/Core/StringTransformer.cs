using CodeExerciese.Core.Interfaces;
using System;
using System.Text;

namespace CodeExerciese.Core
{
    public class StringTransformer : IStringTransformer
    {
        public string Rotate(string data, int timesToRotate)
        {
            //Wrap logic in a try/catch
            try
            {
                //Return the data if there are no rotations to apply or it is empty/null
                if (timesToRotate.Equals(0) || string.IsNullOrEmpty(data))
                    return data;
                //Using stringbuilder ends up being a less expensive operation than directly appending to a string
                var stringBuilder = new StringBuilder();
                //Append the end substring of the provided data to the new stringBuilder object
                stringBuilder.Append(data.Substring(data.Length - timesToRotate));
                //Append the provided data sans the previous substring
                stringBuilder.Append(data.Remove(data.Length - timesToRotate));
                return stringBuilder.ToString();
            }
            catch(Exception ex)
            {                
                //In reality, I would log this message with log4net and pass a generic error back to the UI
                return ex.Message;
            }
        }

        private int AdjustTimesToRotate(int dataLength, int timesToRotate)
        {
            if (timesToRotate < dataLength)
                return timesToRotate;
            timesToRotate -= dataLength;
            return AdjustTimesToRotate(dataLength, timesToRotate);
        }
    }
}