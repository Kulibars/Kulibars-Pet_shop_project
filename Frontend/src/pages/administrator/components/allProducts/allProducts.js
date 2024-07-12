import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories, selectAllProducts } from "../../../../selectors";
import { Icon, InfoElement, Loader } from "../../../../components";
import { useNavigate } from "react-router";
import { deleteProductAsyncAction } from "../../../../actions/delete-product-async-action";
import {
  CLOSE_MODAL,
  openMessageWindowAction,
  openModalAction,
} from "../../../../actions";
import { selectLoading } from "../../../../selectors/select-loading";
import styled from "styled-components";

const AllProductsContainer = ({ className }) => {
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);

  const loading = useSelector(selectLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeProduct = (id) => {
    dispatch(
      openModalAction({
        text: "Удалить товар?",
        onConfirm: () => {
          dispatch(deleteProductAsyncAction(id)).then((deleteProductMessage) =>
            dispatch(openMessageWindowAction(deleteProductMessage))
          );
          dispatch(CLOSE_MODAL);
        },

        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  if (loading) {
    return <Loader ContainerHeight="1520px" />;
  }

  return (
    <>
      <div className={className}>
        <div className="info">
          <div className="infoEl">id:</div>
          <div className="infoEl">Животное:</div>
          <div className="infoEl">Категория:</div>
          <div className="infoEl">Наименование:</div>
          <div className="infoEl">Стоимость:</div>
          <div className="infoEl">Количество:</div>
        </div>
        {products.map(({ id, animal, category, name, quantity, price }) => (
          <div key={id} className="product">
            <InfoElement>{id}</InfoElement>
            <InfoElement>{animal}</InfoElement>
            <InfoElement
              animal={animal}
              category={category}
              categories={categories}
            >
              {category}
            </InfoElement>
            <InfoElement>{name}</InfoElement>
            <InfoElement>{price}</InfoElement>
            <InfoElement quantity={quantity}>{quantity}</InfoElement>
            <div className="editingContainer">
              <Icon
                onClick={() => {
                  removeProduct(id);
                }}
                id="fa-trash-o"
                margin="6px 10px 6px 10px"
              />
              <Icon
                onClick={() => navigate(`/admin/${id}/edit`)}
                id="fa-paint-brush"
                margin="6px 10px 6px 10px"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const AllProducts = styled(AllProductsContainer)`
  margin: 30px 54px 0;
  height: 1374px;
  & .product {
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }

  // & .details {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   text-align: center;
  //   width: 200px;
  //   background-color: #e6e6e6;
  //   border-radius: 5px;
  //   margin: 0 4px 0 4px;
  // }

  & .info {
    margin: 10px;
    margin-right: 94px;
    display: flex;
    justify-content: space-between;
  }

  & .infoEl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
    text-align: center;
    width: 200px;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin: 0 4px 0 4px;
  }

  & .editingContainer {
    background-color: #e6e6e6;
    display: flex;
    border-radius: 5px;
  }
`;
