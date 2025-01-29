namespace BackendApp.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Item> Itens { get; set; } = new List<Item>();
    }
}
