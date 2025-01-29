using BackendApp.Models;
using BackendApp.Repositories;

namespace BackendApp.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IProdutoService _produtoService;

        public ItemService(IItemRepository itemRepository, IProdutoService produtoService)
        {
            _itemRepository = itemRepository;
            _produtoService = produtoService;
        }

        public Item GetItem(int id)
        {
            return _itemRepository.GetById(id);
        }

        public IEnumerable<Item> GetAllItens()
        {
            return _itemRepository.GetAll();
        }

        public void AddItem(ItemDTO itemDTO) // Certifique-se de que a assinatura está correta
        {
            // Verifica se o ProdutoId existe
            var produto = _produtoService.GetProdutoById(itemDTO.ProdutoId);
            if (produto == null)
            {
                throw new Exception("Produto não encontrado.");
            }

            var item = new Item
            {
                ProdutoId = itemDTO.ProdutoId,
                Quantidade = itemDTO.Quantidade,
                UnidadeMedida = itemDTO.UnidadeMedida
            };

            _itemRepository.Add(item);
        }

        public void UpdateItem(Item item)
        {
            _itemRepository.Update(item);
        }

        public void DeleteItem(int id)
        {
            _itemRepository.Delete(id);
        }
    }
}