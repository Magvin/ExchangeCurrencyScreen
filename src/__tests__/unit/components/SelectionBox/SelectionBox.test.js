import { fireEvent, render } from "@testing-library/react";
import {
  CurrencyContext,
  InitialState,
} from "../../../../components/Providers/Provider";
import SelectedBox from "../../../../components/SelectionBox/SelectionBox";

describe("SelectionBox", () => {
  const mockedUserDispatch = jest.fn();

  it("should fire dispatch event to toggle other currencies", () => {
    InitialState.changePanelActive.active = true;
    const { getByTestId } = render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <SelectedBox />
      </CurrencyContext.Provider>
    );
    fireEvent.click(getByTestId("toggle-other-panel"));
    expect(mockedUserDispatch).toHaveBeenCalledTimes(2);
  });
  it("should fire dispatch event to toggle Change panel", () => {
    InitialState.changePanelActive.active = true;
    const { getByTestId } = render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <SelectedBox />
      </CurrencyContext.Provider>
    );
    fireEvent.click(getByTestId("currencie-EUR"));
    expect(mockedUserDispatch).toHaveBeenCalledTimes(2);
  });
});
