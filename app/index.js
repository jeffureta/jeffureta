import { fetchPosts } from './posts.js';
import { renderPostList, loadPost, showNotFound, showError } from './render.js';
import { getPostIdFromUrl, findPostById } from './utils.js';

// Select the main content area
const contentArea = document.getElementById('content-area');

// Fetch posts and initialize the app
function initBlog() {
    fetchPosts()
        .then(posts => {
            const postId = getPostIdFromUrl();
            if (postId) {
                const post = findPostById(posts, postId);
                if (post) {
                    loadPost(post.filename, contentArea);
                } else {
                    showNotFound(contentArea);
                }
            } else {
                renderPostList(posts, contentArea);
            }
        })
        .catch(error => {
            console.error('Error loading posts:', error);
            showError('Error loading posts.', contentArea);
        });
}

initBlog();

// Initialize Materialize components (sidenav) when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.sidenav');
    if (window.M && M.Sidenav) {
        M.Sidenav.init(elems);
    }
});