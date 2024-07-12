import { CategoryItem } from "./components";
import cat from "../../../../Images/animals/cat.svg";
import dog from "../../../../Images/animals/dog.svg";
import fish from "../../../../Images/animals/fish.svg";
import bird from "../../../../Images/animals/bird.svg";
import rodents from "../../../../Images/animals/rodent.svg";
import { selectAllCategories } from "../../../../selectors";

import styled from "styled-components";
import { useSelector } from "react-redux";

const CategoriesContainer = ({ className }) => {
  const categories = useSelector(selectAllCategories);

  return (
    <div className={className}>
      <div className="mainCategory">
        <CategoryItem
          forAnimal="Для кошек"
          animal="cats"
          animalImages={cat}
          categories={categories.filter((el) => el.forAnimal === "cats")}
        />
        <CategoryItem
          forAnimal="Для собак"
          animal="dogs"
          animalImages={dog}
          categories={categories.filter((el) => el.forAnimal === "dogs")}
        />
        <CategoryItem
          forAnimal="Для птиц"
          animal="birds"
          animalImages={bird}
          categories={categories.filter((el) => el.forAnimal === "birds")}
        />
        <CategoryItem
          forAnimal="Для рыб"
          animal="fish"
          animalImages={fish}
          categories={categories.filter((el) => el.forAnimal === "fish")}
        />
        <CategoryItem
          forAnimal="Для грызунов"
          animal="rodents"
          animalImages={rodents}
          categories={categories.filter((el) => el.forAnimal === "rodents")}
        />
      </div>
    </div>
  );
};

export const Categories = styled(CategoriesContainer)`
  margin-left: auto;
  margin-right: auto;
  max-width: 1360px;
  & .mainCategory {
    display: flex;
    margin: 10px;
    justify-content: space-between;
  }
`;
