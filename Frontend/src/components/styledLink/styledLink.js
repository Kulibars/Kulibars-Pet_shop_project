import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinkContainer = ({ quantity, children, to }) => {
  return quantity === 0 ? (
    <div>{children}</div>
  ) : (
    <Link to={to}>{children}</Link>
  );
};

export const StyledLink = styled(StyledLinkContainer)`
  :hover {
    color: #fec40e;
    transform: 0.3s;
    transition: 0.3s;
  }
`;
