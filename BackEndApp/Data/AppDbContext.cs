using Microsoft.EntityFrameworkCore;
using BackendApp.Models;

namespace BackendApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Item> Itens { get; set; }
        public DbSet<Carrinho> Carrinhos {get; set;}
        public DbSet<ItemCarrinho> ItensCarrinhos { get; set; } 

           protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>()
                .HasOne(i => i.Produto)
                .WithMany(p => p.Itens)
                .HasForeignKey(i => i.ProdutoId);

            modelBuilder.Entity<ItemCarrinho>()
            .HasOne(ic => ic.Carrinho)
            .WithMany(c => c.ItensCarrinho)
            .HasForeignKey(ic => ic.CarrinhoId);

            modelBuilder.Entity<ItemCarrinho>()
                .HasOne(ic => ic.Item)
                .WithMany()
                .HasForeignKey(ic => ic.ItemId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
