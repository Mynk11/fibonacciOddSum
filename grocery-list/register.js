const registerUser = event => {
  event.preventDefault();
  console.log(
    "registerUser====>",
    event,
    event.target[0]["id"],
    event.target[0]["value"],
    event.target[1]["id"],
    event.target[1]["value"],
    event.target[2]["id"],
    event.target[2]["value"],
    event.target[3]["id"],
    event.target[3]["value"],
    event.target[4]["id"],
    event.target[4]["value"],
    event.target.length
  );

  let userObj = {};

  for (let i = 0; i < event.target.length; i++) {
    if (event.target[i]["id"])
      userObj[event.target[i]["id"]] = event.target[i]["value"];
  }
  let existingUsersList = getUsersList();
  if (existingUsersList) {
    let userExistsOrNot = existingUsersList.filter(key => {
      return key.name === userObj.name;
    });

    console.log("userExistsORNot", userExistsOrNot);
    if (userObj.password !== userObj.passwordRepeat) {
      alert("passwords are not same");
      return;
    }

    if (userExistsOrNot && userExistsOrNot.length > 0) {
      alert("User Exists please try with different name!!");
      return;
    }

    if (userExistsOrNot && userExistsOrNot.length === 0) {
      existingUsersList.push(userObj);
      localStorage.setItem("usersList", JSON.stringify(existingUsersList));
    }
  } else {
    localStorage.setItem("usersList", JSON.stringify([userObj]));
  }
  deleteCurrentUser();
  redirectToLoginPage();
};
