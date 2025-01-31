using BackendApp.Models;
using BackendApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarrinhoController : ControllerBase
    {
        private readonly ICarrinhoService _carrinhoService;

        public CarrinhoController(ICarrinhoService carrinhoService)
        {
            _carrinhoService = carrinhoService;
        }

        // GET: api/Carrinho
        [HttpGet]
        public IActionResult GetCarrinhos()
        {
            var carrinhos = _carrinhoService.GetAllCarrinhos();
            return Ok(carrinhos);
        }

        // GET: api/Carrinho/5
        [HttpGet("{id}")]
        public IActionResult GetCarrinho(int id)
        {
            var carrinho = _carrinhoService.GetCarrinhoById(id);
            if (carrinho == null)
            {
                return NotFound();
            }
            return Ok(carrinho);
        }

        // POST: api/Carrinho
        [HttpPost]
        public IActionResult PostCarrinho([FromBody] Carrinho carrinho)
        {
            if (carrinho == null)
            {
                return BadRequest();
            }

            _carrinhoService.AddCarrinho(carrinho);
            return CreatedAtAction(nameof(GetCarrinho), new { id = carrinho.Id }, carrinho);
        }

        // PUT: api/Carrinho/5
        [HttpPut("{id}")]
        public IActionResult PutCarrinho(int id, [FromBody] Carrinho carrinho)
        {
            if (id != carrinho.Id)
            {
                return BadRequest();
            }

            var existingCarrinho = _carrinhoService.GetCarrinhoById(id);
            if (existingCarrinho == null)
            {
                return NotFound();
            }

            _carrinhoService.UpdateCarrinho(carrinho);
            return NoContent();
        }

        // DELETE: api/Carrinho/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCarrinho(int id)
        {
            var carrinho = _carrinhoService.GetCarrinhoById(id);
            if (carrinho == null)
            {
                return NotFound();
            }

            _carrinhoService.DeleteCarrinho(id);
            return NoContent();
        }
    }
}
