export interface UserClaims {
  id: number;
  scope: string[];
}

export interface DecodedUserClaims{
  id: number;
  scope: string;
}

export interface IUserBalanceResponse{
  user_id: number;
  balance: number;
}

export interface IUserGachaQuotaResponse{
  user_id: number;
  quota: number;
}
