import { Product } from './Product.model';

export class Category {
  public Id?: number;
  public Name!: string;
  public Image!: string;
  public Products?: Product[];
  public IsActive!: boolean;
}
