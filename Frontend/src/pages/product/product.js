import {
  CLEAR_CURRENT_PRODUCT,
  setProductAction,
  GetProductToBasketAction,
  openMessageWindowAction,
  LOADING_END,
  LOADING_START,
} from "../../actions";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectProduct } from "../../selectors/select-product";
import styled from "styled-components";
import { selectBasketProducts } from "../../selectors";
import {
  BtnAndInputCounter,
  Button,
  Error,
  ImgProduct,
  Loader,
} from "../../components";
import { selectLoading } from "../../selectors/select-loading";
import { request } from "../../utils";
import { useAddToBasket } from "../../hooks";

const ProductContainer = ({ className }) => {
  const product = useSelector(selectProduct);
  const productInBasket = useSelector(selectBasketProducts);
  const loading = useSelector(selectLoading);

  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(LOADING_START);
    dispatch(CLEAR_CURRENT_PRODUCT);
    request(`/products/${id}`)
      .then(({ data, error }) => {
        dispatch(setProductAction(data));
        setErrorMessage(error);
      })
      .then(() => dispatch(LOADING_END));
  }, [dispatch, id]);

  const { inBasket, buttonDisabled, setButtonDisabled } = useAddToBasket(
    productInBasket,
    id,
    product?.quantity
  );

  const AddToBasket = (id, price) => {
    setButtonDisabled(true);
    dispatch(GetProductToBasketAction(id, price));
    dispatch(openMessageWindowAction("Товар добавлен!"));
  };

  if (loading) {
    return <Loader ContainerHeight="482px" ringSize="62px" borderSize="14px" />;
  }

  if (errorMessage !== null) {
    return <Error error={errorMessage} />;
  }

  return (
    <div className={className}>
      {product && !loading && (
        <>
          <div className="leftContent">
            <ImgProduct currentItem="1" quantity={product?.quantity}>
              <img src={product.imageUrl} alt={product.name} />
            </ImgProduct>
            <div className="productInfo">
              <h3>Количество на складе: {product.quantity}</h3>
              <h3>цена: {product.price}</h3>
            </div>
          </div>
          <div className="rightContent">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="buttons">
              <Button onClick={() => navigate(-1)} margin="0px 10px 0 0">
                Назад
              </Button>
              {!inBasket ? (
                <Button
                  margin="0px 10px 0 0"
                  disabled={buttonDisabled}
                  onClick={() => AddToBasket(id, product.price)}
                >
                  В корзину
                </Button>
              ) : (
                <BtnAndInputCounter id={id} ProductInBasket={productInBasket} />
              )}
            </div>
          </div>
          <div className="textContainer">
            <div className="productAbout"></div>
          </div>
        </>
      )}
    </div>
  );
};

export const Product = styled(ProductContainer)`
  animation: ani 0.5s forwards;
  @keyframes ani {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  margin: 10px auto;
  width: 802px;
  height: 482px;
  display: flex;
  justify-content: center;

  .leftContent {
    padding: 20px;
  }

  & .imgContainer {
  }

  & .productInfo {
    height: 162px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }

  & .productInfo h3 {
    padding: 0px 40px;
  }

  & .rightContent {
    display: flex;
    padding: 20px;
    text-align: center;
    margin: 0px 20px 0 0;

    flex-direction: column;
    justify-content: space-between;
  }

  & .textContainer {
  }

  & .buttons {
    display: flex;
  }
`;
