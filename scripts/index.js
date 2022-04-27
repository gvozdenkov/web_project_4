let body = document.querySelector(".body");
let main = document.querySelector(".main");

let popup = main.querySelector(".popup");

// popup buttons
let profileEditBtn = main.querySelector(
  ".profile-header__edit-btn_action_edit"
);
let profileEditPopupCloseBtn = main.querySelector(".popup__close");
let profileEditPopupCloseArea = main.querySelector(".popup__close-area");

// form input fields
let profilePopupName = popup.querySelector(".form__input_type_username");
let profilePopupAbout = popup.querySelector(".form__input_type_about");
let profilePopupSave = popup.querySelector(".form__button_action_save");

// profile html page Name and About
let profileName = main.querySelector(".profile-header__name");
let profileAbout = main.querySelector(".profile-header__about");

function toggleEditPopup() {
  if (popup.classList.contains("popup_opend")) {
    popup.classList.toggle("popup_opened");
    body.classList.toggle('body__lock');
    return;
  } else {
    body.classList.toggle('body__lock');
    popup.classList.toggle("popup_opened");
    profilePopupName.value = profileName.textContent;
    profilePopupAbout.value = profileAbout.textContent;
  }
}

function profileSave() {
  popup.classList.toggle("popup_opened");
  body.classList.remove('body__lock');
}

profileEditBtn.addEventListener("click", toggleEditPopup);
profileEditPopupCloseBtn.addEventListener("click", toggleEditPopup);
profileEditPopupCloseArea.addEventListener("click", toggleEditPopup);
profilePopupSave.addEventListener("click", profileSave);

// ===== profile popup save button ===========

let formElement = popup.querySelector(".form");

// Next is the form submit handler, though
// it won't submit anywhere just yet
function handleProfileFormSubmit(evt) {
    // console.log(profilePopupName.value);
    // This line stops the browser from 
    // submitting the form in the default way.
    // Having done so, we can define our own way of submitting the form.
    evt.preventDefault();

    profileName.textContent = profilePopupName.value;
    profileAbout.textContent = profilePopupAbout.value;
}

formElement.addEventListener('submit', handleProfileFormSubmit);




// =========================== gallery ============================

let likeBtn = main.querySelectorAll(".card__like");

// function setLike() {
//     console.log("Like button pressed");
// }

// likeBtn.addEventListener("click", setLike);
