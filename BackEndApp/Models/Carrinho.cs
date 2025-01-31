namespace BackendApp.Models
{
    public class Carrinho
    {
        public int Id { get; set; }
        public string Identificador { get; set; } = string.Empty;
        public List<ItemCarrinho> ItensCarrinho { get; set; } = new List<ItemCarrinho>(); // Relacionamento com os itens do carrinho

    }
}
