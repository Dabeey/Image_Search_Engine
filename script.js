const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

// INVXwxOQC1oSawFAAYSlPnHF5xODhluVILLtUUT6Pt4

let keyword = '';
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = '';
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1; // Reset page number on new search
    searchImages();
});