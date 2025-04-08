// Initialize AOS
AOS.init({
    duration: 300,
    easing: 'ease-in-out'
});

// Course data - would typically come from a database
const courseData = {
    ug: [
        // Business Management
        "B.Com (Regular)",
        "B.Com (Professional)",
        "B.Com Honours (FAAT)",
        "B.Com Honours (CMA)",
        "B.Com Honours (ACCA)",
        "B.Com (Investment Banking)",
        "B.Com (Global Professional Qualifications)",
        "BMS (Financial Services)",
        "BMS (Aviation)",
        "BMS (Healthcare)",
        "BMS (International Business)",
        "BMS (Leadership & Strategy)",

        // Engineering Technology
        "B.Tech Computer Science & Engineering",
        "B.Tech Electrical and Electronics Engineering",
        "B.Tech Civil Engineering",
        "B.Tech Mechanical Engineering",
        "B.Tech Electronics & Communication Engineering",
        "B.Sc Artificial Intelligence",
        "B.Sc Data Analytics",
        "B.Tech Computer Science and Business Systems",
        "BCA",
        "B.Sc Generative AI",
        "B.Sc Cybersecurity",
        "B.Tech AI & Data Science",
        "B.Tech Robotics Engineering",
        "B.Tech Mechatronics Engineering",
        "B.Tech Information Science and Engineering",
        "B.Tech Aerospace Engineering",
        "B.Tech Aeronautical Engineering",

        // Creative Arts Design
        "B.Design (Product Design)",
        "B.Design (Interaction Design)",
        "B.Design (Communication Design)",
        "B.Sc in Visual Communications",
        "BA Communication Design - Animation & VFX",
        "BA Communication Design - Graphic Design",
        "BA Communication Design - UI/UX Design",
        "BA - Film and Media",
        "BA - Fashion Design",
        "BA - Interactive Game Art, Design & Development",
        "BFA - Painting",
        "BFA - Sculpture",
        "BFA - Photography",

        // Law Humanities Social Science
        "BA - Comprehensive",
        "BA - History",
        "BA - Psychology",
        "BA - Sociology",
        "BA - Political Science",
        "BA - Economics",
        "BA - English Literature",
        "BA - Philosophy",
        "BA - Journalism & Mass Communication",
        "BA - International Relations",
        "BA LLB (Hons)",
        "BBA LLB (Hons)",

        // Medical Healthcare
        "B.Sc Medical Lab Technology",
        "B.Sc Nuclear Medicine Technology",
        "B.Sc Anesthesia & OT Technology",
        "Bachelors of Occupational Therapy",
        "B.Sc Psychology",
        "B.Sc Cardiac Technology",
        "Bachelors of Optometry",
        "B.Sc Cancer Biology",
        "B.Sc Imaging Technology",
        "B.Sc Nutrition & Dietetics",
        "B.Sc Respiratory Care Technology",
        "B.Sc Urology & Reproductive Technology"
    ],
    pg: [
        // Engineering
        "M.Tech Embedded Systems & VLSI Design",
        "M.Tech Energy & Environmental Management",
        "M.Tech Structural Engineering",
        "M.Tech Civil Engineering",
        "M.Tech Electric Vehicle Technology",
        "M.Tech Artificial Intelligence",
        "M.Tech Data Science",
        "M.Tech Cybersecurity",
        "M.Tech Computer Science & Engineering",

        // Medical & Healthcare
        "M.Sc Molecular Medicine & Stem Cell Technologies",
        "M.Sc Cancer Biology",
        "M.Sc Psychology - Clinical, Neuro Psychology",
        "M.Sc Nutrition & Dietetics",
        "M.Sc Hospital Administration",
        "M.Sc Clinical Embryology & Assisted Reproductive Technology",
        "M.Sc Virology and Immunology",

        // Commerce & Management
        "M.Com (FA with KPMG, ACCA, Electives)",
        "MBA (CMS) - ESG & Aviation, Family Business Management",

        // Computer Science & IT
        "M.Sc Computer Science & IT",
        "M.Sc Full Stack Development"
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