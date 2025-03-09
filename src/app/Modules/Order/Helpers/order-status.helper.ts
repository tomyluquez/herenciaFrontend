import { OrderStatusEnum } from "../Enums/order-status-enum"

export const getOrderStatusClassById = (id: number): string => {
    switch (id) {
        case OrderStatusEnum.Canceled:
            return "canceled"
        case OrderStatusEnum.Delivered:
            return "delivered"
        case OrderStatusEnum.Pending:
            return "pending"
        case OrderStatusEnum.Prepared:
            return "prepared"
        case OrderStatusEnum.Preparation:
            return "preparation"
        default:
            return ""
    }
}

export const getOrderStatusNameById = (id: number): string => {
    switch (id) {
        case OrderStatusEnum.Canceled:
            return "Cancelado"
        case OrderStatusEnum.Delivered:
            return "Entregado"
        case OrderStatusEnum.Pending:
            return "Pendiente"
        case OrderStatusEnum.Prepared:
            return "Preparado"
        case OrderStatusEnum.Preparation:
            return "En preparación"
        default:
            return ""
    }
}