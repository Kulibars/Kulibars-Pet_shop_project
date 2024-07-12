import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectWindowIsOpen, selectWindowText } from "../../selectors";
import { CLOSE_WINDOW } from "../../actions";

const MessageWindowContainer = ({ className }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectWindowIsOpen);
  const text = useSelector(selectWindowText);

  if (isOpen) {
    setTimeout(() => {
      dispatch(CLOSE_WINDOW);
    }, 900);
  }

  if (!isOpen) {
    return null;
  }

  return <div className={className}>{text}</div>;
};

export const MessageWindow = styled(MessageWindowContainer)`
    color: #fff;
    font-size: 25px;
    position: fixed;
    text-align: center;
    border-radius: 25px;
    background-color: #5c5959cc;
    padding: 30px 25px 30px;
    width: 400px;
    margin: 0px 552px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 100;
  }
`;

// & .boxWindow {}
// position: fixed;
// bottom: 0;
// left: 0;
// right: 0;
// top: 0;
// z-index: 20;
