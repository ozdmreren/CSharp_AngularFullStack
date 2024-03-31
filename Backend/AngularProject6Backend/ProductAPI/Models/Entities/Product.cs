using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ProductAPI.Enums;

namespace ProductAPI.Models.Entities
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement(Order = 0)]

        public string ProductId { get; set; }
        [BsonRepresentation(BsonType.String)]
        [BsonElement(Order = 1)]
        public string ProductName { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement(Order = 2)]
        public string ProductDescription { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement(Order = 3)]
        public string ProductBrand { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement(Order = 4)]
        public string ProductCategory { get; set; }

        [BsonElement(Order = 5)]
        public List<Image> Images { get; set; }

        [BsonRepresentation(BsonType.Decimal128)]
        [BsonElement(Order = 6)]
        public decimal ProductPrice { get; set; }

        [BsonRepresentation(BsonType.Boolean)]
        [BsonElement(Order = 7)]
        public bool InStock { get; set; }
    }
}
