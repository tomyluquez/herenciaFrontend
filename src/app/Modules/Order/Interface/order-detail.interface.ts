export interface IOrderDetail {
    Id: number;
    OrderNumber: number;
    Total: number;
    Subtotal: number;
    Discount: number;
    DiscountCoupon?: string,
    DateCreated: Date;
    OrderStatus: string;
    PaymentMethod?: string;
    ShippingMethod?: string;
    CustomerName: string;
    Details?: OrderItem[];
}

interface OrderItem {
    Id: number;
    Name: string;
    Size: string;
    UnitPrice: number;
    TotalPrice: number;
    Quantity: number;
}
