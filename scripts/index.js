let body = document.querySelector(".body");
let main = document.querySelector(".main");

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

// ============================ Render Cards from DB ===========================================

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

  // add event listener for .card__dell trash icon to del card
  cardElement
    .querySelector(".card__del")
    .addEventListener("click", (evt) => evt.target.closest(".card").remove());

  // listener for like button
  cardElement
    .querySelector(".card__like")
    .addEventListener("click", (evt) =>
      evt.target.classList.toggle("card__like_type_active")
    );

  // add event listener for card image popup
  const popupLink = cardElement.querySelector(".popup-link");
  popupLink.addEventListener("click", (evt) => {
    const popupName = popupLink.getAttribute("href").replace("#", "");
    currentPopup = document.getElementById(popupName);
    // fill popup with actual data
    const imgUrl = evt.target.src;
    const imgTitle = evt.target
      .closest(".card")
      .querySelector(".card__title").textContent;

    const cardPopupElement = document.getElementById("popup-img");
    console.log(cardPopupElement);
    cardPopupElement.querySelector(".popup__img").src = imgUrl;
    cardPopupElement.querySelector(".popup__img-title").textContent = imgTitle;
    popupOpen(currentPopup);
    evt.preventDefault();
  });

  return cardElement;
}

// loop throw fake DB array to generate cards and insert it
initialCards.forEach((card) => albumContainer.prepend(createCard(card)));

// ============================= POPUP FUNCTIONS =================================================
function popupOpen(popup) {
  popup.classList.add("popup_opened");
  bodyLock();
  // assign listener for .popup div - for close everywhare
  popup.addEventListener("click", function (evt) {
    // if click outside .popup__content -> close popup
    if (!evt.target.closest(".popup__content")) {
      // find closest .popup for close
      popupClose(evt.target.closest(".popup"));
    }
  });

  const closeIcon = popup.querySelector(".popup-close");
  closeIcon.addEventListener("click", (evt) => {
    popupClose(closeIcon.closest(".popup"));
    evt.preventDefault();
  });
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
  // delete pupup element from the page if this is image card popup
  //   if (popup.id.includes("popup-img")) popup.remove();
  bodyUnLock();
}

function PopupSaveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;
  popupClose(evt.target.closest(".popup"));
}

function createCardPopup(data) {
  // get card template content
  const cardImgPopupTemplate = document.querySelector(
    "#card-popup-image-template"
  ).content;

  // duplicate all card template
  const imgPopup = cardImgPopupTemplate.querySelector(".popup").cloneNode(true);

  // insert text and img src from face DB
  imgPopup.querySelector(".popup__img-title").textContent = data.name;
  //   cardElement.getElementsByClassName("")
  imgPopup.querySelector(".popup__img").src = data.link;

  return imgPopup;
}

function PopupSaveCard(evt) {
  evt.preventDefault();
  const card = {
    name: evt.target.querySelector(".add-card-name").value,
    link: evt.target.querySelector(".add-card-url").value,
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
  lockPaddings.forEach((elem) => (elem.style.paddingRight = lockPaddingValue));
  body.classList.add("body_lock");
  body.style.paddingRight = lockPaddingValue;
}

function bodyUnLock() {
  body.style.paddingRight = 0;
  // for all position:fixed elements add paddingRight
  lockPaddings.forEach((elem) => (elem.style.paddingRight = 0));
  body.classList.remove("body_lock");
}

// ==================== profile popup save button ==============================================
let formElement = popupEditProfile.querySelector(".form");
formElement.addEventListener("submit", PopupSaveProfile);

// =================== add card popup save button =====================================================
let cardAddForm = popupAddCard.querySelector(".form");
cardAddForm.addEventListener("submit", PopupSaveCard);

// all popups on page in the begining
let popupLinks = document.querySelectorAll(".popup-link");
// add listener for all popupLinks except img popups - (<a></a> link for open popup)
popupLinks.forEach((elem) => {
  // create listener only for non card popup links
  if (!elem.href.includes("popup-img")) {
    elem.addEventListener("click", (evt) => {
      let popupName = elem.getAttribute("href").replace("#", "");
      let currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      evt.preventDefault();
    });
  }
});
