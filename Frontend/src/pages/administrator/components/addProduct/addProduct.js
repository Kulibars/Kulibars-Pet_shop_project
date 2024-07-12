import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllCategories } from "../../../../selectors";
import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router";

import {
  CLEAR_CURRENT_PRODUCT,
  getProductsCategoriesAction,
  setProductAction,
  setErrorAction,
  LOADING_START,
  LOADING_END,
  openMessageWindowAction,
  updateProductAction,
  newProductAction,
} from "../../../../actions";
import { selectProduct } from "../../../../selectors/select-product";
import { animalList } from "../../../../constants";
import { request } from "../../../../utils";
import { selectLoading } from "../../../../selectors/select-loading";
import { AdministratorPanel } from "../administratorPanel/administratorPanel";
import { Button, Input, Loader } from "../../../../components";

const AddProductContainer = ({ className }) => {
  const { id: paramsId } = useParams();

  const isCreating = !!useMatch("/admin/addProduct");
  const isEditing = !!useMatch("/admin/:id/edit");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState("Выберете животное");
  const [selectedAnimalCategoriesList, setSelectedAnimalCategoriesList] =
    useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const product = useSelector(selectProduct);
  const loading = useSelector(selectLoading);
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    dispatch(getProductsCategoriesAction);
    if (paramsId) {
      dispatch(LOADING_START);
      dispatch(CLEAR_CURRENT_PRODUCT);
      request(`/products/${paramsId}`)
        .then(({ data, error }) => {
          dispatch(setProductAction(data));
          dispatch(setErrorAction(error));
        })
        .then(() => dispatch(LOADING_END));
    }
  }, [dispatch, isEditing, paramsId]);

  useEffect(() => {
    if (product) {
      const categoryForProduct = categories.filter(
        ({ forAnimal }) => forAnimal === product.animal
      );
      if (categoryForProduct.length) {
        setSelectedAnimalCategoriesList(categoryForProduct);
        setSelectedAnimal(product.animal);
        setCategory(product.category);
        setProductName(product.name);
        setProductDescription(product.description);
        setQuantity(product.quantity);
        setPrice(product.price);
        setImageUrl(product.imageUrl);
      }
    }
    if (categories.length && isCreating) {
      setSelectedAnimalCategoriesList(
        categories.filter(({ forAnimal }) => forAnimal === animalList[0])
      );
      setSelectedAnimal(categories[0].forAnimal);
      setCategory(categories[0].name);

      setProductName("");
      setProductDescription("");
      setQuantity("");
      setPrice("");
      setImageUrl("");
    }
  }, [product, categories, isCreating, isEditing]);

  const forAnimalSelect = ({ target }) => {
    setSelectedAnimal(target.value);
    const allAnimalCategories = categories.filter(
      ({ forAnimal }) => forAnimal === target.value
    );
    setCategory(allAnimalCategories[0].name);
    setSelectedAnimalCategoriesList(allAnimalCategories);
  };
  const selectCategory = ({ target }) => {
    setCategory(target.value);
  };

  const changePrice = ({ target }) => setPrice(target.value);
  const changeQuantity = ({ target }) => setQuantity(target.value);
  const changeProductName = ({ target }) => setProductName(target.value);
  const changeImageUrl = ({ target }) => setImageUrl(target.value);
  const changeProductDescription = ({ target }) =>
    setProductDescription(target.value);

  const saveProduct = () => {
    setButtonDisabled(true);
    const reqProduct = paramsId
      ? dispatch(
          updateProductAction(paramsId, {
            imageUrl: imageUrl,
            animal: selectedAnimal,
            category: category,
            name: productName,
            description: productDescription,
            quantity,
            price,
          })
        )
      : dispatch(
          newProductAction({
            imageUrl: imageUrl,
            animal: selectedAnimal,
            category: category,
            name: productName,
            description: productDescription,
            quantity,
            price,
          })
        );
    reqProduct.then(({ message, error }) => {
      dispatch(openMessageWindowAction(message || error));
      !error && navigate("/admin");
      error && setButtonDisabled(false);
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AdministratorPanel />
      <div className={className}>
        <div className="AboutProduct">
          <div>Для:</div>
          <select
            className="productSelector"
            value={selectedAnimal}
            onChange={forAnimalSelect}
          >
            {animalList.map((el, index) => (
              <option key={index}>{el}</option>
            ))}
          </select>
          <div>Категория:</div>
          <select
            className="productSelector"
            value={category}
            onChange={selectCategory}
          >
            {selectedAnimalCategoriesList.map(({ name, id }) => (
              <option key={id}>{name}</option>
            ))}
          </select>
          <div>Цена:</div>
          <Input
            margin="16px"
            height="40px"
            value={price}
            placeholder="Цена"
            onChange={changePrice}
          />
          <div>количество на складе:</div>
          <Input
            margin="16px"
            height="40px"
            value={quantity}
            placeholder="количество на складе"
            onChange={changeQuantity}
          />
        </div>
        <div className="nameAndDescription">
          <div className="nameinput">
            <div>Наиминование товара:</div>
            <Input
              margin="16px"
              height="40px"
              value={productName}
              placeholder="Наиминование товара"
              onChange={changeProductName}
            />
            <div>URL изображения товара:</div>
            <Input
              margin="16px"
              height="40px"
              value={imageUrl}
              placeholder="URL изображения товара"
              onChange={changeImageUrl}
            />
          </div>

          <textarea
            value={productDescription}
            className="productDescription"
            placeholder="Описание товара"
            onChange={changeProductDescription}
          />
        </div>
        <div className="saveButton">
          <Button disabled={buttonDisabled} onClick={() => saveProduct()}>
            сохронить
          </Button>
        </div>
      </div>
    </>
  );
};

export const AddProduct = styled(AddProductContainer)`
  padding: 0 26px 0 26px;
  & .AboutProduct {
    display: flex;
    justify-content: space-between;
  }

  & .productSelector {
    display: flex;
    justify-content: space-between;
    margin: 16px;
    font-size: 14px;
    text-align: center;
    width: 250px;
    height: 40px;
  }

  & .inputproduct {
    margin: 16px;
  }

  & .nameAndDescription {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  & .nameAndDescription .nameinput {
    display: flex;
    justify-content: space-between;
  }

  & .nameAndDescription .inputproduct {
    width: 100%;
  }

  & .productDescription {
    resize: none;
    height: 250px;
    font-size: 23px;
  }

  & .saveButton {
    margin: 10px auto;
    width: 226px;
  }
`;
