using BackendApp.Models;
using BackendApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
{
    private readonly IItemService _itemService;

    public ItemController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpPost]
    public IActionResult CreateItem([FromBody] ItemDTO itemDTO)
    {
        if (itemDTO == null)
            return BadRequest("Dados inválidos.");

        try
        {
            _itemService.AddItem(itemDTO);
            return CreatedAtAction(nameof(GetItem), new { id = itemDTO.ProdutoId }, itemDTO);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetItem(int id)
    {
        try
        {
            var item = _itemService.GetItem(id);
            if (item == null)
                return NotFound();

            return Ok(item);
        }
        catch (Exception ex)
        {
            // Logar o erro (se você tiver um logger configurado)
            return StatusCode(500, "Erro interno no servidor: " + ex.Message);
        }
    }

    [HttpGet]
    public IActionResult GetAllItens()
    {
        var itens = _itemService.GetAllItens();

        var itensDTO = itens.Select(i => new ItemDTO
        {
            Id = i.Id,
            ProdutoId = i.ProdutoId,
            Quantidade = i.Quantidade,
            UnidadeMedida = i.UnidadeMedida
        }).ToList();

        return Ok(itensDTO);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateItem(int id, [FromBody] Item item)
    {
        if (item == null || item.Id != id)
            return BadRequest("Dados inválidos.");

        _itemService.UpdateItem(item);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteItem(int id)
    {
        _itemService.DeleteItem(id);
        return NoContent();
     }

    }
}
