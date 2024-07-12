import { Button } from "../button/button";
import { selectCurrentPage, selectLastPage } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageAction } from "../../actions";
import styled from "styled-components";

const PaginationContainer = ({ className }) => {
  const dispatch = useDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const lastPage = useSelector(selectLastPage);

  const setPagePlus = () => {
    dispatch(setCurrentPageAction(currentPage + 1));
  };

  const setPageMinus = () => {
    dispatch(setCurrentPageAction(currentPage - 1));
  };

  const setFirstPage = () => {
    dispatch(setCurrentPageAction(1));
  };

  const setLastPage = () => {
    dispatch(setCurrentPageAction(lastPage));
  };

  return (
    <div className={className}>
      <Button disabled={currentPage === 1} onClick={() => setFirstPage()}>
        В начало
      </Button>
      <Button disabled={currentPage === 1} onClick={() => setPageMinus()}>
        Предыдущая
      </Button>
      <div className="current-page">Страница: {currentPage}</div>
      <Button disabled={currentPage === lastPage} onClick={() => setPagePlus()}>
        Следующая
      </Button>
      <Button disabled={currentPage === lastPage} onClick={() => setLastPage()}>
        В конец
      </Button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  bottom: 140px;
  margin: 0 0 20px;
  padding: 0 35px;

  & button {
    margin: 0 5px;
  }

  & .current-page {
    width: 100%;
    height: 32px;
    margin: 0px 5px;
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    text-align: center;
    border: 1px solid #000;
  }
`;
