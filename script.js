const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;
const accesskey = 'INVXwxOQC1oSawFAAYSlPnHF5xODhluVILLtUUT6Pt4';

function showMessage(msg) {
    searchResult.innerHTML = `<div class="message">${msg}</div>`;
}

async function searchImages() {
    keyword = searchBox.value.trim();
    if (!keyword) {
        showMessage('Please enter a search term.');
        showMoreBtn.style.display = 'none';
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(keyword)}&client_id=${accesskey}&per_page=12`;

    // Show loading indicator
    if (page === 1) {
        searchResult.innerHTML = '<div class="message">Loading...</div>';
    } else {
        showMoreBtn.disabled = true;
        showMoreBtn.textContent = 'Loading...';
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API error');
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = '';
        }

        const results = data.results;

        if (results.length === 0 && page === 1) {
            showMessage('No images found.');
            showMoreBtn.style.display = 'none';
            return;
        }

        results.forEach((result) => {
            const img = document.createElement('img');
            img.src = result.urls.small;
            img.alt = result.alt_description || 'Image';
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';
            imageLink.appendChild(img);
            searchResult.appendChild(imageLink);
        });

        // Show or hide "Show More" button
        if (data.total_pages > page) {
            showMoreBtn.style.display = 'block';
            showMoreBtn.disabled = false;
            showMoreBtn.textContent = 'Show More';
        } else {
            showMoreBtn.style.display = 'none';
        }
    } catch (err) {
        showMessage('Failed to fetch images. Please try again.');
        showMoreBtn.style.display = 'none';
    }
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