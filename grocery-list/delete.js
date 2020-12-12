const onClickDelete = event => {
  const existingProducts = getExistingProductList();
  let currentUserName = returnCurrentUserName();
  let otherUserProductList = findUserProductList(
    existingProducts,
    currentUserName,
    "other"
  );
  let currentUserProductList = findUserProductList(
    existingProducts,
    currentUserName,
    "current"
  );
  let filteredArrayExceptDeleteProduct = currentUserProductList[0][
    currentUserName
  ].filter(key => key != event.target.value);
  currentUserProductList[0][currentUserName] = filteredArrayExceptDeleteProduct;
  otherUserProductList.push(currentUserProductList[0]);
  localStorage.setItem("productsList", JSON.stringify(otherUserProductList));

  listAllTheItems(event.target.value);
};
