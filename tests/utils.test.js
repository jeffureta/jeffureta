import { getPostIdFromUrl, findPostById } from '../app/utils.js';

test('getPostIdFromUrl returns id from query string', () => {
  history.replaceState(null, '', '?id=42');
  const id = getPostIdFromUrl();
  assert(id === '42' || id === 42, 'expected id 42');
});

test('getPostIdFromUrl returns null when no id present', () => {
  history.replaceState(null, '', '/');
  const id = getPostIdFromUrl();
  assert(id === null, 'expected null when no id');
});

test('findPostById finds numeric and string ids', () => {
  const posts = [{ id: 1, title: 'a' }, { id: '2', title: 'b' }];
  const found1 = findPostById(posts, 1);
  const found2 = findPostById(posts, '2');
  assert(found1 === posts[0], 'find by number failed');
  assert(found2 === posts[1], 'find by string failed');
});

test('findPostById returns undefined for missing id', () => {
  const posts = [{ id: 1 }];
  const found = findPostById(posts, 999);
  assert(found === undefined, 'expected undefined for missing id');
});
