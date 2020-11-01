import { reducers } from "../../../../components/Providers/Provider";

describe("Provider", () => {
  const InitialState = {
    selectedInput: "",
  };

  it("should change selectedInput to primary", () => {
    const action = {
      type: "SET_ACTIVE_INPUT",
      payload: "primary",
    };
    expect(reducers(InitialState, action)).toMatchObject({
      selectedInput: "primary",
    });
  });

  it("should change selectedInput to secondary", () => {
    const action = {
      type: "SET_ACTIVE_INPUT",
      payload: "secondary",
    };
    expect(reducers(InitialState, action)).toMatchObject({
      selectedInput: "secondary",
    });
  });

  it("should change return default state", () => {
    const action = {
      type: "",
      payload: "",
    };
    expect(reducers(InitialState, action)).toMatchObject({
      selectedInput: "",
    });
  });
  it("should change first currency", () => {
    const action = {
      type: "CHANGE_FIRST_CURRENCY",
      payload: {
        name: "AUD",
        value: "0.00",
      },
    };
    expect(reducers(InitialState, action)).toMatchObject({
      firstSelectedPocket: {
        name: "AUD",
        value: "0.00",
        selected: false,
      },
    });
  });
  it("should change second currency", () => {
    const action = {
      type: "CHANGE_SECOND_CURRENCY",
      payload: {
        name: "AFD",
        value: "0.00",
      },
    };
    expect(reducers(InitialState, action)).toMatchObject({
      secondSelectedPocket: {
        name: "AFD",
        value: "0.00",
        selected: false,
      },
    });
  });
  it("should toggle change panel", () => {
    const action = {
      type: "TOGGLE_CHANGE_PANEL",
      payload: {
        active: true,
        isCalledFromTop: true,
      },
    };
    expect(reducers(InitialState, action)).toMatchObject({
      changePanelActive: {
        active: true,
        isCalledFromTop: true,
      },
    });
  });
  it("should toggle other currencies", () => {
    const action = {
      type: "TOGGLE_OTHER_CURRENCIES",
    };
    expect(reducers(InitialState, action)).toMatchObject({
      toggleOtherCurrencies: true,
    });
  });
  it("should change first input value", () => {
    const action = {
      type: "SET_FIRST_VALUE",
      payload: "1.00",
    };
    expect(reducers(InitialState, action)).toMatchObject({
      firstInput: "1.00",
    });
  });
  it("should change second input value", () => {
    const action = {
      type: "SET_SECOND_VALUE",
      payload: "1.00",
    };
    expect(reducers(InitialState, action)).toMatchObject({
      secondInput: "1.00",
    });
  });
  it("should change active rate", () => {
    const action = {
      type: "SET_ACTIVE_RATE",
      payload: "1.12",
    };
    expect(reducers(InitialState, action)).toMatchObject({
      activeRate: "1.12",
    });
  });
  it("should exchange values", () => {
    const pockets = [
      {
        name: "GBP",
        value: "1.31",
        fullName: "British Pound",
      },
      {
        name: "USD",
        value: "500.00",
        fullName: "US Dollar",
      },
      {
        name: "EUR",
        value: "0.00",
        fullName: "Euro",
      },
    ];

    const InitialState = {
      selectedInput: "primary",
      pockets: [...pockets],
      firstSelectedPocket: {
        ...pockets[0],
        selected: false,
      },
      firstInput: "",
      secondSelectedPocket: {
        ...pockets[1],
        selected: false,
      },
      secondInput: "",
      changePanelActive: {
        active: false,
        isCalledFromTop: false,
      },
      toggleOtherCurrencies: false,
      activeRate: "1.00",
    };
    const action = {
      type: "EXCHANGE_CURRENCY",
      payload: {
        firstSelectedPocket: {
          value: "1.31",
          name: "GBP",
        },
        secondSelectedPocket: {
          value: "0.00",
          name: "USD",
        },
      },
    };
    expect(reducers(InitialState, action)).toMatchObject({
      firstSelectedPocket: {
        value: 0,
      },
    });
  });
});
