let body = document.querySelector(".body");
let main = document.querySelector(".main");
// all popups on page
let popupLinks = document.querySelectorAll(".popup-link");
// all elements with position: fixed
// for compensate hide scroll when popup opened
let lockPaddings = document.querySelectorAll(".lock-padding");

// get tag where insert cards
const albumContainer = document.querySelector(".album-container");

let popupEditProfile = main.querySelector(".popup-edit-profile");
let popupAddCard = main.querySelector(".popup-add-card");

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

profilePopupName.value = profileName.textContent;
profilePopupAbout.value = profileAbout.textContent;

// Add Card input fields
popupAddCard.querySelector(".add-card-name").value = "";
popupAddCard.querySelector(".add-card-url").value = "";

// ============================= POPUP FUNCTIONS =================================================
if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener("click", function (evt) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      // disable default link actions
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

function PopupSaveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;
  popupClose(evt.target.closest(".popup"));
}

function PopupSaveCard(evt) {
  evt.preventDefault();
  cardTitle = evt.target.querySelector(".add-card-name").value;
  cardUrl = evt.target.querySelector(".add-card-url").value;
  const card = {
    name: cardTitle,
    link: cardUrl,
  };
  albumContainer.prepend(createCard(card));
  popupClose(evt.target.closest(".popup"));
  evt.target.querySelector(".add-card-name").value = "";
  evt.target.querySelector(".add-card-url").value = "";
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
formElement.addEventListener("submit", PopupSaveProfile);

// =================== add card popup save button =====================================================
let cardAddForm = popupAddCard.querySelector(".form");
cardAddForm.addEventListener("submit", PopupSaveCard);

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

// loop throw fake DB array to generate cards and insert it
initialCards.forEach((card) => albumContainer.prepend(createCard(card)));

// =============================================================================================
// =================== Like buttons =============================================================

let likeButtons = document.querySelectorAll(".card__like");
if (likeButtons.length > 0) {
  for (let i = 0; i < likeButtons.length; i++) {
    const like = likeButtons[i];
    like.addEventListener("click", (evt) =>
      evt.target.classList.toggle("card__like_type_active")
    );
  }
}
