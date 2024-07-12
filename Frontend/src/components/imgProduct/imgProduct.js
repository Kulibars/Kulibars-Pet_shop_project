import styled from "styled-components";

const ImgProductContainer = ({
  className,
  children,
  quantity,
  currentItem,
}) => {
  return (
    <div className={className}>
      {quantity === 0 && <div className="notAvailable">НЕТ В НАЛИЧИИ</div>}
      {children}
    </div>
  );
};

export const ImgProduct = styled(ImgProductContainer)`
  ${({ currentItem }) =>
    currentItem === "card" &&
    "display: flex; justify-content: center; max-width: 100%; height: 191px; padding: 30px;"}

  ${({ currentItem }) =>
    currentItem === "1" &&
    "display: flex; height: 315px; justify-content: center;"}

  & .notAvailable {
    color: #fff;
    background: #282c2fab;
    border-radius: 1rem;
    padding: 24px 14px;
    height: 82px;
    width: 245px;
    margin: ${({ currentItem }) =>
      currentItem === "1" ? "100px auto" : "25px auto"};
    font-weight: 700;
    font-size: 25px;
    position: absolute;
  }
`;
