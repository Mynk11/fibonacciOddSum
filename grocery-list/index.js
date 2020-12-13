if (returnCurrentUserName()) {
  console.log("returnCurrentUserName", returnCurrentUserName);

  checkForUseName();
} else {
  document.getElementById("signOut").style.display = "none";
  document.getElementById("productListDiv").style.display = "none";
  document.getElementById("productFormDiv").style.display = "none";
  document.getElementsByClassName("showProductList")[0].style.display = "none";
}
const addAItemInTheList = () => {
  document.getElementById("productFormDiv").style.display = "block";
  document.getElementById("addButton").style.display = "none";
  listAllTheItems();
};

const closeProductFormOnCancel = () => {
  document.getElementById("productFormDiv").style.display = "none";
};
