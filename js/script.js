(function () {
    // --- Set year ---
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Navbar scrolled state ---
    const nav = document.getElementById("siteNavbar");
    const onScroll = () => {
        if (!nav) return;
        if (window.scrollY > 10) nav.classList.add("nav-scrolled");
        else nav.classList.remove("nav-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // --- Smooth scroll for anchor links (offset for fixed navbar) ---
    const OFFSET = 80;
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
            window.scrollTo({ top, behavior: "smooth" });
            
            const shownCollapse = document.querySelector(".navbar-collapse.show");
            if (shownCollapse && window.bootstrap?.Collapse) {
                new window.bootstrap.Collapse(shownCollapse).hide();
            }
        });
    });

    // --- Mobile nav: active-link toggle ---
    document.querySelectorAll("#navCollapse .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            document
                .querySelectorAll("#navCollapse .nav-link")
                .forEach((n) => n.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // --- Set initial active link if hash exists ---
    if (window.location.hash) {
        const startLink = document.querySelector(
            `#navCollapse .nav-link[href="${window.location.hash}"]`
        );
        if (startLink) startLink.classList.add("active");
        
        const target = document.querySelector(window.location.hash);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
            window.scrollTo({ top });
        }
    }

    // --- Cross-page smooth scrolling ---
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "Portfolio.html" || currentPage === "") {
        document.querySelectorAll("nav a").forEach((link) => {
            const href = link.getAttribute("href") || "";
            if (href.startsWith("Portfolio.html#")) {
                link.setAttribute("href", href.replace("Portfolio.html", ""));
            }
        });
    }

    // --- Body scroll lock + dim when collapse is open ---
    const collapseEl = document.getElementById("navCollapse");
    if (collapseEl) {
        collapseEl.addEventListener("shown.bs.collapse", () =>
            document.body.classList.add("nav-open")
        );
        collapseEl.addEventListener("hidden.bs.collapse", () =>
            document.body.classList.remove("nav-open")
        );
    }

    // Enhanced modal handling
    document.addEventListener('DOMContentLoaded', function() {
        // Add click handlers for project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Try data-modal-target first, then data-bs-target
                const modalTarget = this.getAttribute('data-modal-target') || 
                                   this.getAttribute('data-bs-target');
                
                if (modalTarget) {
                    const modal = document.querySelector(modalTarget);
                    if (modal && window.bootstrap?.Modal) {
                        const bsModal = new window.bootstrap.Modal(modal);
                        bsModal.show();
                    }
                }
            });
        });

        // Handle all project modals for sizing
        const modals = document.querySelectorAll('.project-modal');
        modals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', function() {
                const img = this.querySelector('.modal-image');
                if (img) {
                    if (img.complete) {
                        adjustModalSize(img);
                    } else {
                        img.addEventListener('load', function() {
                            adjustModalSize(this);
                        });
                    }
                }
            });
        });
        
        function adjustModalSize(img) {
            const modal = img.closest('.project-modal');
            const modalDialog = modal.querySelector('.modal-dialog');
            
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            const maxWidth = Math.min(viewportWidth * 0.9, imgWidth);
            const maxHeight = Math.min(viewportHeight * 0.9, imgHeight);
            
            modalDialog.style.width = 'auto';
            modalDialog.style.height = 'auto';
            modalDialog.style.maxWidth = maxWidth + 'px';
            modalDialog.style.maxHeight = maxHeight + 'px';
            
            img.style.width = 'auto';
            img.style.height = 'auto';
            img.style.maxWidth = maxWidth + 'px';
            img.style.maxHeight = maxHeight + 'px';
        }

        // Handle window resize
        window.addEventListener('resize', function() {
            const openModal = document.querySelector('.project-modal.show');
            if (openModal) {
                const img = openModal.querySelector('.modal-image');
                if (img && img.complete) {
                    adjustModalSize(img);
                }
            }
        });
    });
})();
