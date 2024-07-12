import { logo } from "../../../../constants/imagesPath";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoContainer = ({ className }) => (
  <Link className={className} to="/">
    <div>
      <img src={logo.logo2} alt="PetPals" />
    </div>
  </Link>
);

export const Logo = styled(LogoContainer)`
  display: flex;

  & img {
    border-radius: 50%;
    width: 100px;
  }
`;
