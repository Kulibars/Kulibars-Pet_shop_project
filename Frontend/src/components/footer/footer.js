import styled from "styled-components";
import { Icon } from "../icon/icon";
import { Link } from "react-router-dom";

export const FooterContainer = ({ className }) => {
  return (
    <div className={className}>
      <h2>Дипломный проект Михаила Степанцева</h2>
      <div className="social">
        <Link to="https://vk.com/id24192203">
          <Icon onClick={() => {}} size="50px" id="fa-vk" />
        </Link>
        <Link to="https://www.facebook.com/profile.php?id=100004160437925&mibextid=LQQJ4d">
          <Icon
            onClick={() => {}}
            margin="9px 0 0 0"
            size="40px"
            id="fa-facebook"
          />
        </Link>
        <Link to="https://www.instagram.com/t_e_s_s_e_r_a_c_t">
          <Icon onClick={() => {}} size="50px" id="fa-instagram" />
        </Link>
      </div>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 120px;
  padding: 20px 40px;
  font-weight: bold;
  background: #fff5cd;

  & .social {
    margin: 0px 27px;
    width: 200px;

    display: flex;
    justify-content: space-between;
  }
`;
