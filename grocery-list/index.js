document.getElementById("productListDiv").style.display = "none";
document.getElementById("productFormDiv").style.display = "none";
document.getElementsByClassName("showProductList")[0].style.display = "none";

const addAItemInTheList = () => {
  document.getElementById("productFormDiv").style.display = "block";
};

const closeProductFormOnCancel = () => {
  document.getElementById("productFormDiv").style.display = "none";
};
