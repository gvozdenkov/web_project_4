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
    body.classList.toggle("body__lock");
    return;
  } else {
    body.classList.toggle("body__lock");
    popup.classList.toggle("popup_opened");
    profilePopupName.value = profileName.textContent;
    profilePopupAbout.value = profileAbout.textContent;
  }
}

function profileSave() {
  popup.classList.toggle("popup_opened");
  body.classList.remove("body__lock");
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

formElement.addEventListener("submit", handleProfileFormSubmit);

// =============================================== Render Cards automatic ============================================================

// temp DB amulation
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function createCard(data) {
  // get card template content
  const cardTemplate = document.querySelector("#card-template").content;

  // duplicate all card template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // insert text and img src from face DB
  cardElement.querySelector(".card__title").textContent = data.name;
  //   cardElement.getElementsByClassName("")
  cardElement.querySelector(".card__img").src = data.link;

  return cardElement;
}

// get tag where insert cards
const albumContainer = document.querySelector(".album-container");

// loop throw fake DB array to generate cards and insert it
initialCards.forEach((card) => albumContainer.prepend(createCard(card)));

// ================================================================================================================================
