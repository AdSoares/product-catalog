using ProductApi.Domain.Models;
using ProductApi.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace ProductApi.Application.Features.ProductFeatures.Queries
{
    public class GetProductsAllOrFilteringQuery : IRequest<IEnumerable<Product>>
    {
        public string Filter { get; set; }
        public class GetProductsAllOrFilteringQueryHandler : IRequestHandler<GetProductsAllOrFilteringQuery, IEnumerable<Product>>
        {
            private readonly IApplicationContext _context;
            public GetProductsAllOrFilteringQueryHandler(IApplicationContext context)
            {
                _context = context;
            }
            public async Task<IEnumerable<Product>> Handle(GetProductsAllOrFilteringQuery query, CancellationToken cancellationToken)
            {
                var productList = new List<Product>();

                if (string.IsNullOrEmpty(query.Filter))
                {
                    productList = await _context.Products.ToListAsync();
                }
                else
                {
                    productList = await _context.Products
                        .Where(p => p.Id.ToString().Contains(query.Filter) ||
                                    p.Description.Contains(query.Filter) ||
                                    p.Type.Contains(query.Filter) ||
                                    p.LaunchDate.ToString("dd/MM/yyyy").Contains(query.Filter) ||
                                    p.Price.ToString().Contains(query.Filter))
                        .ToListAsync();
                }

                if (productList == null)
                {
                    return null;
                }
                return productList.AsReadOnly();
            }
        }
    }
}
