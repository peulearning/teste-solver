using BackendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly ApplicationDbContext _context;

        public ProdutoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Produto GetById(int id) => _context.Produtos.FirstOrDefault(p => p.UUID == id);

        public IEnumerable<Produto> GetAll() => _context.Produtos.ToList();

        public Produto Create(Produto produto)
        {
            _context.Produtos.Add(produto);
            _context.SaveChanges();
            return produto;
        }

        public Produto Update(Produto produto)
        {
            _context.Produtos.Update(produto);
            _context.SaveChanges();
            return produto;
        }

        public bool Delete(int id)
        {
            var produto = GetById(id);
            if (produto == null)
                return false;
            _context.Produtos.Remove(produto);
            _context.SaveChanges();
            return true;
        }
    }
}
