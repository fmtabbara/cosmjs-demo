import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { createWallet, connect } from "./client";
import { nyxOptions } from "./config";
import {
  ADDRESS,
  CONNECTION_STATUS,
  CONNECT_BUTTON,
  ERROR,
  MNEMONIC_INPUT,
  SEND_ADDRESS_INPUT,
  SEND_AMOUNT_INPUT,
  SEND_BUTTON,
  TX,
  TX_HASH,
} from "./ui";

export const CONTRACT_ADDRESS =
  "n14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sjyvg3g";

CONNECT_BUTTON!.onclick = () => onConnect(MNEMONIC_INPUT.value);
SEND_BUTTON!.onclick = () =>
  onSend(SEND_ADDRESS_INPUT.value, SEND_AMOUNT_INPUT.value);

const upateConnectionStatus = (isConnected: boolean, cb?: () => void) => {
  CONNECTION_STATUS!.innerText = isConnected ? "True" : "False";
  cb?.();
};
const updateAddress = (address: string) => (ADDRESS!.innerText += address);
const setError = (e: any) => (ERROR!.innerText = e);
const clearInput = () => (MNEMONIC_INPUT.value = "");

const onSuccess = (txHash: string) => {
  TX_HASH!.innerText = txHash;
  TX!.classList.remove("hide");
};

let client: SigningCosmWasmClient;

const onConnect = async (mnemonic: string) => {
  let connected = false;
  let address = "";
  let error = "None";
  try {
    const wallet = await createWallet(mnemonic);
    const [account] = await wallet.getAccounts();
    const _client = await connect(wallet, nyxOptions);
    client = _client;
    address = account.address;
    connected = true;
  } catch (e) {
    connected = false;
    error = e as string;
  } finally {
    upateConnectionStatus(connected, () => updateAddress(address));
    clearInput();
    setError(error);
  }
};

const onSend = async (sendToAddress: string, sendAmount: string) => {
  const sendAmountAsUnym = sendAmount + "000000";

  try {
    const res = await client.sendTokens(
      ADDRESS!.innerText,
      sendToAddress,
      [{ amount: sendAmountAsUnym, denom: "unym" }],
      "auto"
    );
    onSuccess(res.transactionHash);
  } catch (e) {
    setError(e);
  } finally {
    SEND_ADDRESS_INPUT!.value = "";
    SEND_AMOUNT_INPUT!.value = "";
  }
};
