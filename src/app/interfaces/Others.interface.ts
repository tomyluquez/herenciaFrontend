export interface ConfigurationAlert {
  primaryText: string;
  secondaryText?: string;
  type: 'error' | 'warning' | 'success' | 'info';
  duration?: number;
}

export interface ItemDataContainerCards {
  Id: number;
  Name: string;
  Image: string;
}
