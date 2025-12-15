// Render the list of posts
export function renderPostList(posts, contentArea) {
    let html = '<div class="row">';
    posts.forEach(post => {
        html += `
        <div class="col s12 m6">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">${post.title}</span>
                    <p>${post.summary}</p>
                    <br>
                    <small>${post.date}</small>
                </div>
                <div class="card-action">
                    <a href="?id=${post.id}">Read More</a>
                </div>
            </div>
        </div>
        `;
    });
    html += '</div>';
    contentArea.innerHTML = html;
}

// Fetch and render a specific Markdown post
export function loadPost(filename, contentArea) {
    return fetch(`posts/${filename}`)
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            contentArea.innerHTML = `
            <div style="display:flex;gap:.5rem;align-items:center;margin-bottom:1rem;">
                <a href="index.html" class="btn waves-effect waves-light blue">
                    <i class="material-icons left">arrow_back</i> Back
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" class="btn btn-small waves-effect waves-light indigo darken-2 tooltipped" target="_blank" rel="noopener" data-position="bottom" data-tooltip="Share on Facebook" aria-label="Share on Facebook">
                    <i class="material-icons left">share</i> Share
                </a>
            </div>
            <div class="section">
                ${htmlContent}
            </div>
            `;
        })
        .catch(() => {
            showError('Error loading post content.', contentArea);
        });
}

// Show a not found message
export function showNotFound(contentArea) {
    contentArea.innerHTML = '<h3>Post not found</h3>';
}

// Show a generic error message
export function showError(message, contentArea) {
    contentArea.innerHTML = `<h3>${message}</h3>`;
}
