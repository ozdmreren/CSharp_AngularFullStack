namespace LoggerAPI.Models.Entities
{
    public record ProductLogTable(string ProductId)
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
