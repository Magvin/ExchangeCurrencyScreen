import { render } from "@testing-library/react";
import {
  CurrencyContext,
  InitialState,
} from "../../components/Providers/Provider";
import App from "../../App";

describe("App", () => {
  const mockedUserDispatch = jest.fn();

  it("should render component inside App", () => {
    const { getByTestId } = render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <App />
      </CurrencyContext.Provider>
    );
    expect(getByTestId("exchange-screen")).toBeTruthy();
  });
  it("should render OtherSelectionBox if toggleOtherCurrencies is true", () => {
    InitialState.toggleOtherCurrencies = true;
    const { getByTestId } = render(<App />);
    expect(getByTestId("other-selection-box")).toBeTruthy();
  });
});
