import { useDispatch, useSelector } from "react-redux";
import {
  updateInputPlusAction,
  updateInputMinusAction,
  updateInputAction,
  DeleteProductInBasketAction,
  openMessageWindowAction,
} from "../../actions";
import { selectBasketProducts } from "../../selectors";
import styled from "styled-components";
import { useState } from "react";
import { MESSAGES } from "../../constants";

const BtnAndInputCounterContainer = ({ className, id }) => {
  const dispatch = useDispatch();
  const basket = useSelector(selectBasketProducts);

  const currentProduct = basket.find(({ product }) => product.id === id);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const plusCount = () => {
    if (
      Number(currentProduct.product.quantity) <= currentProduct.quantityInBasket
    ) {
      dispatch(openMessageWindowAction(MESSAGES.LOW_PRODUCTS_IN_STOCK));
      setIsButtonDisabled(true);
      return;
    }

    dispatch(updateInputPlusAction(id, currentProduct.id));
  };

  const minusCount = () => {
    setIsButtonDisabled(false);

    if (currentProduct.quantityInBasket < 2) {
      dispatch(DeleteProductInBasketAction(id));
    }
    dispatch(updateInputMinusAction(id, currentProduct.id));
  };

  const inputCount = ({ target }) => {
    if (Number(currentProduct.product.quantity - 1) <= target.value) {
      setIsButtonDisabled(true);
      dispatch(updateInputAction(id, Number(currentProduct.product.quantity)));
      dispatch(openMessageWindowAction(MESSAGES.LOW_PRODUCTS_IN_STOCK));
      return;
    }
    if (Number(target.value) === 0) {
      dispatch(DeleteProductInBasketAction(id));
      return;
    }

    dispatch(updateInputAction(id, Number(target.value)));
  };

  return (
    <div className={className}>
      <button onClick={() => minusCount()} className="inputCounterBtnMinus">
        -
      </button>
      <input
        min="1"
        type="number"
        value={currentProduct ? currentProduct.quantityInBasket : 0}
        className="imputCounter"
        onChange={inputCount}
      />
      <button
        disabled={isButtonDisabled}
        onClick={() => plusCount()}
        className="inputCounterBtnPlus"
      >
        ✚
      </button>
    </div>
  );
};

export const BtnAndInputCounter = styled(BtnAndInputCounterContainer)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  width: ${({ ContainerWidth = "" }) => ContainerWidth};

  margin: 0px auto;
  display: flex;
  flex-direction: row;
  height: ${({ height = "40px" }) => height};

  & .imputCounter {
    text-align: center;
    width: ${({ width = "75%" }) => width};
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  & .inputCounterBtnPlus {
    width: 40px;
    background: #fec40e;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px;
    text-transform: uppercase;
    color: white;
    border-left: none;
    font-size: 12px;
    font-family: sans-serif;
    border-style: hidden;
    border-radius: 0px 9px 9px 0px;
  }

  & .inputCounterBtnMinus {
    width: 40px;
    background: #fec40e;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px;
    text-transform: uppercase;
    color: white;
    border-left: none;
    font-size: 12px;
    font-family: sans-serif;
    border-style: hidden;
    border-radius: 9px 0px 0px 9px;
  }
`;
