const checkForUseName = event => {
  let item = localStorage.getItem("usersList");
  let name =
    document.getElementById("userName").value || returnCurrentUserName();
  console.log("name=========>", name);

  //console.log("Value===>", name);
  if (!returnCurrentUserName()) {
    localStorage.setItem("currentUser", name);
    event.preventDefault();
  } else {
  }
  if (item) {
    item = JSON.parse(item);
    //console.log("Item------>", item);
    let checkForExistingUser = item.filter((key, index) => key.name === name);
    if (checkForExistingUser && checkForExistingUser.length > 0) {
    } else {
      if (!name) {
        alert("Please Enter a name");
        return;
      }
      item.push({ name });
      localStorage.setItem("usersList", JSON.stringify(item));
    }
  } else {
    item = JSON.stringify([{ name: name }]);
    localStorage.setItem("usersList", item);
  }
  document.getElementById("signInForm").style.display = "none";
  document.getElementById("productListDiv").style.display = "block";
  document.getElementById("signOut").style.display = "block";
  listAllTheItems();
  document.getElementById(
    "userNameToShow"
  ).innerHTML = `User Name - ${returnCurrentUserName()}`;
};
