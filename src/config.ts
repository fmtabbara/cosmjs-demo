import { GasPrice, makeCosmoshubPath } from "@cosmjs/stargate";

export interface Options {
  readonly httpUrl: string;
  readonly networkId: string;
  readonly feeToken: string;
  readonly bech32prefix: string;
  readonly fees: {
    upload: number;
    init: number;
    exec: number;
  };
  readonly gasPrice: GasPrice;
}

export const nyxOptions: Options = {
  httpUrl: "https://qwerty-validator.qa.nymte.ch",
  networkId: "nymnet",
  bech32prefix: "n",
  feeToken: "unym",
  fees: {
    upload: 2500000,
    init: 1000000,
    exec: 500000,
  },
  gasPrice: GasPrice.fromString("0.25unym"),
};
