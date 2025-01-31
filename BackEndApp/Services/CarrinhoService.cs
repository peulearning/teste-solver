using BackendApp.Models;
using BackendApp.Repositories;
using BackendApp.Data;

namespace BackendApp.Services
{
    public class CarrinhoService : ICarrinhoService
    {
        private readonly AppDbContext _context;  // Adicione esta linha para declarar _context

        public CarrinhoService(AppDbContext context)  // Corrigido o nome do parâmetro
        {
            _context = context;
        }

        public Carrinho GetCarrinhoById(int id)
        {
            return _context.Carrinhos.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Carrinho> GetAllCarrinhos()
        {
            return _context.Carrinhos.ToList();
        }

        public void AddCarrinho(Carrinho carrinho)
        {
            _context.Carrinhos.Add(carrinho);
            _context.SaveChanges();
        }

        public void UpdateCarrinho(Carrinho carrinho)
        {
            _context.Carrinhos.Update(carrinho);
            _context.SaveChanges();
        }

        public void DeleteCarrinho(int id)
        {
            var carrinho = _context.Carrinhos.FirstOrDefault(c => c.Id == id);
            if (carrinho != null)
            {
                _context.Carrinhos.Remove(carrinho);
                _context.SaveChanges();
            }
        }
    }
}