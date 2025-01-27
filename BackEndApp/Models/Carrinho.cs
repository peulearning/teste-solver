public class Carrinho
{
  public int UUID {get; set;}
  public String identificador {get; set;}
  public ICollection<ItemCarrinho> ItensCarrinho {get; set;}
}