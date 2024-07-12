import styled from "styled-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
  return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
  width: ${({ width = "100%" }) => width};
  font-size: ${({ fontSize = "18px" }) => fontSize};
  height: ${({ height = "50px" }) => height};
  margin: ${({ margin = "0 0 10px" }) => margin};
  padding: 10px;
  border: 1px solid #000;
  border-radius: ${({ borderradius = "0" }) => borderradius};
`;

Input.propTypes = {
  width: PropTypes.string,
};
