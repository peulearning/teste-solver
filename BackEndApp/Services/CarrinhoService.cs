using BackendApp.Models;
using BackendApp.Repositories;

namespace BackendApp.Services
{
    public class CarrinhoService : ICarrinhoService
    {
        private readonly ICarrinhoRepository _carrinhoRepository;

        public CarrinhoService(ICarrinhoRepository carrinhoRepository)
        {
            _carrinhoRepository = carrinhoRepository;
        }

        public Carrinho GetCarrinhoById(int id)
        {
            return _carrinhoRepository.GetById(id);
        }

        public IEnumerable<Carrinho> GetAllCarrinhos()
        {
            return _carrinhoRepository.GetAll();
        }

        public void AddCarrinho(Carrinho carrinho)
        {
            _carrinhoRepository.Add(carrinho);
        }

        public void UpdateCarrinho(Carrinho carrinho)
        {
            _carrinhoRepository.Update(carrinho);
        }

        public void DeleteCarrinho(int id)
        {
            _carrinhoRepository.Delete(id);
        }
    }
}
