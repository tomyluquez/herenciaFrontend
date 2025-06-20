import { OptionsEmailJS } from "../Interface/EmailJSOptions.interface"
import { environment } from './../../../../environment/environment';

export const getOptionsEmailJSHelper = (): OptionsEmailJS => {
    return {
        publicKey: environment.EMAILJS_PUBLIC_KEY!,
        blockHeadless: true,
        limitRate: {
            throttle: 10000,
        },
    }
}

export const getTemplateEmailJSHelper = (customerName: string, customerEmail: string, orderNumber: number): any => {
    return {
        name: customerName,
        orderNumber: orderNumber.toString(),
        orderStatusLink: `${environment.frontendUrl}/Order/order-status/${orderNumber}`,
        email: customerEmail
    }
}