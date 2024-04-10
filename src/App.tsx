import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { useAddress, useWallet } from "@initia/react-wallet-widget";
import Axios from "axios";
import { useState } from "react";

export const App = () => {
  const address = useAddress();
  const { onboard, view, requestTx } = useWallet();
  const [sending, setSending] = useState(false);

  if (address) {
    const send = async () => {
      setSending(true);
      const axios = Axios.create({
        timeout: 100000,
      });

      const msgs = [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: MsgSend.fromPartial({
            fromAddress: address,
            toAddress: address,
            amount: [
              {
                amount: "1",
                denom:
                  "l2/2588fd87a8e081f6a557f43ff14f05dddf5e34cb27afcefd6eaf81f1daea30d0",
              },
            ],
          }),
        },
      ];

      const txhash = await requestTx({ messages: msgs });
      console.log(txhash);
      // polling tx
      while (true) {
        const response = await axios
          .get(
            `https://lcd.minimove-2.initia.xyz/cosmos/tx/v1beta1/txs/${txhash}`
          )
          .catch(() => undefined);
        if (response) {
          setSending(false);
          console.log(response.data);
          console.log("tx end");
          break;
        }
      }
    };

    return (
      <>
        <button onClick={view}>{address}</button>
        <button onClick={send} disabled={sending}>
          Send
        </button>
      </>
    );
  }

  return <button onClick={onboard}>Connect</button>;
};
