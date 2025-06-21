
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Form Validation and Submission
    const enrollmentForm = document.getElementById('enrollmentForm');
    const contactForm = document.getElementById('contactForm');

    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            if (validateEnrollmentForm()) {
                // Show success message
                showMessage('success', 'Enrollment application submitted successfully! We will contact you soon.');
                enrollmentForm.reset();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            if (validateContactForm()) {
                // Show success message
                showMessage('success', 'Message sent successfully! We will get back to you soon.');
                contactForm.reset();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation classes when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .class-card, .value-card, .program-card, .info-card').forEach(el => {
        observer.observe(el);
    });
});

// Form Validation Functions
function validateEnrollmentForm() {
    const requiredFields = [
        'studentFirstName',
        'studentLastName',
        'dateOfBirth',
        'grade',
        'parentFirstName',
        'parentLastName',
        'email',
        'phone',
        'address'
    ];

    let isValid = true;
    const errors = [];

    // Check required fields
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field && (!field.value || field.value.trim() === '')) {
            isValid = false;
            errors.push(`${getFieldLabel(fieldName)} is required`);
            field.style.borderColor = '#ef4444';
        } else if (field) {
            field.style.borderColor = '#e5e7eb';
        }
    });

    // Check email format
    const email = document.getElementById('email');
    if (email && email.value && !isValidEmail(email.value)) {
        isValid = false;
        errors.push('Please enter a valid email address');
        email.style.borderColor = '#ef4444';
    }

    // Check phone format
    const phone = document.getElementById('phone');
    if (phone && phone.value && !isValidPhone(phone.value)) {
        isValid = false;
        errors.push('Please enter a valid phone number');
        phone.style.borderColor = '#ef4444';
    }

    // Check agreement checkbox
    const agreement = document.getElementById('agreement');
    if (agreement && !agreement.checked) {
        isValid = false;
        errors.push('You must agree to the school policies');
    }

    // Check date of birth (student should be between 4 and 19 years old)
    const dateOfBirth = document.getElementById('dateOfBirth');
    if (dateOfBirth && dateOfBirth.value) {
        const age = calculateAge(new Date(dateOfBirth.value));
        if (age < 4 || age > 19) {
            isValid = false;
            errors.push('Student age must be between 4 and 19 years old');
            dateOfBirth.style.borderColor = '#ef4444';
        }
    }

    if (!isValid) {
        showMessage('error', 'Please correct the following errors:\n' + errors.join('\n'));
    }

    return isValid;
}

function validateContactForm() {
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    let isValid = true;
    const errors = [];

    // Check required fields
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field && (!field.value || field.value.trim() === '')) {
            isValid = false;
            errors.push(`${getFieldLabel(fieldName)} is required`);
            field.style.borderColor = '#ef4444';
        } else if (field) {
            field.style.borderColor = '#e5e7eb';
        }
    });

    // Check email format
    const email = document.getElementById('email');
    if (email && email.value && !isValidEmail(email.value)) {
        isValid = false;
        errors.push('Please enter a valid email address');
        email.style.borderColor = '#ef4444';
    }

    // Check phone format if provided
    const phone = document.getElementById('phone');
    if (phone && phone.value && !isValidPhone(phone.value)) {
        isValid = false;
        errors.push('Please enter a valid phone number');
        phone.style.borderColor = '#ef4444';
    }

    if (!isValid) {
        showMessage('error', 'Please correct the following errors:\n' + errors.join('\n'));
    }

    return isValid;
}

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

function getFieldLabel(fieldName) {
    const labels = {
        'studentFirstName': 'Student First Name',
        'studentLastName': 'Student Last Name',
        'dateOfBirth': 'Date of Birth',
        'grade': 'Grade',
        'parentFirstName': 'Parent First Name',
        'parentLastName': 'Parent Last Name',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'subject': 'Subject',
        'message': 'Message'
    };
    
    return labels[fieldName] || fieldName;
}

function showMessage(type, message) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        max-width: 90%;
        text-align: center;
        white-space: pre-line;
        ${type === 'success' ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
    `;
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Animate in
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateX(-50%) translateY(-20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// Add loading states to forms
function setFormLoading(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        inputs.forEach(input => input.disabled = true);
    } else {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || 'Submit';
        inputs.forEach(input => input.disabled = false);
    }
}

// Initialize form loading states
document.addEventListener('DOMContentLoaded', function() {
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.dataset.originalText = button.textContent;
    });
});