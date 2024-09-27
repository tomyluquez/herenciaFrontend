import { Product } from './Product.model';
import { Size } from './Size.model';

export class Variant {
  public Id!: number;
  public Stock?: number;
  public ProductId?: number;
  public Product?: Product;
  public SizeId?: number;
  public Size?: Size;
}
