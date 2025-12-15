# Build a Simple Client-Side Markdown Blog (No Static Site Generator)

This project demonstrates a streamlined approach to building a single-page application (SPA) blog using only client-side technologies (HTML, CSS, and JavaScript), without the need for a static site generator (such as Jekyll or Hugo) or a backend server. Blog posts are authored in **Markdown** and dynamically rendered as HTML in the user's browser via JavaScript.

## Core Architecture and Technologies

| Component         | Purpose                    | Technology                                                      |
|-------------------|---------------------------|-----------------------------------------------------------------|
| **Architecture**  | Client-Side SPA            | HTML5, JavaScript                                               |
| **Data Storage**  | Blog Post Registry         | `posts.json` (simple JSON file)                                 |
| **Post Content**  | Source Files for Posts     | Markdown (`.md` files)                                          |
| **Markdown Engine** | Markdown-to-HTML Conversion | [**Marked.js**](https://marked.js.org/) (via CDN)            |
| **UI Framework**  | User Interface Styling     | [**Materialize CSS**](https://materializecss.com/) (via CDN)    |
| **Testing**       | Browser-based test runner  | `test-runner.html` (minimal module test harness)                |

## Phase 1: Repository Setup and Project Structure

1. **Create a Repository:** Initialize a new repository on GitHub (e.g., `my-markdown-blog`).
2. **Clone Locally:** Clone the repository or open it in your preferred code editor.
3. **Establish Folder Structure:** Organize your project as follows (matches this repository):

```
my-markdown-blog/
├── index.html           # Main entry point
├── style.css            # Custom styles
├── README.md            # Project README (this file)
├── app/                 # Application modules
│   ├── index.js         # Main app entry point
│   ├── posts.js         # Post fetching and registry logic
│   ├── render.js        # Rendering functions (list, post, errors)
│   └── utils.js         # Utility/helper functions
├── posts.json           # Blog post registry
├── test-runner.html     # Browser-based test runner (module tests)
├── tests/               # Browser test modules used by the runner
│   ├── posts.test.js
│   ├── render.test.js
│   └── utils.test.js
├── images/              # Image assets for posts and site (e.g., thumbnails)
└── posts/               # Directory for Markdown files
    ├── post-1.md
    └── post-2.md
```

**Notes:**
- The `app/` directory contains modular JavaScript files, each responsible for a specific aspect of the blog's logic.
- `index.js` serves as the main entry point, importing and orchestrating the other modules.
- This modular structure improves maintainability and makes it easier to write and run unit tests.
- The rest of the project structure remains the same, with Markdown posts in the `posts/` directory and metadata in `posts.json`.

- The `app/` directory contains modular JavaScript files, each responsible for a specific aspect of the blog's logic.
- `tests/` contains small, module-based browser tests (loaded by `test-runner.html`).
- `index.js` serves as the main entry point, importing and orchestrating the other modules.
- This modular structure improves maintainability and makes it easier to write and run unit tests.
- The rest of the project structure remains the same, with Markdown posts in the `posts/` directory and metadata in `posts.json`.

- Add an `images/` folder at the repository root for post images, thumbnails, and other static assets used by the site.

## Phase 2: Frontend (`index.html`)

The `index.html` file loads required CSS and JavaScript libraries via CDN and defines the main content area (`content-area`).

**Example `index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Simple Blog</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
    <nav class="blue darken-3">
        <div class="nav-wrapper container">
            <a href="index.html" class="brand-logo">My Blog</a>
        </div>
    </nav>
    <div class="container section">
        <div id="content-area"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

## Phase 3: Blog Post Registry (`posts.json`)

The `posts.json` file serves as a registry for your blog posts, containing metadata such as titles, dates, filenames, and summaries.

**Sample `posts.json`:**

```json
[
    {
        "id": 1,
        "title": "My First Post",
        "date": "2023-10-25",
        "filename": "post-1.md",
        "summary": "This is a summary of my first blog post using Markdown."
    },
    {
        "id": 2,
        "title": "Learning JavaScript",
        "date": "2023-10-26",
        "filename": "post-2.md",
        "summary": "JavaScript is cool, and Materialize makes it look good."
    }
]
```

**Create two sample Markdown files in the `posts/` directory:**

- `posts/post-1.md`
- `posts/post-2.md`

## Phase 4: Application Logic (`app.js`)

To make your application logic more maintainable and testable, modularize your JavaScript by splitting responsibilities into smaller functions. This approach also makes it easier to write unit tests for each part of your logic.

**Example modular `app.js`:**
```js
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
                    loadPost(post.filename);
                } else {
                    showNotFound();
                }
            } else {
                renderPostList(posts);
            }
        })
        .catch(error => {
            console.error('Error loading posts:', error);
            showError('Error loading posts.');
        });
}

// Fetch the list of posts from posts.json
function fetchPosts() {
    return fetch('posts.json').then(res => res.json());
}

// Get post ID from URL query string
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Find a post by its ID
function findPostById(posts, id) {
    return posts.find(p => String(p.id) === String(id));
}

// Render the list of posts
function renderPostList(posts) {
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
function loadPost(filename) {
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
            showError('Error loading post content.');
        });
}

// Show a not found message
function showNotFound() {
    contentArea.innerHTML = '<h3>Post not found</h3>';
}

// Show a generic error message
function showError(message) {
    contentArea.innerHTML = `<h3>${message}</h3>`;
}

// Initialize the blog on page load
initBlog();
```

**Benefits of modularization:**
- Each function has a single responsibility.
- Easier to test individual functions.
- Improved readability and maintainability.

You can now import or test these functions individually in a test runner or browser console.

## Phase 5: Deployment via GitHub Pages

Your blog can be easily deployed using GitHub Pages:

1. **Commit and Push:**
   - Stage all files: `git add .`
   - Commit: `git commit -m "Initial blog setup"`
   - Push to GitHub.
2. **Enable GitHub Pages:**
   - Navigate to your repository's **Settings**.
   - Locate the **"Pages"** section.
   - Under **Build and deployment**, select **Source** → **Deploy from a branch**.
   - Choose your main branch (`main` or `master`) and the `/ (root)` directory.
   - Click **Save**.
3. **Access Your Blog:** After a short delay, GitHub will provide a live URL (e.g., `https://username.github.io/my-markdown-blog`).

## Adding New Blog Posts

1. Create a new Markdown file (e.g., `post-3.md`) in the `posts/` directory.
2. Add a corresponding entry to `posts.json`, ensuring the `id` is unique and the `filename` matches your new file:
```json
{
    "id": 3,
    "title": "My Third Blog Post",
    "date": "2024-01-01",
    "filename": "post-3.md",
    "summary": "A brief look at the future of my simple blog."
}
```
3. Commit and push your changes. The new post will automatically appear on your blog's homepage.

## Phase 6: Custom Styling

While Materialize CSS delivers the foundational styling for the frontend, you can implement additional customizations or overrides in the `style.css` file. Use this file to tailor the appearance of your blog to better match your personal or project-specific branding requirements.

## Phase 7: Browser-based Tests (Simple HTML Test Runner)

This project includes a very small, framework-free browser test harness in `test-runner.html` that runs module-based tests in the browser without Mocha or Chai. The file contains a minimal vanilla-JS runner which exposes `test(name, fn)` and `assert(cond, msg)` on `window`, groups tests by module, and renders pass/fail results directly on the page.

How it works:

- **Exposes helpers:** `window.test` and `window.assert` for registering tests and making assertions.
- **Module-friendly:** Tests are loaded as ES modules (`<script type="module" ...>`) so each test file registers with the harness and is shown under its module name.
- **Async support:** Test functions may return a Promise; the runner awaits it and reports failures with the thrown error message.
- **Output:** Results are appended to the page with a simple ✓/✗ summary and a final `x/y tests passed` line.

Running the tests locally:

1. Serve the repository over HTTP (browsers block module imports from plain file://). For example:

```bash
python3 -m http.server 8000
```

2. Open the runner in your browser: [http://127.0.0.1:8000/test-runner.html](http://127.0.0.1:8000/test-runner.html)

Notes and recommendations:

- Add test files under the `tests/` directory and load them from `test-runner.html` using `<script type="module" src="tests/your-test.js"></script>`.
- Import or load `app/` modules the same way (the repo currently loads `app/index.js` from the runner).
- This harness is intentionally small and useful for quick smoke tests. For more feature-rich testing (reporters, timeouts, mocks), consider switching to Mocha, Jest, or another test framework later.

