const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const Profile = require('../models/Profile');
const Education = require('../models/Education');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certification = require('../models/Certification');
const Achievement = require('../models/Achievement');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Promise.all([
            Profile.deleteMany({}),
            Education.deleteMany({}),
            Project.deleteMany({}),
            Skill.deleteMany({}),
            Certification.deleteMany({}),
            Achievement.deleteMany({})
        ]);
        console.log('🗑️  Cleared existing data');

        // Seed Profile
        await Profile.create({
            name: 'Dhanush Gopi Kavala',
            title: 'Full-Stack Developer & AI Enthusiast',
            email: 'gopidhanush615@gmail.com',
            phone: '+91-6281716735',
            linkedin: 'https://www.linkedin.com/in/dhanush-gopi-kavala',
            github: 'https://github.com/dhanushgopi2456',
            portfolio: 'https://dhanushgopi-portfolio.netlify.app/',
            college: 'Sri Vasavi Engineering College, Tadepalligudem',
            department: 'Computer Science and Engineering',
            objective: 'To leverage my project experience in AI and web development in a challenging role that improves continuous learning and contributes to organizational success.',
            profileImage: '/images/profile.jpg',
            aboutImage: '/images/about.jpg'
        });
        console.log('👤 Profile seeded');

        // Seed Education
        await Education.insertMany([
            { degree: 'B.Tech, CSE', institute: 'Sri Vasavi Engineering College, Andhra Pradesh', cgpa: '9.03', year: '2022-Present', order: 1 },
            { degree: 'Senior Secondary', institute: 'Sri Chaitanya Junior College, Andhra Pradesh', cgpa: '9.6', year: '2022', order: 2 },
            { degree: 'Secondary', institute: 'Sri Shiridi Sai EM School, Andhra Pradesh', cgpa: '10', year: '2020', order: 3 }
        ]);
        console.log('🎓 Education seeded');

        // Seed Projects
        await Project.insertMany([
            {
                title: 'FreshMart Full-Stack Grocery Web App',
                description: 'Developed a full-stack grocery shopping platform with secure JWT-based authentication, product browsing, cart management, order creation, and responsive UI. Built a complete REST API using Express and MongoDB for products, users, carts, and orders. Added an admin panel for managing inventory and users. Integrated clean state management on the frontend, structured API services, and modular backend architecture to ensure smooth, scalable performance.',
                tools: 'React, Vite, Node.js, Express, MongoDB, Mongoose',
                date: 'Feb 2026',
                link: '',
                github: 'https://github.com/dhanushgopi2456/FreshMart',
                category: 'main',
                order: 1
            },
            {
                title: 'Object Detection using YOLO-v9',
                description: 'Developed an end-to-end object detection system using YOLOv9 with custom training, inference, and benchmarking for detection, classification, and segmentation tasks. Deployed the trained models through a Flask-based application for real-time AI implementation.',
                tools: 'Python, Pytorch, OpenCV, NumPy, Flask',
                date: 'April 2024 - Aug 2024',
                link: '',
                github: 'https://github.com/dhanushgopi2456/Object-Detection-YOLO-v9',
                category: 'main',
                order: 2
            },
            {
                title: 'Online Stall Booking System using React JS',
                description: 'Built a full-stack Online Stall Booking System with React (Vite) frontend and Spring Boot backend, enabling secure stall registration, booking, and management. Implemented real-time availability updates and an admin dashboard to streamline stall allocation and enhance user experience.',
                tools: 'React JS, Express JS, HTML, CSS, JavaScript, MongoDB',
                date: 'Jan 2025',
                link: '',
                github: 'https://github.com/dhanushgopi2456/Online_Stall_Booking',
                category: 'main',
                order: 3
            },
            {
                title: 'Skin Cancer Detection',
                description: 'Developed a machine learning model for detecting skin cancer from images using data analysis techniques.',
                tools: 'Python, Machine Learning',
                date: '',
                github: 'https://github.com/dhanushgopi2456/My_Certifications/blob/main/SkinCancer.ipynb',
                category: 'practice',
                order: 4
            },
            {
                title: 'Data Analysis Using Python',
                description: 'Performed comprehensive data analysis using Python libraries for extracting insights from datasets.',
                tools: 'Python, Pandas, NumPy',
                date: '',
                github: 'https://github.com/dhanushgopi2456/Data_Analysis_using_python',
                category: 'practice',
                order: 5
            },
            {
                title: 'Employee Management System',
                description: 'Built an employee management system for handling employee records, departments, and organizational hierarchy.',
                tools: 'Java, Database',
                date: '',
                github: 'https://github.com/dhanushgopi2456/Employee-Management',
                category: 'practice',
                order: 6
            }
        ]);
        console.log('🚀 Projects seeded');

        // Seed Skills
        await Skill.insertMany([
            {
                category: 'Programming Languages',
                items: ['Core Java', 'Python', 'C++', 'MySQL', 'DSA'],
                icon: 'fas fa-code',
                order: 1
            },
            {
                category: 'Technologies',
                items: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Express JS', 'Node JS', 'MongoDB'],
                icon: 'fas fa-laptop-code',
                order: 2
            },
            {
                category: 'Tools',
                items: ['Eclipse', 'Visual Studio Code', 'MS Word', 'MS Excel', 'Jupyter Notebook', 'Python IDLE'],
                icon: 'fas fa-tools',
                order: 3
            },
            {
                category: 'Soft Skills',
                items: ['Decision Making', 'Analytical Thinking', 'Time Management'],
                icon: 'fas fa-users',
                order: 4
            }
        ]);
        console.log('💡 Skills seeded');

        // Seed Certifications
        await Certification.insertMany([
            { issuer: 'Salesforce', title: 'Agentforce Specialist', date: 'Dec 2026', link: 'https://github.com/dhanushgopi2456/My_Certifications/blob/main/Salesforce%20Certified%20AgentForce%20Specialist.pdf', order: 1 },
            { issuer: 'ServiceNow', title: 'Certified Administrator and Developer', date: 'Oct 2025', link: 'https://github.com/dhanushgopi2456/My_Certifications/blob/main/ServiceNowCAD.pdf', order: 2 },
            { issuer: 'Oracle', title: 'Cloud Infrastructure 2025 DevOps Professional', date: 'July 2025', link: 'https://github.com/dhanushgopi2456/My_Certifications/blob/main/Oracle_Devops_Certificate.pdf', order: 3 },
            { issuer: 'Microsoft', title: 'Azure AI Fundamentals (AI-900)', date: 'May 2024', link: 'https://github.com/dhanushgopi2456/My_Certifications/blob/main/Azure%20Ai%20fundamentals%20%20Global%20Certificate%20by%20Microsoft.pdf', order: 4 },
            { issuer: 'NPTEL', title: 'Data Structures and Algorithms using Java', date: 'October 2024', link: 'https://github.com/dhanushgopi2456/My_Certifications/blob/main/Data%20Structure%20and%20Algorithms%20using%20Java%20.pdf', order: 5 },
            { issuer: 'NVIDIA', title: 'Accelerating End-End Data Science Workflows', date: '', link: 'https://github.com/dhanushgopi2456/My_Certifications/blob/main/NVDIA_Data_Science_Certificate.pdf', order: 6 }
        ]);
        console.log('📜 Certifications seeded');

        // Seed Achievements
        await Achievement.insertMany([
            {
                title: 'YOLO-v9 Research Paper Published',
                description: 'Object Detection Using YOLO-v9 has been Successfully published under the Hinweis Third International Conference on Artificial Intelligence and Data Science (AIDE-2024).',
                link: 'https://github.com/dhanushgopi2456/My_Certifications/blob/main/ResearchPaper_Certificate.jpeg',
                order: 1
            },
            {
                title: 'Class Representative',
                description: 'Served as Class Representative at Sri Vasavi Engineering College (Jan 2026).',
                order: 2
            },
            {
                title: 'Anti-Ragging Committee Member',
                description: 'Served as Anti-Ragging and Student Committee Member (Jan 2026).',
                order: 3
            }
        ]);
        console.log('🏆 Achievements seeded');

        console.log('\n✅ All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
};

seedData();
