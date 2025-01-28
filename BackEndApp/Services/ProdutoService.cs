using BackendApp.DTOs;
using BackendApp.Models;
using BackendApp.Repositories;

namespace BackendApp.Services
{
    public class ProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;

        public ProdutoService(IProdutoRepository produtoRepository)
        {
            _produtoRepository = produtoRepository;
        }

        public IEnumerable<ProdutoDTO> GetAll()
        {
            return _produtoRepository.GetAll().Select(p => new ProdutoDTO { UUID = p.UUID, Name = p.Name });
        }

        public ProdutoDTO GetById(int id)
        {
            var produto = _produtoRepository.GetById(id);
            if (produto == null)
                return null;
            return new ProdutoDTO { UUID = produto.UUID, Name = produto.Name };
        }

        public ProdutoDTO Create(ProdutoDTO produtoDTO)
        {
            var produto = new Produto { Name = produtoDTO.Name };
            var createdProduto = _produtoRepository.Create(produto);
            return new ProdutoDTO { UUID = createdProduto.UUID, Name = createdProduto.Name };
        }

        public ProdutoDTO Update(int id, ProdutoDTO produtoDTO)
        {
            var produto = _produtoRepository.GetById(id);
            if (produto == null)
                return null;
            produto.Name = produtoDTO.Name;
            var updatedProduto = _produtoRepository.Update(produto);
            return new ProdutoDTO { UUID = updatedProduto.UUID, Name = updatedProduto.Name };
        }

        public bool Delete(int id)
        {
            return _produtoRepository.Delete(id);
        }
    }
}
