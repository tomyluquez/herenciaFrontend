import { Injectable } from "@angular/core";
import { ResponseMessages } from "../Interface/ResponseMessages.Interface";
import { getOptionsEmailJSHelper, getTemplateEmailJSHelper } from "../Helpers/EmailJs.helper";
import emailjs from '@emailjs/browser';
import { environment } from "../../../../environment/environment";

@Injectable({
    providedIn: 'root',
})
export class EmailJSService {
    constructor() { }

    async sendEmailNewOrder(customerName: string, customerEmail: string, orderNumber: number): Promise<boolean> {
        try {
            const options = getOptionsEmailJSHelper();
            emailjs.init(options);

            const templateParams = getTemplateEmailJSHelper(customerName, customerEmail, orderNumber);

            try {
                const response = await emailjs.send(
                    environment.EMAILJS_SERVICE_ID!,
                    environment.EMAILJS_TEMPLATE_ID!,
                    templateParams,
                    options
                );
                console.log(response)
                return true;
            } catch (error) {
                console.error('Error al enviar email:', error);
                return false;
            }

        } catch (error) {
            console.error('Error en la preparación del envío:', error);
            return Promise.resolve(false);
        }
    }

    async sendEmailDeliveryOrder(customerName: string, customerEmail: string, orderNumber: number): Promise<boolean> {
        try {
            const options = getOptionsEmailJSHelper();
            emailjs.init(options);

            const templateParams = getTemplateEmailJSHelper(customerName, customerEmail, orderNumber);

            try {
                const response = await emailjs.send(
                    environment.EMAILJS_SERVICE_ID!,
                    environment.EMAILJS_TEMPLATE_ID_DELIVERY!,
                    templateParams,
                    options
                );
                return true;
            } catch (error) {
                console.error('Error al enviar email:', error);
                return false;
            }

        } catch (error) {
            console.error('Error en la preparación del envío:', error);
            return Promise.resolve(false);
        }
    }


}
