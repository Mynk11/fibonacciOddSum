const listAllTheItems = value => {
  //document.getElementById("productListDiv").style.display = "none";
  const existingProducts = getExistingProductList();
  let currentUserName = returnCurrentUserName();
  let userProductList = findUserProductList(
    existingProducts,
    currentUserName,
    "current"
  );
  let mainDiv = document.getElementsByClassName("centerTheDiv")[0];
  let parent = document.getElementsByClassName("showProductList")[0];

  console.log("parent", parent);

  mainDiv.removeChild(parent);
  parent = document.createElement("DIV");
  parent.setAttribute("class", "showProductList");
  parent.innerHTML = "<h4>Your Product List</h4>";
  parent.style.display = "block";
  mainDiv.appendChild(parent);

  if (userProductList && userProductList.length > 0) {
    let referenceArrayForChildNode = userProductList[0][currentUserName];
    console.log("referenceArrayForChildNode", referenceArrayForChildNode);
    if (referenceArrayForChildNode && referenceArrayForChildNode.length > 0) {
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
        afterEditSaveButton.setAttribute(
          "value",
          referenceArrayForChildNode[i]
        );
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
        node.appendChild(input);
        node.appendChild(editButton);
        node.appendChild(deleteButton);
        node.appendChild(afterEditSaveButton);
        parent.appendChild(node); ///append Item
      }
    } else {
      redirectToHomePage();
    }
  }
};
