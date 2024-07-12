import { useDispatch, useSelector } from "react-redux";
import { selectBasketProducts, selectUserLogin } from "../../selectors";
import {
  DeleteProductInBasketAction,
  openMessageWindowAction,
} from "../../actions";
import { Button, BtnAndInputCounter } from "../../components";
import { changeFormatPrice, calculateAmount } from "../../utils";
import styled from "styled-components";
import { BasketModal } from "./components";
import { useState } from "react";
import { MESSAGES } from "../../constants";

const BasketContainer = ({ className }) => {
  const dispatch = useDispatch();
  const basketProduct = useSelector(selectBasketProducts);
  const userLogin = useSelector(selectUserLogin);

  const [basketModalOpen, setBasketModalOpen] = useState(false);

  const deliteProductInBasket = (id) => {
    dispatch(DeleteProductInBasketAction(id));
    dispatch(openMessageWindowAction(MESSAGES.REMOVED_FROM_BASKET));
  };

  return (
    <div className={className}>
      {basketModalOpen && (
        <BasketModal
          basketProduct={basketProduct}
          userLogin={userLogin}
          setBasketModalOpen={setBasketModalOpen}
        />
      )}
      {basketProduct.length ? (
        <>
          <div className="content">
            <h2>Сумма к оплате: {calculateAmount(basketProduct)} ₽</h2>
            {basketProduct.map(
              ({ product: { id, name, price }, quantityInBasket }) => (
                <div className="productInBasket" key={id}>
                  <div className="infoEl">{name}</div>
                  <div className="infoEl">
                    цена: {changeFormatPrice(price * quantityInBasket)} ₽
                  </div>
                  <Button
                    margin="0px 21px 0px 19px"
                    width="100px"
                    height="50px"
                    onClick={() => deliteProductInBasket(id)}
                  >
                    удалить товар
                  </Button>
                  <BtnAndInputCounter height="48px" width="30px" id={id} />
                </div>
              )
            )}
            <Button onClick={() => setBasketModalOpen(true)}>Оформить </Button>
          </div>
        </>
      ) : (
        <div className="emptyBasket">Ваша корзина пуста</div>
      )}
    </div>
  );
};

export const Basket = styled(BasketContainer)`
  display: flex;

  & .content {
    margin: 10px auto;
  }

  & .productInBasket {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    height: 68px;
  }

  & .infoEl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
    text-align: center;
    width: 200px;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin: 0 4px 0 4px;
  }

  & .emptyBasket {
    font-size: 45px;
    margin: 10px auto;
    text-align: center;
  }
`;
