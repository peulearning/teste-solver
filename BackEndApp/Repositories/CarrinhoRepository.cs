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
            return _context.Carrinhos  // Corrigido para Carrinhos
                .Include(c => c.ItensCarrinho)  // Incluir itens do carrinho
                .FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Carrinho> GetAll()
        {
            return _context.Carrinhos  // Corrigido para Carrinhos
                .Include(c => c.ItensCarrinho)  // Incluir itens do carrinho
                .ToList();
        }

        public void Add(Carrinho carrinho)
        {
            _context.Carrinhos.Add(carrinho);  // Corrigido para Carrinhos
            _context.SaveChanges();
        }

        public void Update(Carrinho carrinho)
        {
            _context.Carrinhos.Update(carrinho);  // Corrigido para Carrinhos
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var carrinho = _context.Carrinhos.Find(id);  // Corrigido para Carrinhos
            if (carrinho != null)
            {
                _context.Carrinhos.Remove(carrinho);  // Corrigido para Carrinhos
                _context.SaveChanges();
            }
        }
    }
}