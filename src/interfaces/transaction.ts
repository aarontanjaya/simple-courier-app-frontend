export interface ITransaction {
  amount: number;
  description: string;
  user_id: string;
  payment_id: string;
  id: number;
}

export interface ITopUpRequest {
  amount: number;
}
