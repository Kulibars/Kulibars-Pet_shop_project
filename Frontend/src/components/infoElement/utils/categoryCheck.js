export const categoryCheck = (category, categories, animal, quantity) => {
  if (categories) {
    const checkCategor = categories.find(
      ({ name, forAnimal }) => name === category && forAnimal === animal
    );
    return !checkCategor ? "#fec40e" : "#e6e6e6";
  }
  if (quantity === 0) {
    return "#fec40e";
  }
  return "#e6e6e6";
};
