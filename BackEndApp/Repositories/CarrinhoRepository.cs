using BackendApp.Models;
using BackendApp.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Repositories
{
    public class CarrinhoRepository : ICarrinhoRepository
    {
        private readonly AppDbContext _context;

        public CarrinhoRepository(AppDbContext context)
        {
            _context = context;
        }

        public Carrinho GetById(int id)
        {
            return _context.ItensCarrinhos
                .Include(c => c.ItensCarrinho)  // Incluir itens do carrinho
                .FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Carrinho> GetAll()
        {
            return _context.ItensCarrinhos
                .Include(c => c.ItensCarrinho)  // Incluir itens do carrinho
                .ToList();
        }

        public void Add(Carrinho carrinho)
        {
            _context.ItensCarrinhos.Add(carrinho);
            _context.SaveChanges();
        }

        public void Update(Carrinho carrinho)
        {
            _context.ItensCarrinhos.Update(carrinho);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var carrinho = _context.ItensCarrinhos.Find(id);
            if (carrinho != null)
            {
                _context.ItensCarrinhos.Remove(carrinho);
                _context.SaveChanges();
            }
        }
    }
}
