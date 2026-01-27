// Load and display projects from JSON
async function loadProjects() {
    const container = document.getElementById('projects-container');
    
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        
        const projects = await response.json();
        
        if (projects.length === 0) {
            container.innerHTML = '<p class="loading">No projects found.</p>';
            return;
        }
        
        // Clear loading message
        container.innerHTML = '';
        
        // Create project cards
        projects.forEach(project => {
            const card = createProjectCard(project);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = `
            <div class="loading" style="color: #ef4444;">
                ⚠️ Failed to load projects. Please try again later.
            </div>
        `;
    }
}

// Create a project card element
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    if (project.featured) {
        card.classList.add('featured');
    }
    
    // Create image element
    const img = document.createElement('img');
    img.className = 'project-image';
    img.src = project.image;
    img.alt = project.title;
    img.onerror = function() {
        // Fallback if image doesn't exist
        this.style.display = 'none';
    };
    
    // Create content section
    const content = document.createElement('div');
    content.className = 'project-content';
    
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;
    
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;
    
    // Create tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'project-tags';
    
    if (project.tags && project.tags.length > 0) {
        project.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
    }

    // Create stack icons
    const stackRow = createStackRow(project.stack);
    
    // Create link
    const link = document.createElement('a');
    link.href = project.url;
    link.className = 'project-link';
    link.textContent = 'Visit Project →';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Add Google Analytics event tracking
    link.addEventListener('click', () => {
        if (window.gtag) {
            gtag('event', 'project_click', {
                'event_category': 'Projects',
                'event_label': project.title,
                'project_id': project.id,
                'project_url': project.url
            });
        }
    });
    
    // Assemble the card
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(tagsContainer);
    if (stackRow) {
        content.appendChild(stackRow);
    }
    content.appendChild(link);
    
    card.appendChild(img);
    card.appendChild(content);
    
    return card;
}

// Create stack icon row
function createStackRow(stack = []) {
    if (!stack || stack.length === 0) return null;

    const iconMap = {
        fastapi: 'devicon-fastapi-plain',
        postgres: 'devicon-postgresql-plain',
        postgresql: 'devicon-postgresql-plain',
        python: 'devicon-python-plain',
        react: 'devicon-react-original',
        vue: 'devicon-vuejs-plain',
        vuejs: 'devicon-vuejs-plain',
        javascript: 'devicon-javascript-plain',
        typescript: 'devicon-typescript-plain',
        node: 'devicon-nodejs-plain',
        nodejs: 'devicon-nodejs-plain',
        docker: 'devicon-docker-plain',
        expo: 'devicon-expo-original',
        html5: 'devicon-html5-plain',
        css3: 'devicon-css3-plain',
        reactnative: "devicon-reactnative-original",
        nginx: 'devicon-nginx-original',
        express: 'devicon-express-original',
        android: 'devicon-android-plain',
        aws: 'devicon-amazonwebservices-plain-wordmark',
        sqlite3: 'devicon-sqlite-plain'
    };

    const row = document.createElement('div');
    row.className = 'project-stack';

    stack.forEach(tech => {
        const item = document.createElement('span');
        item.className = 'stack-icon';

        const icon = document.createElement('i');
        const key = tech.toLowerCase();
        icon.className = `${iconMap[key] || 'devicon-code-plain'} colored`;

        const label = document.createElement('span');
        label.textContent = tech;

        item.appendChild(icon);
        item.appendChild(label);
        row.appendChild(item);
    });

    return row;
}

// Set current year in footer
function setYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setYear();
});
