// Initialize AOS (Animate On Scroll) and other components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Initialize Typed.js for hero subtitle
  initializeTypedText();
  
  // Load projects
  loadProjects();
  
  // Initialize form handling
  initializeContactForm();
  
  // Initialize scroll to top functionality
  initializeScrollToTop();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Smooth scrolling for navigation links
  initializeSmoothScrolling();
});

// Typed.js initialization for animated text
function initializeTypedText() {
  const typed = new Typed('#typed-text', {
    strings: [
      'Computer Engineering Student',
      'Backend Developer',
      
      'Problem Solver'
    ],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    startDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

// Project data - you can easily modify this array to add/remove projects
const projects = [
  {
    title: "Cloud IoT Simulator",
    description: "Programma che simula la generazione di dati da dispositivi IoT e li invia a un server cloud di Google. Include dashboard per visualizzare i dati in tempo reale e grafici interattivi.",
    technologies: ["Go", "HTML5", "Chart.js", "Bootstrap", "Dotenv"],
    github: "https://github.com/Piopoc/cloud-iot-platform"
  },
  {
    title: "Algoritmi Bioinformatica",
    description: "Algoritmi visti e sviluppati durante il corso di Bioinformatica. Include implementazioni di algoritmi per l'allineamento di sequenze, analisi filogenetica e predizione di strutture proteiche.",
    technologies: ["Python", "Java"],
    github: "https://github.com/Piopoc/script_Bioinformatica"
  },
  {
    title: "Monopoly",
    description: "Gioco da tavolo classico ricreato in formato digitale. Include meccaniche di gioco multiplayer o PvE, gestione del denaro, proprietà e tabellone. Sviluppato come progetto di programmazione orientata agli oggetti.",
    technologies: ["C++","CMake"],
    github: "https://github.com/Piopoc/Monopoly"
  },
  {
    title: "Bookshelf",
    description: "Progetto che simula una biblioteca virtuale semplice con funzionalità di ricerca, aggiunta e rimozione di libri. Sviluppato come esercizio di programmazione orientata agli oggetti.",
    technologies: ["C++", "C","CMake"],
    github: "https://github.com/Piopoc/Bookshelf"
  }
];

// Load and display projects
function loadProjects() {
  const projectsContainer = document.getElementById('projects-container');
  const loadingElement = document.getElementById('projects-loading');
  
  // Simulate loading delay for better UX
  setTimeout(() => {
    loadingElement.style.display = 'none';
    
    projects.forEach((project, index) => {
      const projectCard = createProjectCard(project, index);
      projectsContainer.appendChild(projectCard);
    });
  }, 1500);
}

// Create individual project card
function createProjectCard(project, index) {
  const col = document.createElement('div');
  col.className = 'col-lg-6 col-md-6 mb-4';
  col.setAttribute('data-aos', 'fade-up');
  col.setAttribute('data-aos-delay', (index * 100).toString());
  
  const card = document.createElement('div');
  card.className = 'project-card';
  
  const cardBody = document.createElement('div');
  cardBody.className = 'project-card-body';
  
  // Project title
  const title = document.createElement('h3');
  title.textContent = project.title;
  
  // Project description
  const description = document.createElement('p');
  description.textContent = project.description;
  
  // Technologies
  const techContainer = document.createElement('div');
  techContainer.className = 'project-technologies';
  
  project.technologies.forEach(tech => {
    const techBadge = document.createElement('span');
    techBadge.className = 'tech-badge';
    techBadge.textContent = tech;
    techContainer.appendChild(techBadge);
  });
  
  // Links container
  const linksContainer = document.createElement('div');
  linksContainer.style.display = 'flex';
  linksContainer.style.gap = '15px';
  linksContainer.style.marginTop = '15px';
  
  // GitHub link
  if (project.github) {
    const githubLink = document.createElement('a');
    githubLink.href = project.github;
    githubLink.target = '_blank';
    githubLink.className = 'project-link';
    githubLink.innerHTML = '<i class="bi bi-github"></i> GitHub';
    linksContainer.appendChild(githubLink);
  }
  
  // Demo link (if available)
  if (project.demo) {
    const demoLink = document.createElement('a');
    demoLink.href = project.demo;
    demoLink.target = '_blank';
    demoLink.className = 'project-link';
    demoLink.innerHTML = '<i class="bi bi-eye"></i> Live Demo';
    linksContainer.appendChild(demoLink);
  }
  
  // Append all elements
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(techContainer);
  cardBody.appendChild(linksContainer);
  card.appendChild(cardBody);
  col.appendChild(card);
  
  return col;
}

// Contact form handling
function initializeContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successAlert = document.getElementById('form-success');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous validation states
    clearValidationErrors();
    
    // Validate form
    let isValid = true;
    
    // Validate name
    if (!nameInput.value.trim()) {
      showValidationError('name', 'Il nome è obbligatorio');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showValidationError('name', 'Il nome deve avere almeno 2 caratteri');
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showValidationError('email', 'L\'email è obbligatoria');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showValidationError('email', 'Inserisci un\'email valida');
      isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
      showValidationError('message', 'Il messaggio è obbligatorio');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showValidationError('message', 'Il messaggio deve avere almeno 10 caratteri');
      isValid = false;
    }
    
    // If form is valid, simulate sending
    if (isValid) {
      // Simulate form submission
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Invio in corso...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        // Show success message
        successAlert.style.display = 'block';
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successAlert.style.display = 'none';
        }, 5000);
        
        // In a real application, you would send the data to your server here
        console.log('Form data:', {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim()
        });
      }, 2000);
    }
  });
}

// Validation helper functions
function showValidationError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.getElementById(fieldId + '-error');
  
  field.classList.add('is-invalid');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function clearValidationErrors() {
  const fields = ['name', 'email', 'message'];
  fields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + '-error');
    
    field.classList.remove('is-invalid');
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  });
}

// Scroll to top functionality
function initializeScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
  // Add parallax effect to hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const parallaxSpeed = 0.5;
    
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });
  
  // Add hover effect to skill badges
  const skillBadges = document.querySelectorAll('.skill-badge');
  skillBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add typing cursor animation to navbar brand
  const navbarBrand = document.querySelector('.navbar-brand');
  if (navbarBrand) {
    setInterval(() => {
      navbarBrand.style.borderRight = navbarBrand.style.borderRight === '2px solid transparent' 
        ? '2px solid var(--primary-color)' 
        : '2px solid transparent';
    }, 1000);
  }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events for better performance
const throttledScrollHandler = throttle(function() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  const parallaxSpeed = 0.5;
  
  if (heroSection) {
    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);