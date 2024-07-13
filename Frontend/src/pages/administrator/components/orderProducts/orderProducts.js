import { useEffect, useState } from "react";
import styled from "styled-components";
import { request } from "../../../../utils";
import { useNavigate, useParams } from "react-router";
import {
  LOADING_END,
  LOADING_START,
  openMessageWindowAction,
} from "../../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../../../selectors/select-loading";
import { Button, Error, Loader } from "../../../../components";

const OrdersProductContainer = ({ className, basket }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const [reserved, setReserved] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    dispatch(LOADING_START);
    request(`/reserved/${id}`)
      .then(({ data, error }) => {
        !error && setReserved(data);
        error && setErrorMessage(error);
      })
      .then(() => {
        dispatch(LOADING_END);
      });
  }, [dispatch, id]);

  const deleteReserve = () => {
    request(`/reserved/${id}`, "DELETE")
      .then(({ message }) => dispatch(openMessageWindowAction(message)))
      .then(() => navigate(-1));
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMessage !== null) {
    return <Error error={errorMessage} />;
  }

  return (
    <div className={className}>
      <div className="productList">
        <div className="buttons">
          <Button onClick={() => navigate(-1)} margin="0px 10px 0 0">
            назад
          </Button>
          <Button onClick={() => deleteReserve()} margin="0px 10px 0 0">
            удалить
          </Button>
        </div>
        <div className="info">
          <h3 className="infoEl">ID Заказа:</h3>
          <h3 className="infoEl">покупатель:</h3>
          <h3 className="infoEl">контакты:</h3>
          <h3 className="infoEl">время заказа:</h3>
        </div>
        <div className="info">
          <div className="infoEl">{id}</div>
          <div className="infoEl">{reserved?.buyer}</div>
          <div className="infoEl">{reserved?.phoneNumber}</div>
          <div className="infoEl">{reserved?.createdAt}</div>
        </div>
        <div className="info">
          <h3 className="infoEl">ID товара:</h3>
          <h3 className="infoEl">Наименование:</h3>
          <h3 className="infoEl">количество:</h3>
        </div>
        {reserved?.basket.map(({ id, product, reservedquantity }) => (
          <div key={id} className="info">
            <div className="infoEl">{product.id}</div>
            <div className="infoEl">{product.name}</div>
            <div className="infoEl">{reservedquantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OrdersProduct = styled(OrdersProductContainer)`
  margin: 66px;
  display: flex;
  flex-direction: column;

  & .productList {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
  }

  & .info {
    margin: 10px;
    display: flex;
    justify-content: center;
  }

  & .infoEl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
    text-align: center;
    width: 418px;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin: 0 4px 0 4px;
  }

  & .buttons {
    display: flex;
    width: 418px;
    margin: 10px auto;
  }
`;
