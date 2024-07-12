export const searchByCategory = (products, categorySearch, animalSearch) => {
  let arrayProducts = [];

  if (categorySearch !== "") {
    arrayProducts = products.filter(
      ({ category, animal }) =>
        category === categorySearch && animal === animalSearch
    );
  } else {
    arrayProducts = products;
  }

  return arrayProducts;
};
