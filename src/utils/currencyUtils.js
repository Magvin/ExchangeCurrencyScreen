export const dispatchActiveInput = (isTopCurrency, dispatch) => {
  if (isTopCurrency) {
    dispatch({
      type: "SET_ACTIVE_INPUT",
      payload: "primary",
    });
  } else {
    dispatch({
      type: "SET_ACTIVE_INPUT",
      payload: "secondary",
    });
  }
};

export const validateCurrency = (
  value,
  isTopCurrency,
  activeRate,
  dispatch
) => {
  if (/^\d+(\.\d{1,2})?$/.test(value)) {
    if (isTopCurrency) {
      dispatch({
        type: "SET_FIRST_VALUE",
        payload: value,
      });
      const secondValue = Math.round(100 * (value * activeRate)) / 100;

      dispatch({
        type: "SET_SECOND_VALUE",
        payload: secondValue,
      });
    } else {
      dispatch({
        type: "SET_SECOND_VALUE",
        payload: value,
      });

      const firstValue = Math.round(100 * (value / activeRate)) / 100;
      dispatch({
        type: "SET_FIRST_VALUE",
        payload: firstValue,
      });
    }
  } else if (value.length === 0) {
    dispatch({
      type: "SET_FIRST_VALUE",
      payload: "",
    });
    dispatch({
      type: "SET_SECOND_VALUE",
      payload: "",
    });
  } else {
    return;
  }
};

export const toggleChangePanel = (isTopCurrency, globalState, dispatch) => {
  let calledFromTop;
  if (isTopCurrency) {
    calledFromTop = true;
  }
  dispatch({
    type: "TOGGLE_CHANGE_PANEL",
    payload: {
      isCalledFromTop: calledFromTop,
      active: !globalState.changePanelActive.active,
    },
  });
};
