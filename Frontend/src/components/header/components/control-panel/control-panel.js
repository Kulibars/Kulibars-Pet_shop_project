import { Icon, Button } from "../../..";
import { useNavigate } from "react-router-dom";
import {
  selectBasketProducts,
  selectUserLogin,
  selectUserRole,
} from "../../../../selectors";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logoutAction } from "../../../../actions";
import { ROLE } from "../../../../constants";
import { checkAccess } from "../../../../utils";

const RightAligned = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  height: 32px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const ControlPanelContainer = ({ className }) => {
  const dispatch = useDispatch();

  const login = useSelector(selectUserLogin);
  const roleId = useSelector(selectUserRole);
  const basket = useSelector(selectBasketProducts);

  const onLogout = () => {
    dispatch(logoutAction());
    sessionStorage.removeItem("userData");
  };

  const isAdmin = checkAccess([ROLE.ADMINISTRATOR], roleId);
  const navigate = useNavigate();

  return (
    <div className={className}>
      <RightAligned>
        {isAdmin && (
          <Button
            onClick={() => {
              navigate("/admin");
            }}
            height="50px"
            margin="0px 0px 0px 10px"
            size="22px"
          >
            <div className="buttonText">Администратор</div>
          </Button>
        )}

        <Button
          onClick={() => {
            navigate("/basket");
          }}
          color="#000"
          height="50px"
          width="140px"
          margin="20px"
        >
          <div className="basketItem">
            <div className="buttonText">Корзина</div>
            <Icon
              id="fa-shopping-basket"
              margin="0px 0px 0px 10px"
              size="22px"
            />
            {basket.length > 0 && (
              <div className="basketQuantity">{basket.length}</div>
            )}
          </div>
        </Button>

        {roleId === ROLE.GUEST ? (
          <Button
            onClick={() => {
              navigate("/login");
            }}
            color="#000"
            height="50px"
            width="140px"
            margin="20px"
          >
            Войти
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>

            <Icon
              id="fa-sign-out"
              margin="3px 0px 0px 10px;"
              size="21px;"
              onClick={onLogout}
            />
          </>
        )}
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  display: flex;
  justify-content: space-between;

  & .basketQuantity {
    text-align: center;
    color: #fff;
    font-size: 9px;
    margin: -8px 0px 0px 100px;
    border-radius: 50%;
    position: absolute;
    background-color: red;
    height: 15px;
    width: 15px;
    padding: 3px 1px 0px 0px;
  }

  .basketItem {
    display: flex;
  }

  .buttonText {
    color: #000;
    font-size: 17px;
    padding-top: 3px;
  }
`;
