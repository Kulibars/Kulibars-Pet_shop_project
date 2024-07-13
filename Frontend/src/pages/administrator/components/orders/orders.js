import { useEffect, useState } from "react";
import styled from "styled-components";
import { request } from "../../../../utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../../../selectors/select-loading";
import { LOADING_END, LOADING_START } from "../../../../actions";
import { Error, Loader } from "../../../../components";
import { AdministratorPanel } from "../administratorPanel/administratorPanel";

const OrdersContainer = ({ className }) => {
  const [reserved, setReserved] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(LOADING_START);
    request("/reserved")
      .then(({ data }) => {
        setReserved(data);
      })
      .then(() => {
        dispatch(LOADING_END);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className={className}>
        <AdministratorPanel />
        <Loader />
      </div>
    );
  }

  if (!loading && !reserved.length) {
    return (
      <div className={className}>
        <AdministratorPanel />
        <Error error="заказы отсутствуют" />;
      </div>
    );
  }

  return (
    <div className={className}>
      <AdministratorPanel />
      {reserved.map(({ id, buyer, phoneNumber, createdAt, basket }) => (
        <div key={id} className="reserved">
          <Link to={`/admin/orders/${id}`}>
            <div className="info">
              <h3 className="infoEl">ID Заказа:</h3>
              <h3 className="infoEl">покупатель:</h3>
              <h3 className="infoEl">контакты:</h3>
              <h3 className="infoEl">время заказа:</h3>
            </div>
            <div className="info">
              <div className="infoEl">{id}</div>
              <div className="infoEl">{buyer}</div>
              <div className="infoEl">{phoneNumber}</div>
              <div className="infoEl">{createdAt}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const Orders = styled(OrdersContainer)`
  margin: 30px 54px 0;

  & .reserved {
    margin: 18px 97px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 1rem;
  }

  & .info {
    margin: 10px;

    display: flex;
    justify-content: space-between;
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
`;
