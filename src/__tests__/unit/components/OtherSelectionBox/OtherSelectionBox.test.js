import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  CurrencyContext,
  InitialState,
} from "../../../../components/Providers/Provider";
import { OtherSelectionBox } from "../../../../components";

describe("OtherSelectionBox", () => {
  const mockedUserDispatch = jest.fn();

  it("should dispatch action cross icon", () => {
    const { getByTestId } = render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <OtherSelectionBox />
      </CurrencyContext.Provider>
    );
    fireEvent.click(getByTestId("close-other-currencies"));
    expect(mockedUserDispatch).toHaveBeenCalled();
    expect(mockedUserDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_OTHER_CURRENCIES",
    });
  });
});
describe("useDataApi", () => {
  const mockedUserDispatch = jest.fn();

  it("test", async () => {
    const fakeResponse = {
      AED: "United Arab Emirates Dirham",
      AFN: "Afghan Afghani",
      EUR: "Euro",
    };
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(fakeResponse),
    });
    const mockedFetch = jest
      .spyOn(window, "fetch")
      .mockImplementationOnce(() => mockFetch);
    const { getByTestId } = render(
      <CurrencyContext.Provider
        value={{
          globalState: InitialState,
          dispatch: mockedUserDispatch,
        }}
      >
        <OtherSelectionBox />
      </CurrencyContext.Provider>
    );
    const resolvedValue = await waitFor(() => getByTestId("other-currencies"));
    expect(resolvedValue.textContent.match("AED")).toBeTruthy();
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTestId("currencie-AED"));
    expect(mockedUserDispatch).toBeCalledTimes(3);
  });
});
