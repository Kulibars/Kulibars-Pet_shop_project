import styled from "styled-components";
import { Button, Input } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  CANCEL_EDIT_CATEGORY,
  newCategoryAction,
  openMessageWindowAction,
  updateCategoryAction,
} from "../../../../../actions";
import { selectCurrentCategory } from "../../../../../selectors";

const CategoryFormContainer = ({
  className,
  editCategoryFlag,
  setEditCategoryFlag,
  selectedAnimal,
}) => {
  const currentCategory = useSelector(selectCurrentCategory);
  const infoText = editCategoryFlag
    ? `изменить категорию ${currentCategory.name} для ${currentCategory.forAnimal}:`
    : `Добавить новую категорию для ${selectedAnimal}:`;

  const dispatch = useDispatch();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [forAnimal, setForAnimal] = useState("");

  useEffect(() => {
    if (editCategoryFlag) {
      setForAnimal(currentCategory.forAnimal);
      setCategoryName(currentCategory.name);
      setCategoryDescription(currentCategory.description);
      setCategoryId(currentCategory.id);
      return;
    }
    setForAnimal(selectedAnimal);
    setCategoryName("");
    setCategoryDescription("");
    setCategoryId("");
  }, [editCategoryFlag, currentCategory, selectedAnimal]);

  const saveCategory = () => {
    setButtonDisabled(true);
    const reqProduct = categoryId
      ? dispatch(
          updateCategoryAction(categoryId, {
            forAnimal: forAnimal,
            name: categoryName,
            description: categoryDescription,
          })
        )
      : dispatch(
          newCategoryAction({
            forAnimal: forAnimal,
            name: categoryName,
            description: categoryDescription,
          })
        );
    reqProduct
      .then(({ message, error }) => {
        dispatch(openMessageWindowAction(message || error));
        setButtonDisabled(false);
      })
      .then(() => {
        setCategoryName("");
        setCategoryDescription("");
        if (setEditCategoryFlag) {
          setEditCategoryFlag(false);
        }
      });
  };

  const cancelEdit = () => {
    dispatch(CANCEL_EDIT_CATEGORY);
    setEditCategoryFlag(false);
    setCategoryName("");
    setCategoryDescription("");
  };

  return (
    <>
      <h4>{infoText}</h4>
      <div className={className}>
        <Input
          value={categoryName}
          onChange={({ target }) => setCategoryName(target.value)}
          className="inputCategoriy"
          placeholder="Наименование"
        />
        <Input
          value={categoryDescription}
          onChange={({ target }) => setCategoryDescription(target.value)}
          className="inputCategoriy"
          placeholder="Описание"
        />
        <div className="buttons">
          <Button
            disabled={buttonDisabled}
            margin="0px 17px 0px 0px"
            onClick={() => saveCategory()}
          >
            Сохронить
          </Button>

          {editCategoryFlag && (
            <Button
              disabled={buttonDisabled}
              margin="0 0 0 0"
              onClick={() => cancelEdit()}
            >
              Отмена
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export const CategoryForm = styled(CategoryFormContainer)`
  display: flex;
  justify-content: center;
  margin: 20px auto;

  & .inputCategoriy {
    height: 40px;
    margin: 9px;
    width: 245px;
  }

  & .buttons {
    margin: 9px;
    display: flex;
    height: 39px;
  }
`;
