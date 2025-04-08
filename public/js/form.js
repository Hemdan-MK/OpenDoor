// Initialize AOS
AOS.init({
    duration: 300,
    easing: 'ease-in-out'
});

// Course data - would typically come from a database
const courseData = {
    ug: [
        "B.Tech Computer Science & Engineering",
        "B.Tech Electronics & Communication",
        "B.Tech Mechanical Engineering",
        "B.Tech Civil Engineering",
        "Bachelor of Business Administration (BBA)",
        "Bachelor of Science (B.Sc) Physics",
        "Bachelor of Science (B.Sc) Chemistry",
        "Bachelor of Arts (BA) Economics"
    ],
    pg: [
        "M.Tech Computer Science & Engineering",
        "M.Tech Electronics & Communication",
        "Master of Business Administration (MBA)",
        "Master of Science (M.Sc) Physics",
        "Master of Science (M.Sc) Chemistry",
        "Master of Arts (MA) Economics",
        "Master of Computer Applications (MCA)",
        "Ph.D Programs"
    ]
};


const styleCode = `
        /* Loading Spinner Styles */
        .spinner-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
            
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #0d6efd;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
            
        .spinner-text {
            color: white;
            font-size: 18px;
            font-weight: bold;
        }
            
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
            
        /* For submit button states */
        .btn-loading {
            position: relative;
            pointer-events: none;
            opacity: 0.8;
        }
        `;

// Add this HTML right before the closing </body> tag
const loadingSpinnerHTML = `
        <div class="spinner-container" id="loadingSpinner">
            <div class="spinner"></div>
            <div class="spinner-text">Submitting your application...</div>
        </div>
        `;




document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const programType = document.getElementById('programType');
    const courseSelect = document.getElementById('course');
    const progressBar = document.getElementById('formProgress');
    const formInputs = form.querySelectorAll('input, select');
    const submitBtn = document.getElementById('submitBtn');

    document.body.insertAdjacentHTML('beforeend', loadingSpinnerHTML);
    const styleElement = document.createElement('style');
    styleElement.textContent = styleCode;
    document.head.appendChild(styleElement);
    const loadingSpinner = document.getElementById('loadingSpinner');


    // Initialize form animation
    let delay = 0;
    document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in-up').forEach(element => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, delay);
        delay += 100;
    });

    // Program type change handler
    programType.addEventListener('change', function () {
        const selectedProgram = this.value;

        // Clear current options
        courseSelect.innerHTML = '<option value="" selected disabled>Select a Course</option>';

        // Add new options based on program type
        if (selectedProgram) {
            courseData[selectedProgram].forEach(course => {
                const option = document.createElement('option');
                option.value = course.toLowerCase().replace(/\s+/g, '-');
                option.textContent = course;
                courseSelect.appendChild(option);
            });

            // Enable the course select
            courseSelect.disabled = false;
        } else {
            courseSelect.disabled = true;
        }

        validateInput(courseSelect);
    });

    // Enhanced email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function () {
        validateEmailFormat(this);
    });

    function validateEmailFormat(input) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailRegex.test(input.value);

        if (input.value) {
            if (isValid) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        } else {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }

        updateProgress();
    }

    // Phone number validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');

            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }

            validateInput(this);
        });
    });

    // Form validation
    function validateInput(input) {
        // Special handling for radio buttons
        if (input.type === 'radio') {
            const radioGroup = document.querySelectorAll(`input[name="${input.name}"]`);
            let isChecked = false;
            radioGroup.forEach(radio => {
                if (radio.checked) isChecked = true;
            });

            if (isChecked) {
                radioGroup.forEach(radio => {
                    radio.classList.remove('is-invalid');
                });
                input.classList.add('is-valid');
            } else if (form.classList.contains('was-validated')) {
                radioGroup.forEach(radio => {
                    radio.classList.add('is-invalid');
                });
            }
            return;
        }

        // For other input types
        if (input.type === 'checkbox') {
            if (input.checked) {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            } else {
                input.classList.remove('is-valid');
                if (form.classList.contains('was-validated')) {
                    input.classList.add('is-invalid');
                }
            }
        } else {
            const valid = input.checkValidity();
            if (valid && input.value) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                if ((input.value || input.required) && form.classList.contains('was-validated')) {
                    input.classList.add('is-invalid');
                    input.closest('.mb-3, .mb-4').classList.add('shake');
                    setTimeout(() => {
                        input.closest('.mb-3, .mb-4').classList.remove('shake');
                    }, 500);
                }
            }
        }

        updateProgress();
    }

    // Update progress bar
    function updateProgress() {
        // const totalFields = formInputs.length;
        const totalFields = 10;
        let validFields = 0;

        formInputs.forEach(input => {
            // Check if the input is required and valid, or not required
            if ((input.required && input.classList.contains('is-valid')) ||
                (!input.required && input.value && input.classList.contains('is-valid')) ||
                (!input.required && !input.value)) {
                validFields++;
            }
        });

        const progress = (validFields / totalFields) * 100;
        console.log('progress ', progress);

        progressBar.style.width = `${progress}%`;

        if (progress <= 33) {
            progressBar.style.backgroundColor = 'red';
        } else if (progress <= 66) {
            progressBar.style.backgroundColor = 'orange';
        } else if (progress <= 99) {
            progressBar.style.backgroundColor = 'yellow';
            progressBar.style.color = 'black'; // better contrast
        } else {
            progressBar.style.backgroundColor = 'green';
            progressBar.style.color = 'white';
        }

        if (progress === 100) {
            submitBtn.classList.add('pulse');
        } else {
            submitBtn.classList.remove('pulse');
        }


    }

    // Add validation to all inputs
    formInputs.forEach(input => {
        ['input', 'change', 'blur'].forEach(event => {
            input.addEventListener(event, function () {
                validateInput(this);
            });
        });
    });

    // Form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            event.stopPropagation();
            // Add validation to all inputs to show errors
            formInputs.forEach(input => validateInput(input));

            // Shake invalid inputs
            document.querySelectorAll('.is-invalid').forEach(invalid => {
                invalid.closest('.mb-3, .mb-4').classList.add('shake');
                setTimeout(() => {
                    invalid.closest('.mb-3, .mb-4').classList.remove('shake');
                }, 500);
            });

            // Scroll to first invalid input
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        } else {
            // Show loading spinner
            loadingSpinner.style.display = 'flex';

            // Change button text and disable it
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');

            // Get form data
            const formData = new FormData(form);
            const formDataObject = {};
            for (const [key, value] of formData.entries()) {
                formDataObject[key] = value;
            }

            // Send data to backend using fetch
            fetch('/send-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);

                    // Hide loading spinner
                    loadingSpinner.style.display = 'none';

                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');

                    // Show success animation
                    document.getElementById('registrationForm').style.display = 'none';
                    document.getElementById('registrationComplete').style.display = 'block';
                })
                .catch((error) => {
                    console.error('Error:', error);

                    // Hide loading spinner
                    loadingSpinner.style.display = 'none';

                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');

                    alert('There was an error submitting your form. Please try again.');
                });
        }

        form.classList.add('was-validated');
    });

    // Real-time validation feedback
    formInputs.forEach(input => {
        input.addEventListener('keyup', function () {
            if (form.classList.contains('was-validated')) {
                validateInput(this);
            }
        });
    });
});