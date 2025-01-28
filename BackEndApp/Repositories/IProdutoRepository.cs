namespace BackendApp.Repositories
{
    public interface IProdutoRepository
    {
        Produto GetById(int id);
        IEnumerable<Produto> GetAll();
        Produto Create(Produto produto);
        Produto Update(Produto produto);
        bool Delete(int id);
    }
}
