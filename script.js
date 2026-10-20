(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
  };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); }
  });
  window.matchMedia('(min-width: 46.01rem)').addEventListener('change', () => setMenu(false));

  // Scroll reveal
  const items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }

  // Hide missing images so the placeholder graphic shows instead
  document.querySelectorAll('.portrait img, .thumb img').forEach(img => {
    const hide = () => img.classList.add('img-missing');
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  // EmailJS Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm && window.emailjs) {
    emailjs.init({
      publicKey: 'a0gNq3kg8PM_J5bxB',
    });

    const submitBtn = contactForm.querySelector('.contact-submit-btn');
    const statusMsg = document.getElementById('form-status');

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) return;

      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      if (statusMsg) {
        statusMsg.className = 'form-status';
        statusMsg.textContent = '';
      }

      // Parameters covering all standard variable naming conventions in EmailJS
      const templateParams = {
        name: name,
        from_name: name,
        user_name: name,
        email: email,
        from_email: email,
        user_email: email,
        reply_to: email,
        message: message,
      };

      try {
        // 1. Send Contact Us email to site owner
        await emailjs.send('service_6kg1dql', 'template_t3pfnsw', templateParams);

        // 2. Send Auto-Reply confirmation to the visitor
        try {
          await emailjs.send('service_6kg1dql', 'template_dg0eayq', templateParams);
        } catch (autoErr) {
          console.warn('Auto-reply confirmation failed to send:', autoErr);
        }

        submitBtn.textContent = 'Message Sent!';
        contactForm.reset();

        if (statusMsg) {
          statusMsg.className = 'form-status success';
          statusMsg.textContent = 'Thank you! Your message has been sent successfully.';
        }

        setTimeout(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }, 5000);
      } catch (err) {
        console.error('EmailJS Error:', err);
        submitBtn.textContent = 'Failed to Send';

        if (statusMsg) {
          statusMsg.className = 'form-status error';
          statusMsg.textContent = 'Unable to send message right now. Please email directly at sp907467@gmail.com.';
        }

        setTimeout(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }, 4000);
      }
    });
  }

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
