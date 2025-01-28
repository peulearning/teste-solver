namespace BackendApp.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public Produto Produto { get; set; } = new Produto();
        public int Quantidade { get; set; }
    }
}
