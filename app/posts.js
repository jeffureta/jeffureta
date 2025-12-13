// Fetch the list of posts from posts.json
export async function fetchPosts() {
    return fetch('posts.json').then(res => res.json());
}