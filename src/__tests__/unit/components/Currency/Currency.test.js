import { render, fireEvent } from "@testing-library/react";
import CurrencyScreen from "../../../../components/Currency/Currency";
import {
  CurrencyContext,
  InitialState,
} from "../../../../components/Providers/Provider";

describe("ExchangeScreen", () => {
  const mockedUserDispatch = jest.fn();
  describe("TopCurrency", () => {
    it("should find primary blinking line on active top currency", () => {
      const { getByTestId } = render(
        <CurrencyContext.Provider
          value={{
            globalState: InitialState,
            dispatch: mockedUserDispatch,
          }}
        >
          <CurrencyScreen
            balance="1.00"
            currency="GBP"
            isTopCurrency
            isActive={InitialState.selectedInput}
          />
        </CurrencyContext.Provider>
      );
      expect(getByTestId("blinking-line-primary")).toBeTruthy();
    });
    it("should fire event on input Change and validate input entry", () => {
      const { getByTestId } = render(
        <CurrencyContext.Provider
          value={{
            globalState: InitialState,
            dispatch: mockedUserDispatch,
          }}
        >
          <CurrencyScreen
            balance="10.01"
            currency="GBP"
            isTopCurrency
            isActive={InitialState.selectedInput}
          />
        </CurrencyContext.Provider>
      );
      fireEvent.change(getByTestId("currency-input"), {
        target: { value: "string" },
      });
      // Should not change value to NaN values
      expect(getByTestId("currency-input").value).toBe("");
      fireEvent.change(getByTestId("currency-input"), {
        target: { value: "10.01" },
      });
      // Should fire dispatch action
      expect(mockedUserDispatch).toHaveBeenCalled();
      fireEvent.change(getByTestId("currency-input"), {
        target: { value: " " },
      });
      // Should change value to empty
      expect(getByTestId("currency-input").value.length).toBe(0);
    });

    it("should fire dispatch event on click", () => {
      const { getByTestId } = render(
        <CurrencyContext.Provider
          value={{
            globalState: InitialState,
            dispatch: mockedUserDispatch,
          }}
        >
          <CurrencyScreen
            balance="1.00"
            currency="GBP"
            isTopCurrency
            isActive={InitialState.selectedInput}
          />
        </CurrencyContext.Provider>
      );

      fireEvent.click(getByTestId("currency-input"));
      expect(mockedUserDispatch).toBeCalled();
    });
    it("should have a text exceeds balance", () => {
      const globalState = {
        ...InitialState,
        firstInput: "10.01",
      };
      const { getByTestId } = render(
        <CurrencyContext.Provider
          value={{
            globalState: globalState,
            dispatch: mockedUserDispatch,
          }}
        >
          <CurrencyScreen
            balance="10.00"
            currency="GBP"
            isTopCurrency
            isActive={InitialState.selectedInput}
          />
        </CurrencyContext.Provider>
      );
      expect(getByTestId("exceed-balance").textContent).toBe("exceeds balance");
    });
    it("should fire ToggleChangePanel on ShevronDown icon onClick event", () => {
      const { getByTestId } = render(
        <CurrencyContext.Provider
          value={{
            globalState: InitialState,
            dispatch: mockedUserDispatch,
          }}
        >
          <CurrencyScreen
            balance="10.00"
            currency="GBP"
            isTopCurrency
            isActive={InitialState.selectedInput}
          />
        </CurrencyContext.Provider>
      );

      fireEvent.click(getByTestId("shevron-down"));
      expect(mockedUserDispatch).toHaveBeenCalledTimes(1);
      expect(mockedUserDispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          active: true,
          isCalledFromTop: true,
        },
        type: "TOGGLE_CHANGE_PANEL",
      });
    });
  });
  describe("BottomCurrency", () => {
    const globalTestState = {
      ...InitialState,
      selectedInput: "secondary",
    };
    it("should find secondary blinking line on active bottom currency", () => {
      const { getByTestId } = render(
        <CurrencyContext.Provider
          value={{
            globalState: globalTestState,
            dispatch: mockedUserDispatch,
          }}
        >
          <CurrencyScreen
            balance="1.00"
            currency="USD"
            isActive={globalTestState.selectedInput}
          />
        </CurrencyContext.Provider>
      );
      expect(getByTestId("blinking-line-secondary")).toBeTruthy();
    });
    it("should fire dispatch event on click", () => {
      const { getByTestId } = render(
        <CurrencyContext.Provider
          value={{
            globalState: InitialState,
            dispatch: mockedUserDispatch,
          }}
        >
          <CurrencyScreen
            balance="1.00"
            currency="GBP"
            isActive={InitialState.selectedInput}
          />
        </CurrencyContext.Provider>
      );

      fireEvent.click(getByTestId("currency-input"));
      expect(mockedUserDispatch).toBeCalled();
    });
  });
});
