import {
  selectAllProducts,
  selectCurrentCategory,
  selectLastPage,
} from "../../../../selectors";
import { useSelector } from "react-redux";
import { ProductCard } from "./components";
import styled from "styled-components";
import { Error, Loader } from "../../../../components";
import { selectLoading } from "../../../../selectors/select-loading";
import { Pagination } from "../../../../components";

const ProductsListContainer = ({ className }) => {
  const products = useSelector(selectAllProducts);
  const currentCategory = useSelector(selectCurrentCategory);
  const lastPage = useSelector(selectLastPage);
  const loading = useSelector(selectLoading);

  if (loading) {
    return <Loader />;
  }

  if (!products.length && !loading) {
    return <Error error="нет товаров" />;
  }
  return (
    <div className={className}>
      {currentCategory && <h3>{currentCategory.description}</h3>}
      <div className="productsList">
        {products.map(({ id, imageUrl, name, price, animal, quantity }) => (
          <ProductCard
            quantity={quantity}
            key={id}
            id={id}
            name={name}
            price={price}
            animal={animal}
            imageUrl={imageUrl}
          />
        ))}
      </div>
      {lastPage > 1 && <Pagination />}
    </div>
  );
};

export const ProductsList = styled(ProductsListContainer)`
  width: 1342px;
  height: 1453px;
  margin: auto;
  display: flex;
  flex-direction: column;

  & h3 {
    font-size: 30px;
    margin: 30px auto;
  }

  & .productsList {
    height: 1314px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 20px;
  }
`;
