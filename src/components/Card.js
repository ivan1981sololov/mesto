

export default class Card {

    constructor(item, selector, popalImgOpen, popupCardDelete, user, api){
        this.name = item.name;
        this.url = item.link;
        this.id = item._id;
        this.likes = item.likes;
        this.selector = selector;
        this.popalImgOpen = popalImgOpen;
        this.owned = item.owner._id == user.id ? true : false;

        this.popupDelete = popupCardDelete;

        this.user = user;

        this.api = api;




    }
    createCard() {
        const cardTemplate = document.querySelector(`${this.selector}`).content;
        this.cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        this.cardElement.id = this.id;
        this.cardImage = this.cardElement.querySelector('.element__image');
        this.cardTitle = this.cardElement.querySelector('.element__title');
        this.cardLikeButton = this.cardElement.querySelector('.element__like');
        this.cardLikeQuantity = this.cardElement.querySelector('.element__like-quantity');
        this.cardDeleteButton = this.cardElement.querySelector('.element__trash');

        this.cardImage.src = this.url;
        this.cardImage.alt = this.name;
        this.cardTitle.textContent = this.name;
        this.cardLikeQuantity.textContent = this.likes.length > 0 ? this.likes.length : '';
        this.likes.find(item => item._id == this.user.id) ? this.cardLikeButton.classList.add('element__like_active') :
            this.cardLikeButton.classList.remove('element__like_active')


        this._setEventListeners();

        if(!this.owned) {
            this.cardDeleteButton.remove();
        }

        return this.cardElement;
    }

    _setEventListeners() {
        this.cardLikeButton.addEventListener('click', (evt) => this._likeCard(evt));

        this.cardDeleteButton.addEventListener('click', () => this._deleteCard());
        this.cardImage.addEventListener('click', () => this.popalImgOpen({
            src: this.url,
            alt: this.name,
        }));
    }

     _likeCard(evt) {
        if(evt.target.classList.contains('element__like_active')){
            this.api.removeCardLike(this.id)
            .then((data) => {
                this.cardLikeQuantity.textContent = data.likes.length > 0 ?  data.likes.length : ''
                evt.target.classList.remove('element__like_active');
            })
            .catch((err) => console.log(err))
        }else{
            this.api.addCardLike(this.id, this.likes)
            .then((data) => {
                evt.target.classList.add('element__like_active');
                this.cardLikeQuantity.textContent = data.likes.length;
            })
        }
    }
     _deleteCard() {
        this.popupDelete.open(this.id);
    }
}
