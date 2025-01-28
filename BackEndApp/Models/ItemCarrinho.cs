namespace BackendApp.Models
{
    public class ItemCarrinho
    {
        public int Id { get; set; }
        public int CarrinhoId { get; set; }
        public Carrinho Carrinho { get; set; } = new Carrinho();
        public int ItemId { get; set; }
        public Item Item { get; set; } = new Item();
    }
}
