using LoggerAPI.Models.Contexts;
using LoggerAPI.Models.Entities;
using MassTransit;
using Shared.Events;

namespace LoggerAPI.Consumers
{
    public class ProductCreatedEventConsumer : IConsumer<ProductCreatedEvent>
    {
        private readonly AngularProject6LogDB _context;
        public ProductCreatedEventConsumer(AngularProject6LogDB context)
            => _context = context;
        public async Task Consume(ConsumeContext<ProductCreatedEvent> context)
        {
            Console.WriteLine(context.Message.ProductName);
            Console.WriteLine(context.Message.ProductId);
            Console.WriteLine(context.Message.CreatedDate);
            try
            {
                ProductLogTable productTb = new ProductLogTable(context.Message.ProductId);
                productTb.ProductName = context.Message.ProductName;
                productTb.CreatedDate = context.Message.CreatedDate;
                await _context.ProductLogs.AddAsync(productTb);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
