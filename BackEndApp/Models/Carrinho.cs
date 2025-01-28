namespace BackendApp.Models
{
    public class Carrinho
    {
        public int Id { get; set; }
        public string Identificador { get; set; } = string.Empty;
        public ICollection<ItemCarrinho> ItensCarrinho { get; set; } = new List<ItemCarrinho>();
    }
}
