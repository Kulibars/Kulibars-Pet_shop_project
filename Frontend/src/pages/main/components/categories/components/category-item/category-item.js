import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  setCurrentCategoriyAction,
  setCurrentPageAction,
} from "../../../../../../actions";
import { useClickOutside } from "../../../../../../hooks";
import { useRef, useState } from "react";

const CategoryItemContainer = ({
  id,
  className,
  forAnimal,
  animalImages,
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const getCategory = (id) => {
    dispatch(setCurrentCategoriyAction(id));
    dispatch(setCurrentPageAction(1));
    setIsOpen(false);
  };

  const openMenu = () => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 100);
    } else {
      setIsOpen(true);
    }
  };

  useClickOutside(ref, openMenu);

  return (
    <div className={className}>
      <div className="animalCard" onClick={() => openMenu()}>
        <div className="categories">{forAnimal}</div>
        <div className="categoryImg">
          <img src={animalImages} alt={forAnimal} />
        </div>
      </div>

      {isOpen && (
        <div ref={ref} className="categoryCard">
          <h1>{forAnimal}</h1>
          <div>
            {categories.map(({ id, name }) => (
              <div
                className="categoriyItem"
                key={id}
                onClick={() => getCategory(id)}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const CategoryItem = styled(CategoryItemContainer)`
  text-align: center;
  & .animalCard {
    margin: 10px;
    max-width: 250px;
    background-color: #fec40e;
    width: 226px;
    height: 259px;
    border-radius: 20px;
  }

  & .animalCard:hover {
    cursor: pointer;
    box-shadow: 0 0 0 2px white, 0 0 0 4px #fec40e;
  }

  & .categoryImg {
    margin: 60px 0px 0px 7px;
    display: flex;
    width: 211px;
  }

  & img {
    width: 100%;
  }

  & .categories {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
  }

  & .categoryCard {
    z-index: 5;
    padding: 4px;
    position: absolute;
    background-color: aliceblue;
    margin-top: 0px;
    display: flex;
    border-radius: 20px;
    width: 254px;
    flex-direction: column;
  }

  & .categoriyItem {
    padding: 5px;
    font-size: 24px;
    cursor: pointer;
    margin: 3px 14px;
    border-radius: 8px;
  }

  & .categoriyItem:hover {
    transform: 0.3s;
    transition: 0.3s;
    background-color: #dce0e3;
  }
`;
