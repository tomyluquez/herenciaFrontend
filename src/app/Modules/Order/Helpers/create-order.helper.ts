import { IOrderDetail } from "../Interface/order-detail.interface";
import { ICartItemsVM } from "../../Cart/Interfaces/Cart.interface";
import { generateNewOrderNumber } from "./generate-order-number.helper";

export const createOrderHelper = (orderForm: any, cartId: number): IOrderDetail => {
    return {
        Id: 0,
        OrderNumber: generateNewOrderNumber(),
        Total: orderForm.total,
        Subtotal: orderForm.subtotal,
        DiscountCouponTotal: orderForm.discountCoupon || 0,
        DiscountCouponPercentage: orderForm.discountCouponPercentage || 0,
        DiscountCouponId: orderForm.discountCouponId || null,
        DiscountPaymentTotal: orderForm.discountPayment || 0,
        DiscountPaymentPercentage: Number(orderForm.discountPaymentPercentage) || 0,
        DateCreated: new Date(),
        OrderStatusId: 1,
        PromotionId: null,
        PaymentMethodId: Number(orderForm.paymentMethodId),
        ShippingMethodId: Number(orderForm.shippingMethodId),
        CustomerName: orderForm.customerName,
        ShippingCost: orderForm.shippingCost,
        CartId: cartId,
        Details: orderForm.items.map((i: ICartItemsVM) => {
            return {
                Id: i.Id,
                Name: i.ProductName,
                SizeId: i.SizeId,
                SizeName: i.SizeName,
                UnitPrice: (i.Price / i.Quantity),
                TotalPrice: i.Price,
                Quantity: i.Quantity,
                VariantId: i.VariantId
            }
        })
    }
}