
export default {
    apiKey:'18743526-4b128e40a70dee342e39fe313',
    searchQuery:'',
    page: 1,
    fetchPictures() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.apiKey}`;
      
        return fetch(url)
            .then(res => res.json())
            .then(({ hits }) => {
                this.page += 1;
                return hits;
            })
            // .then(console.log)
            .catch(error => console.log(error));
    },
    resetPage() {
        this.page = 1;
    },
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    }
};