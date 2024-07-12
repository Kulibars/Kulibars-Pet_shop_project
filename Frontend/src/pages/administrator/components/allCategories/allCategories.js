import { AdministratorPanel } from "../administratorPanel/administratorPanel";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../../../../selectors";
import { useEffect, useState } from "react";
import {
  CLOSE_MODAL,
  deleteCategoryAsyncAction,
  openMessageWindowAction,
  openModalAction,
  setCurrentCategoriyAction,
} from "../../../../actions";
import { animalList } from "../../../../constants";
import { Icon } from "../../../../components";
import styled from "styled-components";
import { CategoryForm } from "./components";

const AllCategoriesContainer = ({ className }) => {
  const dispatch = useDispatch();

  const categories = useSelector(selectAllCategories);

  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [animalCategoriesList, setAnimalCategoriesList] = useState([]);
  const [editCategoryFlag, setEditCategoryFlag] = useState(false);

  useEffect(() => {
    if (categories.length) {
      setSelectedAnimal(categories[0].forAnimal);
      setAnimalCategoriesList(
        categories.filter(({ forAnimal }) => forAnimal === animalList[0])
      );
    }
  }, [categories]);

  const forAnimalSelect = ({ target }) => {
    setSelectedAnimal(target.value);
    const animalCategories = categories.filter(
      ({ forAnimal }) => forAnimal === target.value
    );
    setAnimalCategoriesList(animalCategories);
  };

  const removeCategory = (id) => {
    setEditCategoryFlag(false);
    dispatch(
      openModalAction({
        text: "Удалить категорию?",
        onConfirm: () => {
          dispatch(deleteCategoryAsyncAction(id)).then(
            (deleteCategoryMessage) =>
              dispatch(openMessageWindowAction(deleteCategoryMessage))
          );
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const editCategory = (id) => {
    dispatch(setCurrentCategoriyAction(id));
    setEditCategoryFlag(true);
  };

  return (
    <div className={className}>
      <AdministratorPanel />
      <select
        className="productSelector"
        value={selectedAnimal}
        onChange={forAnimalSelect}
      >
        {animalList.map((el, index) => (
          <option key={index}>{el}</option>
        ))}
      </select>
      {animalCategoriesList &&
        animalCategoriesList.map(({ id, name, description }) => (
          <div key={id} className="categoriy">
            <div className="details">{name}</div>
            <div className="details">{description}</div>
            <Icon
              onClick={() => removeCategory(id)}
              id="fa-trash-o"
              margin="6px 10px 6px 10px"
            />
            <Icon
              onClick={() => editCategory(id, name, description)}
              id="fa-paint-brush"
              margin="6px 10px 6px 10px"
            />
          </div>
        ))}
      {editCategoryFlag ? (
        <CategoryForm
          editCategoryFlag={editCategoryFlag}
          setEditCategoryFlag={setEditCategoryFlag}
          selectedAnimal={selectedAnimal}
        />
      ) : (
        <CategoryForm selectedAnimal={selectedAnimal} />
      )}
    </div>
  );
};

export const AllCategories = styled(AllCategoriesContainer)`
  margin: 30px 54px 0;

  & h4 {
    text-align: center;
  }

  & .categoriy {
    display: flex;
    margin: 10px auto;
    justify-content: center;
  }

  & .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 200px;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin: 0 4px 0 4px;
  }

  & .productSelector {
    display: flex;
    justify-content: space-between;
    margin: 26px auto;
    font-size: 14px;
    text-align: center;
    width: 410px;
    height: 40px;
  }
`;
