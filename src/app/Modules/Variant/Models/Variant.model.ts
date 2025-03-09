import { Product } from '../../Product/Models/Product.model';
import { Size } from '../../Size/Models/Size.model';

export class Variant {
  public Id!: number;
  public Stock?: number;
  public ProductId?: number;
  public Product?: Product;
  public SizeId?: number;
  public Size?: Size;
}
