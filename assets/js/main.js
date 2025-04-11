  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
          if (document.querySelector('.mobile-nav-active')) {
              mobileNavToogle();
          }
      });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
          e.preventDefault();
          this.parentNode.classList.toggle('active');
          this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
          e.stopImmediatePropagation();
      });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
      if (scrollTop) {
          window.scrollY > 900 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
  }
  scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
      AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false
      });
  }
  window.addEventListener('load', aosInit);


  /**
   * Init swiper sliders
   */
  function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
          let config = JSON.parse(
              swiperElement.querySelector(".swiper-config").innerHTML.trim()
          );

          if (swiperElement.classList.contains("swiper-tab")) {
              initSwiperWithCustomPagination(swiperElement, config);
          } else {
              new Swiper(swiperElement, config);
          }
      });
  }

  window.addEventListener("load", initSwiper);

  function selectOption(imgSrc, className) {
      // Update the image in the dropdown button
      document.getElementById('selectedImage').src = imgSrc;

  }
  /**
   * Modal 
   */
  const myModal = document.getElementById('myModal')
  const myInput = document.getElementById('myInput')

  myModal.addEventListener('shown.bs.modal', () => {
      myInput.focus()
  });


  // Function to set the amount in the input field
  function setAmount(amount) {
      const amountInput = document.getElementById('amountInput');
      amountInput.value = `₦${amount}.00`;
  }

  function formatAmount(input) {
      // Remove any non-numeric characters
      let value = input.value.replace(/[^0-9]/g, '');

      // Check if the value is not empty
      if (value) {
          // Format the value with the Naira sign and .00
          input.value = `₦${parseInt(value, 10).toLocaleString()}`;
      } else {
          // If the input is empty, clear the field
          input.value = '';
      }
      amountInput.addEventListener('keydown', (e) => {
          // Allow control keys
          if (e.key === 'Backspace' || e.key === 'Delete') {
              // Let the input event handle the reformat after deletion
              return;
          }
      });
  }