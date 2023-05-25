using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class ProductUpdateDto
    {
        public string Name { get; set; }
        public string Specification { get; set; }
        public string Generation { get; set; }
        public decimal Price { get; set; }
        public string Condition { get; set; }
        public int Quantity { get; set; }
        public string StorageSize { get; set; }
        public string RamSize { get; set; }
        public bool TouchScreen { get; set; }
        
    }
}