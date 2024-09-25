import styled from "styled-components";
import { Logo } from "./components";
import { ControlPanel } from "./components";

const HeaderContainer = ({ className }) => {
  return (
    <header className={className}>
      <Logo />
      <ControlPanel />
    </header>
  );
};

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background: #fff5cd;
  width: 100%;
  height: 100px;
  align-items: center;
  z-index: 6;
  padding: 20px 25px;
  position: fixed;
`;
