import { Category } from './Category.model';
import { Variant } from './Variant.model';

export class Product {
  public Id!: number | null;
  public Name!: string;
  public Price!: number;
  public Cost!: number;
  public Discount!: number;
  public Description!: string;
  public IsActive!: boolean;
  public IsPromotional!: boolean;
  public CategoryId!: number;
  public Category?: Category;
  public DateCreated!: Date;
  public DateUpdated!: Date;
  public Variants?: Variant[];
  public Images?: string[];
}
