 import axios from "axios";
 
 const API_KEY = 34951131-d097551cc942255e7c32e5f0d;
 const BASE_URL = 'https://pixabay.com/api/';

 export class PixabayAPI {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
        this.totalPage = 0;
    }


    async fetchImages(){
        try{
            const response = await axios.get(`${BASE_URL}`,{
                params:

               { key: API_KEY,
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                page: this.page,
                per_page: this.per_page,
                safesearch: true,
            },})
            return response.data;
        }
        catch(error){
            throw new Error(error.message);
        }
    }
    resetPage(){
        return (this.page = 1);
    }

    setTotal(total){

       return (this.totalPage = total);
    }

    incrementPage(){
        this.page += 1;
    }

    resetTotalPage (){
       return (this.totalPages = 0);
    }

    hasMoreImages(){
        return this.page === Math.ceil(this.totalPages/this.per_page);
    }


 }

