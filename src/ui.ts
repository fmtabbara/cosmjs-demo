// UI
const CONNECT_BUTTON = document.getElementById("connect-button");
const SEND_BUTTON = document.getElementById("send-button");
const CONNECTION_STATUS = document.getElementById("connection-status");
const ADDRESS = document.getElementById("account-address");
const ERROR = document.getElementById("error");
const TX = document.querySelector(".tx");
const TX_HASH = document.getElementById("tx-hash");
const MNEMONIC_INPUT = document.getElementById(
  "mnemonic-input"
) as HTMLInputElement;
const SEND_ADDRESS_INPUT = document.getElementById(
  "send-address"
) as HTMLInputElement;

const SEND_AMOUNT_INPUT = document.getElementById(
  "send-amount"
) as HTMLInputElement;

export {
  CONNECT_BUTTON,
  CONNECTION_STATUS,
  SEND_BUTTON,
  ADDRESS,
  ERROR,
  TX,
  TX_HASH,
  MNEMONIC_INPUT,
  SEND_AMOUNT_INPUT,
  SEND_ADDRESS_INPUT,
};
