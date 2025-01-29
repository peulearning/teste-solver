using BackendApp.Models;
namespace BackendApp.Services
{
    public interface IItemService
    {
        Item GetItem(int id);
        IEnumerable<Item> GetAllItens();
        void AddItem(ItemDTO itemDTO); // Certifique-se de que isso está correto
        void UpdateItem(Item item);
        void DeleteItem(int id);
    }
}
