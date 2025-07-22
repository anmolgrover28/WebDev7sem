// Static blog data
const staticBlogs = [
    {
        id: 1,
        title: "Getting Started with HTML",
        author: "Alice",
        category: "HTML",
        date: "2024-06-01",
        content: "Learn the basics of HTML and how to structure web pages."
    },
    {
        id: 2,
        title: "CSS Flexbox Guide",
        author: "Bob",
        category: "CSS",
        date: "2024-06-03",
        content: "Master layout techniques with CSS Flexbox."
    },
    {
        id: 3,
        title: "JavaScript Debouncing Explained",
        author: "Alice",
        category: "JavaScript",
        date: "2024-06-05",
        content: "Understand debouncing and how to use it in your projects."
    },
    {
        id: 4,
        title: "Responsive Web Design",
        author: "Charlie",
        category: "CSS",
        date: "2024-06-02",
        content: "Tips and tricks for making your website responsive."
    },
    {
        id: 5,
        title: "DOM Manipulation Basics",
        author: "Bob",
        category: "JavaScript",
        date: "2024-06-04",
        content: "How to interact with the DOM using JavaScript."
    }
];

function getLocalBlogs() {
    return JSON.parse(localStorage.getItem('userBlogs') || '[]');
}

function saveLocalBlogs(blogs) {
    localStorage.setItem('userBlogs', JSON.stringify(blogs));
}

function addBlog(blog) {
    const blogs = getLocalBlogs();
    blog.id = Date.now();
    blogs.push(blog);
    saveLocalBlogs(blogs);
}

// Only run blog rendering logic if blogs-container exists (i.e., on blogs.html)
const blogsContainer = document.getElementById('blogs-container');
if (blogsContainer) {
    const searchInput = document.getElementById('search-input');
    const authorFilter = document.getElementById('author-filter');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');

    function getAllBlogs() {
        // User blogs first, then static blogs
        return [...getLocalBlogs(), ...staticBlogs];
    }

    // Populate filter dropdowns
    document.addEventListener('DOMContentLoaded', () => {
        renderBlogs();
        populateFilters();
    });

    function populateFilters() {
        const allBlogs = getAllBlogs();
        // Remove old options except first
        while (authorFilter.options.length > 1) authorFilter.remove(1);
        while (categoryFilter.options.length > 1) categoryFilter.remove(1);
        const authors = [...new Set(allBlogs.map(b => b.author))];
        const categories = [...new Set(allBlogs.map(b => b.category))];
        authors.forEach(author => {
            const opt = document.createElement('option');
            opt.value = author;
            opt.textContent = author;
            authorFilter.appendChild(opt);
        });
        categories.forEach(category => {
            const opt = document.createElement('option');
            opt.value = category;
            opt.textContent = category;
            categoryFilter.appendChild(opt);
        });
    }

    // Debounce function
    function debounce(fn, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Render blogs
    function renderBlogs() {
        const blogs = getAllBlogs();
        let filtered = blogs.filter(blog => {
            const searchText = searchInput.value.trim().toLowerCase();
            const matchesTitle = blog.title.toLowerCase().includes(searchText);
            const matchesAuthor = !authorFilter.value || blog.author === authorFilter.value;
            const matchesCategory = !categoryFilter.value || blog.category === categoryFilter.value;
            return matchesTitle && matchesAuthor && matchesCategory;
        });
        // Sort
        if (sortBy.value === 'date-desc') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        // Render
        blogsContainer.innerHTML = filtered.length ? filtered.map(blog => `
            <div class="blog-card">
                <div class="blog-title">${blog.title}</div>
                <div class="blog-meta">By ${blog.author} | ${blog.category} | ${blog.date}</div>
                <div class="blog-content">${blog.content}</div>
            </div>
        `).join('') : '<p>No blogs found.</p>';
    }

    // Event listeners
    searchInput.addEventListener('input', debounce(renderBlogs, 300));
    authorFilter.addEventListener('change', renderBlogs);
    categoryFilter.addEventListener('change', renderBlogs);
    sortBy.addEventListener('change', renderBlogs);

    // Re-render blogs and filters when localStorage changes (e.g., after new blog upload)
    window.addEventListener('storage', function(e) {
        if (e.key === 'userBlogs') {
            renderBlogs();
            populateFilters();
        }
    });
}

// Expose addBlog to window for admin.html to use
window.addBlog = addBlog;
