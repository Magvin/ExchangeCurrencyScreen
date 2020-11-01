import { fireEvent, render } from "@testing-library/react";
import {
  CurrencyContext,
  InitialState,
} from "../../../../components/Providers/Provider";
import { PhoneScreen } from "../../../../components";

describe("PhoneScreen", () => {
  const mockedUserDispatch = jest.fn();

  it("should dispatch exchange action on Exchange button", () => {
    InitialState.firstInput = "1.00";
    const { getByTestId } = render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <PhoneScreen>
          <div>test</div>
        </PhoneScreen>
      </CurrencyContext.Provider>
    );
    expect(getByTestId("phone-screen")).toBeTruthy();
    fireEvent.click(getByTestId("phone-screen-exchange-button"));
    expect(mockedUserDispatch).toBeCalledTimes(3);
  });
});
