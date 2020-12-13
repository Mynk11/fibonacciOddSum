const saveProductName = event => {
  event.preventDefault();
  let existingProductList = getExistingProductList();
  let currentUserName = returnCurrentUserName();
  let productName = document.getElementById("productName").value;
  let currentUserProducts = [];

  if (existingProductList) {
    let remainingExceptCurrent = findUserProductList(
      existingProductList,
      currentUserName,
      "other"
    );

    currentUserProducts = findUserProductList(
      existingProductList,
      currentUserName,
      "current"
    );

    if (currentUserProducts && currentUserProducts.length > 0) {
      if (currentUserProducts[0][currentUserName].length > 4) {
        alert("you can't add more than 5");

        return;
      }
      if (currentUserProducts[0][currentUserName].includes(productName)) {
        alert("product already added");
        return;
      }
      currentUserProducts[0][currentUserName].push(productName);

      if (remainingExceptCurrent && remainingExceptCurrent.length > 0) {
        remainingExceptCurrent.push(currentUserProducts[0]);
        currentUserProducts = remainingExceptCurrent;
      }
    } else {
      currentUserProducts =
        remainingExceptCurrent && remainingExceptCurrent.length > 0
          ? remainingExceptCurrent
          : [];

      currentUserProducts.push({ [currentUserName]: [productName] });
    }
  } else {
    currentUserProducts.push({ [currentUserName]: [productName] });
  }

  localStorage.setItem("productsList", JSON.stringify(currentUserProducts));
  listAllTheItems();
};
