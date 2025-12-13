// Get post ID from URL query string
export function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
// Find a post by its ID
export function findPostById(posts, id) {
    return posts.find(p => String(p.id) === String(id));
}