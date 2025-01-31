using BackendApp.Models;
using BackendApp.Repositories;
using System;
using System.Collections.Generic;

namespace BackendApp.Services
{
    public class CarrinhoService : ICarrinhoService
    {
        private readonly ICarrinhoRepository _carrinhoRepository;
        private readonly IItemService _itemService;

        public CarrinhoService(ICarrinhoRepository carrinhoRepository, IItemService itemService)
        {
            _carrinhoRepository = carrinhoRepository;
            _itemService = itemService;
        }

        public Carrinho GetCarrinho(int id)
        {
            return _carrinhoRepository.GetById(id);
        }

        public IEnumerable<Carrinho> GetAllCarrinhos()
        {
            return _carrinhoRepository.GetAll();
        }

        public void AddCarrinho(Carrinho carrinho)
        {
            if (carrinho == null)
            {
                throw new ArgumentNullException(nameof(carrinho), "O carrinho não pode ser nulo.");
            }

            foreach (var item in carrinho.ItensCarrinho)
            {
                var itemExistente = _itemService.GetItem(item.Id);
                if (itemExistente == null)
                {
                    throw new Exception($"O item com ID {item.Id} não foi encontrado.");
                }
            }

            _carrinhoRepository.Add(carrinho);
        }

        public void UpdateCarrinho(Carrinho carrinho)
        {
            if (carrinho == null)
            {
                throw new ArgumentNullException(nameof(carrinho), "O carrinho não pode ser nulo.");
            }

            var carrinhoExistente = _carrinhoRepository.GetById(carrinho.Id);
            if (carrinhoExistente == null)
            {
                throw new Exception($"O carrinho com ID {carrinho.Id} não foi encontrado.");
            }

            _carrinhoRepository.Update(carrinho);
        }

        public void DeleteCarrinho(int id)
        {
            var carrinho = _carrinhoRepository.GetById(id);
            if (carrinho == null)
            {
                throw new Exception($"O carrinho com ID {id} não foi encontrado.");
            }

            _carrinhoRepository.Delete(id);
        }
    }
}
