import { render } from "@testing-library/react";
import { ExchangeScreen } from "../../../../components";
import {
  CurrencyContext,
  InitialState,
} from "../../../../components/Providers/Provider";

describe("ExchangeScreen", () => {
  const mockedUserDispatch = jest.fn();

  it("should render component", () => {
    const { getByTestId } = render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <ExchangeScreen />
      </CurrencyContext.Provider>
    );
    expect(getByTestId("exchange-screen")).toBeTruthy();
  });
});
