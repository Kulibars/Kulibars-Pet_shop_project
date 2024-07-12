import { changeFormatPrice } from "./change-format-price";
export const calculateAmount = (productsBasket) => {
  let sumPrice = 0;
  productsBasket.forEach(({ product: { price }, quantityInBasket }) => {
    sumPrice = sumPrice + quantityInBasket * price;
  });

  return changeFormatPrice(sumPrice);
};
