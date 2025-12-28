// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const quickbar = document.querySelector('.quickbar');
const closeBtn = document.getElementById('closeBtn');
const navItems = document.querySelectorAll('.nav-item');

let isMenuOpen = false;

// Open menu function
function openMenu() {
    isMenuOpen = true;
    hamburger.classList.add('active');
    quickbar.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close menu function
function closeMenu() {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    quickbar.classList.remove('active');
    document.body.style.overflow = '';
}

// Hamburger click to open menu
hamburger.addEventListener('click', openMenu);

// Close button click to close menu
closeBtn.addEventListener('click', closeMenu);

// Close menu when clicking on a nav item
navItems.forEach(item => {
    item.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !hamburger.contains(e.target) && !quickbar.contains(e.target)) {
        closeMenu();
    }
});

// Close menu on window resize to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 1023 && isMenuOpen) {
        closeMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
    }
});

// Theme toggle with persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const bulbIcon = document.getElementById('bulbIcon');
const moonIcon = document.getElementById('moonIcon');

const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initial = stored || (prefersDark ? 'dark' : 'light');
setTheme(initial);

themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
        setTheme(next);
        setTimeout(() => document.body.classList.remove('theme-transitioning'), 420);
    }, 10);
});

function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    const isDark = mode === 'dark';
    // Dark -> show bulb; Light -> show moon? (your original logic swapped)
    moonIcon.style.display = isDark ? 'none' : 'block';
    bulbIcon.style.display = isDark ? 'block' : 'none';
    localStorage.setItem('theme', mode);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Lazy pop-in animation for main sections on scroll with staggered delay
const lazySections = document.querySelectorAll(
    '.section#about, .section#skills, .section#experience, .section#education, .section#projects, .section#certifications, .section#contact, .section#terminal'
);

// Add initial transform and opacity for smooth animation
lazySections.forEach(section => {
    section.style.transform = 'translateY(30px)';
    section.style.opacity = '0';
    section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Also animate cards within each section
    const cards = section.querySelectorAll('.card');
    cards.forEach((card, cardIndex) => {
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.opacity = '0';
        card.style.transition = `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${cardIndex * 100}ms`;
        
        // Animate tags within cards
        const tags = card.querySelectorAll('.tag');
        tags.forEach((tag, tagIndex) => {
            tag.style.transform = 'translateY(10px) scale(0.9)';
            tag.style.opacity = '0';
            tag.style.transition = `all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${(cardIndex * 100) + (tagIndex * 50)}ms`;
        });
    });
});

const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on section order
            const delay = index * 200; // 200ms delay between each section
            
            setTimeout(() => {
                entry.target.classList.remove('lazyhide');
                entry.target.classList.add('fade-in');
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                
                // Animate cards within the section
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, cardIndex) => {
                    setTimeout(() => {
                        card.style.transform = 'translateY(0) scale(1)';
                        card.style.opacity = '1';
                        
                        // Animate tags within the card
                        const tags = card.querySelectorAll('.tag');
                        tags.forEach((tag, tagIndex) => {
                            setTimeout(() => {
                                tag.style.transform = 'translateY(0) scale(1)';
                                tag.style.opacity = '1';
                            }, tagIndex * 50); // 50ms delay between tags
                        });
                    }, cardIndex * 100); // 100ms delay between cards
                });
            }, delay);
            
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

lazySections.forEach(section => lazyObserver.observe(section));

// === ACTIVE LINK HIGHLIGHT (FIXED) ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.chip[href^="#"], .nav-item[href^="#"]');

function updateActiveNav() {
    const scrollMid = window.scrollY + window.innerHeight * 0.5; // viewport midpoint
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollMid >= top && scrollMid < top + height) {
            current = section.id;
        }
    });

    // Bottom-of-page fallback -> select last section (usually #contact)
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        const last = Array.from(sections).at(-1);
        if (last) current = last.id;
    }

    navLinks.forEach(link => {
        link.classList.toggle('primary', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav, { passive: true });
document.addEventListener('DOMContentLoaded', updateActiveNav);

// Chatbot functionality
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

let isOpen = false;

chatbotToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    chatbotWindow.classList.toggle('open', isOpen);
    if (isOpen) chatbotInput.focus();
});

chatbotClose.addEventListener('click', () => {
    isOpen = false;
    chatbotWindow.classList.remove('open');
});

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatbotInput.value = '';

    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(input) {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('skill') || lowerInput.includes('technology') || lowerInput.includes('tool')) {
        return "Yashraj specializes in Python, SQL, Scikit-learn, XGBoost, TensorFlow, PyTorch, Tableau, Power BI, and AWS/Azure. He's also experienced with MLOps, CI/CD, and model monitoring.";
    }
    if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job')) {
        return "Yashraj worked as a Machine Learning Intern at Octazen Software Solutions in 2023. He built churn prediction models achieving 88% accuracy and 0.91 AUC, then created a FastAPI microservice with production endpoints. He also optimized backend queries, reducing latency by 35%.";
    }
    if (lowerInput.includes('project') || lowerInput.includes('portfolio')) {
        return "Featured projects: NotionAtlas AI (semantic search & RAG for Notion), HR Analytics Dashboard (Tableau dashboard for attrition analysis), Automated Data Pipeline (ETL with Docker & Airflow), and PrepWise LinkedIn Interview AI (Chrome extension with voice interviews).";
    }
    if (lowerInput.includes('education') || lowerInput.includes('degree') || lowerInput.includes('university')) {
        return "Yashraj is pursuing an MS in Data Science (UNT, GPA 4.0). He also completed IBM's Data Science Professional Certificate.";
    }
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
        return "Reach Yashraj at muthyapwaryashraj@gmail.com. He's open to roles and collaborations in data science, ML, and analytics.";
    }
    if (lowerInput.includes('notion') || lowerInput.includes('rag') || lowerInput.includes('semantic')) {
        return "NotionAtlas AI is Yashraj's RAG-powered assistant that turns Notion workspaces into conversational interfaces. It uses semantic search and Llama 4 to provide real-time answers from your Notion content. Check it out at notionatlas.streamlit.app!";
    }
    if (lowerInput.includes('hr') || lowerInput.includes('attrition') || lowerInput.includes('tableau')) {
        return "Yashraj's HR Analytics Dashboard uses Tableau to analyze employee attrition patterns, identifying early-tenure and travel-related drivers. The dashboard shows current attrition at 16.1% with interactive visualizations.";
    }
    if (lowerInput.includes('pipeline') || lowerInput.includes('etl') || lowerInput.includes('airflow')) {
        return "The Automated Data Pipeline project demonstrates end-to-end ETL: API/web scraping → pandas transforms → SQLite → Streamlit app. It's containerized with Docker and schedulable with Airflow for production workflows.";
    }
    if (lowerInput.includes('linkedin') || lowerInput.includes('interview') || lowerInput.includes('prepwise')) {
        return "PrepWise is a Chrome extension that turns LinkedIn job posts into live mock interviews! It uses AI scoring and natural TTS for voice-driven practice sessions. Available on the Chrome Web Store.";
    }
    if (lowerInput.includes('octazen') || lowerInput.includes('churn') || lowerInput.includes('fastapi')) {
        return "At Octazen, Yashraj solved customer churn by building ML models (88% accuracy, 0.91 AUC) and deploying them as FastAPI microservices. He also optimized database queries, cutting latency by 35%.";
    }
    if (lowerInput.includes('data science') || lowerInput.includes('machine learning') || lowerInput.includes('analytics')) {
        return "Yashraj turns complex data into measurable outcomes with predictive modeling, experimentation, and decision intelligence—owning the lifecycle from discovery to deployment.";
    }
    return "Ask me about Yashraj's skills, experience, projects, education, or contact info. What would you like to know?";
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

document.addEventListener('click', (e) => {
    if (isOpen && !chatbotContainer.contains(e.target)) {
        isOpen = false;
        chatbotWindow.classList.remove('open');
    }
});

// Terminal functionality
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const terminalCursor = document.getElementById('terminalCursor');
const terminalPrompt = document.getElementById('terminalPrompt');

let terminalHistory = [];
let historyIndex = -1;
let currentDirectory = '~/portfolio'; // Track current directory

// Helper function to update terminal prompt
function updateTerminalPrompt() {
    const prompt = `yashraj@portfolio:${currentDirectory.replace('~/portfolio', '~')}$`;
    if (terminalPrompt) {
        terminalPrompt.textContent = prompt;
    }
}

// Helper function to get new directory path
function getNewDirectory(dir) {
    // Handle relative paths
    if (dir.startsWith('./')) {
        dir = dir.substring(2);
    }
    
    // Handle going up one directory
    if (dir === '..') {
        const parts = currentDirectory.split('/');
        if (parts.length <= 2) { // Can't go up from root
            return null;
        }
        parts.pop();
        return parts.join('/');
    }
    
    // Handle absolute paths
    if (dir.startsWith('/') || dir.startsWith('~/')) {
        if (dir.startsWith('~/')) {
            return dir.replace('~', '~/portfolio');
        }
        return `~/portfolio${dir}`;
    }
    
    // Handle multi-level relative paths (e.g., "skills/ml")
    if (dir.includes('/')) {
        const pathParts = dir.split('/');
        let newPath = currentDirectory;
        
        for (const part of pathParts) {
            if (part === '..') {
                const parts = newPath.split('/');
                if (parts.length <= 2) return null;
                parts.pop();
                newPath = parts.join('/');
            } else if (part === '.') {
                // Stay in current directory
                continue;
            } else {
                newPath = `${newPath}/${part}`;
            }
        }
        
        // Validate the final path
        if (isValidDirectory(newPath)) {
            return newPath;
        }
        return null;
    }
    
    // Handle single directory changes
    const newPath = `${currentDirectory}/${dir}`;
    if (isValidDirectory(newPath)) {
        return newPath;
    }
    
    return null; // Invalid directory
}

// Helper function to validate if a directory exists
function isValidDirectory(path) {
    const validPaths = [
        '~/portfolio',
        '~/portfolio/skills',
        '~/portfolio/skills/ml',
        '~/portfolio/skills/data',
        '~/portfolio/skills/analytics',
        '~/portfolio/skills/cloud',
        '~/portfolio/projects',
        '~/portfolio/experience',
        '~/portfolio/education'
    ];
    return validPaths.includes(path);
}

// Portfolio data for terminal commands
const portfolioData = {
    skills: {
        'ml': ['Scikit-learn', 'XGBoost', 'TensorFlow', 'PyTorch', 'Keras', 'Hugging Face'],
        'data': ['Python', 'SQL', 'Pandas', 'Spark', 'Airflow', 'Docker'],
        'analytics': ['Tableau', 'Power BI', 'Plotly', 'Matplotlib', 'Dash', 'Looker'],
        'cloud': ['AWS', 'Azure', 'Snowflake', 'Databricks', 'MongoDB', 'Redis']
    },
    projects: {
        'notionatlas-ai': {
            description: 'Turns your Notion workspace into a conversational, context-aware assistant with semantic search, Retrieval-Augmented Generation, and real-time answers.',
            tech: ['Python', 'Streamlit', 'Llama 4', 'RAG'],
            github: 'https://github.com/Yashraj-Muthyapwar/NotionAtlas-AI-Semantic-Search-And-RAG-Assistant-for-Notion',
            demo: 'https://notionatlas.streamlit.app/'
        },
        'hr-analytics-dashboard': {
            description: 'Interactive Tableau dashboard that surfaces early-tenure and travel-related attrition drivers; current overall attrition 16.1%.',
            tech: ['Tableau', 'HR Analytics', 'Attrition'],
            github: 'https://github.com/Yashraj-Muthyapwar/HR-Analytics-Dashboard',
            demo: 'https://public.tableau.com/app/profile/yash.raj.muthyapwar/viz/HR_Analytics_Workbook/HRDashboard'
        },
        'automated-data-pipeline': {
            description: 'End-to-end ETL from API / web scraping / CSV → pandas transforms → SQLite → a sleek Streamlit app. Containerized with Docker and schedulable with Airflow.',
            tech: ['Python', 'ETL', 'Airflow', 'Docker', 'Streamlit'],
            github: 'https://github.com/Yashraj-Muthyapwar/Automated-Data-Pipeline-Interactive-Dashboard',
            demo: 'https://github.com/Yashraj-Muthyapwar/Automated-Data-Pipeline-Interactive-Dashboard'
        },
        'prepwise-linkedin-ai': {
            description: 'Turns LinkedIn job posts into live, voice-driven mock interviews with instant AI scoring and natural TTS—right on the job page.',
            tech: ['Chrome Extension', 'JavaScript', 'Whisper'],
            github: 'https://github.com/Yashraj-Muthyapwar/PrepWise-LinkedIn-Interview-AI',
            demo: 'https://chromewebstore.google.com/detail/prepwise-linkedin-intervi/nhdmfoekhhmamoidnappbckcjlbojnke'
        }
    },
    experience: {
        'octazen': {
            period: '2023',
            role: 'Machine Learning Intern',
            company: 'Octazen Software Solutions',
            description: 'At Octazen, customer churn was climbing and no one really knew why. I started with a quick logistic regression baseline, moved through Random Forest and XGBoost, and ended up with a model that held its ground 88% accuracy and 0.91 AUC. Built a FastAPI microservice with versioned /score and /health endpoints, turning it into something teams could actually use in production. Teamed up with data engineering to clean up the backend mess - smarter indexes, tighter joins, fewer round trips - which cut query latency by 35%.'
        }
    },
    education: {
        'ms': {
            degree: 'Master\'s of Science in Data Science',
            school: 'University of North Texas',
            period: '2024 - Present',
            gpa: '4.0/4.0'
        },
        'btech': {
            degree: 'Bachelor\'s of Technology in Computer Science',
            school: 'Malla Reddy College of Engineering',
            period: '2019 - 2023',
            gpa: '3.56/4.0'
        }
    },
    certifications: {
        'aws-ml': {
            name: 'AWS Certified Machine Learning Engineer - Associate',
            issuer: 'Amazon Web Services',
            year: '2024'
        },
        'mongodb': {
            name: 'MongoDB Associate Developer',
            issuer: 'MongoDB University',
            year: '2024'
        },
        'snowflake': {
            name: 'Snowflake Data Engineering',
            issuer: 'Snowflake - Coursera',
            year: '2024'
        },
        'deeplearning': {
            name: 'Deep Learning Specialization',
            issuer: 'DeepLearning.AI',
            year: '2024'
        },
        'ibm': {
            name: 'IBM Data Science Professional Certificate',
            issuer: 'IBM - Coursera',
            year: '2024'
        },
        'nlp': {
            name: 'Natural Language Processing Specialization Certificate',
            issuer: 'DeepLearning.AI',
            year: '2024'
        }
    }
};

// Terminal commands
const terminalCommands = {
    help: () => {
        return `Available commands: <span class="terminal-command">help</span> (show this help message), <span class="terminal-command">whoami</span> (display user information), <span class="terminal-command">ls</span> (list available directories), <span class="terminal-command">cat</span> <span class="terminal-arg">[file]</span> (display file contents), <span class="terminal-command">cd</span> <span class="terminal-arg">[dir]</span> (change directory), <span class="terminal-command">pwd</span> (print working directory), <span class="terminal-command">tree</span> (show directory structure), <span class="terminal-command">find</span> <span class="terminal-arg">[pattern]</span> (search for files/content), <span class="terminal-command">date</span> (show current date and time), <span class="terminal-command">echo</span> <span class="terminal-arg">[text]</span> (display text), <span class="terminal-command">man</span> <span class="terminal-arg">[cmd]</span> (show manual page), <span class="terminal-command">skills</span> (show technical skills), <span class="terminal-command">projects</span> (list projects), <span class="terminal-command">experience</span> (show work experience), <span class="terminal-command">education</span> (show education background), <span class="terminal-command">certifications</span> (show certifications), <span class="terminal-command">contact</span> (show contact information), <span class="terminal-command">clear</span> (clear terminal), <span class="terminal-command">exit</span> (close terminal).`;
    },
    
    whoami: () => {
        return `yashraj
Data Scientist | ML Engineer | Analytics Professional
Transforming raw data into actionable insights at the intersection of 
analytics, machine learning, and business intelligence.`;
    },
    
    ls: () => {
        if (currentDirectory === '~/portfolio') {
            return `<span class="terminal-directory">skills/</span>     <span class="terminal-directory">projects/</span>     <span class="terminal-directory">experience/</span>
<span class="terminal-directory">education/</span>  <span class="terminal-file">resume.pdf</span>    <span class="terminal-file">contact.txt</span>`;
        } else if (currentDirectory === '~/portfolio/skills') {
            return `<span class="terminal-directory">ml/</span>         <span class="terminal-directory">data/</span>         <span class="terminal-directory">analytics/</span>
<span class="terminal-directory">cloud/</span>      <span class="terminal-file">README.md</span>`;
        } else if (currentDirectory === '~/portfolio/skills/ml') {
            return portfolioData.skills.ml.map(skill => 
                `<span class="terminal-file">${skill}</span>`
            ).join('     ');
        } else if (currentDirectory === '~/portfolio/skills/data') {
            return portfolioData.skills.data.map(skill => 
                `<span class="terminal-file">${skill}</span>`
            ).join('     ');
        } else if (currentDirectory === '~/portfolio/skills/analytics') {
            return portfolioData.skills.analytics.map(skill => 
                `<span class="terminal-file">${skill}</span>`
            ).join('     ');
        } else if (currentDirectory === '~/portfolio/skills/cloud') {
            return portfolioData.skills.cloud.map(skill => 
                `<span class="terminal-file">${skill}</span>`
            ).join('     ');
        } else if (currentDirectory === '~/portfolio/projects') {
            return `<span class="terminal-file">notionatlas-ai/</span>        <span class="terminal-file">hr-analytics-dashboard/</span>
<span class="terminal-file">automated-data-pipeline/</span>  <span class="terminal-file">prepwise-linkedin-ai/</span>`;
        } else if (currentDirectory === '~/portfolio/experience') {
            return `<span class="terminal-file">octazen.txt</span>`;
        } else if (currentDirectory === '~/portfolio/education') {
            return `<span class="terminal-file">ms-datascience.txt</span>  <span class="terminal-file">btech-cs.txt</span>`;
        }
        return `<span class="terminal-error">ls: cannot access directory: No such file or directory</span>`;
    },
    
    cat: (args) => {
        if (!args || args.length === 0) {
            return `<span class="terminal-error">cat: missing file operand</span>
Try 'cat resume.pdf' or 'cat contact.txt'`;
        }
        
        const file = args[0];
        switch (file) {
            case 'resume.pdf':
                return `Yashraj Muthyapwar - Data Scientist Resume
===============================================

📧 Email: muthyapwaryashraj@gmail.com
🌐 LinkedIn: linkedin.com/in/yashraj-muthyapwar
💻 GitHub: github.com/yashraj-muthyapwar
📍 Location: United States

🎯 Summary:
Data Scientist with expertise in machine learning, analytics, and 
business intelligence. Proven track record of building end-to-end 
data products that drive measurable business impact.

🔧 Technical Skills:
• Machine Learning: Scikit-learn, XGBoost, TensorFlow, PyTorch
• Data Engineering: Python, SQL, Spark, Airflow, Docker
• Analytics: Tableau, Power BI, Plotly, Matplotlib
• Cloud: AWS, Azure, Snowflake, Databricks

📊 Key Achievements:
• 89% accuracy churn prediction model (15% churn reduction)
• 18% MAPE improvement in demand forecasting
• 60% reduction in manual review time via NLP
• 25% improvement in stockout rate through forecasting`;
                
            case 'contact.txt':
                return `Contact Information
==================

📧 Email: muthyapwaryashraj@gmail.com
🌐 LinkedIn: linkedin.com/in/yashraj-muthyapwar
💻 GitHub: github.com/yashraj-muthyapwar
📍 Location: United States

Open to roles and collaborations in data science, ML, and analytics.
Prefer email first for initial contact.`;
                
            case 'octazen.txt':
                return `Octazen Software Solutions - Machine Learning Intern (2023)
===============================================================

At Octazen, customer churn was climbing and no one really knew why. I wasn't 
handed a clean dataset or a clear plan, just a problem that needed fixing.

I started with a quick logistic regression baseline, moved through Random Forest 
and XGBoost, and ended up with a model that held its ground 88% accuracy and 
0.91 AUC. But models in notebooks don't change outcomes, so I built a FastAPI 
microservice with versioned /score and /health endpoints, turning it into 
something teams could actually use in production.

Meanwhile, I teamed up with data engineering to clean up the backend mess - 
smarter indexes, tighter joins, fewer round trips - which cut query latency by 
35%. Suddenly, dashboards started updating faster and churn risk wasn't a 
mystery anymore.

My biggest takeaway? Great models matter, but impact comes from shipping 
systems that work every single day.`;
                
            case 'README.md':
                return `Skills Directory
===============

This directory contains Yashraj's technical skills organized by category:

📁 ml/          - Machine Learning & AI frameworks
📁 data/        - Data engineering and processing tools  
📁 analytics/   - Business intelligence and visualization
📁 cloud/       - Cloud platforms and infrastructure

Each subdirectory contains specific technologies and tools that Yashraj has 
experience with. Use 'ls' to explore each category or 'cd' to navigate 
into specific skill areas.

For a complete overview, use the 'skills' command from the root directory.`;
                
            default:
                return `<span class="terminal-error">cat: ${file}: No such file or directory</span>`;
        }
    },
    
    cd: (args) => {
        if (!args || args.length === 0) {
            currentDirectory = '~/portfolio';
            updateTerminalPrompt();
            return `Current directory: <span class="terminal-success">${currentDirectory}</span>`;
        }
        
        const dir = args[0];
        const newDir = getNewDirectory(dir);
        
        if (newDir) {
            currentDirectory = newDir;
            updateTerminalPrompt();
            return `Changed to <span class="terminal-directory">${currentDirectory}</span>
Type 'ls' to see available contents.`;
        } else {
            return `<span class="terminal-error">cd: ${dir}: No such file or directory</span>`;
        }
    },
    
    pwd: () => {
        return `<span class="terminal-success">${currentDirectory}</span>`;
    },
    
    skills: () => {
        return `Technical Skills
================

🤖 Machine Learning & AI:
${portfolioData.skills.ml.map(skill => `  • ${skill}`).join('\n')}

📊 Data & Engineering:
${portfolioData.skills.data.map(skill => `  • ${skill}`).join('\n')}

📈 Analytics & BI:
${portfolioData.skills.analytics.map(skill => `  • ${skill}`).join('\n')}

☁️ Cloud & Infrastructure:
${portfolioData.skills.cloud.map(skill => `  • ${skill}`).join('\n')}`;
    },
    
    projects: () => {
        return `Featured Projects
===============

🤖 NotionAtlas AI Semantic Search & RAG
   ${portfolioData.projects['notionatlas-ai'].description}
   Tech: ${portfolioData.projects['notionatlas-ai'].tech.join(', ')}

📊 HR Analytics Dashboard
   ${portfolioData.projects['hr-analytics-dashboard'].description}
   Tech: ${portfolioData.projects['hr-analytics-dashboard'].tech.join(', ')}

⚙️ Automated Data Pipeline & Interactive Dashboard
   ${portfolioData.projects['automated-data-pipeline'].description}
   Tech: ${portfolioData.projects['automated-data-pipeline'].tech.join(', ')}

🎤 PrepWise LinkedIn Interview AI
   ${portfolioData.projects['prepwise-linkedin-ai'].description}
   Tech: ${portfolioData.projects['prepwise-linkedin-ai'].tech.join(', ')}`;
    },
    
    experience: () => {
        return `Work Experience
==============

🏢 Octazen Software Solutions - ${portfolioData.experience.octazen.period}
   ${portfolioData.experience.octazen.role}
   ${portfolioData.experience.octazen.description}`;
    },
    
    education: () => {
        return `Education Background
==================

🎓 ${portfolioData.education.ms.degree}
   ${portfolioData.education.ms.school} (${portfolioData.education.ms.period})
   GPA: ${portfolioData.education.ms.gpa}

🎓 ${portfolioData.education.btech.degree}
   ${portfolioData.education.btech.school} (${portfolioData.education.btech.period})
   GPA: ${portfolioData.education.btech.gpa}`;
    },
    
    certifications: () => {
        return `Professional Certifications
===========================

🏆 ${portfolioData.certifications['aws-ml'].name}
   ${portfolioData.certifications['aws-ml'].issuer}

🏆 ${portfolioData.certifications.mongodb.name}
   ${portfolioData.certifications.mongodb.issuer}

🏆 ${portfolioData.certifications.snowflake.name}
   ${portfolioData.certifications.snowflake.issuer}

🏆 ${portfolioData.certifications.deeplearning.name}
   ${portfolioData.certifications.deeplearning.issuer}

🏆 ${portfolioData.certifications.ibm.name}
   ${portfolioData.certifications.ibm.issuer}

🏆 ${portfolioData.certifications.nlp.name}
   ${portfolioData.certifications.nlp.issuer}`;
    },
    
    contact: () => {
        return `Contact Information
==================

📧 Email: muthyapwaryashraj@gmail.com
🌐 LinkedIn: linkedin.com/in/yashraj-muthyapwar
💻 GitHub: github.com/yashraj-muthyapwar
📍 Location: United States

Open to roles and collaborations in data science, ML, and analytics.
Prefer email first for initial contact.`;
    },
    
    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },
    
    tree: () => {
        return `portfolio/
├── skills/
│   ├── ml/
│   │   ├── Scikit-learn
│   │   ├── XGBoost
│   │   ├── TensorFlow
│   │   ├── PyTorch
│   │   ├── Keras
│   │   └── Hugging Face
│   ├── data/
│   │   ├── Python
│   │   ├── SQL
│   │   ├── Pandas
│   │   ├── Spark
│   │   ├── Airflow
│   │   └── Docker
│   ├── analytics/
│   │   ├── Tableau
│   │   ├── Power BI
│   │   ├── Plotly
│   │   ├── Matplotlib
│   │   ├── Dash
│   │   └── Looker
│   ├── cloud/
│   │   ├── AWS
│   │   ├── Azure
│   │   ├── Snowflake
│   │   ├── Databricks
│   │   ├── MongoDB
│   │   └── Redis
│   └── README.md
├── projects/
│   ├── notionatlas-ai/
│   ├── hr-analytics-dashboard/
│   ├── automated-data-pipeline/
│   └── prepwise-linkedin-ai/
├── experience/
│   └── octazen.txt
├── education/
│   ├── ms-datascience.txt
│   └── btech-cs.txt
├── resume.pdf
└── contact.txt`;
    },
    
    find: (args) => {
        if (!args || args.length === 0) {
            return `<span class="terminal-error">find: missing search pattern</span>
Usage: find <pattern>`;
        }
        
        const pattern = args[0].toLowerCase();
        const results = [];
        
        // Search through all available content
        if (pattern.includes('python') || pattern.includes('ml') || pattern.includes('machine')) {
            results.push('skills/data/Python', 'skills/ml/');
        }
        if (pattern.includes('tableau') || pattern.includes('viz') || pattern.includes('dashboard')) {
            results.push('skills/analytics/Tableau', 'projects/hr-analytics-dashboard/');
        }
        if (pattern.includes('notion') || pattern.includes('rag') || pattern.includes('ai')) {
            results.push('projects/notionatlas-ai/');
        }
        if (pattern.includes('pipeline') || pattern.includes('etl') || pattern.includes('data')) {
            results.push('projects/automated-data-pipeline/');
        }
        if (pattern.includes('linkedin') || pattern.includes('interview') || pattern.includes('prepwise')) {
            results.push('projects/prepwise-linkedin-ai/');
        }
        if (pattern.includes('octazen') || pattern.includes('intern') || pattern.includes('experience')) {
            results.push('experience/octazen.txt');
        }
        if (pattern.includes('resume') || pattern.includes('cv')) {
            results.push('resume.pdf');
        }
        if (pattern.includes('contact') || pattern.includes('email')) {
            results.push('contact.txt');
        }
        
        if (results.length > 0) {
            return results.map(result => `<span class="terminal-file">./${result}</span>`).join('\n');
        } else {
            return `<span class="terminal-text">No matches found for "${pattern}"</span>`;
        }
    },
    
    
    date: () => {
        const now = new Date();
        return `<span class="terminal-text">${now.toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        })}</span>`;
    },
    
    echo: (args) => {
        if (!args || args.length === 0) {
            return `<span class="terminal-text"></span>`;
        }
        return `<span class="terminal-text">${args.join(' ')}</span>`;
    },
    
    
    man: (args) => {
        if (!args || args.length === 0) {
            return `<span class="terminal-error">man: missing command name</span>
Usage: man <command>`;
        }
        
        const cmd = args[0].toLowerCase();
        if (terminalCommands[cmd]) {
            return `<span class="terminal-text">NAME
    ${cmd} - ${getCommandDescription(cmd)}

DESCRIPTION
    ${getCommandDescription(cmd)}

EXAMPLES
    ${getCommandExamples(cmd)}</span>`;
        } else {
            return `<span class="terminal-error">man: ${cmd}: No manual entry</span>`;
        }
    },
    
    exit: () => {
        return `<span class="terminal-success">Goodbye! Thanks for visiting my portfolio.</span>`;
    }
};

// Terminal input handling
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = terminalInput.value.trim();
        
        if (command) {
            // Add command to history
            terminalHistory.push(command);
            historyIndex = terminalHistory.length;
            
            // Display command
            addTerminalLine(command, 'command');
            
            // Add typing delay for more realistic feel
            setTimeout(() => {
                // Process command
                const [cmd, ...args] = command.split(' ');
                const result = processCommand(cmd, args);
                
                if (result) {
                    addTerminalLine(result, 'output');
                }
            }, 100 + Math.random() * 200); // Random delay 100-300ms
            
            terminalInput.value = '';
        } else {
            // Empty command - just show prompt
            addTerminalLine('', 'command');
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        // Navigate up in history
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = terminalHistory[historyIndex] || '';
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        // Navigate down in history
        if (historyIndex < terminalHistory.length - 1) {
            historyIndex++;
            terminalInput.value = terminalHistory[historyIndex] || '';
        } else if (historyIndex === terminalHistory.length - 1) {
            // Clear input when at the end
            historyIndex = terminalHistory.length;
            terminalInput.value = '';
        }
    }
});

function addTerminalLine(text, type) {
    const prompt = `yashraj@portfolio:${currentDirectory.replace('~/portfolio', '~')}$`;
    
    // Handle multi-line output (like tree command)
    if (text.includes('\n')) {
        const lines = text.split('\n');
        lines.forEach((lineText, index) => {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            
            if (index === 0) {
                // First line shows the prompt
                if (type === 'command') {
                    line.innerHTML = `<span class="terminal-prompt">${prompt}</span><span class="terminal-command">${lineText}</span>`;
                } else {
                    line.innerHTML = `<span class="terminal-prompt">${prompt}</span><span class="terminal-text">${lineText}</span>`;
                }
            } else {
                // Subsequent lines are indented to align with the text
                line.innerHTML = `<span class="terminal-prompt" style="visibility: hidden;">${prompt}</span><span class="terminal-text">${lineText}</span>`;
            }
            
            terminalOutput.appendChild(line);
        });
    } else {
        // Single line output
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (type === 'command') {
            line.innerHTML = `<span class="terminal-prompt">${prompt}</span><span class="terminal-command">${text}</span>`;
        } else {
            line.innerHTML = `<span class="terminal-prompt">${prompt}</span><span class="terminal-text">${text}</span>`;
        }
        
        terminalOutput.appendChild(line);
    }
    
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}


// Helper functions for man command
function getCommandDescription(cmd) {
    const descriptions = {
        'help': 'Display available commands',
        'whoami': 'Display current user information',
        'ls': 'List directory contents',
        'cat': 'Display file contents',
        'cd': 'Change current directory',
        'pwd': 'Print working directory',
        'tree': 'Display directory structure in tree format',
        'find': 'Search for files and directories',
        'date': 'Display current date and time',
        'echo': 'Display text to terminal',
        'man': 'Display manual page for commands',
        'skills': 'Show technical skills',
        'projects': 'List portfolio projects',
        'experience': 'Show work experience',
        'education': 'Show education background',
        'certifications': 'Show professional certifications',
        'contact': 'Show contact information',
        'clear': 'Clear terminal screen',
        'exit': 'Exit terminal'
    };
    return descriptions[cmd] || 'No description available';
}

function getCommandExamples(cmd) {
    const examples = {
        'cd': 'cd skills/ml    # Navigate to skills/ml directory\n    cd ..          # Go back one directory',
        'ls': 'ls              # List current directory\n    ls skills      # List skills directory',
        'cat': 'cat resume.pdf  # Display resume\n    cat contact.txt # Display contact info',
        'find': 'find python     # Find Python-related content\n    find tableau   # Find Tableau-related content',
        'tree': 'tree            # Show complete directory structure',
        'man': 'man ls          # Show manual for ls command\n    man cd         # Show manual for cd command'
    };
    return examples[cmd] || 'No examples available';
}

function processCommand(cmd, args) {
    const command = terminalCommands[cmd.toLowerCase()];
    
    if (command) {
        return command(args);
    } else {
        // Check if it's a file in the current directory that can be displayed with cat
        if (currentDirectory === '~/portfolio/skills' && cmd === 'README.md') {
            return terminalCommands.cat(['README.md']);
        } else if (currentDirectory === '~/portfolio' && (cmd === 'resume.pdf' || cmd === 'contact.txt')) {
            return terminalCommands.cat([cmd]);
        } else if (currentDirectory === '~/portfolio/experience' && cmd === 'octazen.txt') {
            return terminalCommands.cat(['octazen.txt']);
        } else if (currentDirectory === '~/portfolio/education' && (cmd === 'ms-datascience.txt' || cmd === 'btech-cs.txt')) {
            return terminalCommands.cat([cmd]);
        }
        
        return `<span class="terminal-error">${cmd}: command not found</span>
Type 'help' to see available commands.`;
    }
}

// Focus terminal input when terminal section is visible
const terminalSection = document.getElementById('terminal');
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                terminalInput.focus();
            }, 500);
        }
    });
}, { threshold: 0.5 });

if (terminalSection) {
    terminalObserver.observe(terminalSection);
}

// MongoDB Certification PDF Preview on Hover
const mongodbCertCard = document.querySelector('.mongodb-cert-card');
if (mongodbCertCard) {
    const certPreview = mongodbCertCard.querySelector('.cert-preview iframe');
    const pdfPath = mongodbCertCard.getAttribute('data-cert-pdf');
    
    // Load PDF every time mouse enters the card
    mongodbCertCard.addEventListener('mouseenter', () => {
        if (certPreview && pdfPath) {
            // Always reload with a fresh timestamp to prevent caching
            const timestamp = new Date().getTime();
            const randomId = Math.random().toString(36).substring(7);
            // Use view parameters that work consistently across Chrome and Edge
            // FitH fits horizontally, zoom 115% to crop bottom whitespace
            const pdfUrl = pdfPath + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=115&page=1&t=' + timestamp + '&r=' + randomId;
            certPreview.src = pdfUrl;
        }
    });
}
