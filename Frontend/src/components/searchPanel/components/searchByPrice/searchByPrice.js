import styled from "styled-components";
import { Input } from "../../../input/input";
import { Button } from "../../../button/button";

const SearchByPriceContainer = ({
  className,
  borderradius,
  onMinPriceSearch,
  minPrice,
  onMaxPriceSearch,
  maxPrice,
  onSortPriceOrder,
  sortPriceButtonText,
}) => {
  return (
    <div className={className}>
      <h4>поиск по цене</h4>
      <Input
        type="number"
        borderradius={borderradius}
        margin="0 20px 0 0"
        width="100px"
        placeholder="от"
        value={minPrice}
        onChange={onMinPriceSearch}
      />
      <Input
        type="number"
        borderradius={borderradius}
        margin="0 20px 0 0"
        width="100px"
        placeholder="до"
        value={maxPrice}
        onChange={onMaxPriceSearch}
      />
      <Button height="50px" onClick={() => onSortPriceOrder()} width="130px">
        {sortPriceButtonText}
      </Button>
    </div>
  );
};
export const SearchByPrice = styled(SearchByPriceContainer)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  width: 435px;
  margin: 0px auto 40px;
  display: flex;
  & > h4 {
    margin: 4px auto 0px auto;
  }
`;
