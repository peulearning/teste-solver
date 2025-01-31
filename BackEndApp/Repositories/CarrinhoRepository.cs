using BackendApp.Data;
using BackendApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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
            return _context.Carrinhos.Include(c => c.ItensCarrinho)
                                     .FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Carrinho> GetAll()
        {
            return _context.Carrinhos.Include(c => c.ItensCarrinho).ToList();
        }

        public void Add(Carrinho carrinho)
        {
            _context.Carrinhos.Add(carrinho);
            _context.SaveChanges();
        }

        public void Update(Carrinho carrinho)
        {
            _context.Carrinhos.Update(carrinho);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var carrinho = _context.Carrinhos.Find(id);
            if (carrinho != null)
            {
                _context.Carrinhos.Remove(carrinho);
                _context.SaveChanges();
            }
        }
    }
}
