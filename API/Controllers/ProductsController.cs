using API.DTOS;
using API.Entity;
using API.Interfaces;
using API.Specifications;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
 [ApiController]
 [Route("api/[controller]")]
 public class ProductsController : ControllerBase
 {
  private readonly IGenericRepository<Product> _productsRepository;
  private readonly IGenericRepository<ProductBrand> _productsBrandRepository;
  private readonly IGenericRepository<ProductType> _productsTypeRepository;
  private readonly IMapper _mapper;

  public ProductsController
  (IGenericRepository<Product> productsRepository,
  IGenericRepository<ProductBrand> productsBrandRepository,
  IGenericRepository<ProductType> productsTypeRepository,
  IMapper mapper)
  {
   _productsRepository = productsRepository;
   _productsBrandRepository = productsBrandRepository;
   _productsTypeRepository = productsTypeRepository;
   _mapper = mapper;
  }
  [HttpGet]
  public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
  {
   var spec = new ProductsWithTypesAndBrandsSpecification();
   var products = await _productsRepository.ListAsync(spec);

   return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
  {
   var spec = new ProductsWithTypesAndBrandsSpecification(id);

   var products = await _productsRepository.GetEntityWithSpec(spec);
   return _mapper.Map<Product, ProductToReturnDto>(products);
  }

  [HttpGet("brands")]
  public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
  {
   return Ok(await _productsBrandRepository.ListAllAsync());

  }
  [HttpGet("types")]
  public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
  {
   return Ok(await _productsTypeRepository.ListAllAsync());
  }



 }

}