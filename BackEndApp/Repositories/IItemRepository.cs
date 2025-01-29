using BackendApp.Models;
namespace BackendApp.Repositories
{
    public interface IItemRepository
    {
        Item GetById(int id);
        IEnumerable<Item> GetAll();
        void Add(Item item);
        void Update(Item item);
        void Delete(int id);
    }
}
