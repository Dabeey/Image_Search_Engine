const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

// INVXwxOQC1oSawFAAYSlPnHF5xODhluVILLtUUT6Pt4

let keyword = '';
let page = 1;
const accesskey = 'INVXwxOQC1oSawFAAYSlPnHF5xODhluVILLtUUT6Pt4'

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.map((result) => {
        const img = document.createElement('img');
        img.src = result.urls.small;
        img.alt = result.alt_description || 'Image';
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';

        imageLink.appendChild(img);
        searchResult.appendChild(imageLink);
    });

    showMoreBtn.style.display = 'block';
    
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1; // Reset page number on new search
    searchImages();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
});