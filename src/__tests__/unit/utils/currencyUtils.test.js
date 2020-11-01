import { InitialState } from "../../../components/Providers/Provider";
import {
  validateCurrency,
  toggleChangePanel,
} from "../../../utils/currencyUtils";

describe("currencyUtils", () => {
  it("should fire dispatch event on regex pass and isTopCurrency", () => {
    const mockedDispatch = jest.fn();
    validateCurrency("1.00", true, "1.13", mockedDispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(2);
  });
  it("should fire dispatch event on regex pass and bottom currency", () => {
    const mockedDispatch = jest.fn();
    validateCurrency("1.00", false, "1.13", mockedDispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(2);
  });
  it("should fire dispatch event if value is empty", () => {
    const mockedDispatch = jest.fn();
    validateCurrency("", false, "1.13", mockedDispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(2);
  });
  it("should not fire dispatch event if value is text", () => {
    const mockedDispatch = jest.fn();
    validateCurrency("string", false, "1.13", mockedDispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });
  it("should fire dispatch event on toggleChangePanel function", () => {
    const mockedDispatch = jest.fn();
    toggleChangePanel(true, InitialState, mockedDispatch);
    expect(mockedDispatch).toBeCalledWith({
      payload: { active: true, isCalledFromTop: true },
      type: "TOGGLE_CHANGE_PANEL",
    });
  });
});
