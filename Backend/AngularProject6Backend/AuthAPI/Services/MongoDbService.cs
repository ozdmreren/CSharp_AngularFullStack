using MongoDB.Driver;

namespace AuthAPI.Services
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;
        public MongoDbService(IConfiguration configuration)
        {
            IMongoClient client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            _database = client.GetDatabase("AngularP6Users");
        }
        public IMongoCollection<T> GetCollection<T>() => _database.GetCollection<T>(typeof(T).Name.ToLowerInvariant());
    }
}
