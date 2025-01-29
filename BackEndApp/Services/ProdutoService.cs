using BackendApp.Models;
using BackendApp.Repositories;

namespace BackendApp.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;

        public ProdutoService(IProdutoRepository produtoRepository)
        {
            _produtoRepository = produtoRepository;
        }

        public Produto GetProduto(int id)
        {
            return _produtoRepository.GetById(id);
        }

        public IEnumerable<Produto> GetAllProdutos()
        {
            return _produtoRepository.GetAll();
        }

        public void AddProduto(Produto produto)
        {
            _produtoRepository.Add(produto);
        }

        public void UpdateProduto(Produto produto)
        {
            _produtoRepository.Update(produto);
        }

        public void DeleteProduto(int id)
        {
            _produtoRepository.Delete(id);
        }

        public Produto GetProdutoById(int id)
        {
            return _produtoRepository.GetById(id);
        }

    }
}