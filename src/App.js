import { useReducer } from "react";
import {
  PhoneScreen,
  ExchangeScreen,
  OtherSelectionBox,
  SelectedBox,
} from "./components";
import {
  CurrencyContext,
  InitialState,
  reducers,
} from "./components/Providers/Provider";
import TopBar from "./components/TopBar/TopBar";

import "./App.css";
import "./styles/_variables.scss";

function App() {
  const [globalState, dispatch] = useReducer(reducers, InitialState);
  return (
    <CurrencyContext.Provider value={{ globalState, dispatch }}>
      <PhoneScreen>
        <TopBar />
        <ExchangeScreen />
        <SelectedBox />
        {globalState.toggleOtherCurrencies && <OtherSelectionBox />}
      </PhoneScreen>
    </CurrencyContext.Provider>
  );
}

export default App;
