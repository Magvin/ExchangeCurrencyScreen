import React, { useContext, useEffect, useState } from "react";
import { CrossSmall, Search } from "@revolut/icons";
import CurrencyFlag from "react-currency-flags";
import styled from "styled-components";
import {
  revolutGrey0,
  revolutGrey10,
  revolutWhite,
} from "../../styles/variables";
import { CurrencyContext } from "../Providers/Provider";
import { swipeCurrencies } from "../../utils/swipeCurrencies";

const Wrapper = styled.div`
  background-color: ${revolutGrey0};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 98%;
  margin: 0 auto;
  margin-top: 10px;
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
  cursor: pointer;
`;

const InfoElement = styled.div`
  font-size: 24px;
  color: ${revolutWhite};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  line-height: 1.4;
  & > span {
    font-size: 14px;
    color: ${revolutGrey10};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h4`
  font-size: 17px;
  color: ${revolutWhite};
`;
const OtherSelectionBoxStyle = styled.div`
  top: -500px;
  position: relative;
  width: 100%;
`;

const OtherWrapper = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
  height: 400px;
  overflow: auto;
`;

const SelectionSpan = styled.div`
  padding: 0 15px;
  font-size: 16px;
  color: ${revolutGrey10};
  font-weight: 600;
`;

const OtherCountryList = styled.ul`
  padding: 0;
`;
const PocketList = styled.ul`
padding: 0;
overflow: auto,
max-height: 650px,
`;
const OtherSelectionBox = () => {
  const { globalState, dispatch } = useContext(CurrencyContext);
  const [countries, setCountries] = useState({});
  const {
    firstSelectedPocket,
    secondSelectedPocket,
    changePanelActive,
  } = globalState;

  useEffect(() => {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((res) => res.json())
      .then((json) => setCountries(json));
  }, []);

  const getPockets = () => {
    return globalState.pockets.map((pocket, index) => {
      return (
        <ListElement key={index}>
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
          <InfoElement>
            {pocket.name} · {pocket.value}
            <span>{pocket.fullName}</span>
          </InfoElement>
        </ListElement>
      );
    });
  };

  const getOtherCountries = () => {
    const checkIfExists = {};
    globalState.pockets.forEach((pocket) => {
      if (checkIfExists[pocket.name]) {
        return;
      } else {
        checkIfExists[pocket.name] = pocket.value;
      }
    });

    return Object.keys(countries).map((oneKey, i) => {
      if (checkIfExists[oneKey]) {
        return (
          <ListElement key={i} data-testid="test">
            <CurrencyFlag
              currency={oneKey}
              width={55}
              height={55}
              style={{
                borderRadius: "50%",
                backgroundPosition: "center",
                marginRight: "25px",
              }}
            />
            <InfoElement>
              {oneKey} · {checkIfExists[oneKey]}
              <span>{countries[oneKey]}</span>
            </InfoElement>
          </ListElement>
        );
      } else {
        return (
          <ListElement key={i}>
            <CurrencyFlag
              currency={oneKey}
              width={55}
              height={55}
              style={{
                borderRadius: "50%",
                backgroundPosition: "center",
                marginRight: "25px",
              }}
            />
            <InfoElement
              data-testid={`currencie-${oneKey}`}
              onClick={() => {
                swipeCurrencies(
                  { name: oneKey, value: "0.00" },
                  firstSelectedPocket,
                  secondSelectedPocket,
                  changePanelActive,
                  dispatch
                );
                dispatch({
                  type: "TOGGLE_CHANGE_PANEL",
                  payload: {
                    isCalledFromTop:
                      globalState.changePanelActive.isCalledFromTop,
                    active: false,
                  },
                });
                dispatch({
                  type: "TOGGLE_OTHER_CURRENCIES",
                });
              }}
            >
              {oneKey} · {"0.00"}
              <span>{countries[oneKey]}</span>
            </InfoElement>
          </ListElement>
        );
      }
    });
  };
  return (
    <OtherSelectionBoxStyle data-testid="other-selection-box">
      <Wrapper>
        <TitleWrapper>
          <CrossSmall
            data-testid="close-other-currencies"
            size="48"
            color="white"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch({
                type: "TOGGLE_OTHER_CURRENCIES",
              });
            }}
          />
          <Title>Choose currency</Title>
          <Search
            size="24"
            color="white"
            style={{
              cursor: "pointer",
              paddingRight: "10px",
            }}
          />
        </TitleWrapper>

        <div
          style={{
            paddingTop: "25px",
          }}
        >
          <SelectionSpan>Recently used</SelectionSpan>
          <PocketList>{getPockets()}</PocketList>
        </div>
        <OtherWrapper>
          <SelectionSpan>Other</SelectionSpan>
          <OtherCountryList>
            <div data-testid="other-currencies"> {getOtherCountries()}</div>
          </OtherCountryList>
        </OtherWrapper>
      </Wrapper>
    </OtherSelectionBoxStyle>
  );
};

export default OtherSelectionBox;
