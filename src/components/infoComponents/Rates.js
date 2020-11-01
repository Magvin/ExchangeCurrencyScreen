import React, { useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import { ArrowRates } from "@revolut/icons";
import { revolutBlue } from "../../styles/variables";
import { CurrencyContext } from "../Providers/Provider";
const WrapperRates = styled.div`
  position: relative;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -14px);
  background: white;
  color: ${revolutBlue};
  font-weight: 500;
  padding: 8px;
  border-radius: 15px;
  font-size: 13px;
  display: flex;
  width: fit-content;
`;
const Rates = () => {
  const { globalState, dispatch } = useContext(CurrencyContext);
  const { firstSelectedPocket, secondSelectedPocket, activeRate } = globalState;
  const fetchIndex = useCallback(() => {
    fetch(
      `https://api.exchangerate.host/latest?base=${firstSelectedPocket.name}`
    )
      .then((res) => res.json())
      .then((json) => {
        Object.keys(json.rates).forEach((item) => {
          if (item === secondSelectedPocket.name) {
            dispatch({
              type: "SET_ACTIVE_RATE",
              payload: json.rates[item],
            });
          }
        });
      });
  }, [dispatch, firstSelectedPocket.name, secondSelectedPocket.name]);

  useEffect(() => {
    fetchIndex();
    const interval = setInterval(() => {
      fetchIndex();
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchIndex]);

  return (
    <WrapperRates>
      <ArrowRates
        color="primary"
        size="16"
        style={{
          marginRight: "5px",
        }}
      />
      <span data-testid="rates">
        {firstSelectedPocket.name} 1 = {secondSelectedPocket.name} {activeRate}
      </span>
    </WrapperRates>
  );
};

export default Rates;
