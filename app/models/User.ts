import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_bot?: boolean;
  language_code?: string;
  chat_id?: number;

  wallet?: {
    publicKey?: string;
    privateKey?: string;
  };

  bundled_wallets?: {
    publicKey: string;
    privateKey: string;
  }[];

  bundled_wallet_buy_amount?: number[];

  rpc_provider?: {
    name: string;
    url: string;
  };

  volume_tracking?: {
    enabled: boolean;
    tokens: {
      mint: string;
      volThresh: number;
      priceThresh: number;
      interval: number;
      lastSnapshot: {
        price: number;
        volume: number;
      };
    }[];
  };

  temp_input?: object;

  referral?: {
    code?: string;
    referredBy?: string;
    referrals: number[];
    earnings: number;
  };

  subscribed?: boolean;
  subscriptionDate?: Date;
  subscriptionExpiresAt?: Date;
}

const UserSchema: Schema = new Schema({
  telegram_id: { type: Number, required: true, unique: true },
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  is_bot: { type: Boolean, default: false },
  language_code: { type: String },
  chat_id: { type: Number },

  wallet: {
    publicKey: { type: String },
    privateKey: { type: String },
  },

  bundled_wallets: [
    {
      publicKey: { type: String },
      privateKey: { type: String },
    },
  ],

  bundled_wallet_buy_amount: [Number],

  rpc_provider: {
    name: { type: String, default: "Mainnet Beta" },
    url: { type: String, default: "https://api.mainnet-beta.solana.com" },
  },

  volume_tracking: {
    enabled: { type: Boolean, default: true },
    tokens: [
      {
        mint: { type: String },
        volThresh: { type: Number, default: 50 },
        priceThresh: { type: Number, default: 10 },
        interval: { type: Number, default: 5 },
        lastSnapshot: {
          price: { type: Number, default: 0 },
          volume: { type: Number, default: 0 },
        },
      },
    ],
  },

  temp_input: {
    type: Object,
    default: null,
  },

  referral: {
    code: { type: String },
    referredBy: { type: String },
    referrals: { type: [Number], default: [] },
    earnings: { type: Number, default: 0 },
  },

  subscribed: { type: Boolean, default: false },
  subscriptionDate: { type: Date, default: null },
  subscriptionExpiresAt: { type: Date, default: null },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
