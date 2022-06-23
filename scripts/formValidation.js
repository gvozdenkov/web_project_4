// ================= utils functions ========================
function getErrorElement(inputElement) {
  return inputElement
    .closest(formValidObj.fieldSelector)
    .querySelector(formValidObj.inputErrorSelector);
}

function hasInvalidInputs(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInputs(inputList)) {
    buttonElement.classList.add(formValidObj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formValidObj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//   ====================================================

function checkInputValidity(inputElement) {
  !inputElement.validity.valid
    ? showInputError(inputElement)
    : hideInputError(inputElement);
}

function showInputError(inputElement) {
  inputElement.classList.add(formValidObj.inputErrorClass);
  const errorElement = getErrorElement(inputElement);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(formValidObj.errorClass);
}

function hideInputError(inputElement) {
  inputElement.classList.remove(formValidObj.inputErrorClass);
  const errorElement = getErrorElement(inputElement);
  errorElement.textContent = "";
  errorElement.classList.remove(formValidObj.errorClass);
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(formValidObj.inputSelector));
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

function enableValidation(arg) {
  const formList = Array.from(document.querySelectorAll(arg.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement);
  });
}

const formValidObj = {
  formSelector: ".form",
  fieldSelector: ".form__field",
  inputSelector: ".form__input",
  inputErrorSelector: ".form__input-error",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
}

enableValidation(formValidObj);
