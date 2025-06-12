export interface IOrderDetail {
    Id: number;
    OrderNumber: number;
    Total: number;
    Subtotal: number;
    DiscountCouponPercentage: number;
    DiscountCoupon?: number,
    DiscountCouponId?: number,
    DiscountPaymentPercentage: number;
    DiscountPayment?: number,
    DateCreated: Date;
    OrderStatus?: string;
    OrderStatusId?: number;
    PaymentMethod?: string;
    PaymentMethodId?: number;
    ShippingMethod?: string;
    ShippingMethodId?: number;
    ShippingCost?: number;
    CustomerName: string;
    Details?: OrderItem[];
    CartId: number;
}

interface OrderItem {
    Id: number;
    Name: string;
    Size: string;
    UnitPrice: number;
    TotalPrice: number;
    Quantity: number;
}
