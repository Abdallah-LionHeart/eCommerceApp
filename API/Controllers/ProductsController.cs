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
  private readonly IPhotoService _photoService;
  private readonly IProductRepository _productRep;

  public ProductsController
  (IGenericRepository<Product> productsRepository,
  IGenericRepository<ProductBrand> productsBrandRepository,
  IGenericRepository<ProductType> productsTypeRepository,
  IMapper mapper,
  IPhotoService photoService,
  IProductRepository productRep
  )
  {
   _productsRepository = productsRepository;
   _productsBrandRepository = productsBrandRepository;
   _productsTypeRepository = productsTypeRepository;
   _mapper = mapper;
   _photoService = photoService;
   _productRep = productRep;
  }
  [Cached(600)]
  [HttpGet]
  public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
  {
   var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
   var countspec = new ProductWithFiltersForCountSpecification(productParams);
   var totalItems = await _productsRepository.CountAsync(countspec);
   var products = await _productsRepository.ListAsync(spec);
   var data = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);

   return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
  }

  [Cached(600)]
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

  // [HttpGet("name")]
  // public async Task<ActionResult<ProductToReturnDto>> GetProductByName(string name)
  // {
  //  var productName = await _productsRepository.GetByNameAsync(name);
  //  // var productName = await _con

  //  if (productName == null) return NotFound(new ApiResponse(404));

  //  return _mapper.Map<Product, ProductToReturnDto>(productName);

  // }
  [Cached(600)]
  [HttpGet("brands")]
  public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
  {
   return Ok(await _productsBrandRepository.ListAllAsync());

  }
  [Cached(600)]

  [HttpGet("types")]
  public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
  {
   return Ok(await _productsTypeRepository.ListAllAsync());
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<Product>> UpdateProduct(int id, ProductUpdateDto productUpdateDto)
  {
   var product = await _productsRepository.GetByIdAsync(id);
   _mapper.Map(productUpdateDto, product);
   _productsRepository.Update(product);
   if (await _productsRepository.SaveAllAsync()) return NoContent();
   return BadRequest("Failed to update product");
  }

  // [HttpPost("add-photo/{id}")]
  // public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, int id)
  // {
  // var product = await _productsRepository.GetByIdAsync(id);
  //  productId = Int32.Parse(User.GetProductId());
  //  var product = await _productsRepository.GetByIdAsync(productId);


  //  // var product = await _productsRepository.GetByNameAsync(User.GetProductName());

  //  // var product = await _productRep.GetProductByIdAsync(GetProductId(id));
  //  if (product == null) return NotFound("product not found");

  //  var result = await _photoService.AddPhotoAsync(file);
  //  if (result.Error != null) return BadRequest(result.Error.Message);
  //  var photo = new Photo
  //  {
  //   Url = result.SecureUrl.AbsoluteUri,
  //   PublicId = result.PublicId
  //  };
  //  if (product.Photos.Count == 0) photo.IsMain = true;
  //  product.Photos.Add(photo);
  //  if (await _productsRepository.SaveAllAsync())
  //  {
  //   return CreatedAtRoute("GetProduct", new { id = product.Id }, _mapper.Map<PhotoDto>(photo));
  //  }

  //  return BadRequest("Problem adding photo");
  // }


  // [HttpPut("set-main-photo/{photoId}")]
  // public async Task<ActionResult> SetMainPhoto(int productId, int photoId)
  // {
  //  var product = await _productsRepository.GetByIdAsync(productId);
  //  if (product == null) return NotFound();
  //  var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);
  //  if (photo == null) return NotFound();
  //  if (photo.IsMain) return BadRequest("This is already your main photo");
  //  var currentMain = product.Photos.FirstOrDefault(x => x.IsMain);
  //  if (currentMain != null) currentMain.IsMain = false;
  //  photo.IsMain = true;
  //  if (await _productsRepository.SaveAllAsync()) return NoContent();
  //  return BadRequest("Failed to set main photo");
  // }

  [HttpDelete("delete-photo/{photoId}")]
  public async Task<ActionResult> DeletePhoto(int productId, int photoId)
  {
   var product = await _productsRepository.GetByIdAsync(productId);
   if (product == null) return NotFound();
   var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);
   if (photo == null) return NotFound();
   if (photo.IsMain) return BadRequest("You cannot delete your main photo");
   if (photo.PublicId != null)
   {
    var result = await _photoService.DeletePhotoAsync(photo.PublicId);
    if (result.Error != null) return BadRequest(result.Error.Message);
   }
   product.Photos.Remove(photo);
   if (await _productsRepository.SaveAllAsync()) return Ok();
   return BadRequest("Failed to delete the photo");



  }
 }

}