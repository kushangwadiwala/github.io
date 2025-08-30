(function () {
  // --- Set year ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Navbar scrolled state ---
  const nav = document.getElementById("siteNavbar");
  function handleNav() {
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  }
  document.addEventListener("scroll", handleNav);
  handleNav();

  // --- Smooth scroll for anchor links (offset for fixed navbar) ---
  const OFFSET = 80;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: "smooth" });

      // collapse mobile menu if open
      const collapseEl = document.querySelector(".navbar-collapse");
      if (collapseEl && collapseEl.classList.contains("show") && window.bootstrap?.Collapse) {
        new window.bootstrap.Collapse(collapseEl).hide();
      }
    });
  });

  // --- Mobile nav: active-link toggle ---
  document.querySelectorAll("#navCollapse .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll("#navCollapse .nav-link").forEach((n) => n.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // --- Set initial active link if hash exists ---
  const hash = window.location.hash;
  if (hash) {
    const startLink = document.querySelector(`#navCollapse .nav-link[href="${hash}"]`);
    if (startLink) startLink.classList.add("active");
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

    if (hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }, 300);
    }
  }

  // --- Body scroll lock + dim when collapse is open (pairs with CSS) ---
  const collapseEl = document.getElementById("navCollapse");
  if (collapseEl && window.bootstrap?.Collapse) {
    collapseEl.addEventListener("shown.bs.collapse", () => document.body.classList.add("nav-open"));
    collapseEl.addEventListener("hidden.bs.collapse", () => document.body.classList.remove("nav-open"));
  }
})();
