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
    globalState.firstSelectedPocket.value < globalState.firstInput ||
    !globalState.firstInput.length ||
    globalState.firstInput === "0";

  return (
    <Wrapper data-testid="phone-screen">
      {children}
      {!globalState.changePanelActive.active &&
        !globalState.toggleOtherCurrencies && (
          <Button
            data-testid="phone-screen-exchange-button"
            disabled={isNotValid}
            style={
              isNotValid
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
