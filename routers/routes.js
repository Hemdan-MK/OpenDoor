const express = require('express');
const router = express.Router();
const sendMail = require('../utils/mail')


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/college', (req, res) => {
    res.render('colleges');
});

router.get('/courses', (req, res) => {
    res.render('courses');
});

router.get('/contactus', (req, res) => {
    res.render('form');
});


router.post('/send-form', async (req, res) => {
    try {
        // Get form data from request body
        const formData = req.body;

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'place', 'gender',
            'parentContact', 'programType', 'course', 'college'];

        for (const field of requiredFields) {
            if (!formData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }

        // Send email
        const emailSent = await sendMail(formData);

        if (emailSent) {
            // You might want to save this data to a database here

            // Send success response
            return res.status(200).json({
                success: true,
                message: 'Registration successful! We will contact you shortly.'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Failed to send notification email. Please try again.'
            });
        }
    } catch (error) {
        console.error('Error processing form submission:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});







const categoryData = {
    'business-management': {
        title: 'Commerce, Business & Management',
        subtitle: 'Discover cutting-edge programs designed to equip you with the skills and knowledge to excel in today\'s dynamic business world',
        headerImage: '/assets/albert-vincent-wu-m7yOJx0ALME-unsplash.webp',
        imageAlt: 'Commerce and business students in a modern setting',
        sectionTitle: 'Explore Our Business Programs',
        sectionDescription: 'Browse through our comprehensive range of commerce, business, and management programs designed to equip you with the expertise and innovation needed to thrive in today\'s competitive business landscape. From accounting and finance to international business and leadership, our courses prepare you to make a lasting impact in the world of commerce.'
    },
    'engineering-technology': {
        title: 'Engineering & Technology',
        subtitle: 'Discover cutting-edge programs designed to prepare you for the technological challenges of tomorrow',
        headerImage: '/assets/albert-vincent-wu-m7yOJx0ALME-unsplash.webp',
        imageAlt: 'Engineering students working with technology',
        sectionTitle: 'Explore Our Engineering Programs',
        sectionDescription: 'Browse through our comprehensive range of engineering and technology courses designed to provide you with the skills and knowledge needed to excel in today\'s fast-paced digital world.'
    },
    'creative-arts-design': {
        title: 'Creative Arts & Design',
        subtitle: 'Discover innovative programs designed to nurture your artistic talent and prepare you for a creative career',
        headerImage: '/assets/albert-vincent-wu-m7yOJx0ALME-unsplash.webp',
        imageAlt: 'Creative arts students working on design projects',
        sectionTitle: 'Explore Our Creative Arts Programs',
        sectionDescription: 'Browse through our comprehensive range of creative arts and design courses designed to provide you with the skills and knowledge needed to excel in today\'s dynamic creative industries.'
    },
    'law-humanities-social-science': {
        title: 'Law, Humanities & Social Science',
        subtitle: 'Explore comprehensive programs designed to develop critical thinking, analytical skills, and a deeper understanding of human society',
        headerImage: '/assets/albert-vincent-wu-m7yOJx0ALME-unsplash.webp',
        imageAlt: 'Students in a humanities class',
        sectionTitle: 'Explore Our Humanities Programs',
        sectionDescription: 'Browse through our diverse range of Law, Humanities and Social Science courses designed to provide you with a strong foundation in understanding human behavior, society, culture, and institutions.'
    },
    'medical-healthcare': {
        title: 'Medical & HealthCare',
        subtitle: 'Discover cutting-edge programs designed to equip you with the skills and knowledge to revolutionize the healthcare industry',
        headerImage: '/assets/albert-vincent-wu-m7yOJx0ALME-unsplash.webp',
        imageAlt: 'Engineering students working with technology',
        sectionTitle: 'Explore Our HealthCare Programs',
        sectionDescription: 'Browse through our comprehensive range of medical and healthcare programs designed to equip you with the expertise and innovation needed to thrive in today\'s rapidly evolving medical landscape. From cutting-edge biotechnology to advanced healthcare informatics, our courses prepare you to make a lasting impact in the world of medicine and patient care.'
    }
};

// Course data
const courseData = {
    'business-management': [
        {
            "title": "B.Com (Regular)",
            "duration": "3 years",
            "description": "Covers core concepts in accounting, economics, and business management, preparing students for careers in finance, commerce, and corporate sectors.",
            "imageUrl": "/assets/business/regular.webp",
            "specializations": []
        },
        {
            "title": "B.Com (Professional)",
            "duration": "3 years",
            "description": "Focuses on advanced commerce with practical training in corporate accounting, financial management, and business analytics, preparing students for professional roles in accounting and finance.",
            "imageUrl": "/assets/business/professional.webp",
            "specializations": []
        },
        {
            "title": "B.Com Honours (FAAT)",
            "duration": "3 years",
            "description": "An in-depth program focused on financial accounting, taxation, and financial analysis, preparing students for roles in accounting, banking, and corporate finance.",
            "imageUrl": "/assets/business/honors.webp",
            "specializations": []
        },
        {
            "title": "B.Com Honours (CMA)",
            "duration": "3 years",
            "description": "Combines undergraduate commerce education with CMA exam preparation, focusing on management accounting, cost analysis, and strategic finance for roles in business advisory and financial planning.",
            "imageUrl": "/assets/business/cma.webp",
            "specializations": []
        },
        {
            "title": "B.Com Honours (ACCA)",
            "duration": "3-4 years",
            "description": "Offers global exposure by combining a commerce degree with ACCA preparation, covering IFRS, business law, and financial management for international career opportunities.",
            "imageUrl": "/assets/business/acca.webp",
            "specializations": []
        },
        {
            "title": "B.Com (Investment Banking)",
            "duration": "3 years",
            "description": "Focuses on capital markets, financial modeling, and corporate valuation, equipping students for roles in investment banks, brokerage firms, and asset management.",
            "imageUrl": "/assets/business/invest.webp",
            "specializations": []
        },
        {
            "title": "B.Com (Global Professional Qualifications)",
            "duration": "3-4 years",
            "description": "Combines international certifications with commerce education, offering exposure to global accounting standards and business practices for international career readiness.",
            "imageUrl": "/assets/business/global.webp",
            "specializations": []
        },
        {
            "title": "BMS (Financial Services)",
            "duration": "3 years",
            "description": "Covers banking, insurance, and capital markets, focusing on financial planning, risk and portfolio management, and preparing students for careers in financial services and consulting.",
            "imageUrl": "/assets/business/financial.webp",
            "specializations": []
        },
        {
            "title": "BMS (Aviation)",
            "duration": "3 years",
            "description": "Combines business management with aviation-specific training in airport operations, airline management, and aviation regulations, preparing students for careers in the aviation industry.",
            "imageUrl": "/assets/business/aviation.webp",
            "specializations": []
        },
        {
            "title": "BMS (Healthcare)",
            "duration": "3 years",
            "description": "Focuses on healthcare administration, hospital management, and policy, preparing students for management roles in hospitals, pharma companies, and health insurance firms.",
            "imageUrl": "/assets/business/healthcare.webp",
            "specializations": []
        },
        {
            "title": "BMS (International Business)",
            "duration": "3 years",
            "description": "Covers global trade, marketing, and business strategy, preparing students for careers in MNCs, international trade, and global consulting.",
            "imageUrl": "/assets/business/international.webp",
            "specializations": []
        },
        {
            "title": "BMS (Leadership & Strategy)",
            "duration": "3 years",
            "description": "Develops leadership and strategic skills for roles in management, business transformation, and entrepreneurship.",
            "imageUrl": "/assets/business/leader.webp",
            "specializations": []
        }
    ],
    'engineering-technology': [
        {
            "title": "Computer Science & Engineering",
            "duration": "4 years",
            "description": "Focuses on designing and developing computer systems, software, and algorithms. Combines mathematics, programming, data structures, AI, and networking to solve real-world problems and build innovative tech solutions.",
            "imageUrl": "/assets/engineering and technology/computer science.webp",
            "specializations": ["AI", "Data Science", "Cybersecurity", "Blockchain", "Cloud Computing", "IoT", "AI-Driven DevOps"]
        },
        {
            "title": "Electrical and Electronics Engineering",
            "duration": "4 years",
            "description": "Covers the design and application of electrical systems and electronic devices. Students explore power generation, electric vehicles, communication systems, and automation technologies",
            "imageUrl": "/assets/engineering and technology/EEE.webp",
            "specializations": ["Electric Vehicles", "Microgrid Technologies"]
        },
        {
            "title": "Civil Engineering",
            "duration": "4 years",
            "description": "Focuses on designing, building, and maintaining infrastructure such as roads, bridges, buildings, and water systems. This field plays a vital role in shaping urban and rural development.",
            "imageUrl": "/assets/engineering and technology/civil.webp",
            "specializations": ["Environmental Geotechnology", "Construction Technology"]
        },
        {
            "title": "Mechanical Engineering",
            "duration": "4 years",
            "description": "Deals with the design, manufacturing, and maintenance of mechanical systems. Applies physics and materials science to create efficient machines, engines, and industrial tools.",
            "imageUrl": "/assets/engineering and technology/Mech.webp",
            "specializations": ["Mechatronics", "Robotics"]
        },
        {
            "title": "Electronics & Communication Engineering",
            "duration": "4 years",
            "description": "Focuses on electronic circuits, communication systems, and signal processing. Enables innovations in telecommunications, embedded systems, and automation.",
            "imageUrl": "/assets/engineering and technology/EC.webp",
            "specializations": ["VLSI", "Robotics"]
        },
        {
            "title": "B.Sc Artificial Intelligence",
            "duration": "3 years",
            "description": "Offers a strong foundation in AI, including machine learning, NLP, neural networks, and ethical AI. Prepares students for careers in intelligent systems and AI development.",
            "imageUrl": "/assets/engineering and technology/AI.webp",
            "specializations": ["Machine Learning", "Computer Vision", "NLP"]
        },
        {
            "title": "B.Sc Data Analytics",
            "duration": "3 years",
            "description": "Equips students with statistical, visualization, and modeling skills to interpret big data. Prepares graduates for roles in data-driven decision-making across sectors.",
            "imageUrl": "/assets/engineering and technology/data analytics.webp",
            "specializations": ["Python", "R", "Tableau", "SQL"]
        },
        {
            "title": "Computer Science and Business Systems",
            "duration": "4 years",
            "description": "Blends computer science with business acumen. In association with TCS, it focuses on enterprise systems, analytics, and digital transformation.",
            "imageUrl": "/assets/engineering and technology/cs bussiness.webp",
            "specializations": ["in association with TCS"]
        },
        {
            "title": "BCA",
            "duration": "3 years",
            "description": "Covers programming, server management, and network infrastructure. Prepares students for roles in IT support, server administration, and systems management.",
            "imageUrl": "/assets/engineering and technology/BCA.webp",
            "specializations": ["CompTIA Server+", "Cloud Computing", "Network Administration"]
        },
        {
            "title": "B.Sc Generative AI",
            "duration": "3 years",
            "description": "Focuses on content-generating AI models like transformers and diffusion networks. Trains students in deep learning, reinforcement learning, and ethical AI innovation.",
            "imageUrl": "/assets/engineering and technology/generative ai.webp",
            "specializations": ["Text Generation", "Image Synthesis", "Multimodal AI"]
        },
        {
            "title": "B.Sc Cybersecurity",
            "duration": "3 years",
            "description": "Specializes in ethical hacking, digital forensics, cryptography, and security analysis. Prepares graduates to safeguard digital assets and combat cyber threats.",
            "imageUrl": "/assets/engineering and technology/cyber.webp",
            "specializations": ["EC-Council collaboration"]
        },
        {
            "title": "AI & Data Science",
            "duration": "4 years",
            "description": "Combines AI, statistics, and data science to extract insights from complex data. Prepares students for impactful roles in tech, healthcare, finance, and beyond.",
            "imageUrl": "/assets/engineering and technology/data science.webp",
            "specializations": []
        },
        {
            "title": "Robotics Engineering",
            "duration": "4 years",
            "description": "Integrates mechanical, electrical, and software engineering to design autonomous machines. Applications range from manufacturing to healthcare and aerospace.",
            "imageUrl": "/assets/engineering and technology/robotics.webp",
            "specializations": []
        },
        {
            "title": "Mechatronics Engineering",
            "duration": "4 years",
            "description": "Combines mechanical systems, electronics, computing, and automation. Focuses on smart product design and intelligent manufacturing systems.",
            "imageUrl": "/assets/engineering and technology/mechatronics.webp",
            "specializations": []
        },
        {
            "title": "Information Science and Engineering",
            "duration": "4 years",
            "description": "Bridges computer science with data management and networking. Focuses on building intelligent information systems for a connected world.",
            "imageUrl": "/assets/engineering and technology/infotmation.webp",
            "specializations": []
        },
        {
            "title": "Aerospace Engineering",
            "duration": "4 years",
            "description": "Covers the design and development of aircraft and spacecraft. Combines aeronautical and astronautical principles for careers in aviation and space exploration.",
            "imageUrl": "/assets/engineering and technology/aerospace.webp",
            "specializations": []
        },
        {
            "title": "Aeronautical Engineering",
            "duration": "4 years",
            "description": "Specializes in the design, testing, and maintenance of aircraft. Emphasizes aerodynamics, propulsion, avionics, and structural engineering.",
            "imageUrl": "/assets/engineering and technology/aeronotical.webp",
            "specializations": []
        }
    ],
    'creative-arts-design': [
        {
            "title": "B.Design (Product Design)",
            "duration": "4 years",
            "description": "The program focuses on developing innovative, functional, and visually appealing products. Students learn design thinking, material studies, ergonomics, and prototyping to create solutions that enhance user experience and address real-world needs.",
            "imageUrl": "/assets/Arts/productdesign.webp",
            "specializations": []
        },
        {
            "title": "B.Design (Interaction Design)",
            "duration": "4 years",
            "description": "This program focuses on creating user-friendly digital experiences. Students learn user research, interface design, information architecture, and usability testing to design interactive, human-centered products and services.",
            "imageUrl": "/assets/Arts/interaction design.webp",
            "specializations": []
        },
        {
            "title": "B.Design (Communication Design)",
            "duration": "4 years",
            "description": "This program emphasizes visual storytelling and strategic messaging. Students gain skills in typography, branding, graphic design, and digital media to create impactful content across various platforms.",
            "imageUrl": "/assets/Arts/communication design.webp",
            "specializations": []
        },
        {
            "title": "B.Sc in Visual Communications",
            "duration": "3 years",
            "description": "This program blends design and technical skills in areas like graphic design, photography, animation, and web media. Students gain practical experience in visual storytelling for careers in media and communication.",
            "imageUrl": "/assets/Arts/visual communication.webp",
            "specializations": ["Digital Media", "Graphic Design", "Photography", "Animation"]
        },
        {
            "title": "BA Communication Design - Animation & VFX",
            "duration": "4 years",
            "description": "This program specializes in the art and technology of animation and visual effects. Students learn 2D and 3D animation techniques, character design, storyboarding, compositing, and special effects creation for film, television, games, and digital media, preparing them for careers in entertainment and creative industries.",
            "imageUrl": "/assets/Arts/animation and vfx.webp",
            "specializations": []
        },
        {
            "title": "BA Communication Design - Graphic Design",
            "duration": "4 years",
            "description": "The Graphic Design specialization focuses on visual communication through print and digital media. Students develop proficiency in typography, layout design, branding, illustration, and digital imaging while exploring conceptual thinking and creative problem-solving to create impactful visual solutions for various communication needs.",
            "imageUrl": "/assets/Arts/graphic design.webp",
            "specializations": []
        },
        {
            "title": "BA Communication Design - UI/UX Design",
            "duration": "4 years",
            "description": "This program specializes in designing user interfaces and experiences for digital products. Students learn user research, information architecture, wireframing, prototyping, and interaction design to create intuitive, accessible, and engaging digital experiences that solve user problems while meeting business objectives.",
            "imageUrl": "/assets/Arts/ui.webp",
            "specializations": []
        },
        {
            "title": "BA - Film and Media",
            "duration": "3 years",
            "description": "The BA in Film and Media program explores visual storytelling through moving images. Students study filmmaking techniques, cinematography, editing, sound design, screenwriting, and production management while developing critical thinking skills about media and its cultural impact, preparing them for careers in film, television, and digital content creation.",
            "imageUrl": "/assets/Arts/film.webp",
            "specializations": []
        },
        {
            "title": "BA - Fashion Design",
            "duration": "3 years",
            "description": "The BA in Fashion Design program develops creative and technical skills for the fashion industry. Students learn garment construction, pattern making, textile science, fashion illustration, and collection development while exploring fashion history, trends, and sustainable practices to prepare for careers in design, styling, and fashion entrepreneurship.",
            "imageUrl": "/assets/Arts/fasion deign.webp",
            "specializations": []
        },
        {
            "title": "BA - Interactive Game Art, Design & Development",
            "duration": "3 years",
            "description": "This program focuses on creating compelling visual aesthetics and engaging experiences for games. Students develop skills in character design, environment art, 3D modeling, texturing, animation, game mechanics, level design, and user experience while learning industry-standard tools and collaborative development processes.",
            "imageUrl": "/assets/Arts/gamedevelopment.webp",
            "specializations": []
        },
        {
            "title": "BFA - Painting",
            "duration": "4 years",
            "description": "The BFA in Painting program develops students' artistic vision and technical skills in various painting mediums. The curriculum covers color theory, composition, figurative and abstract approaches, mixed media techniques, and art history while encouraging personal expression and conceptual development through studio practice and critical discourse.",
            "imageUrl": "/assets/Arts/painting.webp",
            "specializations": []
        },
        {
            "title": "BFA - Sculpture",
            "duration": "4 years",
            "description": "The BFA in Sculpture program explores three-dimensional art forms using traditional and contemporary approaches. Students learn various techniques including modeling, carving, casting, welding, and installation art while studying material properties, spatial concepts, and site-specific considerations to develop their unique artistic voice in three-dimensional expression.",
            "imageUrl": "/assets/Arts/sculpture.webp",
            "specializations": []
        },
        {
            "title": "BFA - Photography",
            "duration": "4 years",
            "description": "The BFA in Photography program explores visual storytelling through the photographic medium. Students develop technical expertise in digital and analog photography, lighting, composition, post-processing, and printing while engaging with photographic theory, history, and contemporary practices to create compelling visual narratives across various photographic genres.",
            "imageUrl": "/assets/Arts/photography.webp",
            "specializations": []
        }
    ],
    'law-humanities-social-science': [
        {
            "title": "BA - Comprehensive",
            "duration": "3 years",
            "description": "A versatile liberal arts degree covering multiple humanities disciplines. Students develop critical thinking, cultural awareness, and communication skills applicable to diverse career paths.",
            "imageUrl": "/assets/humanities/comprehensive.webp",
            "specializations": []
        },
        {
            "title": "BA - History",
            "duration": "3 years",
            "description": "Explores historical periods, movements, and figures while developing research and analytical skills. Prepares students for careers in education, research, journalism, and public history.",
            "imageUrl": "/assets/humanities/history.webp",
            "specializations": []
        },
        {
            "title": "BA - Psychology",
            "duration": "3 years",
            "description": "Examines human behavior, cognition, and mental processes. Students gain insights into human development, abnormal psychology, and research methods for careers in counseling, HR, education, and social services.",
            "imageUrl": "/assets/humanities/psychology.webp",
            "specializations": []
        },
        {
            "title": "BA - Sociology",
            "duration": "3 years",
            "description": "Studies social structures, institutions, and human relationships. Students analyze social problems, inequality, and cultural diversity while developing research skills for careers in social work, community development, and policy analysis.",
            "imageUrl": "/assets/humanities/sociology.webp",
            "specializations": []
        },
        {
            "title": "BA - Political Science",
            "duration": "3 years",
            "description": "Examines politics, governance, and policy-making. Students analyze political systems, international relations, and contemporary issues while developing critical thinking and advocacy skills for careers in government, law, diplomacy, and public service.",
            "imageUrl": "/assets/humanities/political science.webp",
            "specializations": []
        },
        {
            "title": "BA - Economics",
            "duration": "3 years",
            "description": "Studies economic theory, markets, and policies. Students analyze financial systems, development issues, and resource allocation while developing quantitative and analytical skills for careers in business, finance, policy analysis, and government.",
            "imageUrl": "/assets/humanities/economics.webp",
            "specializations": []
        },
        {
            "title": "BA - English Literature",
            "duration": "3 years",
            "description": "Explores literary works, movements, and criticism. Students develop analytical, writing, and communication skills through engagement with diverse texts, preparing for careers in education, publishing, media, and communication.",
            "imageUrl": "/assets/humanities/english literature.webp",
            "specializations": []
        },
        {
            "title": "BA - Philosophy",
            "duration": "3 years",
            "description": "Examines fundamental questions about existence, knowledge, ethics, and reality. Students develop logical reasoning, critical thinking, and ethical analysis skills applicable to law, business ethics, policy-making, and education.",
            "imageUrl": "/assets/humanities/philosophy.webp",
            "specializations": []
        },
        {
            "title": "BA - Journalism & Mass Communication",
            "duration": "3 years",
            "description": "Focuses on news reporting, media production, and communication theory. Students develop writing, editing, and production skills across various media platforms for careers in journalism, public relations, and content creation.",
            "imageUrl": "/assets/humanities/journalism.webp",
            "specializations": []
        },
        {
            "title": "BA - International Relations",
            "duration": "3 years",
            "description": "Examines global politics, diplomacy, and cross-cultural issues. Students analyze international conflicts, cooperation, and global governance while developing skills for careers in diplomacy, international organizations, and global business.",
            "imageUrl": "/assets/humanities/international relation.webp",
            "specializations": []
        },
        {
            "title": "BA LLB (Hons)",
            "duration": "5 years",
            "description": "An integrated program combining humanities with legal education. Students develop critical thinking, legal reasoning, and advocacy skills for careers in litigation, corporate law, and legal policy.",
            "imageUrl": "/assets/humanities/llb1.webp",
            "specializations": []
        },
        {
            "title": "BBA LLB (Hons)",
            "duration": "5 years",
            "description": "Combines business administration with legal studies. Students develop management, financial, and legal expertise for careers in corporate law, business compliance, and legal consulting.",
            "imageUrl": "/assets/humanities/llb2.webp",
            "specializations": []
        }
    ],
    'medical-healthcare': [
        {
            "title": "B.Sc Medical Lab Technology",
            "duration": "3-4 years",
            "description": "This program trains students in clinical laboratory techniques used for disease diagnosis and treatment. It covers medical diagnostics, lab procedures, and healthcare technologies, preparing graduates for roles in hospitals and diagnostic labs.",
            "imageUrl": "/assets/medical and helathcare/medical lab.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Nuclear Medicine Technology",
            "duration": "3-4 years",
            "description": "The B.Sc in Nuclear Medicine Technology is an advanced undergraduate program that focuses on the use of radioactive materials for the diagnosis and treatment of various diseases, including cancer and cardiovascular conditions.",
            "imageUrl": "/assets/medical and helathcare/nuclear medicine.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Anesthesia & OT Technology",
            "duration": "3-4 years",
            "description": "This program trains students in anesthesia techniques, patient monitoring, and OT management. It prepares graduates to assist anesthesiologists and surgeons during surgical procedures.",
            "imageUrl": "/assets/medical and helathcare/anesthasia.webp",
            "specializations": []
        },
        {
            "title": "Bachelors of Occupational Therapy",
            "duration": "4-5 years",
            "description": "The Bachelor of Occupational Therapy (BOT) is a professional undergraduate program that focuses on helping individuals regain independence and improve their quality of life through therapeutic techniques.",
            "imageUrl": "/assets/medical and helathcare/occupational.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Psychology",
            "duration": "3-4 years",
            "description": "This program explores human behavior, mental processes, and mental health. Students gain foundational knowledge in psychological theories, research methods, and applications in clinical, counseling, and organizational settings.",
            "imageUrl": "/assets/medical and helathcare/psycho.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Cardiac Technology",
            "duration": "3-4 years",
            "description": "This program trains students to assist in diagnosing and treating heart conditions. It covers cardiac procedures, patient care, and the use of advanced equipment in cardiovascular healthcare.",
            "imageUrl": "/assets/medical and helathcare/cardiac.webp",
            "specializations": []
        },
        {
            "title": "Bachelors of Optometry",
            "duration": "4 years",
            "description": "The Bachelor of Optometry (B.Optom) is a specialized undergraduate program that focuses on eye care, vision correction, and diagnosing ocular diseases. This course equips students with the knowledge and practical skills required to assess vision problems, prescribe corrective lenses, and detect eye diseases, preparing them for a crucial role in healthcare.",
            "imageUrl": "/assets/medical and helathcare/optho.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Cancer Biology",
            "duration": "3-4 years",
            "description": "The B.Sc in Cancer Biology is an advanced undergraduate program focused on the study of cancer, its causes, progression, diagnosis, and treatment. This course provides students with a strong foundation in molecular biology, genetics, immunology, and oncology, preparing them for careers in medical research, diagnostics, and healthcare.",
            "imageUrl": "/assets/medical and helathcare/cancer biology.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Imaging Technology",
            "duration": "3-4 years",
            "description": "This program trains students in X-ray, MRI, CT, ultrasound, and other imaging techniques. It focuses on equipment handling, patient positioning, and radiation safety for diagnostic accuracy.",
            "imageUrl": "/assets/medical and helathcare/imagine.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Nutrition & Dietetics",
            "duration": "3-4 years",
            "description": "This program covers food science, clinical and community nutrition, and diet therapy. Students learn to create personalized diet plans, manage clinical nutrition, and promote public health through dietary guidance.",
            "imageUrl": "/assets/medical and helathcare/nutrition.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Respiratory Care Technology",
            "duration": "3-4 years",
            "description": "This program trains students to diagnose and manage cardiopulmonary disorders, operate respiratory equipment, and assist in critical care. Graduates work with patients facing chronic respiratory issues, sleep disorders, and emergencies.",
            "imageUrl": "/assets/medical and helathcare/respiratory.webp",
            "specializations": []
        },
        {
            "title": "B.Sc Urology & Reproductive Technology",
            "duration": "3-4 years",
            "description": "This program covers urological diagnostics, reproductive health, and fertility treatments. Students learn to operate specialized equipment and assist in procedures, preparing for roles in urology units and fertility clinics.",
            "imageUrl": "/assets/medical and helathcare/urology.webp",
            "specializations": []
        }
    ]
};

router.get('/courses/ug/:category', (req, res) => {
    const category = req.params.category;

    if (!categoryData[category]) {
        return res.status(404).send('Category not found');
    }

    res.render('ug-course-catalog', {
        category: categoryData[category],
        courses: courseData[category]
    });
});

router.get('/courses/pg/pg-programs', (req, res) => {
    res.render('pg-course-catalog');
});



module.exports = router