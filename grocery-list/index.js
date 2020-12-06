document.getElementsByClassName("paddingTop")[0].style.display = "none";
document.getElementById("productFormDiv").style.display = "none";
document.getElementsByClassName("showProductList")[0].style.display = "none";
const listAllTheItems = value => {
  document.getElementsByClassName("paddingTop")[0].style.display = "none";
  //document.getElementsByClassName("productFormDiv")[0].style.display = "none";
  document.getElementById("productFormDiv").style.display = "none";
  const existingProducts = getExistingProductList();
  let currentUserName = returnCurrentUserName();
  let userProductList = findUserProductList(
    existingProducts,
    currentUserName,
    "current"
  );
  let mainDiv = document.getElementsByClassName("centerTheDiv")[0];
  let parent = document.getElementsByClassName("showProductList")[0];
  mainDiv.removeChild(parent);
  parent = document.createElement("DIV");
  parent.setAttribute("class", "showProductList");
  parent.style.display = "block";
  mainDiv.appendChild(parent);
  //   let childNodes = parent.childNodes;
  //   console.log("childNodes", childNodes.length);

  //   if (childNodes && childNodes.length) {
  //     for (children in childNodes) {
  //       console.log("children=========>", children);

  //       parent.removeChild(childNodes[children]);
  //     }
  //   }

  //parent.removeChild("button");
  if (userProductList && userProductList.length > 0) {
    let referenceArrayForChildNode = userProductList[0][currentUserName];
    for (i = 0; i < referenceArrayForChildNode.length; i++) {
      let node = document.createElement("LI"); // Create a <li> node
      let editButton = document.createElement("BUTTON");
      let deleteButton = document.createElement("BUTTON");
      let afterEditSaveButton = document.createElement("BUTTON");
      let input = document.createElement("INPUT");
      input.setAttribute("value", referenceArrayForChildNode[i]);
      input.setAttribute("id", referenceArrayForChildNode[i]);
      input.setAttribute("disabled", true);
      input.addEventListener("keydown", onInputValueChange, false);
      node.setAttribute("class", referenceArrayForChildNode[i]);
      afterEditSaveButton.setAttribute(
        "id",
        referenceArrayForChildNode[i] + "save"
      );
      afterEditSaveButton.style.display = "none";
      afterEditSaveButton.setAttribute("value", referenceArrayForChildNode[i]);
      afterEditSaveButton.append("Save");
      afterEditSaveButton.addEventListener("click", saveOnEdit, false);
      editButton.setAttribute("value", referenceArrayForChildNode[i]);
      editButton.addEventListener("click", onClickEdit, false);
      editButton.setAttribute("id", referenceArrayForChildNode[i]);
      deleteButton.setAttribute("id", referenceArrayForChildNode[i]);
      editButton.append("Edit");
      deleteButton.setAttribute("value", referenceArrayForChildNode[i]);
      deleteButton.addEventListener("click", onClickDelete, false);
      deleteButton.append("Delete");
      // Create a text node
      // node.append(referenceArrayForChildNode[i]);
      node.appendChild(input);
      node.appendChild(editButton);
      node.appendChild(deleteButton);
      node.appendChild(afterEditSaveButton);
      parent.appendChild(node); ///append Item
    }
  }
};
const onInputValueChange = event => {
  console.log("event.target.id");

  let inputType = document.getElementById(event.target.id);
  inputType.setAttribute("value", event.target.value);
  console.log(
    "inputType=====>",
    inputType,
    event.target.value,
    event.target.id
  );
};
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

  console.log(
    "Save on Edit called",
    currentInputvalue.value,
    currentUserProductList
  );
  otherUserProductList.push(currentUserProductList[0]);
  localStorage.setItem("productsList", JSON.stringify(otherUserProductList));
  listAllTheItems(event.target.value);
  console.log("otherUserProductList=========>", otherUserProductList);
};

const onClickEdit = event => {
  let editableNode = document.getElementById(event.target.value);
  let afterEditSaveButton = document.getElementById(
    event.target.value + "save"
  );
  editableNode.disabled = false;
  editableNode.addEventListener("keydown", onInputValueChange, false);
  afterEditSaveButton.style.display = "block";
  //console.log("onClickEdit===>", editableNode, afterEditSaveButton);
};
const onClickDelete = event => {
  //console.log("onClickDelete===>", event.target);

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
  console.log("otherUserProductList=======>", otherUserProductList);
  localStorage.setItem("productsList", JSON.stringify(otherUserProductList));

  listAllTheItems(event.target.value);
};

const addAItemInTheList = () => {
  document.getElementById("productFormDiv").style.display = "block";
};

const EditAItemInTheList = () => {
  console.log("EditAItemInTheList");
};

const DeleteAItemFromTheList = () => {
  console.log("DeleteAItemFromTheList");
};

const returnCurrentUserName = () => localStorage.getItem("currentUser");

const checkForUseName = event => {
  event.preventDefault();
  let item = localStorage.getItem("usersList");
  let name = document.getElementById("userName").value;
  //console.log("Value===>", name);
  localStorage.setItem("currentUser", name);
  if (item) {
    item = JSON.parse(item);
    //console.log("Item------>", item);
    let checkForExistingUser = item.filter((key, index) => key.name === name);
    //console.log("checkForExistingUser=====>", checkForExistingUser);

    if (checkForExistingUser && checkForExistingUser.length > 0) {
      alert(`User Exists ${checkForExistingUser}`);
    } else {
      alert("Need to create user");
      item.push({ name });
      localStorage.setItem("usersList", JSON.stringify(item));
      //localStorage.setItem("productsList", JSON.stringify([]));
    }
  } else {
    item = JSON.stringify([{ name: name }]);
    localStorage.setItem("usersList", item);
    //localStorage.setItem("productsList", JSON.stringify([]));
  }
  document.getElementById("signInForm").style.display = "none";
  document.getElementsByClassName("paddingTop")[0].style.display = "block";
  //  console.log("checkForUseName===>", item, event, document.forms[0]);
};

const closeProductFormOnCancel = () => {
  document.getElementById("productFormDiv").style.display = "none";
};

const findUserProductList = (existingProductList, currentUserName, type) => {
  let findProductUserNameValue;
  let filteredArray = existingProductList.filter(key => {
    findProductUserNameValue = Object.keys(key);
    // console.log(
    //   "findProductUserNameValue ===>",
    //   findProductUserNameValue[0],
    //   currentUserName,
    //   type
    // );
    if (type === "current") {
      return currentUserName === findProductUserNameValue[0];
    }
    if (type === "other") {
      return currentUserName != findProductUserNameValue[0];
    }
  });
  // console.log("filteredArray=========>", filteredArray, type);

  if (type === "list") {
  }
  return filteredArray;
};

const getExistingProductList = () => {
  let existingProductList = localStorage.getItem("productsList");
  if (existingProductList) return JSON.parse(existingProductList);
  else return null;
};

const saveProductName = event => {
  event.preventDefault();
  let existingProductList = getExistingProductList();
  // console.log("existingProductList========11111>", existingProductList);
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
    //console.log("existingProductList========>", existingProductList);
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
      //  console.log("currentUserProducts========>111", currentUserProducts[0]);
      // console.log("remainingExceptCurrent=======>", remainingExceptCurrent);

      if (remainingExceptCurrent && remainingExceptCurrent.length > 0) {
        remainingExceptCurrent.push(currentUserProducts[0]);
        // currentUserProducts = [
        //   ...remainingExceptCurrent,
        //   currentUserProducts[0]
        // ];
        currentUserProducts = remainingExceptCurrent;
        //console.log("Test---->", currentUserProducts);
      }
    } else {
      //console.log("Condition comes here=========>");

      currentUserProducts =
        remainingExceptCurrent && remainingExceptCurrent.length > 0
          ? remainingExceptCurrent
          : [];

      currentUserProducts.push({ [currentUserName]: [productName] });
    }
  } else {
    //console.log("Condition comes here=========>222222");
    currentUserProducts.push({ [currentUserName]: [productName] });
  }
  //console.log("Final============>", currentUserProducts);

  localStorage.setItem("productsList", JSON.stringify(currentUserProducts));
};
