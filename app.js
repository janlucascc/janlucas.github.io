document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. MAGNETIC BUTTON EFFECT
  ========================================= */
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach((el) => {
    let rafId = null;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const strength = 0.2; 

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    });

    el.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      el.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
      el.style.transform = 'translate(0px, 0px)';

      setTimeout(() => {
        el.style.transition = '';
      }, 400);
    });
  });

  /* =========================================
     2. SCROLL REVEAL ANIMATION
  ========================================= */
  const revealElements = document.querySelectorAll('.section-reveal');

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  };

  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', 
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
  
  setTimeout(() => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });
  }, 100);

  /* =========================================
     3. INTERACTIVE GOOEY MOUSE EFFECT (NOVO)
  ========================================= */
  const gooeyBg = document.querySelector('.gooey-bg');
  const heroSection = document.querySelector('.hero');
  let lastBubbleTime = 0;

  // Habilita apenas se o usuário estiver em um desktop (mouse)
  if (window.matchMedia("(pointer: fine)").matches && gooeyBg && heroSection) {
    
    // Rastreamos o mouse pela seção Hero inteira
    heroSection.addEventListener('mousemove', (e) => {
      const now = Date.now();
      // Cria no máximo uma bolha a cada 50ms (evita lag)
      if (now - lastBubbleTime < 50) return;
      lastBubbleTime = now;

      // Pegamos as dimensões do container
      const rect = gooeyBg.getBoundingClientRect();
      
      // Coordenadas relativas do mouse dentro do container do fundo
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Cria a nova div que será a bolha
      const blob = document.createElement('div');
      blob.classList.add('interactive-blob');

      // Varia o tamanho sutilmente entre 15px e 35px
      const size = Math.random() * 20 + 15; 
      blob.style.width = `${size}px`;
      blob.style.height = `${size}px`;
      
      // Posiciona no ponteiro
      blob.style.left = `${x}px`;
      blob.style.top = `${y}px`;

      // Adiciona na tela
      gooeyBg.appendChild(blob);

      // Remove a bolha após 1.2s (quando a animação CSS termina) para não poluir a memória
      setTimeout(() => {
        blob.remove();
      }, 1200); 
    });
  }
});