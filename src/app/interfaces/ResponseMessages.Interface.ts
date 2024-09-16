export interface ResponseMessages {
  HasErrors: boolean;
  ErrorMessages: string[];
  HasWarnings: boolean;
  WarningMessages: string[];
  HasSuccess: boolean;
  SuccessMessages: string[];
}
