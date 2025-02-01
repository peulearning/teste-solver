namespace BackendApp.Models
{
    public class ItemCarrinho
    {
        public int Id { get; set; }
        public int CarrinhoId { get; set; }
        public int ItemId { get; set; }
        public int Quantidade { get; set; }

        public Carrinho Carrinho { get; set; }
        public Item Item { get; set; }
    }
}
