using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Item> Itens { get; set; }
    public DbSet<Carrinho> Carrinhos { get; set; }
    public DbSet<ItemCarrinho> ItensCarrinho { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuração da chave composta de ItemCarrinho
        modelBuilder.Entity<ItemCarrinho>()
            .HasKey(ic => new { ic.carrinho_id, ic.item_id });

        base.OnModelCreating(modelBuilder);
    }
}
