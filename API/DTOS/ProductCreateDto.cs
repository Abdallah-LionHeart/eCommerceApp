using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class ProductCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [RegularExpression(@"^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$",
            ErrorMessage = "Price must be a decimal (e.g 20.30)")]
        public decimal Price { get; set; }
        public string PhotoUrl { get; set; }
        [Required]
        public int ProductTypeId { get; set; }
        [Required]
        public int ProductBrandId { get; set; }
        [Required]
        public string Specification { get; set; }
        [Required]
        public string Generation { get; set; }
        [Required]
        public string Condition { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string StorageSize { get; set; }
        [Required]
        public string RamSize { get; set; }
        [Required]
        public bool TouchScreen { get; set; }


    }
}