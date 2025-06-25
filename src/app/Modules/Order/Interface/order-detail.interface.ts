export interface IOrderDetail {
    Id: number;
    OrderNumber: number;
    Total: number;
    Subtotal: number;
    DiscountCouponPercentage: number;
    DiscountCouponTotal?: number,
    DiscountCouponId?: number,
    DiscountCoupon?: string,
    DiscountPaymentPercentage: number;
    DiscountPaymentTotal?: number,
    DateCreated: Date;
    OrderStatus?: string;
    OrderStatusId?: number;
    PaymentMethod?: string;
    PaymentMethodId?: number;
    PromotionId?: number | null;
    ShippingMethod?: string;
    ShippingMethodId?: number;
    ShippingCost?: number;
    CustomerName: string;
    CustomerPhone?: number;
    CustomerEmail?: string;
    Details?: OrderItem[];
    CartId: number;
}

interface OrderItem {
    Id: number;
    Name: string;
    Size: string;
    SizeName: string;
    UnitPrice: number;
    TotalPrice: number;
    Quantity: number;
}
