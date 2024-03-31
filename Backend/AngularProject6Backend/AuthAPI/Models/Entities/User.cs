using AuthAPI.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductAPI.Models.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        [BsonElement(Order = 0)]
        public string Id { get; set; }

        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement(Order = 1)]
        public string Username { get; set; }

        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement(Order = 2)]
        public string Email { get; set; }

        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement(Order = 3)]
        public string HashedPassword { get; set; }

        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement(Order = 4)]
        public UserType UserType { get; set; }
        [BsonElement(Order = 5)]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedDate { get; set; }
    }
}
