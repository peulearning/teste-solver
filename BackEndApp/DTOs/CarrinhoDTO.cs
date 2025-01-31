using System.Collections.Generic;

namespace BackendApp.DTOs
{
    public class CarrinhoDTO
    {
        public int Id { get; set; }
        public List<ItemCarrinhoDTO> ItensCarrinho { get; set; } = new List<ItemCarrinhoDTO>();
    }

    public class ItemCarrinhoDTO
    {
        public int ItemId { get; set; }
        public int Quantidade { get; set; }
    }
}
