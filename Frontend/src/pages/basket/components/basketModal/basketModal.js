import styled from "styled-components";
import { Button, Input } from "../../../../components";
import { useState } from "react";
import { request } from "../../../../utils";
import { CLEAR_BASKET, openMessageWindowAction } from "../../../../actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const BasketModalContainer = ({
  className,
  userLogin,
  setBasketModalOpen,
  basketProduct,
}) => {
  const [name, setName] = useState(userLogin);
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let productsReserved = basketProduct.map(({ product, quantityInBasket }) => ({
    product: product.id,
    reservedquantity: quantityInBasket,
  }));

  const addReserved = () => {
    request("/reserved", "POST", {
      basket: [...productsReserved],
      phoneNumber,
      buyer: name,
    }).then(({ message }) => {
      dispatch(openMessageWindowAction(message));
    });
    navigate("/");
    setBasketModalOpen(false);
    dispatch(CLEAR_BASKET);
  };

  const changeName = ({ target }) => {
    setName(target.value);
  };

  const changePhoneNumber = ({ target }) => {
    if (userLogin) {
      setName(userLogin);
    }
    setPhoneNumber(target.value);
  };

  return (
    <div className={className}>
      <div className="overlay"></div>
      <div className="box">
        <h3>Оформление заказа</h3>
        {userLogin ? (
          <div className="nameContainer">{userLogin}</div>
        ) : (
          <Input
            onChange={changeName}
            borderradius="10px"
            placeholder="Введите ваше имя"
          />
        )}
        <Input
          onChange={changePhoneNumber}
          borderradius="10px"
          placeholder="Введите номер телефона"
        />
        <div
          className="
               buttons"
        >
          <Button onClick={() => addReserved()} width="120px">
            Отправить
          </Button>
          <Button onClick={() => setBasketModalOpen(false)} width="120px">
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export const BasketModal = styled(BasketModalContainer)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;

  & .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  & .box {
    text-align: center;
    background-color: #fff;
    border-radius: 15px;
    padding: 30px 30px 30px;
    width: 464px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 30;
  }

  & .buttons {
    display: flex;
    justify-content: space-around;
  }

  & .nameContainer {
    width: 100%;
    font-size: 18px;
    height: 50px;
    margin: 0 0 10px;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 10px;
  }
`;
