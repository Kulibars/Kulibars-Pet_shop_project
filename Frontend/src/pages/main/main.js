import { Categories, ProductsList } from "./components";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  CLEAR_CURRENT_CATEGORY,
  setCurrentPageAction,
  setPaginationLimitAction,
} from "../../actions";
import { PAGINATION_LIMIT } from "../../constants";
import { SearchPanel } from "../../components";

const MainContainer = ({ className }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPaginationLimitAction(PAGINATION_LIMIT.MAIN));
    dispatch(CLEAR_CURRENT_CATEGORY);
    dispatch(setCurrentPageAction(1));
  }, [dispatch]);
  return (
    <div className={className}>
      <Categories />
      <SearchPanel />
      <ProductsList />
    </div>
  );
};

export const Main = styled(MainContainer)``;
