import { useEffect, useState } from "react";

export const useAddToBasket = (productInBasket, id, quantity) => {
  const [inBasket, setInBasket] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(inBasket);

  useEffect(() => {
    if (quantity === 0) {
      setButtonDisabled(true);
      return;
    }
    !inBasket ? setButtonDisabled(false) : setButtonDisabled(true);
    setInBasket(productInBasket.find(({ product }) => product.id === id));
  }, [productInBasket, id, inBasket, quantity]);

  return { inBasket, buttonDisabled, setButtonDisabled };
};
