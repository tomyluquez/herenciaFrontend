
export interface IUserProfile {
    Id: number;
    Name: string;
    Image?: string | null;
    Mail: string;
    Phone: number;
    Addres: string;
    DateCreated: Date;
    Orders: IOrderUser[];
}

export interface IOrderUser {
    Id: number;
    OrderNumber: number;
    DateCreated: Date;
    OrderStatusId: number;
}