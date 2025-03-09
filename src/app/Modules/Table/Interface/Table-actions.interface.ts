export interface TableActions {
    Icon: string;
    Handler: (id: number, index?: number) => void;
}

export interface GenericItemTable {
    Id: number;
    [key: string]: any;
}

export interface HeadersTable {
    Name: string;
    Value: string | number;
    ShowTotal?: boolean;
    Type: number;
}