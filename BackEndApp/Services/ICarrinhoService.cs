using BackendApp.Models;
namespace BackendApp.Services
{
    public interface ICarrinhoService
    {
        Carrinho GetCarrinhoById(int id);  
        IEnumerable<Carrinho> GetAllCarrinhos();
        void AddCarrinho(Carrinho carrinho);
        void UpdateCarrinho(Carrinho carrinho);
        void DeleteCarrinho(int id);
    }
}
