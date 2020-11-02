import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles";
import { CurrencyContext } from "../Providers/Provider";
import { revolutBlue, revolutWhite } from "../../styles/variables";
import styled from "styled-components";
const Button = styled.button`
  width: 50%;
  background-color: ${revolutBlue};
  border: none;
  padding: 15px 0px;
  border-radius: 8px;
  margin-top: 20px;
  color: ${revolutWhite};
  font-weight: 600;
  cursor: pointer;
`;

const PhoneScreen = ({ children }) => {
  const { globalState, dispatch } = useContext(CurrencyContext);
  const isNotValid =
    parseFloat(globalState.firstSelectedPocket.value) <
      parseFloat(globalState.firstInput) ||
    !globalState.firstInput.length ||
    globalState.firstInput === "0";
  const isValidBottom =
    parseFloat(globalState.secondInput / globalState.activeRate) <
      parseFloat(globalState.firstSelectedPocket.value) &&
    globalState.secondInput.length &&
    globalState.secondInput !== "0";
  console.log(isValidBottom, isNotValid);
  console.log(globalState);
  return (
    <Wrapper data-testid="phone-screen">
      {children}
      {!globalState.changePanelActive.active &&
        !globalState.toggleOtherCurrencies && (
          <Button
            data-testid="phone-screen-exchange-button"
            disabled={isNotValid && !isValidBottom}
            style={
              isNotValid && !isValidBottom
                ? {
                    filter: "brightness(0.5)",
                  }
                : null
            }
            onClick={() => {
              dispatch({
                type: "EXCHANGE_CURRENCY",
                payload: {
                  firstSelectedPocket: {
                    value: globalState.firstInput,
                    name: globalState.firstSelectedPocket.name,
                  },
                  secondSelectedPocket: {
                    value: globalState.secondInput,
                    name: globalState.secondSelectedPocket.name,
                  },
                },
              });
              dispatch({
                type: "SET_FIRST_VALUE",
                payload: "",
              });
              dispatch({
                type: "SET_SECOND_VALUE",
                payload: "",
              });
            }}
          >
            Exchange
          </Button>
        )}
    </Wrapper>
  );
};

PhoneScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PhoneScreen;
