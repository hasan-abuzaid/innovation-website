/* Content and navigation links work before this enhancement script loads. */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initNavigation() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('primary-navigation');
    if (!header || !toggle || !links) return;

    const desktop = window.matchMedia('(min-width: 901px)');
    const archive = header.querySelector('.nav-archive');
    const archiveSummary = archive?.querySelector('summary');
    function setArchiveOpen(isOpen) {
      if (!archive) return;
      archive.open = isOpen;
      archiveSummary?.setAttribute('aria-expanded', String(isOpen));
    }
    function closeArchive(returnFocus = false) {
      if (!archive) return;
      setArchiveOpen(false);
      if (returnFocus) archiveSummary?.focus();
    }
    function closeNavigation(returnFocus = false) {
      closeArchive();
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      links.classList.toggle('is-open', isOpen);
      if (!isOpen) closeArchive();
    });
    links.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeNavigation();
    });
    header.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (archive?.open) {
        event.preventDefault();
        closeArchive(true);
      } else if (toggle.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        closeNavigation(true);
      }
    });
    // Native details remains usable without JS; enhancement keeps explicit ARIA
    // state synchronous and uses instant open/close with no movement effects.
    archiveSummary?.addEventListener('click', (event) => {
      event.preventDefault();
      setArchiveOpen(!archive.open);
    });
    archive?.addEventListener('toggle', () => {
      archiveSummary?.setAttribute('aria-expanded', String(archive.open));
    });
    archiveSummary?.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const archiveLinks = archive.querySelectorAll('a');
      if (!archiveLinks.length) return;
      event.preventDefault();
      setArchiveOpen(true);
      archiveLinks[event.key === 'ArrowDown' ? 0 : archiveLinks.length - 1].focus();
    });
    archive?.addEventListener('focusout', (event) => {
      if (!archive.contains(event.relatedTarget)) closeArchive();
    });
    document.addEventListener('click', (event) => {
      if (archive && !archive.contains(event.target)) closeArchive();
      if (!header.contains(event.target)) closeNavigation();
    });
    header.addEventListener('focusout', (event) => {
      if (!header.contains(event.relatedTarget)) closeNavigation();
    });
    function onViewportChange() {
      const previousFocus = document.activeElement;
      const focusWouldBeHidden = desktop.matches && previousFocus === toggle;
      const submenuFocusWouldBeHidden = archive?.contains(previousFocus) && previousFocus !== archiveSummary;
      closeNavigation();
      if (focusWouldBeHidden) links.querySelector('a')?.focus();
      else if (desktop.matches && submenuFocusWouldBeHidden) archiveSummary?.focus();
      if (!desktop.matches && links.contains(previousFocus)) toggle.focus();
    }
    desktop.addEventListener('change', onViewportChange);
    archiveSummary?.setAttribute('aria-expanded', String(archive.open));
    toggle.hidden = false;
    header.dataset.menuEnhanced = 'true';
  }

  function initPhotoLightbox() {
    const dialog = document.getElementById('photo-lightbox');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const image = dialog.querySelector('[data-lightbox-image]');
    const title = dialog.querySelector('[data-lightbox-title]');
    const caption = dialog.querySelector('[data-lightbox-caption]');
    const closeButton = dialog.querySelector('[data-lightbox-close]');
    const status = dialog.querySelector('[data-lightbox-status]');
    if (!image || !title || !caption || !closeButton || !status) return;
    let opener = null;
    let scrollState = null;

    function lockBackgroundScroll() {
      const body = document.body;
      const properties = ['position', 'top', 'left', 'width', 'overflow', 'paddingRight'];
      scrollState = {
        x: window.scrollX,
        y: window.scrollY,
        styles: Object.fromEntries(properties.map((name) => [name, body.style[name]]))
      };
      const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
      const padding = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      // Fixed positioning also prevents background touch scrolling on mobile.
      body.style.position = 'fixed';
      body.style.top = `-${scrollState.y}px`;
      body.style.left = `-${scrollState.x}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      if (scrollbarWidth) body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }

    function restoreBackgroundScroll() {
      if (!scrollState) return;
      Object.assign(document.body.style, scrollState.styles);
      const rootStyle = document.documentElement.style;
      const previousBehavior = rootStyle.scrollBehavior;
      rootStyle.scrollBehavior = 'auto';
      window.scrollTo(scrollState.x, scrollState.y);
      rootStyle.scrollBehavior = previousBehavior;
      scrollState = null;
    }

    document.querySelectorAll('[data-lightbox]').forEach((frame) => {
      const source = frame.dataset.photoSrc;
      const thumbnail = frame.querySelector('img');
      if (!source || !thumbnail) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'archive-photo-link archive-photo-button';
      button.setAttribute('aria-label', `View photo: ${frame.dataset.photoTitle}`);
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-controls', dialog.id);
      while (frame.firstChild) button.appendChild(frame.firstChild);
      const label = button.querySelector('[data-lightbox-label]');
      if (label) label.hidden = false;
      button.addEventListener('click', () => {
        if (dialog.open) return;
        opener = button;
        title.textContent = frame.dataset.photoTitle;
        const captionText = frame.dataset.photoCaption || '';
        caption.textContent = captionText;
        caption.hidden = !captionText;
        if (captionText) dialog.setAttribute('aria-describedby', caption.id);
        else dialog.removeAttribute('aria-describedby');
        status.textContent = 'Loading photo…';
        image.alt = thumbnail.alt || frame.dataset.photoTitle;
        image.width = thumbnail.width;
        image.height = thumbnail.height;
        image.src = source;
        image.hidden = false;
        dialog.showModal();
        lockBackgroundScroll();
        closeButton.focus();
      });
      // Without JS or native-dialog support the original image and caption stay
      // visible as a static gallery, without inert buttons or raw-file links.
      frame.replaceWith(button);
    });
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      dialog.close();
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    image.addEventListener('load', () => { status.textContent = ''; });
    image.addEventListener('error', () => {
      image.hidden = true;
      status.textContent = 'This photo could not be loaded. Close this view and try again.';
    });
    dialog.addEventListener('close', () => {
      image.hidden = true;
      image.removeAttribute('src');
      status.textContent = '';
      restoreBackgroundScroll();
      opener?.focus({ preventScroll: true });
    });
    // Native dialog handles Escape and keeps keyboard focus inside the lightbox.
    dialog.hidden = false;
  }

  function initRevealAnimations() {
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (reducedMotion.matches) return;
        entry.target.animate(
          [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
          { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' }
        );
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) document.getAnimations().forEach((animation) => animation.cancel());
    });
  }

  function initLightbulb() {
    const bulb = document.querySelector('[data-lightbulb]');
    if (!bulb) return;
    let isVisible = true;
    function updateMotion() {
      // SMIL animations need explicit handling; CSS animation:none is insufficient.
      if (reducedMotion.matches || document.hidden || !isVisible) bulb.pauseAnimations?.();
      else bulb.unpauseAnimations?.();
    }
    reducedMotion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateMotion);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        updateMotion();
      });
      observer.observe(bulb);
    }
    updateMotion();
  }

  initNavigation();
  initPhotoLightbox();
  initRevealAnimations();
  initLightbulb();
})();
