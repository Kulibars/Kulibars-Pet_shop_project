import { Button } from "../../../../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AdministratorPanelContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="AdminPanelButtonsContainer">
        <div className="btnAdmin">
          <Link to="/admin/orders">
            <Button onClick={() => {}}>Заказы</Button>
          </Link>
        </div>
        <div className="btnAdmin">
          <Link to="/admin">
            <Button onClick={() => {}}>Список товаров</Button>
          </Link>
        </div>
        <div className="btnAdmin">
          <Link to="/admin/addProduct">
            <Button onClick={() => {}}>Добавить товар</Button>
          </Link>
        </div>
        <div className="btnAdmin">
          <Link to="/admin/categories">
            <Button onClick={() => {}}>Список категорий</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AdministratorPanel = styled(AdministratorPanelContainer)`
  border: 1px solid black;
  border-radius: 1rem;

  & .AdminPanelButtonsContainer {
    display: flex;
    justify-content: space-between;
    margin: 30px 54px 0;
  }

  & .btnAdmin {
    margin: 20px;
    width: 250px;
  }
`;
