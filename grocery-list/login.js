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
    console.log("checkForExistingUser=====>", checkForExistingUser);
    if (checkForExistingUser && checkForExistingUser.length > 0) {
      alert(`User Exists ${checkForExistingUser}`);
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
};
