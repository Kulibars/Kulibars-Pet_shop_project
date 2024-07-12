import { useDispatch } from "react-redux";
import { Pagination, SearchPanel } from "../../components";
import { AdministratorPanel, AllProducts } from "./components";
import { useEffect } from "react";
import {
  CLEAR_CURRENT_CATEGORY,
  setCurrentPageAction,
  setPaginationLimitAction,
} from "../../actions";
import { PAGINATION_LIMIT } from "../../constants";

export const Administrator = ({ className }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPaginationLimitAction(PAGINATION_LIMIT.ADMIN));
    dispatch(CLEAR_CURRENT_CATEGORY);
    dispatch(setCurrentPageAction(1));
  }, [dispatch]);

  return (
    <div className={className}>
      <AdministratorPanel />
      <SearchPanel />
      <AllProducts />
      <Pagination />
    </div>
  );
};
