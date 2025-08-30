document.addEventListener('DOMContentLoaded', function() {
    initAllFunctions();
});

function initAllFunctions() {
    // Initialize all functions
    const functions = [
        initMobileMenu,
        initSmoothScrolling,
        initHeaderScroll,
        initScrollToTop,
        initPreloader,
        initMainSlideshow,
        initScrollAnimations,
        initRoomsCarousel,
        initEnhancedExperienceCards,
        initParallaxSlideshows,
        initVirtualTours,
        initBookingForm,
        initSnapCarousel,
        initDatePickers
    ];
    
    functions.forEach(fn => {
        try {
            fn();
        } catch (e) {
            console.error(`Error initializing ${fn.name}:`, e);
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav');
    
    if (!mobileMenu || !nav) return;

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    document.querySelectorAll('#nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !e.target.closest('#nav') && 
            !e.target.closest('#mobile-menu')) {
            closeMenu();
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
            if (mobileMenu) mobileMenu.style.color = 'var(--dark)';
        } else {
            header.classList.remove('scrolled');
            if (mobileMenu) mobileMenu.style.color = 'var(--gold)';
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = `
      <i class="fas fa-chevron-up"></i>
      <div class="progress-bar"></div>
    `;
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #f59e0b;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--dark);
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    const progressBar = scrollToTopBtn.querySelector('.progress-bar');
    progressBar.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0%;
        background: linear-gradient(to top, var(--dark), transparent);
        border-radius: 50%;
        transition: height 0.1s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
  
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / (scrollHeight - clientHeight)) * 100;
        
        const show = scrollPosition > 300;
        scrollToTopBtn.style.opacity = show ? '1' : '0';
        scrollToTopBtn.style.transform = show ? 'translateY(0)' : 'translateY(20px)';
        
        progressBar.style.height = `${scrollPercentage}%`;
    });
}

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = '';
            
            setTimeout(() => preloader.remove(), 1000);
        }, 500);
    });
    
    // Fallback
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = '';
        setTimeout(() => preloader.remove(), 1000);
    }, 3000);
}

// Main Slideshow
function initMainSlideshow() {
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const slides = container.querySelectorAll('.slide');
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        slides[currentSlide].classList.add('active');
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        setTimeout(() => setInterval(nextSlide, 5000), 1000);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const hiddenElements = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    hiddenElements.forEach(el => observer.observe(el));
}

// Rooms Carousel
function initRoomsCarousel() {
    const carousel = document.querySelector('.rooms-carousel');
    const cards = document.querySelectorAll('.room-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!carousel || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardCount = cards.length;
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateCarousel();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-advance every 5 seconds
    let interval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(nextSlide, 5000);
        });
    }
}

// Experience Cards
function initEnhancedExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        const images = card.querySelectorAll('.experience-images img');
        const navButtons = card.querySelectorAll('.experience-nav button');
        let currentImageIndex = 0;
        let imageInterval;
        
        // Auto-cycle through images
        function startImageCycle() {
            imageInterval = setInterval(() => {
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex + 1) % images.length;
                images[currentImageIndex].classList.add('active');
                updateNavButtons();
            }, 3000);
        }
        
        function stopImageCycle() {
            clearInterval(imageInterval);
        }
        
        function updateNavButtons() {
            navButtons.forEach((btn, index) => {
                btn.classList.toggle('active', index === currentImageIndex);
            });
        }
        
        // Set up navigation buttons
        navButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = index;
                images[currentImageIndex].classList.add('active');
                updateNavButtons();
            });
        });
        
        card.addEventListener('mouseenter', () => {
            startImageCycle();
        });
        
        card.addEventListener('mouseleave', () => {
            stopImageCycle();
        });
        
        // Initialize first image
        if (images.length > 0) {
            images[0].classList.add('active');
            updateNavButtons();
        }
    });
}

// Parallax Slideshows
function initParallaxSlideshows() {
    const slideshowSections = document.querySelectorAll('.slideshow-section');
    
    slideshowSections.forEach(section => {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const sectionPosition = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionPosition - window.innerHeight && 
                scrollPosition < sectionPosition + sectionHeight) {
                const depth = scrollPosition - sectionPosition;
                const slides = section.querySelectorAll('.slide');
                
                slides.forEach((slide, index) => {
                    const speed = 0.2 + (index * 0.1);
                    const move = depth * speed;
                    slide.style.transform = `translateY(${move}px)`;
                });
            }
        });
    });
}

// Virtual Tours
function initVirtualTours() {
    const viewTourBtns = document.querySelectorAll('.view-tour-btn');
    const tourOverlay = document.querySelector('.virtual-tour-overlay');
    
    if (!viewTourBtns.length || !tourOverlay) return;
    
    const images = [
        'assets/rooms/room-1.webp',
        'assets/rooms/room-2.webp',
        'assets/rooms/room-3.webp',
        'assets/rooms/room-4.webp',
        'assets/rooms/room-5.webp',
        'assets/rooms/fam-room.webp'
    ];
    
    viewTourBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tourContainer = tourOverlay.querySelector('.virtual-tour-container');
            const tourImage = tourContainer.querySelector('.tour-image');
            const prevBtn = tourContainer.querySelector('#tourPrev');
            const nextBtn = tourContainer.querySelector('#tourNext');
            const progress = tourContainer.querySelector('#tourProgress');
            const closeBtn = tourContainer.querySelector('#closeTour');
            
            let currentIndex = 0;
            
            function updateTour() {
                tourImage.src = images[currentIndex];
                progress.textContent = `${currentIndex + 1}/${images.length}`;
            }
            
            updateTour();
            
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateTour();
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateTour();
            });
            
            function handleKeyDown(e) {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateTour();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateTour();
                } else if (e.key === 'Escape') {
                    closeTour();
                }
            }
            
            function closeTour() {
                tourOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleKeyDown);
            }
            
            closeBtn.addEventListener('click', closeTour);
            
            tourOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        });
    });
}

// Booking Form
function initBookingForm() {
    const forms = document.querySelectorAll('.booking-form');
    
    forms.forEach(form => {
        const dateInputs = form.querySelectorAll('input[type="date"]');
        
        // Set minimum date to today for all date inputs
        dateInputs.forEach(input => {
            input.min = new Date().toISOString().split('T')[0];
        });
        
        // Handle check-in/check-out date logic
        const checkInInput = form.querySelector('#checkIn');
        const checkOutInput = form.querySelector('#checkOut');
        
        if (checkInInput && checkOutInput) {
            checkInInput.addEventListener('change', function() {
                const checkInDate = new Date(this.value);
                const nextDay = new Date(checkInDate);
                nextDay.setDate(nextDay.getDate() + 1);
                checkOutInput.min = nextDay.toISOString().split('T')[0];
                
                // Clear check-out if it's before new minimum
                if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
                    checkOutInput.value = '';
                }
            });
        }

        function validateName(name) {
            return name.length >= 3;
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePhone(phone) {
            const re = /^[\d\s\-\(\)]{8,}$/;
            return re.test(phone);
        }

        function validateDates(checkIn, checkOut) {
            if (!checkIn || !checkOut) return false;
            return new Date(checkOut) > new Date(checkIn);
        }

        form.addEventListener('input', function(e) {
            const input = e.target;
            const errorElement = input.nextElementSibling;
            
            if (input.tagName === 'INPUT' && errorElement && errorElement.classList.contains('error-message')) {
                validateField(input);
            }
        });

        function validateField(input) {
            let isValid = true;
            const value = input.value.trim();
            const errorElement = input.nextElementSibling;

            if (input.required && !value) {
                isValid = false;
                errorElement.textContent = 'This field is required';
            } else if (input.type === 'email' && !validateEmail(value)) {
                isValid = false;
                errorElement.textContent = 'Please enter a valid email';
            } else if (input.id === 'phone' && !validatePhone(value)) {
                isValid = false;
                errorElement.textContent = 'Please enter a valid phone number';
            } else if (input.id === 'fullName' && !validateName(value)) {
                isValid = false;
                errorElement.textContent = 'Name must be at least 3 characters';
            } else {
                errorElement.textContent = '';
            }

            if (isValid) {
                input.classList.remove('error');
            } else {
                input.classList.add('error');
            }

            return isValid;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let formIsValid = true;

            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!validateField(field)) formIsValid = false;
            });

            // Additional date validation for hotel bookings
            if (checkInInput && checkOutInput) {
                const checkIn = checkInInput.value;
                const checkOut = checkOutInput.value;
                if (!validateDates(checkIn, checkOut)) {
                    checkOutInput.nextElementSibling.textContent = 'Check-out must be after check-in';
                    checkOutInput.classList.add('error');
                    formIsValid = false;
                }
            }

            if (formIsValid) {
                form.style.display = 'none';
                const successDiv = form.parentNode.querySelector('.form-success');
                if (successDiv) {
                    successDiv.style.display = 'flex';
                    
                    setTimeout(() => {
                        form.reset();
                        form.style.display = 'block';
                        successDiv.style.display = 'none';
                    }, 5000);
                }
            }
        });
    });
}

// Snap Carousel
function initSnapCarousel() {
    const carousel = document.querySelector('.snap-carousel');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const cards = document.querySelectorAll('.room-card');
    
    if (!carousel || !cards.length) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    
    function scrollToCard(index) {
        currentIndex = Math.max(0, Math.min(index, cards.length - 1));
        carousel.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }
    
    function handleScroll() {
        currentIndex = Math.round(carousel.scrollLeft / cardWidth);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', () => scrollToCard(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollToCard(currentIndex + 1));
    if (carousel) carousel.addEventListener('scroll', handleScroll);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            scrollToCard(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            scrollToCard(currentIndex + 1);
        }
    });
    
    // Initialize
    scrollToCard(0);
}

// Date Pickers (for pages that use Flatpickr)
function initDatePickers() {
    if (typeof flatpickr !== 'undefined') {
        const checkInInput = document.querySelector('#checkIn');
        const checkOutInput = document.querySelector('#checkOut');
        
        if (checkInInput && checkOutInput) {
            const checkInPicker = flatpickr(checkInInput, {
                minDate: "today",
                dateFormat: "Y-m-d",
                onChange: function(selectedDates) {
                    const nextDay = new Date(selectedDates[0]);
                    nextDay.setDate(nextDay.getDate() + 1);
                    checkOutPicker.set("minDate", nextDay);
                    
                    if (checkOutPicker.selectedDates[0] && checkOutPicker.selectedDates[0] < nextDay) {
                        checkOutPicker.clear();
                    }
                }
            });
            
            const checkOutPicker = flatpickr(checkOutInput, {
                minDate: new Date().fp_incr(1),
                dateFormat: "Y-m-d"
            });
            
            // Make icons clickable
            document.querySelectorAll('.flatpickr-icon').forEach(icon => {
                icon.addEventListener('click', () => {
                    const input = icon.previousElementSibling;
                    if (input._flatpickr) {
                        input._flatpickr.open();
                    }
                });
            });
        }
    }
}