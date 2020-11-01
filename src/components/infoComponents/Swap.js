import React, { useContext } from "react";
import { ArrowRightLeft } from "@revolut/icons";
import { CurrencyContext } from "../../components/Providers/Provider";
const Swap = () => {
  const { globalState, dispatch } = useContext(CurrencyContext);
  const { firstSelectedPocket, secondSelectedPocket } = globalState;

  return (
    <ArrowRightLeft
      data-testid="swap"
      color="primary"
      style={{
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "5px",
        position: "relative",
        top: "58px",
        transform: "translate(-50%, -50%) rotate(90deg)",
        left: "5%",
        cursor: "pointer",
      }}
      size="16"
      onClick={() => {
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
      }}
    />
  );
};

export default Swap;
