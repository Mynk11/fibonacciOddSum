const checkForUseName = event => {
  let item = getUsersList();
  let name =
    document.getElementById("userName").value || returnCurrentUserName();
  let password = document.getElementById("password").value;
  //console.log("name=========>", name, password);
  if (!returnCurrentUserName()) {
    event.preventDefault();

    if (item) {
      //item = JSON.parse(item);
      console.log("Item------>", item);
      let checkForExistingUser = item.filter((key, index) => key.name === name);
      if (!name) {
        alert("please Enter a User Name");
        return;
      }
      if (!password) {
        alert("please enter your password");
        return;
      }
      if (checkForExistingUser && checkForExistingUser.length > 0) {
        if (checkForExistingUser[0].password != password || !password) {
          //wrongPassword = true;
          alert("please enter a correct password");
          return;
        }

        localStorage.setItem("currentUser", name);
      } else {
        if (!name) {
          alert("Please Enter a name");
          return;
        } else {
          alert("User with this name does not exist! please sign up");
          return;
        }
      }
    } else {
      alert("Please Register");
    }
  }
  document.getElementById("signInForm").style.display = "none";
  document.getElementById("productListDiv").style.display = "block";
  document.getElementById("signOut").style.display = "block";
  listAllTheItems();
  document.getElementById(
    "userNameToShow"
  ).innerHTML = `User Name - ${returnCurrentUserName()}`;
};
