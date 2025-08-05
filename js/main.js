document.addEventListener('DOMContentLoaded', function() {
    // ==================== Theme Toggle ====================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Initialize theme from localStorage or system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    }
    
    themeToggle?.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });

    // ==================== Mobile Menu ====================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full', 'pointer-events-none', 'opacity-0');
        mobileMenu.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full', 'pointer-events-none', 'opacity-0');
        mobileMenu.classList.remove('translate-x-0');
        document.body.style.overflow = '';
    }

    mobileMenuButton?.addEventListener('click', openMobileMenu);
    mobileMenuClose?.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on links
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    mobileMenu?.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    // ==================== Chatbot ====================
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotBox = document.getElementById("chatbot-box");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotForm = document.getElementById("chatbot-input-row");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");
  
    function addBubble(msg, from = 'bot') {
      const div = document.createElement('div');
      div.className = `chat-bubble ${from === 'user' ? 'user' : ''}`;
      div.textContent = msg;
      chatbotMessages.appendChild(div);
      chatbotMessages.scrollTo({ top: chatbotMessages.scrollHeight, behavior: 'smooth' });
    }
  
    chatbotToggle.onclick = () => {
      chatbotBox.style.display = 'flex';
      setTimeout(() => {
        chatbotBox.classList.add('open');
      }, 10);

      if (!chatbotMessages.querySelector('.chat-bubble')) {
        setTimeout(() => {
          addBubble("👋 Hey! I'm Yashraj's AI assistant. Ask me about his projects, skills in Python & ML, or summary of his profile — I'm here to help!");
        }, 300);
      }
    };
    
    chatbotClose.onclick = () => {
      chatbotBox.classList.remove('open');
      setTimeout(() => {
        chatbotBox.style.display = 'none';
      }, 300);
    };
  
    chatbotForm.onsubmit = async e => {
      e.preventDefault();
      const msg = chatbotInput.value.trim();
      if (!msg) return;
    
      addBubble(msg, 'user');
      chatbotInput.value = '';
    
      try {
        const res = await fetch("https://chatbot-backend-c5be.onrender.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg })
        });
    
        const data = await res.json();
        console.log("✅ Backend replied:", data.response);
        addBubble(data.response || "Sorry, I couldn't respond right now.");
      } catch (err) {
        console.error("❌ Error reaching backend:", err);
        handleOfflineResponse(msg);
      }
    };

    function handleOfflineResponse(msg) {
        const lowerMsg = msg.toLowerCase();
        let response = "I'm currently offline, but I can share some key information about Yashraj Muthyapwar: work, skill,education & contact";
        
        if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
            response = "🚀 Yashraj has worked on exciting projects including:\n\n• PrepWise LinkedIN Interview AI (AI, 100% privacy-first)\n• NotionAtlas AI (AI/RAG, 98% accuracy )\n• OTT Management Systemd (DBMS)\n\nClick 'View Details' on any project to learn more!";
        } else if (lowerMsg.includes('skill') || lowerMsg.includes('technology') || lowerMsg.includes('tech')) {
            response = "🛠️ Yashraj's technical expertise includes:\n\n• Python, TensorFlow, PyTorch, Keras\n• Machine Learning & Deep Learning\n• NLP, Computer Vision, Time Series\n• Data Analysis with Pandas & NumPy\n• Statistical Analysis & Visualization";
        } else if (lowerMsg.includes('education') || lowerMsg.includes('background')) {
            response = "🎓 Yashraj is a Data Science Graduate at UNT and Machine Learning Expert specializing in transforming complex data into actionable insights using cutting-edge techniques.";
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
            response = "📧 You can connect with Yashraj through the contact information available on his profile. Check out his GitHub for code samples and project repositories!";
        }
        
        addBubble(response);
    }

    // ==================== Project Modal ====================
    const projectDetails = {
        "PrepWise — LinkedIn Interview AI": {
            "description": "PrepWise is a Chrome extension that transforms any LinkedIn job post into a live AI-powered interview simulator. Designed for job seekers, students, and professionals, it helps users practice interviews in real time with voice-based responses, instant AI feedback, and natural TTS playback — all without leaving LinkedIn.",
            "tech_stack": ["Chrome Extension", "HTML5", "CSS3", "JavaScript ES6", "OpenAI","Secure API Handling"],
            "key_features": ["<b>Voice-based</b> mock interviews", "<b>Job-specific</b> questions", "<b>70% faster</b> preparation", "<b>Natural TTS</b> playback", "<b>100% privacy-first</b>"],
            "methodology": "Most interview prep tools force users to <b>switch contexts, copy and paste long job descriptions,</b> or even <b>leave the job application page</b> entirely.",
            "impact": [
                "<b>Voice-Driven Practice:</b> Users can answer questions using their microphone, just like in a <b>real interview.</b>",
                "<b>Instant Feedback:</b> AI provides instant feedback on content, structure, and completeness of answers.",
                "<b>Real-Time Evaluation:</b> Users can see their performance in real-time, helping them improve quickly.",
                "<b>Privacy-First:</b> No answers or audio stored, ensuring user privacy. <b>No data collection.</b>",
                "<b>Job-Specific Questions:</b> Questions are generated from LinkedIn posts, ensuring users are prepared for the job."
            ],
            "github": "https://github.com/Yashraj-Muthyapwar/PrepWise-LinkedIn-Interview-AI",
            "demo": "https://chromewebstore.google.com/detail/nhdmfoekhhmamoidnappbckcjlbojnke?utm_source=item-share-cb",
            "images": [
                "/deepseek/images/Screenshot1.png",
                "/deepseek/images/Screenshot2.png",
                "/deepseek/images/Screenshot3.png",
                "/deepseek/images/Screenshot4.png",
                "/deepseek/images/Screenshot5.png",
                "/deepseek/images/Screenshot6.png"
            ]
        },
        "NotionAtlas — AI Semantic Search & RAG Assistant for Notion": {
            "description": "A modern AI-powered semantic search and Retrieval-Augmented Generation (RAG) platform that transforms Notion workspaces into intelligent, searchable knowledge hubs. Built for reliability, speed, and seamless user experience, NotionAtlas AI brings context-aware Q&A to your personal and team knowledge bases.",
            "tech_stack": [
                "Python",
                "Notion API",
                "Streamlit",
                "Hugging Face Transformers",
                "Llama 4 (LLM API)",
                "Qdrant (Vector Database)"
            ],
            "key_features": [
                "Indexed <b>5,000+ Notion pages</b> for instant search</b>",
                "Real-time answers with <b>98%+ accuracy</b>",
                "<b>80% </b>faster knowledge retrieval",
                "Seamless <b>Llama 4</b> integration",
                "Intuitive <b>Streamlit UI</b>"
            ],
            "methodology": "As Notion workspaces grow, <b>it gets harder to find what you need</b>—especially when notes are scattered everywhere. The real challenge was <b>building a tool that could understand any question, search through thousands of unorganized pages, and deliver quick, accurate answers,</b> all while keeping things simple and user-friendly.",
            "impact": [
                "<b>Built a full RAG pipeline:</b> Extracts, chunks, and embeds Notion content using state-of-the-art sentence transformers.",
                "<b>Vector search with Qdrant:</b> Top-K relevant notes fetched in milliseconds, regardless of workspace size.",
                "<b>Real-time chat UI:</b> Streamlit-powered app with persistent conversation history and context memory.",
                "<b>Integrated Llama 4:</b> Delivers concise, factual answers using both semantic context and generative AI.",
                "<b>Security & privacy:</b> All processing runs within user's environment; API keys securely managed."
            ],
            "github": "https://github.com/Yashraj-Muthyapwar/NotionAtlas-AI-Semantic-Search-And-RAG-Assistant-for-Notion",
            "demo": "https://notionatlas.streamlit.app/",
            "images": [
                "/deepseek/images/NotionAtlas.png",
                "/deepseek/images/NotionDemo.png"
            ]
        },
        "OTT(Over-The-Top) Management-System": {
            "description": "OTT-Management-System is a backend data powerhouse designed for next-gen OTT (Over-The-Top) streaming platforms. Built for reliability and scalability, it manages everything from user data and content catalogs to subscriptions, payments, and recommendations—all powered by robust SQL architecture and Python integration.",
            "tech_stack": [
                "MySQL (RDBMS)",
                "Python",
                "Jupyter Notebook",
                "Draw.io",
            ],
            "key_features": [
                "Robust <b>all-in-one database</b> for users, content, and payments",
                "Streamlined <b>OTT operations</b> with unified management",
                "<b>Personalized recommendations</b> from user watch history",
                "<b>Secure payments</b> & <b>multi-device</b> streaming support",
                "<b>Modular schema</b> built for Python analytics integration"
            ],
            "methodology": "Most OTT platforms <b>struggle with scattered data, rigid subscription options,</b> and <b>limited ways to personalize the user experience.</b> My goal was to design a <b>production-ready backend</b> that brings everything together—making it easy to manage users, content, payments, and devices from a single, unified system.",
            "impact":[
                "<b>Streamlined user management:</b> Centralized system for user profiles, subscriptions, and device tracking.",
                "<b>Enhanced content management:</b> Dynamic content catalogs and flexible subscription plans.",
                "<b>Improved user experience:</b> Personalized recommendations and secure, transparent payment tracking.",
                "<b>Scalable architecture:</b> Modular schema, easily extendable for analytics and AI-powered features with Python."
            ],
            "github": "https://github.com/Yashraj-Muthyapwar/OTT-Management-System",
            "demo": "#",
            "images": [
                "/deepseek/images/ott-project.png",
                "/deepseek/images/ott.png"
            ]
        },
        "DDoS Attack Detection in SDN (Software Defined Network)": {
            "description": "DDoS Attack Detection in SDN Using Machine Learning brings real-time security to SDN environments. With advanced ML algorithms and a user-friendly web app, it analyzes live network traffic and instantly alerts you to potential DDoS threats—helping keep your network resilient and responsive.",
            "tech_stack": [
                "Python",
                "XGBoost",
                "Scikit-learn",
                "Pandas",
                "Numpy",
                "Streamlit",
                "Matplotlib",
                "Seaborn"
            ],
            "key_features": [
                "<b>Real-time DDoS detection</b> with XGBoost ML",
                "User-friendly <b>Streamlit web interface</b> — no coding needed",
                "Customizable <b>network analysis</b> & <b>instant feedback</b>",
                "<b>Modular project structure</b> for easy retraining & integration",
                "Robust <b>Python data processing</b> for efficient SDN security"
            ],
            "methodology": "With DDoS attacks becoming increasingly complex and frequent, traditional SDN defenses are struggling to keep up. The challenge was to <b>design a smart, predictive system</b> that could <b>rapidly and accurately detect attacks</b>—minimizing disruption and protecting critical network infrastructure.",
            "impact":[
                "<b>Intelligent attack detection:</b> XGBoost-powered model accurately identifies DDoS threats from real network traffic.",
                "<b>Interactive analysis interface:</b> Streamlit web app enables instant, user-friendly predictions without coding.",
                "<b>Customizable traffic evaluation:</b> Analyze and test vari<b>Scalable architecture:</b> Modular schema, easily extendable for ous network scenarios by adjusting feature inputs in real time.",
                "<b>Extensible architecture:</b> Modular project structure, easily adaptable for further research, analytics, or SDN integration."
            ],
            "github": "https://github.com/Yashraj-Muthyapwar/Detection-of-DDOS-Attacks-in-SDN-using-ML",
            "demo": "#",
            "images": [
                "/deepseek/images/ddos-detection.png",
                "/deepseek/images/ddos-detection1.png"
            ]
        }
    };

    const projectModal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');
    let currentImageIndex = 0;
    let carouselInterval;

    function openProjectModal(projectTitle) {
        const details = projectDetails[projectTitle];
        if (!details) return;
        
        // Populate modal content
        document.getElementById('modal-title').textContent = projectTitle;
        document.getElementById('modal-description').textContent = details.description;
        document.getElementById('modal-methodology').innerHTML = details.methodology;
        
        // Populate images
        const imagesContainer = document.getElementById('modal-images-container');
        const carouselNav = document.querySelector('.carousel-nav');
        imagesContainer.innerHTML = '';
        carouselNav.innerHTML = '';
        
        if (details.images?.length > 0) {
            details.images.forEach((image, index) => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = `${projectTitle} Image ${index + 1}`;
                img.className = 'project-image' + (index === 0 ? ' active' : '');
                imagesContainer.appendChild(img);
                
                const dot = document.createElement('div');
                dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
                dot.dataset.index = index;
                dot.addEventListener('click', () => showImage(index));
                carouselNav.appendChild(dot);
            });
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-800';
            placeholder.innerHTML = '<i class="fas fa-image text-4xl text-gray-400"></i>';
            imagesContainer.appendChild(placeholder);
        }
        
        // Populate tech stack
        const techStackContainer = document.getElementById('modal-tech-stack');
        techStackContainer.innerHTML = '';
        details.tech_stack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300';
            span.textContent = tech;
            techStackContainer.appendChild(span);
        });
        
        // Populate key features
        const featuresContainer = document.getElementById('modal-key-features');
        featuresContainer.innerHTML = '';
        details.key_features.forEach(feature => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `
                <svg class="h-5 w-5 text-yellow-400 dark:text-yellow-300 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <polygon points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15.1 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36" />
                </svg>
                <span>${feature}</span>
            `;
            featuresContainer.appendChild(li);
        });

        // Populate impact
        const impactContainer = document.getElementById('modal-impact');
        impactContainer.innerHTML = '';
        if (Array.isArray(details.impact)) {
            details.impact.forEach(impact => {
                const li = document.createElement('li');
                li.className = 'flex items-start';
                li.innerHTML = `
                    <svg class="h-5 w-5 text-secondary-light dark:text-secondary-dark mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="8" class="opacity-100"></circle>
                        <path d="M7 10l2 2 4-4" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="font-medium">${impact}</span>
                `;
                impactContainer.appendChild(li);
            });
        }

        // Set links
        document.getElementById('modal-github').href = details.github;
        document.getElementById('modal-demo').href = details.demo;
        
        // Show modal
        projectModal.classList.remove('hidden');
        projectModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        // Initialize carousel
        initCarousel();
    }

    function initCarousel() {
        const images = document.querySelectorAll('#modal-images-container .project-image');
        if (images.length <= 1) return;
        
        currentImageIndex = 0;
        if (carouselInterval) clearInterval(carouselInterval);
        
        carouselInterval = setInterval(showNextImage, 4000);
        
        document.getElementById('carousel-prev')?.addEventListener('click', showPrevImage);
        document.getElementById('carousel-next')?.addEventListener('click', showNextImage);
    }

    function showImage(index) {
        const images = document.querySelectorAll('#modal-images-container .project-image');
        const dots = document.querySelectorAll('.carousel-dot');
        
        if (index >= images.length || index < 0) return;
        
        images[currentImageIndex]?.classList.remove('active');
        dots[currentImageIndex]?.classList.remove('active');
        
        currentImageIndex = index;
        
        images[currentImageIndex]?.classList.add('active');
        dots[currentImageIndex]?.classList.add('active');
        
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(showNextImage, 4000);
        }
    }

    function showNextImage() {
        const images = document.querySelectorAll('#modal-images-container .project-image');
        const nextIndex = (currentImageIndex + 1) % images.length;
        showImage(nextIndex);
    }

    function showPrevImage() {
        const images = document.querySelectorAll('#modal-images-container .project-image');
        const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(prevIndex);
    }

    function closeProjectModal() {
        if (carouselInterval) clearInterval(carouselInterval);
        projectModal?.classList.add('hidden');
        projectModal?.classList.remove('flex');
        document.body.style.overflow = '';
    }

    // Initialize modal event listeners
    closeModal?.addEventListener('click', closeProjectModal);
    projectModal?.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });

    // Initialize "View Details" links
    const viewDetailsLinks = document.querySelectorAll('a[href="#"]:not(#modal-github):not(#modal-demo)');
    viewDetailsLinks.forEach(link => {
        if (link.textContent.trim().includes('View Details')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectCard = link.closest('.group');
                const projectTitle = projectCard.querySelector('h3').textContent.trim();
                openProjectModal(projectTitle);
            });
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !projectModal?.classList.contains('hidden')) {
            closeProjectModal();
        }
    });

    // ==================== Intersection Observer for section transitions ====================
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('section-transition');
        sectionObserver.observe(section);
    });

    // ==================== Fade-in-up animation on scroll ====================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.fade-in-up:not(.visible)');
        const windowHeight = window.innerHeight;
        reveals.forEach((el, i) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('DOMContentLoaded', () => {
        revealOnScroll();
        
        // Animate hero elements sequentially
        const heroElements = document.querySelectorAll('.animate-fade-in-up');
        heroElements.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.2}s`;
        });
    });
});