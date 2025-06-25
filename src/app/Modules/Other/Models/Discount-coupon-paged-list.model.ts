import { ResponseMessages } from '../Interface/ResponseMessages.Interface';
import { IDiscountCoupon } from '../Interface/DiscountCoupon.interface';
export class DiscountCouponPagedListVM extends ResponseMessages {
    Items: IDiscountCoupon[];
    TotalItems: number;
    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0
    }
}