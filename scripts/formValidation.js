// ================= utils functions ========================
function getErrorElement(inputElement) {
  return inputElement
    .closest(".form__field")
    .querySelector(".form__input-error");
}

function fixPlaceholder(inputElement) {
  try {
    const textLength = inputElement.value.length;
    if (textLength != 0) {
      inputElement
        .closest(".form__field")
        .querySelector(".form__placeholder")
        .classList.add("form__placeholder_is-fixed");
    }
  } catch (err) {}
}

function hasInvalidInputs(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInputs(inputList)) {
    buttonElement.classList.add("form__button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__button_inactive");
    buttonElement.disabled = false;
  }
}

//   ====================================================

function checkInputValidity(inputElement) {
  console.log("inputElement: ", inputElement.name);
  fixPlaceholder(inputElement);
  !inputElement.validity.valid
    ? showInputError(inputElement)
    : hideInputError(inputElement);
}

function showInputError(inputElement) {
  inputElement.classList.add("form__input_type_error");
  const errorElement = getErrorElement(inputElement);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(inputElement) {
  inputElement.classList.remove("form__input_type_error");
  const errorElement = getErrorElement(inputElement);
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  // console.log("inputList: ", inputList);
  const buttonElement = formElement.querySelector('button[type="submit"]');
  toggleButtonState(inputList, buttonElement);

  // add event listener for all inputs
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// ===============================================

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  console.log({ formList });
  formList.forEach((formElement) => {
    console.log("form name: ", formElement.name);
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement);
  });
}

enableValidation();
