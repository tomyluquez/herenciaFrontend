import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IPaymentsMethodsVM, IShippingMethodsVM } from "../Interfaces/Checkout.interface";

export class CheckoutInfoVM extends ResponseMessages {
    PaymentsMethods!: IPaymentsMethodsVM[];
    ShippingMethods!: IShippingMethodsVM[];
    SubtotalToPaid!: number;
    MinTotalToFreeShipping!: number;
}