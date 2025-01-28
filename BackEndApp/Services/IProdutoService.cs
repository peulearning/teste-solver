using BackendApp.Models;
namespace BackendApp.Services
{
    public interface IProdutoService
    {
        Produto GetProduto(int id);
        IEnumerable<Produto> GetAllProdutos();
        void AddProduto(Produto produto);
        void UpdateProduto(Produto produto);
        void DeleteProduto(int id);
    }
}
