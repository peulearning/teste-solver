using BackendApp.Data;
using BackendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Repositories
{
     public class ItemRepository : IItemRepository
    {
        private readonly AppDbContext _context;

        public ItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public Item GetById(int id)
        {
            return _context.Itens.Include(i => i.Produto).FirstOrDefault(i => i.Id == id);
        }

        public IEnumerable<Item> GetAll()
        {
            return _context.Itens.Include(i => i.Produto).ToList();
        }

        public void Add(Item item)
        {
            _context.Itens.Add(item);
            _context.SaveChanges();
        }

        public void Update(Item item)
        {
            _context.Itens.Update(item);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var item = _context.Itens.Find(id);
            if (item != null)
            {
                _context.Itens.Remove(item);
                _context.SaveChanges();
            }
        }
    }
}
