using BackendApp.Models;
namespace BackendApp.Repositories
{
    public interface IProdutoRepository
    {
        Produto GetById(int id);
        IEnumerable<Produto> GetAll();
        void Add(Produto produto);
        void Update(Produto produto);
        void Delete(int id);
    }
}
