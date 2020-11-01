import { fireEvent, render } from "@testing-library/react";
import {
  CurrencyContext,
  InitialState,
} from "../../../../components/Providers/Provider";
import Swap from "../../../../components/infoComponents/Swap";

describe("Rates", () => {
  it("should dispatch event on click", () => {
    const mockedUserDispatch = jest.fn();
    const { getByTestId } = render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <Swap />
      </CurrencyContext.Provider>
    );

    fireEvent.click(getByTestId("swap"));
    expect(mockedUserDispatch).toBeCalledTimes(2);
  });
});
