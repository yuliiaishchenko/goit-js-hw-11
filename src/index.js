import { Notify } from "notiflix/build/notiflix-notify-aio";
import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import { PixabayAPI } from "./js/pixabay-abi";
import { createMarkup } from "./js/markup";
import { spinnerPlay, spinnerStop } from "./js/spiner";


export const refs = {
    body: document.querySelector('body'),
    form: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    infinity: document.querySelector('.infinity-scroll'),
}
refs.form.addEventListener('submit', onSubmitForm);

const pixabay = new PixabayAPI();
const simpleLightboxGallery = new simpleLightbox('.gallery a');

async function onSubmitForm(evt){
    evt.preventDefault();

    
    observer.observe(refs.infinity);
    clearGallery();
    pixabay.resetPage();

    pixabay.searchQuery = evt.currentTarget.searchQuery.value.trim();

    if(pixabay.searchQuery === ''){
        Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
    }
try {
    const { hits, totalHits } = await pixabay.fetchImages();
    pixabay.setTotal(totalHits);

    if(hits.length === 0){
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');

    }
    Notify.success(`Hooray! We found ${totalHits} images.`);
    spinnerPlay();

    const markupGallery = createMarkup(hits);
    updateMarkup(markupGallery);
    spinnerStop();
}catch(error){
    console.log(error);
    clearGallery();
}
}

function updateMarkup(markupGallery){
    refs.gallery.insertAdjacentHTML('beforeend',markupGallery);
    simpleLightboxGallery.refresh();
    smoothScroll();
}

function clearGallery(){
    refs.gallery.innerHTML = '';
}

async function onLoading(entries){
    spinnerPlay();
  entries.forEach(async entry => {
        try{
            if(entry.isIntersecting && pixabay.query !=='' && refs.gallery.childElementCount !== 0){
                pixabay.incrementPage();
                const { hits } = await pixabay.getImages();
                const markup = createMarkup(hits);
                updateMarkup(markup);

                spinnerStop();
                if (pixabay.hasMoreImages()){
                    Notify.info("We're sorry, but you've reached the end of search results.");
                    observer.unobserve(refs.infinity);
                }
            }
            spinnerStop();

        }catch(error){
            spinnerStop();

            console.log(error);
        }
    });
}
const observer = new IntersectionObserver(onLoading, {
    rootMargin: '100px',
})

function smoothScroll(){
    const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });

}