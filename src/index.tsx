import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import {
  WalletWidgetProvider,
  initWalletWidget,
} from "@initia/react-wallet-widget";
import Axios from "axios";
const axios = Axios.create({
  timeout: 100000,
});
const { data: layer } = await axios.get(
  "https://omni-api.mahalo-2.initia.xyz/v1/registry/chains/minimove-2"
);
const initiaWalletWidget = initWalletWidget({ layer });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <WalletWidgetProvider widget={initiaWalletWidget}>
    <App />
  </WalletWidgetProvider>
);
