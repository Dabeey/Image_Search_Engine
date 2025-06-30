const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

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

    const url = `http://localhost:3000/api/search?query=${encodeURIComponent(keyword)}&page=${page}`;

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

        // Add this check:
        if (!data.results || !Array.isArray(data.results)) {
            showMessage('Failed to fetch images. Please try again.');
            showMoreBtn.style.display = 'none';
            return;
        }

        const results = data.results;


        if (results.length === 0 && page === 1) {
            showMessage('No images found.');
            showMoreBtn.style.display = 'none';
            return;
        }


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

            // Wrap in a container div
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.appendChild(imageLink);

            searchResult.appendChild(imageItem);
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