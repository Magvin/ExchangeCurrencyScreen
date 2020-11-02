import { createContext } from "react";

export const CurrencyContext = createContext();

export const pockets = [
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

export const InitialState = {
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

export const reducers = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_INPUT":
      return setActiveInput(state, action.payload);
    case "CHANGE_FIRST_CURRENCY":
      return setFirstCurrency(state, action.payload);
    case "CHANGE_SECOND_CURRENCY":
      return setSecondCurrency(state, action.payload);
    case "TOGGLE_CHANGE_PANEL":
      return setPanelToActive(state, action.payload);
    case "TOGGLE_OTHER_CURRENCIES":
      return setOtherCurrencyVisible(state);
    case "SET_FIRST_VALUE":
      return setFirstCurrencyValue(state, action.payload);
    case "SET_SECOND_VALUE":
      return setSecondCurrencyValue(state, action.payload);
    case "SET_ACTIVE_RATE":
      return setActiveRate(state, action.payload);
    case "EXCHANGE_CURRENCY":
      return exchange(state, action.payload);
    default:
      return state;
  }
};

const exchange = (state, payload) => {
  let newPockets;
  pockets.forEach((item, index) => {
    if (item.name === payload.firstSelectedPocket.name) {
      pockets[index] = {
        name: state.firstSelectedPocket.name,
        value: (
          parseFloat(state.firstSelectedPocket.value) -
          parseFloat(payload.firstSelectedPocket.value)
        ).toFixed(2),
        selected: false,
        fullName: pockets[index].fullName,
      };
      newPockets = pockets;
    }
    if (item.name === payload.secondSelectedPocket.name) {
      pockets[index] = {
        name: state.secondSelectedPocket.name,
        value: (
          parseFloat(state.secondSelectedPocket.value) +
          parseFloat(payload.secondSelectedPocket.value)
        ).toFixed(2),
        selected: false,
        fullName: pockets[index].fullName,
      };
      newPockets = pockets;
    } else if (
      pockets[index].name === state.firstSelectedPocket.name ||
      pockets[index].name === state.secondSelectedPocket.name
    ) {
      newPockets = [
        ...pockets,
        {
          name: payload.secondSelectedPocket.name,
          value: parseFloat(payload.secondSelectedPocket.value).toFixed(2),
        },
      ];
    }
  });
  return {
    ...state,
    pockets: newPockets,
    firstSelectedPocket: {
      name: state.firstSelectedPocket.name,
      value: (
        parseFloat(state.firstSelectedPocket.value) -
        parseFloat(payload.firstSelectedPocket.value)
      ).toFixed(2),
      selected: false,
    },
    secondSelectedPocket: {
      name: state.secondSelectedPocket.name,
      value: (
        parseFloat(state.secondSelectedPocket.value) +
        parseFloat(payload.secondSelectedPocket.value)
      ).toFixed(2),
      selected: false,
    },
  };
};

const setActiveInput = (state, payload) => {
  let input;
  if (payload === "primary") {
    input = "primary";
  } else {
    input = "secondary";
  }
  return {
    ...state,
    selectedInput: input,
  };
};

const setFirstCurrency = (state, payload) => {
  return {
    ...state,
    firstSelectedPocket: {
      name: payload.name,
      value: parseFloat(payload.value).toFixed(2),
      selected: false,
    },
  };
};
const setSecondCurrency = (state, payload) => {
  return {
    ...state,
    secondSelectedPocket: {
      name: payload.name,
      value: parseFloat(payload.value).toFixed(2),
      selected: false,
    },
  };
};

const setPanelToActive = (state, payload) => {
  return {
    ...state,
    firstInput: "",
    secondInput: "",
    changePanelActive: {
      active: payload.active,
      isCalledFromTop: payload.isCalledFromTop,
    },
  };
};

const setOtherCurrencyVisible = (state) => {
  return {
    ...state,
    toggleOtherCurrencies: !state.toggleOtherCurrencies,
  };
};

const setActiveRate = (state, payload) => {
  return {
    ...state,
    activeRate: payload,
  };
};

const setFirstCurrencyValue = (state, payload) => {
  return {
    ...state,
    firstInput: payload,
  };
};

const setSecondCurrencyValue = (state, payload) => {
  return {
    ...state,
    secondInput: payload,
  };
};
