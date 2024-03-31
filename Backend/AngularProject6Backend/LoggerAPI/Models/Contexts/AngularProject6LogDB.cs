using LoggerAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LoggerAPI.Models.Contexts
{
    public class AngularProject6LogDB : DbContext
    {
        public AngularProject6LogDB(DbContextOptions options) : base(options) { }

        public DbSet<ProductLogTable> ProductLogs { get; set; }
    }
}
