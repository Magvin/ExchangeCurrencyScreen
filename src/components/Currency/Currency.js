import React, { useContext } from "react";
import { CurrencyContext } from "../Providers/Provider";
import {
  dispatchActiveInput,
  validateCurrency,
  toggleChangePanel,
} from "../../utils/currencyUtils";

// styles
import { ShevronDown } from "@revolut/icons";

import {
  revolutBlack,
  revolutGrey0,
  revolutGrey10,
  revolutWhite,
} from "../../styles/variables";
import {
  CurrencyWrapper,
  CursorAndInput,
  CurrencyStyles,
  Balance,
} from "./styles";

const CurrencyScreen = ({ isTopCurrency, balance, currency, isActive }) => {
  const { globalState, dispatch } = useContext(CurrencyContext);
  const { activeRate } = globalState;

  const isNotValid =
    globalState.firstSelectedPocket.value < globalState.firstInput;

  const exceedsBalance = () => {
    if (isNotValid && isTopCurrency) {
      return (
        <span
          style={{
            float: "right",
            color: "#7A7A7C",
          }}
          data-testid="exceed-balance"
        >
          exceeds balance
        </span>
      );
    }
  };

  return (
    <CurrencyWrapper
      style={{
        backgroundColor: isTopCurrency ? revolutBlack : revolutGrey0,
      }}
    >
      <CurrencyStyles data-testid="currency">
        <div>
          <span className="currency">{currency}</span>
          <ShevronDown
            size="32"
            data-testid="shevron-down"
            onClick={() => {
              toggleChangePanel(isTopCurrency, globalState, dispatch);
            }}
            style={{
              cursor: "pointer",
            }}
          />
        </div>
        <Balance>Balance: {balance}</Balance>
      </CurrencyStyles>
      <div
        style={isNotValid ? { marginBottom: "36px" } : { marginBottom: "55px" }}
      >
        <CursorAndInput>
          <input
            data-testid="currency-input"
            type="number"
            placeholder="0"
            style={
              isNotValid && isTopCurrency
                ? { color: revolutGrey10 }
                : { color: revolutWhite }
            }
            value={
              isTopCurrency ? globalState.firstInput : globalState.secondInput
            }
            onChange={(e) =>
              validateCurrency(
                e.target.value,
                isTopCurrency,
                activeRate,
                dispatch
              )
            }
            onClick={() => {
              dispatchActiveInput(isTopCurrency, dispatch);
            }}
          />
          {isActive === "primary" && isTopCurrency ? (
            <i data-testid="blinking-line-primary"></i>
          ) : isActive === "secondary" && !isTopCurrency ? (
            <i data-testid="blinking-line-secondary"></i>
          ) : null}
          {exceedsBalance()}
        </CursorAndInput>
      </div>
    </CurrencyWrapper>
  );
};

export default CurrencyScreen;
