export interface ConfigurationAlert {
  primaryText: string;
  secondaryText?: string;
  type: 'error' | 'warning' | 'success' | 'info';
  duration?: number;
}
export interface IItemDataContainerCards {
  Id: number;
  Name: string;
  Image: string;
}

export interface ChangeStatus {
  Id: number;
  Status: number;
}

