using BackendApp.Models;
using BackendApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;

        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public IActionResult GetAllProdutos()
        {
            var produtos = _produtoService.GetAllProdutos();
            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetProduto(int id)
        {
            var produto = _produtoService.GetProduto(id);
            if (produto == null)
                return NotFound();
            return Ok(produto);
        }

        [HttpPost]
        public IActionResult CreateProduto([FromBody] Produto produto)
        {
            if (produto == null)
                return BadRequest();

            _produtoService.AddProduto(produto);
            return CreatedAtAction(nameof(GetProduto), new { id = produto.Id }, produto);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduto(int id, [FromBody] Produto produto)
        {
            if (produto == null || produto.Id != id)
                return BadRequest();

            _produtoService.UpdateProduto(produto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduto(int id)
        {
            _produtoService.DeleteProduto(id);
            return NoContent();
        }
    }
}
