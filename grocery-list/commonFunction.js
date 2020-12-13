const returnCurrentUserName = () => localStorage.getItem("currentUser");

const findUserProductList = (existingProductList, currentUserName, type) => {
  let findProductUserNameValue;
  let filteredArray = existingProductList.filter(key => {
    findProductUserNameValue = Object.keys(key);

    if (type === "current") {
      return currentUserName === findProductUserNameValue[0];
    }
    if (type === "other") {
      return currentUserName != findProductUserNameValue[0];
    }
  });
  if (type === "list") {
  }
  return filteredArray;
};
const getExistingProductList = () => {
  let existingProductList = localStorage.getItem("productsList");
  if (existingProductList) return JSON.parse(existingProductList);
  else return null;
};

const onInputValueChange = event => {
  let inputType = document.getElementById(event.target.id);
  inputType.setAttribute("value", event.target.value);
};

const redirectToHomePage = () => {
  window.location.reload();
};

const deleteCurrentUser = () => {
  localStorage.removeItem("currentUser");
  redirectToHomePage();
};
