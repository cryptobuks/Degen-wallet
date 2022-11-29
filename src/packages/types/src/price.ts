import {Asset} from '@magicwallet/chain-types';

export type Price = {
  price: number;
  change_24h: number;
};

export type AssetPrice = {
  asset: Asset;
  price: number;
  change_24h: number;
};
