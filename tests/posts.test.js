import { fetchPosts } from '../app/posts.js';

window.test('exports fetchPosts', () => {
  window.assert(typeof fetchPosts === 'function', 'fetchPosts should be a function');
});

window.test('fetchPosts returns a thenable when called', () => {
  const result = fetchPosts();
  window.assert(result && typeof result.then === 'function', 'returns a promise-like object');
});
