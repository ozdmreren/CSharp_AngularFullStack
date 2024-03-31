using MongoDB.Bson.Serialization.Attributes;

namespace ProductAPI.Models.Entities
{
    public class Image
    {
        //[BsonElement("ImagePath")]
        public string ImagePath { get; set; }
        //[BsonElement("ImageColor")]
        public string ImageColor { get; set; }
        //[BsonElement("ImageColorCode")]
        public string ImageColorCode { get; set; }
    }
}
