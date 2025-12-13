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
    fetch(`posts/${filename}`)
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            contentArea.innerHTML = `
            <a href="index.html" class="btn waves-effect waves-light blue">
                <i class="material-icons left">arrow_back</i> Back
            </a>
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
