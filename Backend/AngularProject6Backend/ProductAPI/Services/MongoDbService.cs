using MongoDB.Driver;
using ProductAPI.Models.Entities;

namespace ProductAPI.Services
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;
        private const string DB_NAME = "AngularP6Products";
        private readonly IMongoCollection<Product> _productCollection;
        public MongoDbService(IConfiguration configuration) 
        {
            IMongoClient client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            _database = client.GetDatabase(DB_NAME);
            _productCollection = _database.GetCollection<Product>(typeof(Product).Name.ToLowerInvariant());
        }
        public IMongoCollection<T> GetCollections<T>() => _database.GetCollection<T>(typeof(T).Name.ToLowerInvariant());
        public async Task<List<Product>> GetProductsAsync() => await _productCollection.Find(filter: _ => true).ToListAsync();
        public async Task CreateProductAsync(Product product) => await _productCollection.InsertOneAsync(product);
    }
}
