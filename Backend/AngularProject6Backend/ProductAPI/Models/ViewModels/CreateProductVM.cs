using ProductAPI.Enums;
using ProductAPI.Models.Entities;

namespace ProductAPI.Models.ViewModels
{
    public class CreateProductVM
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductBrand { get; set; }
        public string ProductCategory { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();
        public decimal ProductPrice { get; set; }
        public bool InStock { get; set; }
    }
}
