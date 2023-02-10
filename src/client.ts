import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { nyxOptions, Options } from "./config";

export const connect = async (
  wallet: DirectSecp256k1HdWallet,
  options: Options
): Promise<SigningCosmWasmClient> => {
  const clientOptions = {
    prefix: options.bech32prefix,
    gasPrice: options.gasPrice,
  };
  return await SigningCosmWasmClient.connectWithSigner(
    options.httpUrl,
    wallet,
    clientOptions
  );
};

export const createWallet = async (mnemonic: string) => {
  return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: nyxOptions.bech32prefix,
  });
};
