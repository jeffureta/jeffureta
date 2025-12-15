import { renderPostList, loadPost, showNotFound, showError } from '../app/render.js';

// Simple vanilla tests using the harness in test-runner.html

test('renderPostList inserts title, summary and link', () => {
  const contentArea = document.createElement('div');
  const posts = [ { id: 'post-1', title: 'Test Title', summary: 'A short summary', date: '2025-12-13' } ];
  renderPostList(posts, contentArea);
  assert(contentArea.innerHTML.includes('Test Title'), 'missing title');
  assert(contentArea.innerHTML.includes('A short summary'), 'missing summary');
  assert(contentArea.innerHTML.includes('?id=post-1'), 'missing link');
});

test('showNotFound displays not found message', () => {
  const contentArea = document.createElement('div');
  showNotFound(contentArea);
  assert(contentArea.textContent.includes('Post not found'), 'not found message missing');
});

test('showError displays provided message', () => {
  const contentArea = document.createElement('div');
  showError('Something went wrong', contentArea);
  assert(contentArea.textContent.includes('Something went wrong'), 'error message missing');
});

test('loadPost renders Facebook share anchor', async () => {
  const contentArea = document.createElement('div');
  const fakeMarkdown = '# Hello\nContent';
  const origFetch = window.fetch;
  const origMarked = window.marked;
  // stub fetch and marked
  window.fetch = () => Promise.resolve({ text: () => Promise.resolve(fakeMarkdown) });
  window.marked = { parse: () => '<p>parsed</p>' };
  try {
    await loadPost('post-1.md', contentArea);
    const shareAnchor = contentArea.querySelector('a[aria-label="Share on Facebook"]');
    assert(shareAnchor, 'share anchor missing');
    // verify href contains facebook sharer pattern
    assert(shareAnchor.href.includes('facebook.com/sharer/sharer.php'), 'share href incorrect');
  } finally {
    window.fetch = origFetch;
    window.marked = origMarked;
  }
});
