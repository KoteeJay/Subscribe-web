document.addEventListener('DOMContentLoaded', () => {
    /** Mobile Nav Toggle */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const toggleMobileNav = () => {
        document.body.classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
    };
    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', toggleMobileNav);
    }

    /** Hide Mobile Nav on Same-page/Hash Links */
    document.querySelectorAll('#navmenu a').forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-active')) {
                toggleMobileNav();
            }
        });
    });

    /** Toggle Mobile Nav Dropdowns */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', e => {
            e.preventDefault();
            dropdown.parentNode.classList.toggle('active');
            dropdown.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });

    /** Scroll-to-Top Button */
    const scrollTopBtn = document.querySelector('.scroll-top');
    const toggleScrollTop = () => {
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('active', window.scrollY > 900);
        }
    };
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    /** AOS Animation Init */
    const initAOS = () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    };
    window.addEventListener('load', initAOS);

    /** Swiper Init */
    const initSwiper = () => {
        document.querySelectorAll('.init-swiper').forEach(swiperEl => {
            const config = JSON.parse(swiperEl.querySelector('.swiper-config').textContent.trim());
            if (swiperEl.classList.contains('swiper-tab')) {
                initSwiperWithCustomPagination(swiperEl, config);
            } else {
                new Swiper(swiperEl, config);
            }
        });
    };
    window.addEventListener('load', initSwiper);

    /** Bootstrap Modal Focus */
    const modal = document.getElementById('myModal');
    const input = document.getElementById('myInput');
    if (modal && input) {
        modal.addEventListener('shown.bs.modal', () => input.focus());
    }

    /** Set and Format Amount */
    window.setAmount = (amount) => {
        const amountInput = document.getElementById('amountInput');
        if (amountInput) amountInput.value = `₦${amount}.00`;
    };

    window.formatAmount = (input) => {
        const value = input.value.replace(/[^0-9]/g, '');
        input.value = value ? `₦${parseInt(value, 10).toLocaleString()}.00` : '';
    };

    /** Show SweetAlert Success */
    window.showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your transaction was successful.',
            confirmButtonText: 'OK'
        });
    };

    /** Show Notification Popup */
    const showNotification = (message) => {
        const popup = document.getElementById('notification-popup');
        const messageEl = document.getElementById('notification-message');
        if (!popup || !messageEl) return;

        messageEl.textContent = message;
        popup.classList.remove('hidden');
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
            popup.classList.add('hidden');
        }, 3000);
    };

    /** OTP Input Navigation */
    const otpInputs = document.querySelectorAll('.password');
    otpInputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
            const next = otpInputs[index + 1];
            const prev = otpInputs[index - 1];

            if (e.key >= '0' && e.key <= '9') {
                if (next) {
                    next.focus();
                } else {
                    const otp = Array.from(otpInputs).map(i => i.value).join('');
                    if (otp.length === otpInputs.length) {
                        showSuccessAlert();
                    }
                }
            } else if (e.key === 'Backspace' && prev) {
                prev.focus();
            }
        });
    });

    /** Copy Account Number to Clipboard */
    const copyBtn = document.getElementById('copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const accountInput = document.querySelector('.account-number input');
            if (!accountInput) return;

            navigator.clipboard.writeText(accountInput.value)
                .then(() => showNotification('Account number copied to clipboard!'))
                .catch(err => {
                    showNotification('Failed to copy account number.');
                    console.error('Copy error:', err);
                });
        });
    }

    /** Utility Dropdown Image Update */
    window.selectOption = (imgSrc) => {
        const selectedImage = document.getElementById('selectedImage');
        if (selectedImage) {
            selectedImage.src = imgSrc;

            // Optionally close the modal after selection
            const modal = bootstrap.Modal.getInstance(document.getElementById('meterModal'));
            if (modal) modal.hide();
        }
    };
});