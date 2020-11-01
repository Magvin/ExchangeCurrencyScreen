export const swipeCurrencies = (
  pocket,
  firstSelectedPocket,
  secondSelectedPocket,
  changePanelActive,
  dispatch
) => {
  if (firstSelectedPocket.name === pocket.name) {
    dispatch({
      type: "CHANGE_SECOND_CURRENCY",
      payload: {
        value: firstSelectedPocket.value,
        name: firstSelectedPocket.name,
      },
    });
    dispatch({
      type: "CHANGE_FIRST_CURRENCY",
      payload: {
        value: secondSelectedPocket.value,
        name: secondSelectedPocket.name,
      },
    });
  }
  if (
    firstSelectedPocket.name !== pocket.name &&
    changePanelActive.isCalledFromTop
  ) {
    if (secondSelectedPocket.name === pocket.name) {
      dispatch({
        type: "CHANGE_SECOND_CURRENCY",
        payload: {
          value: firstSelectedPocket.value,
          name: firstSelectedPocket.name,
        },
      });
    }
    dispatch({
      type: "CHANGE_FIRST_CURRENCY",
      payload: {
        value: pocket.value,
        name: pocket.name,
      },
    });
  }
  if (
    secondSelectedPocket.name !== pocket.name &&
    !changePanelActive.isCalledFromTop
  ) {
    dispatch({
      type: "CHANGE_SECOND_CURRENCY",
      payload: {
        value: pocket.value,
        name: pocket.name,
      },
    });
  }
};
