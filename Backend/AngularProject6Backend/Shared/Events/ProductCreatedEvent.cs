namespace Shared.Events
{
    public class ProductCreatedEvent
    {
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
