import React, { useContext } from "react";
import { Currency, Swap, Rates } from "../index";
import { CurrencyContext } from "../Providers/Provider";

const ExchangeScreen = () => {
  const { globalState } = useContext(CurrencyContext);
  return (
    <div data-testid="exchange-screen">
      <Currency
        isTopCurrency
        balance={globalState.firstSelectedPocket.value}
        currency={globalState.firstSelectedPocket.name}
        isActive={globalState.selectedInput}
      />
      <Swap />
      <Rates />
      <Currency
        balance={globalState.secondSelectedPocket.value}
        currency={globalState.secondSelectedPocket.name}
        isActive={globalState.selectedInput}
      />
    </div>
  );
};

export default ExchangeScreen;
