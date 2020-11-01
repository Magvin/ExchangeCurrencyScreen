import React, { useContext } from "react";
import CurrencyFlag from "react-currency-flags";
import styled from "styled-components";
import {
  revolutBlue,
  revolutGrey0,
  revolutWhite,
} from "../../styles/variables";
import { CurrencyContext } from "../Providers/Provider";
import CurrencyPlaceholder from "../../assets/images/currency-placeholder.png";
import { swipeCurrencies } from "../../utils/swipeCurrencies";

const SelectionWrapper = styled.div`
  background-color: ${revolutGrey0};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 94%;
  margin: 0 auto;
  animation-name: appear;
  animation-duration: 500ms;
  opacity: 1;
  text-align: left;
  @keyframes appear {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ListElement = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 15px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #2b2b2d;
  cursor: pointer;
`;

const SpanElement = styled.span`
  font-size: 26px;
  color: ${revolutBlue};
  cursor: pointer;
`;

const OtherCurrenciesImage = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 25px;
  background: ${revolutWhite};
  border-radius: 50%;
`;

const Title = styled.h4`
  font-size: 20px;
  padding-left: 20px;
  padding-top: 30px;
  color: #7a7a7c;
  font-weight: 500;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #2b2b2d;
  margin-bottom: 0;
  padding-bottom: 30px;
`;

const SelectedBox = () => {
  const { globalState, dispatch } = useContext(CurrencyContext);

  const getPockets = () => {
    return globalState.pockets.map((pocket, index) => {
      const {
        firstSelectedPocket,
        secondSelectedPocket,
        changePanelActive,
      } = globalState;
      return (
        <ListElement
          key={index}
          onClick={() =>
            swipeCurrencies(
              pocket,
              firstSelectedPocket,
              secondSelectedPocket,
              changePanelActive,
              dispatch
            )
          }
        >
          <CurrencyFlag
            currency={pocket.name}
            width={55}
            height={55}
            style={{
              borderRadius: "50%",
              backgroundPosition: "center",
              marginRight: "25px",
            }}
          />
          <SpanElement
            data-testid={`currencie-${pocket.name}`}
            onClick={() => {
              dispatch({
                type: "TOGGLE_CHANGE_PANEL",
                payload: {
                  active: false,
                  isCalledFromTop:
                    globalState.changePanelActive.isCalledFromTop,
                },
              });
            }}
          >
            {pocket.name} · {pocket.value}
          </SpanElement>
        </ListElement>
      );
    });
  };

  return globalState.changePanelActive.active ? (
    <>
      <SelectionWrapper>
        <Title>Choose currency:</Title>
        <div>
          <ul
            style={{
              padding: 0,
            }}
          >
            {getPockets()}
            <ListElement>
              <OtherCurrenciesImage
                src={CurrencyPlaceholder}
                alt="other currencies"
              />
              <SpanElement
                data-testid="toggle-other-panel"
                onClick={() => {
                  dispatch({
                    type: "TOGGLE_OTHER_CURRENCIES",
                  });
                  dispatch({
                    type: "TOGGLE_CHANGE_PANEL",
                    payload: {
                      active: false,
                      isCalledFromTop:
                        globalState.changePanelActive.isCalledFromTop,
                    },
                  });
                }}
              >
                Other
              </SpanElement>
            </ListElement>
          </ul>
        </div>
      </SelectionWrapper>
      <SelectionWrapper
        style={{
          textAlign: "center",
          padding: "15px 0",
          borderRadius: "15px",
        }}
      >
        <SpanElement
          onClick={() => {
            dispatch({
              type: "TOGGLE_CHANGE_PANEL",
              payload: {
                active: false,
                isCalledFromTop: globalState.changePanelActive.isCalledFromTop,
              },
            });
          }}
        >
          Cancel
        </SpanElement>
      </SelectionWrapper>
    </>
  ) : null;
};

export default SelectedBox;
