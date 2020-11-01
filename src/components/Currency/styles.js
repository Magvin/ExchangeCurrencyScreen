import styled from "styled-components";
import { revolutBlue, revolutWhite } from "../../styles/variables";

export const CurrencyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 40px;
  align-items: center;
  color: ${revolutWhite};
  height: 225px;
`;
export const CursorAndInput = styled.div`
  position: relative;
  & > i {
    position: absolute;
    width: 3px;
    height: 100%;
    background-color: ${revolutBlue};
    right: -0.2px;
    top: -2%;
    animation-name: blink;
    animation-duration: 800ms;
    animation-iteration-count: infinite;
    opacity: 1;
  }

  & > input {
    text-align: right;
    border: none;
    font-size: 46px;
    width: 100%;
    background-color: transparent;
    padding: 0;
    &:focus,
    &:hover {
      outline: none;
    }
  }

  & > input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  @keyframes blink {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const CurrencyStyles = styled.div`
  width: 100%;
  margin-bottom: 25px;
  line-height: 1.76;

  div {
    display: flex;
    align-items: center;
  }
  .currency {
    font-size: 42px;
  }
`;
export const Balance = styled.span`
  font-size: 20px;
  display: inline-block;
  width: 100%;
  color: #7a7a7c;
  text-align: left;
`;
