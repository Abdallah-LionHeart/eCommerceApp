using API.DTOS;
using API.Entity;
using API.Errors;
using API.Helpers;
using API.Interfaces;
using API.Specifications;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
 public class ProductsController : BaseApiController
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
  public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
  {
   var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
   var countspec = new ProductWithFiltersForCountSpecification(productParams);
   var totalItems = await _productsRepository.CountAsync(countspec);
   var products = await _productsRepository.ListAsync(spec);

   // var data = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);
   return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products)));
  }


  [HttpGet("{id}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]

  public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
  {
   var spec = new ProductsWithTypesAndBrandsSpecification(id);

   var product = await _productsRepository.GetEntityWithSpec(spec);

   if (product == null) return NotFound(new ApiResponse(404));

   return _mapper.Map<Product, ProductToReturnDto>(product);
  }


  // [HttpGet("name/{name}")]
  // public Task<ActionResult<Pagination<ProductToReturnDto>>> GetProduct(string name)
  // {
  // !using generic repository
  // return await _productsRepository.GetProductByNameAsync(name);

  // !using specification
  // var spec = new ProductsWithTypesAndBrandsSpecification(name);
  // var countspec = new ProductWithFiltersForCountSpecification(name);
  // var totalItems = await _productsRepository.CountAsync(countspec);
  // var products = await _productsRepository.ListAsync(spec);

  //  // // var data = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);
  // return Ok(new Pagination<ProductToReturnDto>(1, 1, totalItems, _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products)));
  // }






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