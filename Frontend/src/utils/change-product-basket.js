export const changeProductBasket = (arrayBasket, payload, type) => {
  if (type === "INPUT") {
    return arrayBasket.forEach(({ product }, index) => {
      if (product.id === payload.id) {
        return (arrayBasket[index].quantityInBasket = payload.quantity);
      }
    });
  }
  if (type === "PLUS") {
    return arrayBasket.forEach(({ product }, index) => {
      if (product.id === payload.id) {
        return (arrayBasket[index].quantityInBasket += 1);
      }
    });
  } else if (type === "MINUS") {
    return arrayBasket.forEach(({ product }, index) => {
      if (product.id === payload.id) {
        return (arrayBasket[index].quantityInBasket -= 1);
      }
    });
  }
};
