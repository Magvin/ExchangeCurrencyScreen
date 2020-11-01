import { swipeCurrencies } from "../../../utils/swipeCurrencies";
import { InitialState } from "../../../components/Providers/Provider";

describe("SwipeCurrencies", () => {
  it("should dispatch action if firstSelectedPocket equals pasted pocked.name", () => {
    const mockedDispatch = jest.fn();
    const pocket = {
      value: "0.00",
      name: "GBP",
    };
    swipeCurrencies(
      pocket,
      InitialState.firstSelectedPocket,
      InitialState.secondSelectedPocket,
      InitialState.changePanelActive,
      mockedDispatch
    );
    expect(mockedDispatch).toBeCalledTimes(3);
  });
  it("should dispatch action if secondSelectedPocket equals pasted pocked.name", () => {
    const mockedDispatch = jest.fn();
    const changePanel = {
      isCalledFromTop: true,
    };
    const pocket = {
      value: "0.00",
      name: "USD",
    };
    swipeCurrencies(
      pocket,
      InitialState.firstSelectedPocket,
      InitialState.secondSelectedPocket,
      changePanel,

      mockedDispatch
    );
    expect(mockedDispatch).toBeCalledTimes(2);
  });
});
