import "./App.css";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsCategoriesAction,
  setUserAction,
  setProductsToBasketAction,
  lastPageAction,
  LOADING_START,
  LOADING_END,
  setProductsAction,
} from "./actions";
import { Header, Footer, MessageWindow } from "./components";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { guestRoute, adminRoute } from "./routes/routes";
import {
  selectBasketProducts,
  selectCurrentCategory,
  selectCurrentPage,
  selectMaxPrice,
  selectMinPrice,
  selectPaginationLimit,
  selectSearchPhrase,
  selectSortPriceOrder,
  selectUserRole,
} from "./selectors";
import { ROLE } from "./constants";
import { checkAccess, request } from "./utils";
import { Modal } from "./components";
// ==============

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1514px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;

const Page = styled.div`
  padding: 0 0 20px;
  margin-top: 100px;
`;

export const ZooMag = () => {
  const dispatch = useDispatch();

  const roleId = useSelector(selectUserRole);
  const productsBasket = useSelector(selectBasketProducts);
  const currentCategory = useSelector(selectCurrentCategory);
  const searchPhrase = useSelector(selectSearchPhrase);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const sortPriceOrder = useSelector(selectSortPriceOrder);
  const currentPage = useSelector(selectCurrentPage);
  const currentPaginationLimit = useSelector(selectPaginationLimit);

  const isAdmin = checkAccess([ROLE.ADMINISTRATOR], roleId);
  const savedLocalStorageBasket = JSON.parse(
    localStorage.getItem("productsBasket")
  );

  useLayoutEffect(() => {
    dispatch(
      setProductsToBasketAction(
        savedLocalStorageBasket ? savedLocalStorageBasket : []
      )
    );
    const currentUserDataJSON = sessionStorage.getItem("userData");

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUserAction({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("productsBasket", JSON.stringify(productsBasket));
  }, [productsBasket]);

  useEffect(() => {
    dispatch(getProductsCategoriesAction());
    dispatch(LOADING_START);
    request(
      `/products?searchPhrase=${searchPhrase}&animal=${currentCategory.forAnimal}&category=${currentCategory.name}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortPriceOrder=${sortPriceOrder}&page=${currentPage}&limit=${currentPaginationLimit}`
    )
      .then(({ data: { products: productsData, lastPage } }) => {
        dispatch(setProductsAction(productsData));
        dispatch(lastPageAction(lastPage));
      })
      .then(() => dispatch(LOADING_END));
  }, [
    dispatch,
    currentCategory,
    searchPhrase,
    minPrice,
    maxPrice,
    sortPriceOrder,
    currentPage,
    currentPaginationLimit,
  ]);

  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          {guestRoute.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          {isAdmin &&
            adminRoute.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
        </Routes>
        <Modal />
        <MessageWindow />
      </Page>
      <Footer />
    </AppColumn>
  );
};
