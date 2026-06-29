
    function smoothScrollTo(id) {
      const el = document.getElementById(id);
      if (!el) return;
      const headerH = document.querySelector('header').offsetHeight;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href').replace('#', '');
        if (!id || id === 'hero-top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          smoothScrollTo(id);
        }
        closeNav();
      });
    });

    window.addEventListener('scroll', () => {
      document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
    });

    function toggleNav() {
      document.getElementById("main-nav").classList.toggle("open");
    }
    function closeNav() {
      document.getElementById("main-nav").classList.remove("open");
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });

    emailjs.init({ publicKey: "uNwW6PA3pN9BCJL5K" });

    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        emailjs.send("service_484", "template_icu1ohr", {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          message: document.getElementById("message").value
        })
        .then(() => {
          alert("Message sent successfully!");
          form.reset();
        })
        .catch((error) => {
          alert(error.text || JSON.stringify(error));
        });
      });
    }
