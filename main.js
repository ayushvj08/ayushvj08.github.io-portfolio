const userDetails = () =>
  localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : [];

const id = (id) => document.getElementById(id);

const form = id("form");
const username = id("name");
const email = id("email");
const password = id("password");
const dob = id("dob");
const tnc = id("accept");

const errorMsg = document.getElementsByClassName("errors");

const validateForm = () => {
  let formValid = true;
  [username, email, password, dob].forEach((field, index) => {
    if (field.value === "") {
      formValid = false;
      errorMsg[index].innerHTML = `${
        field.getAttribute("name")[0].toUpperCase() +
        field.getAttribute("name").slice(1).toString()
      } is required`;
      field.classList.add("border-red-300");
    } else {
      errorMsg[index].innerHTML = "";
      field.classList.remove("border-red-300");
    }
  });

  if (tnc.checked !== true) {
    formValid = false;
    errorMsg[4].innerHTML = "Terms & Conditions must be accepted.";
  } else errorMsg[4].innerHTML = "";

  return formValid;
};

const deleteDetail = (id) => {
  const elt = userDetails().splice(id, 1);
  console.log(userDetails().filter((e) => e !== elt));
  console.log(userDetails());
  localStorage.setItem("userDetails", JSON.stringify(userDetails()));
  generateUserDetail();
};
const generateUserDetail = () => {
  const html = userDetails().map((elt, id) => {
    return `<div class="flex flex-row justify-evenly">
  <p class="text-light" >${elt.username}</p>
  <p class="text-light" >${elt.email}</p>
  <p class="text-light" >${elt.dob}</p>
  <p class="text-light" >${elt.tnc}</p>
  <p class="text-light" ><i onclick=deleteDetail(${id}) class="fa-solid cursor-pointer fa-trash-can"></i></p></div>`;
  });

  document.getElementById("userDetails").innerHTML = html.join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    const newuserDetails = {
      username: username.value,
      email: email.value,
      dob: dob.value,
      tnc: tnc.checked,
    };

    localStorage.setItem(
      "userDetails",
      JSON.stringify([...userDetails(), newuserDetails])
    );
    generateUserDetail();
  }
});

generateUserDetail();
