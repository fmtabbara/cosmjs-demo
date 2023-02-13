import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { createWallet, connect } from "./client";
import { nyxOptions } from "./config";
import { createNymMixnetClient } from "@nymproject/sdk-commonjs";
import {
  ADDRESS,
  CONNECTION_STATUS,
  CONNECT_BUTTON,
  ERROR,
  MIXNET_ADDRESS,
  MIXNET_ADDRESS_INPUT,
  MNEMONIC_INPUT,
  SEND_ADDRESS_INPUT,
  SEND_AMOUNT_INPUT,
  SEND_BUTTON,
  START_NYM_BUTTON,
  TX,
  TX_HASH,
} from "./ui";

export const CONTRACT_ADDRESS =
  "n14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sjyvg3g";

CONNECT_BUTTON!.onclick = () => onConnect(MNEMONIC_INPUT.value);
SEND_BUTTON!.onclick = () =>
  onSend(
    SEND_ADDRESS_INPUT.value,
    SEND_AMOUNT_INPUT.value,
    MIXNET_ADDRESS_INPUT!.value
  );

START_NYM_BUTTON!.onclick = () => onConnectMixnetClient();

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
let nym: any;

const createMixnetClient = async (apiUrl: string) => {
  const nym = await createNymMixnetClient();
  await nym.client.start({
    nymApiUrl: apiUrl,
    clientId: "mixnet client",
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return nym;
};

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

const onSend = async (
  sendToAddress: string,
  sendAmount: string,
  recipient: string
) => {
  const sendAmountAsUnym = sendAmount + "000000";

  try {
    nym.client.send({
      payload: {
        message: [{ amount: sendAmountAsUnym, denom: "unym" }],
        mimeType: "text/plain",
      },
      recipient,
    });

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

const onConnectMixnetClient = async () => {
  const client = await createMixnetClient("https://validator.nymtech.net/api");
  const address = await client.client.selfAddress();
  MIXNET_ADDRESS!.innerText = address || "";
  client.events.subscribeToTextMessageReceivedEvent((e) => console.log(e));
  nym = client;
};
