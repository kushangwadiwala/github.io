// ============================================
// DARK MODE TOGGLE - SIMPLIFIED VERSION
// ============================================
(function() {
    'use strict';

    // Get toggle element
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Check system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initialize theme
    function initTheme() {
        if (!localStorage.getItem('theme')) {
            if (prefersDarkMode.matches) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        } else {
            setTheme(currentTheme);
        }
    }
    
    // Set theme
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update aria-label
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-label', 
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    // Toggle theme with animation
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add rotation animation
        if (toggleBtn) {
            toggleBtn.style.transform = 'rotate(180deg)';
            
            setTimeout(() => {
                setTheme(newTheme);
                toggleBtn.style.transform = '';
            }, 200);
        }
    }
    
    // Event listener
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Keyboard shortcut (Alt + T for theme)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // Initialize
    initTheme();
    
    // Add theme transition class after load
    window.addEventListener('load', () => {
        document.body.classList.add('theme-transition');
    });
})();