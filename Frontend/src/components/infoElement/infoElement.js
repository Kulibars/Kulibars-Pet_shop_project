import styled from "styled-components";
import { categoryCheck } from "./utils";

const InfoElementContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const InfoElement = styled(InfoElementContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 200px;
  background-color: ${({ category, categories, animal, quantity }) =>
    categoryCheck(category, categories, animal, quantity)};

  border-radius: 5px;
  margin: 0 4px 0 4px;
`;
