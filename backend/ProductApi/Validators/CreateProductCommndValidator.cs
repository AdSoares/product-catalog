using ProductApi.Application.Features.ProductFeatures.Commands;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductApi.Validators
{
    public class CreateProductCommndValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommndValidator()
        {
            RuleFor(c => c.Description).NotEmpty();
            RuleFor(c => c.Type).NotEmpty();
            RuleFor(c => c.LaunchDate).NotEmpty();
            RuleFor(c => c.Price).NotEmpty();
        }
    }
}
