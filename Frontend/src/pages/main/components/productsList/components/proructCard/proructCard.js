import {
  GetProductToBasketAction,
  openMessageWindowAction,
} from "../../../../../../actions";
import {
  Button,
  BtnAndInputCounter,
  ImgProduct,
} from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketProducts } from "../../../../../../selectors";
import styled from "styled-components";
import { useAddToBasket } from "../../../../../../hooks";
import { Link } from "react-router-dom";

const ProductCardContainer = ({
  className,
  id,
  imageUrl,
  name,
  price,
  quantity,
}) => {
  const dispatch = useDispatch();

  const productInBasket = useSelector(selectBasketProducts);

  const { inBasket, buttonDisabled, setButtonDisabled } = useAddToBasket(
    productInBasket,
    id,
    quantity
  );

  const AddToBasket = (id) => {
    setButtonDisabled(true);
    dispatch(GetProductToBasketAction(id));
    dispatch(openMessageWindowAction("Товар добавлен!"));
  };

  return (
    <div className={className}>
      <Link to={`/product/${id}`}>
        <ImgProduct currentItem="card" quantity={quantity}>
          <img src={imageUrl} alt={name} />
        </ImgProduct>
        <div className="product-card-info">
          <h4>{name}</h4>
          <h4 className="price">Цена:{price} ₽</h4>
        </div>
      </Link>
      <div className="product-card-footer">
        {!inBasket ? (
          <Button
            disabled={buttonDisabled}
            onClick={() => AddToBasket(id, price)}
          >
            В корзину
          </Button>
        ) : (
          <BtnAndInputCounter id={id} ProductInBasket={productInBasket} />
        )}
      </div>
    </div>
  );
};

export const ProductCard = styled(ProductCardContainer)`
  @keyframes ani {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  & a :hover {
    color: #fec40e;
    transform: 0.3s;
    transition: 0.3s;
  }

  box-shadow: 7px 11px 8px 0px rgba(34, 60, 80, 0.2);
  margin: 32px;
  border: 1px solid #dee2e5;
  cursor: pointer;
  position: relative;
  background-color: #ffffff;
  width: 260px;
  height: 360px;

  padding: 10px;
  border-radius: 1rem;
  transition: 0.3s;
  opacity: 0;
  animation: ani 0.5s forwards;

  & h4 {
    margin: 0;
    text-align: center;
  }

  img {
    background-color: ${({ quantity }) =>
      quantity === 0 ? "#d6dbdf" : "#fec40e"};
  }

  & .product-card-info {
    border-top: 1px solid #dee2e5;
    display: flex;
    height: 100px;
    justify-content: space-around;
    padding-top: 5px;
    flex-direction: column;
  }

  & .product-card-footer {
    display: flex;
    padding: 5px;
    flex-direction: column;
    justify-content: space-between;
  }
`;
