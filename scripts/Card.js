import {openImagePopup} from './index.js'
export default class Card {

    constructor(item, selector){
        this.name = item.name;
        this.url = item.link;

        this.selector= selector
        return this.#createCard()

    }
    #createCard() {
        const cardTemplate = document.querySelector(`${this.selector}`).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        const cardImage = cardElement.querySelector('.element__image');
        const cardTitle = cardElement.querySelector('.element__title');
        const cardLikeButton = cardElement.querySelector('.element__like');
        const cardDeleteButton = cardElement.querySelector('.element__trash');
    
        cardImage.src = this.url;
        cardImage.alt = this.name;
        cardTitle.textContent = this.name;
    
        cardLikeButton.addEventListener('click', (evt) => this.#likeCard(evt));
    
        cardDeleteButton.addEventListener('click', (evt) => this.#deleteCard(evt));
        cardImage.addEventListener('click',openImagePopup);
    
         return cardElement;
    }
    #likeCard(evt) {
        evt.target.classList.toggle('element__like_active');
    }
    #deleteCard(evt) {
        evt.target.closest('.element').remove()
    }

}