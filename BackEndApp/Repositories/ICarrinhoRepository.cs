using BackendApp.Models;
using BackendApp.Repositories;

namespace BackendApp.Repositories
{
    public interface ICarrinhoRepository
    {
        Carrinho GetById(int id);
        IEnumerable<Carrinho> GetAll();
        void Add(Carrinho carrinho);
        void Update(Carrinho carrinho);
        void Delete(int id);    
    }
}
