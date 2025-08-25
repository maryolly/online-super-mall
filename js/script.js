/*
 * Main client-side script for the Online Super Mall website.
 *
 * This file handles mobile navigation toggling, smooth scrolling for
 * navigation links, simple form submission feedback for the vendor
 * sign‑up form, and a basic search suggestion feature that helps
 * visitors discover categories and services available on the platform.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
      // Only handle internal anchors
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        // Close mobile menu after navigation
        nav.classList.remove('open');
        navToggle.classList.remove('open');
      }
    });
  });

  // Vendor form submission handler
  const vendorForm = document.getElementById('vendor-form');
  const successMessage = document.getElementById('form-success');
  vendorForm.addEventListener('submit', event => {
    event.preventDefault();
    // Show a success message
    successMessage.hidden = false;
    // Reset form fields
    vendorForm.reset();
  });

  // Simple search suggestion list
  const searchInput = document.getElementById('search');
  const suggestionsBox = document.getElementById('suggestions');
  // Predefined list of terms representing categories and services
  const terms = [
    'Hair products',
    'Body products',
    'Barber services',
    'Phone repair',
    'Travel',
    'Airline services',
    'Electronics repair',
    'Mobile accessories'
  ];

  // Update suggestions as the user types
  searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase().trim();
    suggestionsBox.innerHTML = '';
    if (query.length === 0) {
      suggestionsBox.style.display = 'none';
      return;
    }
    const matches = terms.filter(item => item.toLowerCase().includes(query));
    if (matches.length > 0) {
      matches.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
          searchInput.value = item;
          suggestionsBox.innerHTML = '';
          suggestionsBox.style.display = 'none';
        });
        suggestionsBox.appendChild(li);
      });
      suggestionsBox.style.display = 'block';
    } else {
      suggestionsBox.style.display = 'none';
    }
  });
});
