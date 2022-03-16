





export default class FormValidator {
     
    constructor(inputLists, form) {
        this.inputLists = inputLists;
        this.form = document.querySelector(`${form}`);
        
    }   
    
    enableValidation(){
        this.form.addEventListener('submit', (evt) => {
            const buttonElement = this.form.querySelector(this.inputLists.submitButtonSelector);
            evt.preventDefault();
            this.#disableSubmitButton(buttonElement);
        });
        this.#setEventListeners();
    }
    // Дизэйбл кнопки сабмита
    #disableSubmitButton(buttonElement){
        buttonElement.classList.add(this.inputLists.inactiveButtonClass);
        buttonElement.setAttribute('disabled',true)
    }

    // Вешаем обработчики событий на все поля
    #setEventListeners(){
        const inputList = Array.from(this.form.querySelectorAll(this.inputLists.inputSelector));
        const buttonElement = this.form.querySelector(this.inputLists.submitButtonSelector);
        this.#toggleButtonState(inputList,buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input',() => {
                this.#isValid(inputElement);
                this.#toggleButtonState(inputList,buttonElement);
            })
        })
    }

    //Проверяем на валидность инпуты, если хоть один элемент не валдиный вернет true, если все валдины вернет false
    #hasInvalidInput(inputList) {
        return inputList.some((inputElement) =>{
            return !inputElement.validity.valid
        });
    }

    //Меняем состояние кнопки 
    #toggleButtonState(inputList, buttonElement){
        if (this.#hasInvalidInput(inputList)) {
            this.#disableSubmitButton(buttonElement);
        } else {
            buttonElement.classList.remove(this.inputLists.inactiveButtonClass);
            buttonElement.removeAttribute('disabled')
        }
    }
    

    #isValid(inputElement){
        if(!inputElement.validity.valid) {
            this.#showInputError(inputElement,inputElement.validationMessage);
        } else {
            this.#hideInputError(inputElement);
        }
    }
    
    #showInputError(inputElement, errorMessage){
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this.inputLists.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.inputLists.errorClass);
    }

    #hideInputError(inputElement){
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this.inputLists.inputErrorClass);
        errorElement.classList.remove(this.inputLists.errorClass);
        errorElement.textContent = '';
    }

}

