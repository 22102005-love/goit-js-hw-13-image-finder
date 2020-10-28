'use script';
import * as basicLightbox from 'basiclightbox';
import apiService from './apiService.js';
import cardTpl from '../templates/cardTpl.hbs';

const refs = {
    cardListRef: document.querySelector('.gallery'),
    searchFormRef: document.querySelector('.search-form'),
    loadMoreBtnRef: document.querySelector('.modal-btn')
};
refs.searchFormRef.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    apiService.query = form.elements.query.value;
    refs.cardListRef.innerHTML = '';
    form.reset();
    apiService.resetPage();
    apiService.fetchPictures().then(data => {
        updatePicturesMarkup(data, cardTpl);
    });
});

const updatePicturesMarkup = (pictures, template) => {
    const markup = template(pictures);
    refs.cardListRef.insertAdjacentHTML('beforeend', markup);
};

refs.loadMoreBtnRef.addEventListener('click', () => {
    apiService.fetchPictures().then(data => {
        updatePicturesMarkup(data, cardTpl);

        window.scrollBy(0, window.innerHeight);
    });
});

refs.cardListRef.addEventListener('click', event => {
    if (event.target.nodeName === 'IMG') {
        const largeImageUrl = event.target.dataset.source;
        basicLightbox.create(`
		<img width="1400" height="900" src="${largeImageUrl}">
	`).show()
    };
});
