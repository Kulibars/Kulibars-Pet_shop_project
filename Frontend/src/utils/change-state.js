export const changeState = (data, payload, type) => {
  if (type === "UPDATE") {
    const copyData = [...data];
    copyData.forEach(({ id }, index) => {
      if (id === payload.id) {
        copyData[index] = { ...payload };
      }
    });
    return copyData;
  } else if (type === "DELETE") {
    return data.filter((product) => product.id !== payload);
  } else if (type === "ADD") {
    data.push(payload);
    return data;
  }
};
