import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = ({ children, className, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export const Button = styled(ButtonContainer)`
  border-radius: 10px;
  color: ${({ color = "white" }) => color};
  height: ${({ height = "40px" }) => height};
  width: ${({ width = "100%" }) => width};
  margin: ${({ margin = 0 }) => margin};
  padding: 10px 16px;
  transition: ${({ disabled }) => (disabled ? "none" : "0.2s linear")};
  background: ${({ disabled }) => (disabled ? "#d6dbdf" : "#fec40e")};
  &:hover {
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 0 0 2px white, 0 0 0 4px #fec40e"};
  }
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};
