// types/wallet.ts
export type WalletType = "trading" | "subscription" | "token_creation" | "referral" | "bundling";

export interface Wallet {
  _id?: string;
  type: WalletType;
  address: string;
}
