using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductApi.Domain.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public DateTime LaunchDate { get; set; }
        public decimal Price { get; set; }
    }
}
