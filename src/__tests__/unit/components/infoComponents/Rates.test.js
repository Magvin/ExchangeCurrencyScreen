import { render } from "@testing-library/react";
import {
  CurrencyContext,
  InitialState,
} from "../../../../components/Providers/Provider";
import Rates from "../../../../components/infoComponents/Rates";

describe("Rates", () => {
  const mockedUserDispatch = jest.fn();

  it("should change rate", async () => {
    const fakeResponse = {
      rates: {
        GBP: 4.754697,
        USD: 99.482292,
      },
    };
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(fakeResponse),
    });
    const mockedFetch = jest
      .spyOn(window, "fetch")
      .mockImplementationOnce(() => mockFetch);
    jest.useFakeTimers();
    render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <Rates />
      </CurrencyContext.Provider>
    );
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(mockedFetch).toHaveBeenCalledTimes(2);
  });
});
