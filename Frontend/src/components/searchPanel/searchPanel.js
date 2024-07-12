import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  CLEAR_CURRENT_CATEGORY,
  CLEAR_SEARCH,
  maxPriceAction,
  minPriceAction,
  searchPhraseAction,
  setCurrentPageAction,
  sortPriceOrderAction,
} from "../../actions";
import { selectCurrentCategory } from "../../selectors";
import { debounce } from "./utils";
import { Button } from "../button/button";
import { SearchByPhrase, SearchByPrice } from "./components";
import styled from "styled-components";

const SearchPanelContainer = ({ className }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortPriceOrder, setSortPriceOrder] = useState("desc");
  const [shouldSearch, setShouldSearch] = useState(false);
  const dispatch = useDispatch();
  const currentCategory = useSelector(selectCurrentCategory);

  const sortPriceButtonText =
    sortPriceOrder === "desc" ? "По убыванию" : "по возрастанию";

  useEffect(() => {
    dispatch(searchPhraseAction(searchPhrase));
    dispatch(minPriceAction(minPrice));
    dispatch(maxPriceAction(maxPrice));
    dispatch(sortPriceOrderAction(sortPriceOrder));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSearch, currentCategory, sortPriceOrder]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onPhraseSearch = ({ target }) => {
    setSearchPhrase(target.value);
    dispatch(setCurrentPageAction(1));
    startDelayedSearch(!shouldSearch);
  };

  const onMinPriceSearch = ({ target }) => {
    setMinPrice(target.value);
    dispatch(setCurrentPageAction(1));
    startDelayedSearch(!shouldSearch);
  };

  const onMaxPriceSearch = ({ target }) => {
    setMaxPrice(target.value);
    dispatch(setCurrentPageAction(1));
    startDelayedSearch(!shouldSearch);
  };

  const onSortPriceOrder = () => {
    if (sortPriceOrder === "incr") {
      setSortPriceOrder("desc");
    } else {
      setSortPriceOrder("incr");
    }
  };

  const clearCategory = () => {
    dispatch(CLEAR_CURRENT_CATEGORY);
    dispatch(CLEAR_SEARCH);
    setSortPriceOrder("desc");
    setSearchPhrase("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className={className}>
      <SearchByPhrase
        borderradius="10px"
        searchPhrase={searchPhrase}
        onChange={onPhraseSearch}
      />
      <SearchByPrice
        sortPriceButtonText={sortPriceButtonText}
        borderradius="10px"
        onMinPriceSearch={onMinPriceSearch}
        minPrice={minPrice}
        onMaxPriceSearch={onMaxPriceSearch}
        maxPrice={maxPrice}
        onSortPriceOrder={onSortPriceOrder}
      />
      <Button
        onClick={clearCategory}
        height="50px"
        margin="0 40px 0 0"
        width="130px"
      >
        Все товары
      </Button>
    </div>
  );
};

export const SearchPanel = styled(SearchPanelContainer)`
  display: flex;
  margin: 60px auto 0px auto;
  width: 1192px;
  height: 50px;
`;
