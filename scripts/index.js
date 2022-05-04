let body = document.querySelector(".body");
let main = document.querySelector(".main");
// all popups on page
let popupLinks = document.querySelectorAll(".popup-link");
// all elements with position: fixed
// for compensate hide scroll when popup opened
let lockPaddings = document.querySelectorAll(".lock-padding");

let popupEditProfile = main.querySelector(".popup-edit-profile");
let popupAddCard = main.querySelector(".popup-add-card");

// popup buttons
let profileEditBtn = main.querySelector(".profile-header__edit-btn");
let profileAddCard = main.querySelector(".profile-header__add-btn");
let popupCloseBtn = main.querySelector(".popup__close");
let popupCloseArea = main.querySelector(".popup__close-area");

// Profile form input fields
let profilePopupName = popupEditProfile.querySelector(
  ".form__input_type_username"
);
let profilePopupAbout = popupEditProfile.querySelector(
  ".form__input_type_about"
);
let profilePopupSave = popupEditProfile.querySelector(
  ".form__button_action_save"
);

// profile html page Name and About
let profileName = main.querySelector(".profile-header__name");
let profileAbout = main.querySelector(".profile-header__about");

// ============================= POPUP FUNCTIONS =================================================
if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener("click", function (evt) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      //   disable default link actions
      evt.preventDefault();
    });
  }
}

const popupCloseIcons = document.querySelectorAll(".popup-close");
if (popupCloseIcons.length > 0) {
  for (let i = 0; i < popupCloseIcons.length; i++) {
    const el = popupCloseIcons[i];
    el.addEventListener("click", function (evt) {
      // find closest element with .popup for close
      popupClose(el.closest(".popup"));
      evt.preventDefault();
    });
  }
}

function popupOpen(popup) {
  popup.classList.add("popup_opened");
  bodyLock();
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;
  // assign listener for .popup div - for close everywhare
  popup.addEventListener("click", function (evt) {
    // if click outside .popup__container -> close popup
    if (!evt.target.closest(".popup__container")) {
      // find closest .popup for close
      popupClose(evt.target.closest(".popup"));
    }
  });
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
  bodyUnLock();
}

function profileSave() {
  popupEditProfile.classList.toggle("popup_opened");
  bodyUnLock();
}

function AddCardSave() {
  popupAddCard.classList.toggle("popup_opened");
  bodyUnLock();
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".body").offsetWidth + "px";

  // for all position:fixed elements add paddingRight
  if (lockPaddings.length > 0) {
    for (let i = 0; i < lockPaddings.length; i++) {
      lockPaddings[i].style.paddingRight = lockPaddingValue;
    }
  }

  body.classList.add("body_lock");
  body.style.paddingRight = lockPaddingValue;
}

function bodyUnLock() {
  body.style.paddingRight = 0;
  // for all position:fixed elements add paddingRight
  if (lockPaddings.length > 0) {
    for (let i = 0; i < lockPaddings.length; i++) {
      lockPaddings[i].style.paddingRight = 0;
    }
  }
  body.classList.remove("body_lock");
}

// ==================== profile popup save button ==============================================

let formElement = popupEditProfile.querySelector(".form");

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
  popupClose(evt.target.closest(".popup"));
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// ============================ Render Cards automatic ===========================================

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

// =============================================================================================
