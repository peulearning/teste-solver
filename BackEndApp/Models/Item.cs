namespace BackendApp.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string UnidadeMedida { get; set; } = string.Empty;

        public Produto Produto { get; set; }
    }
}
