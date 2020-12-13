const saveOnEdit = event => {
  let currentInputvalue = document.getElementById(event.target.value);

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
  let indexOfCurent = currentUserProductList[0][currentUserName].indexOf(
    event.target.value
  );
  currentUserProductList[0][currentUserName][indexOfCurent] =
    currentInputvalue.value;
  otherUserProductList.push(currentUserProductList[0]);
  localStorage.setItem("productsList", JSON.stringify(otherUserProductList));
  listAllTheItems(event.target.value);
};

const onClickEdit = event => {
  let editableNode = document.getElementById(event.target.value);
  let afterEditSaveButton = document.getElementById(
    event.target.value + "save"
  );
  editableNode.disabled = false;
  editableNode.addEventListener("keydown", onInputValueChange, false);
  afterEditSaveButton.style.display = "initial";
};
