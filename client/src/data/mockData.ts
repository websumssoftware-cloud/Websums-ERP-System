import { Domain, Student, Mentor, LiveClass, RecordedLecture, Assignment, Certificate, Announcement, JobPosting, Quiz, StudentApplication } from '../types';

export const INITIAL_DOMAINS: Domain[] = [
  {
    id: 'dom-1',
    name: 'MERN Stack Development',
    category: 'Web Development',
    iconName: 'Code',
    studentsEnrolled: 245,
    durationWeeks: 12,
    description: 'Master MongoDB, Express.js, React 19, Node.js, and TypeScript building enterprise SaaS solutions.',
    syllabus: [
      { week: 1, title: 'HTML5, CSS3, Modern JS (ES6+)', topics: ['Semantic HTML', 'Flexbox/Grid', 'Async/Await', 'DOM Manipulation'] },
      { week: 2, title: 'React Fundamentals & Hooks', topics: ['JSX', 'useState/useEffect', 'Custom Hooks', 'Tailwind CSS'] },
      { week: 3, title: 'Advanced React & State Management', topics: ['Redux Toolkit', 'React Query', 'Context API', 'Routing'] },
      { week: 4, title: 'Node.js & Express REST APIs', topics: ['Express Routing', 'Middleware', 'JWT Authentication', 'Error Handling'] },
      { week: 5, title: 'Database Design & MongoDB Atlas', topics: ['Schemas', 'Mongoose ODM', 'Aggregation Pipelines', 'Indexing'] },
      { week: 6, title: 'Full Stack Integration & Cloud Deployment', topics: ['Axios Integration', 'Vercel & Render', 'Cloudinary', 'CI/CD Pipelines'] }
    ]
  },
  {
    id: 'dom-2',
    name: 'Artificial Intelligence & Deep Learning',
    category: 'Data & AI',
    iconName: 'Bot',
    studentsEnrolled: 189,
    durationWeeks: 12,
    description: 'Build neural networks, Computer Vision models, and LLM AI agents using Python and PyTorch.',
    syllabus: [
      { week: 1, title: 'Python for AI & Math Foundations', topics: ['NumPy', 'Linear Algebra', 'Calculus for ML', 'Probability'] },
      { week: 2, title: 'Neural Networks from Scratch', topics: ['Perceptrons', 'Backpropagation', 'Activation Functions', 'Optimizers'] },
      { week: 3, title: 'Computer Vision & CNNs', topics: ['OpenCV', 'CNN Architectures', 'Image Classification', 'YOLO Object Detection'] },
      { week: 4, title: 'Natural Language Processing & Transformers', topics: ['Tokenization', 'Attention Mechanism', 'BERT', 'LLM Fine-tuning'] }
    ]
  },
  {
    id: 'dom-3',
    name: 'Machine Learning',
    category: 'Data & AI',
    iconName: 'Cpu',
    studentsEnrolled: 160,
    durationWeeks: 10,
    description: 'Supervised and Unsupervised Learning algorithms, Model Optimization, and Scikit-Learn.',
    syllabus: [
      { week: 1, title: 'Data Preprocessing & EDA', topics: ['Pandas', 'Missing Values', 'Feature Scaling', 'Seaborn'] },
      { week: 2, title: 'Regression & Classification', topics: ['Linear/Logistic Regression', 'Decision Trees', 'Random Forests', 'SVM'] }
    ]
  },
  {
    id: 'dom-4',
    name: 'Data Science & Data Analytics',
    category: 'Data & AI',
    iconName: 'BarChart3',
    studentsEnrolled: 210,
    durationWeeks: 10,
    description: 'Data wrangling, statistical analysis, interactive dashboards with Power BI and SQL.',
    syllabus: [
      { week: 1, title: 'SQL & Relational Databases', topics: ['Joins', 'Aggregations', 'Subqueries', 'Window Functions'] },
      { week: 2, title: 'Power BI & Visual Analytics', topics: ['DAX Formulas', 'Interactive Reports', 'Data Modeling', 'ETL Pipelines'] }
    ]
  },
  {
    id: 'dom-5',
    name: 'Cyber Security & Ethical Hacking',
    category: 'Security',
    iconName: 'ShieldCheck',
    studentsEnrolled: 115,
    durationWeeks: 12,
    description: 'Penetration testing, network security, web application security (OWASP Top 10), Kali Linux.',
    syllabus: [
      { week: 1, title: 'Networking & Linux Basics', topics: ['TCP/IP', 'Wireshark', 'Linux CLI', 'Port Scanning with Nmap'] },
      { week: 2, title: 'Web App Pentesting', topics: ['SQL Injection', 'XSS', 'CSRF', 'Burp Suite'] }
    ]
  },
  {
    id: 'dom-6',
    name: 'DevOps & Cloud Computing (AWS/Docker)',
    category: 'Cloud',
    iconName: 'Cloud',
    studentsEnrolled: 140,
    durationWeeks: 10,
    description: 'Docker containers, Kubernetes, CI/CD pipelines with GitHub Actions, AWS EC2, S3, IAM.',
    syllabus: [
      { week: 1, title: 'Containerization with Docker', topics: ['Dockerfile', 'Docker Compose', 'Multi-stage builds', 'Volumes'] },
      { week: 2, title: 'AWS Cloud Infrastructure', topics: ['EC2', 'S3', 'RDS', 'IAM Roles', 'VPC Setup'] }
    ]
  },
  {
    id: 'dom-7',
    name: 'UI/UX Design & Product Strategy',
    category: 'Design',
    iconName: 'Layout',
    studentsEnrolled: 175,
    durationWeeks: 8,
    description: 'User research, wireframing, interactive prototyping in Figma, and design systems.',
    syllabus: [
      { week: 1, title: 'UI Design Principles', topics: ['Typography', 'Color Theory', 'Grids & Layouts', 'Figma Basics'] },
      { week: 2, title: 'UX Research & Prototyping', topics: ['User Personas', 'Journey Mapping', 'Interactive Prototypes', 'Usability Testing'] }
    ]
  },
  {
    id: 'dom-8',
    name: 'Full Stack Java Development',
    category: 'Software Engineering',
    iconName: 'Coffee',
    studentsEnrolled: 195,
    durationWeeks: 12,
    description: 'Java 21, Spring Boot, Microservices, Hibernate ORM, and React Frontend integration.',
    syllabus: [
      { week: 1, title: 'Core Java & OOPs', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Collections Framework'] },
      { week: 2, title: 'Spring Boot REST APIs', topics: ['Spring MVC', 'Spring Data JPA', 'Security', 'Microservices Architecture'] }
    ]
  },
  {
    id: 'dom-9',
    name: 'Python Full Stack Development',
    category: 'Software Engineering',
    iconName: 'Terminal',
    studentsEnrolled: 220,
    durationWeeks: 12,
    description: 'Python 3, Django, FastAPI, PostgreSQL, and modern React dashboard building.',
    syllabus: [
      { week: 1, title: 'Python Advanced', topics: ['Decorators', 'Generators', 'OOPs', 'Virtual Environments'] },
      { week: 2, title: 'Django & FastAPI', topics: ['ORM', 'REST Framework', 'Pydantic', 'Async Endpoints'] }
    ]
  },
  {
    id: 'dom-10',
    name: 'Flutter & Mobile App Development',
    category: 'Mobile',
    iconName: 'Smartphone',
    studentsEnrolled: 130,
    durationWeeks: 10,
    description: 'Build cross-platform iOS and Android apps with Dart, Flutter, and Firebase backend.',
    syllabus: [
      { week: 1, title: 'Dart Programming', topics: ['Syntax', 'Functions', 'Async/Await', 'Classes'] },
      { week: 2, title: 'Flutter UI Components', topics: ['Widgets', 'Stateful/Stateless', 'Provider/Bloc', 'REST APIs'] }
    ]
  },
  {
    id: 'dom-11',
    name: 'Digital Marketing & Growth Hacking',
    category: 'Business',
    iconName: 'TrendingUp',
    studentsEnrolled: 98,
    durationWeeks: 8,
    description: 'SEO, Google Ads, Meta Ads, Social Media Marketing, Analytics, and Content Strategy.',
    syllabus: [
      { week: 1, title: 'SEO & Keyword Strategy', topics: ['On-Page SEO', 'Off-Page SEO', 'Technical SEO', 'Google Search Console'] },
      { week: 2, title: 'Performance Marketing', topics: ['Google Ads', 'Meta Ad Manager', 'ROAS Optimization', 'A/B Testing'] }
    ]
  },
  {
    id: 'dom-12',
    name: 'C++ & Data Structures & Algorithms',
    category: 'Core CS',
    iconName: 'Binary',
    studentsEnrolled: 180,
    durationWeeks: 12,
    description: 'Master Data Structures (Trees, Graphs, Dynamic Programming) and C++ Standard Template Library (STL).',
    syllabus: [
      { week: 1, title: 'C++ Basics & Memory Management', topics: ['Pointers', 'References', 'Pointers to Functions', 'Dynamic Memory'] },
      { week: 2, title: 'Advanced DSA', topics: ['Trees & BST', 'Graph Algorithms (Dijkstra, BFS/DFS)', 'Dynamic Programming'] }
    ]
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-101',
    userId: 'usr-student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    domain: 'MERN Stack Development',
    batch: 'Batch W-2026-A',
    mentorName: 'Dr. Rajesh Verma',
    profileCompletion: 95,
    attendancePercentage: 96,
    assignmentsSubmitted: 8,
    totalAssignments: 8,
    averageGrade: '96%',
    joinedDate: '2026-06-01',
    status: 'Active',
    college: 'IIT Delhi',
    githubUrl: 'https://github.com/aarav-sharma',
    linkedinUrl: 'https://linkedin.com/in/aaravsharma',
    feeDetails: {
      totalFee: 15000,
      paidAmount: 15000,
      pendingAmount: 0,
      status: 'Paid',
      transactions: [
        { id: 'tx-1', amount: 7500, date: '2026-06-01', paymentMode: 'UPI / GPay', receiptNo: 'WEB-REC-101' },
        { id: 'tx-2', amount: 7500, date: '2026-07-01', paymentMode: 'Bank Transfer / NEFT', receiptNo: 'WEB-REC-204' }
      ]
    }
  },
  {
    id: 'std-102',
    userId: 'usr-student-2',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    phone: '+91 98123 45678',
    domain: 'Artificial Intelligence & Deep Learning',
    batch: 'Batch W-2026-B',
    mentorName: 'Prof. Ankit Mehta',
    profileCompletion: 90,
    attendancePercentage: 92,
    assignmentsSubmitted: 7,
    totalAssignments: 8,
    averageGrade: '91%',
    joinedDate: '2026-06-01',
    status: 'Active',
    college: 'BITS Pilani',
    githubUrl: 'https://github.com/ananya-g',
    linkedinUrl: 'https://linkedin.com/in/ananyagupta',
    feeDetails: {
      totalFee: 18000,
      paidAmount: 10000,
      pendingAmount: 8000,
      status: 'Partial',
      transactions: [
        { id: 'tx-3', amount: 10000, date: '2026-06-01', paymentMode: 'UPI / GPay', receiptNo: 'WEB-REC-109' }
      ]
    }
  },
  {
    id: 'std-103',
    userId: 'usr-student-3',
    name: 'Rohan Kulkarni',
    email: 'rohan.kulkarni@example.com',
    phone: '+91 97654 32109',
    domain: 'DevOps & Cloud Computing (AWS/Docker)',
    batch: 'Batch W-2026-A',
    mentorName: 'Priya Sundaram',
    profileCompletion: 85,
    attendancePercentage: 88,
    assignmentsSubmitted: 6,
    totalAssignments: 8,
    averageGrade: '85%',
    joinedDate: '2026-06-15',
    status: 'Active',
    college: 'NIT Trichy',
    feeDetails: {
      totalFee: 15000,
      paidAmount: 5000,
      pendingAmount: 10000,
      status: 'Partial',
      transactions: [
        { id: 'tx-4', amount: 5000, date: '2026-06-15', paymentMode: 'Cash', receiptNo: 'WEB-REC-152' }
      ]
    }
  },
  {
    id: 'std-104',
    userId: 'usr-student-4',
    name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '+91 99887 76655',
    domain: 'UI/UX Design & Product Strategy',
    batch: 'Batch W-2026-C',
    mentorName: 'Kavita Reddy',
    profileCompletion: 100,
    attendancePercentage: 98,
    assignmentsSubmitted: 8,
    totalAssignments: 8,
    averageGrade: '98%',
    joinedDate: '2026-05-10',
    status: 'Completed',
    college: 'NID Ahmedabad',
    feeDetails: {
      totalFee: 12000,
      paidAmount: 12000,
      pendingAmount: 0,
      status: 'Paid',
      transactions: [
        { id: 'tx-5', amount: 12000, date: '2026-05-10', paymentMode: 'Credit / Debit Card', receiptNo: 'WEB-REC-088' }
      ]
    }
  },
  {
    id: 'std-105',
    userId: 'usr-student-5',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 91234 56789',
    domain: 'MERN Stack Development',
    batch: 'Batch W-2026-A',
    mentorName: 'Dr. Rajesh Verma',
    profileCompletion: 88,
    attendancePercentage: 90,
    assignmentsSubmitted: 7,
    totalAssignments: 8,
    averageGrade: '89%',
    joinedDate: '2026-06-01',
    status: 'Active',
    college: 'VIT Vellore',
    feeDetails: {
      totalFee: 15000,
      paidAmount: 0,
      pendingAmount: 15000,
      status: 'Unpaid',
      transactions: []
    }
  }
];

export const INITIAL_APPLICATIONS: StudentApplication[] = [
  {
    id: 'app-501',
    applicantName: 'Pratham Joshi',
    email: 'pratham.j@gmail.com',
    phone: '+91 98220 44556',
    domain: 'MERN Stack Development',
    college: 'COEP Pune',
    qualification: 'B.Tech CSE (Final Year)',
    appliedDate: '2026-07-30',
    status: 'Pending',
    resumeFileName: 'Pratham_Joshi_MERN_Resume.pdf',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    statement: 'Extremely passionate about full-stack web development and eager to build scalable microservices.'
  },
  {
    id: 'app-502',
    applicantName: 'Meera Deshmukh',
    email: 'meera.d@outlook.com',
    phone: '+91 97300 88990',
    domain: 'Artificial Intelligence & Deep Learning',
    college: 'VJTI Mumbai',
    qualification: 'B.E. IT (Pre-Final Year)',
    appliedDate: '2026-07-29',
    status: 'Accepted',
    resumeFileName: 'Meera_Deshmukh_AI_CV.pdf',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    statement: 'Interested in Computer Vision models and fine-tuning Open-Source LLMs for enterprise applications.'
  },
  {
    id: 'app-503',
    applicantName: 'Aditya Bhosale',
    email: 'aditya.b@yahoo.com',
    phone: '+91 95521 33441',
    domain: 'DevOps & Cloud Computing (AWS/Docker)',
    college: 'MIT WPU Pune',
    qualification: 'B.Tech E&TC',
    appliedDate: '2026-07-28',
    status: 'Rejected',
    resumeFileName: 'Aditya_Bhosale_Cloud_Resume.pdf',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    statement: 'Looking forward to hands-on AWS infrastructure management and CI/CD pipelines.'
  },
  {
    id: 'app-504',
    applicantName: 'Tanvi Shinde',
    email: 'tanvi.shinde@gmail.com',
    phone: '+91 94220 11223',
    domain: 'UI/UX Design & Product Strategy',
    college: 'Symbiosis Pune',
    qualification: 'B.Des User Experience',
    appliedDate: '2026-07-31',
    status: 'Pending',
    resumeFileName: 'Tanvi_Shinde_Portfolio_CV.pdf',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    statement: 'Eager to design sleek design systems and user journey flows for Websums enterprise client apps.'
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'mnt-1',
    name: 'Dr. Rajesh Verma',
    email: 'rajesh.verma@websums.com',
    phone: '+91 98000 11122',
    assignedDomains: ['MERN Stack Development', 'Full Stack Java Development'],
    activeBatches: ['Batch W-2026-A', 'Batch W-2026-D'],
    totalStudents: 145,
    rating: 4.9,
    joinedDate: '2025-01-15',
    status: 'Active'
  },
  {
    id: 'mnt-2',
    name: 'Prof. Ankit Mehta',
    email: 'ankit.mehta@websums.com',
    phone: '+91 98000 33344',
    assignedDomains: ['Artificial Intelligence & Deep Learning', 'Machine Learning'],
    activeBatches: ['Batch W-2026-B'],
    totalStudents: 110,
    rating: 4.8,
    joinedDate: '2025-03-01',
    status: 'Active'
  },
  {
    id: 'mnt-3',
    name: 'Priya Sundaram',
    email: 'priya.sundaram@websums.com',
    phone: '+91 98000 55566',
    assignedDomains: ['DevOps & Cloud Computing (AWS/Docker)', 'Cyber Security & Ethical Hacking'],
    activeBatches: ['Batch W-2026-A', 'Batch W-2026-C'],
    totalStudents: 95,
    rating: 4.95,
    joinedDate: '2025-02-10',
    status: 'Active'
  }
];

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'lc-1',
    title: 'Enterprise MERN Architecture & Redux Toolkit state sync',
    domain: 'MERN Stack Development',
    batch: 'Batch W-2026-A',
    mentorName: 'Dr. Rajesh Verma',
    date: '2026-07-28',
    time: '18:00 IST',
    durationMinutes: 90,
    meetingPlatform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/9876543210',
    status: 'Upcoming'
  },
  {
    id: 'lc-2',
    title: 'Transformer Models & Attention Mechanism in PyTorch',
    domain: 'Artificial Intelligence & Deep Learning',
    batch: 'Batch W-2026-B',
    mentorName: 'Prof. Ankit Mehta',
    date: '2026-07-28',
    time: '20:00 IST',
    durationMinutes: 90,
    meetingPlatform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    status: 'Upcoming'
  },
  {
    id: 'lc-3',
    title: 'Dockerizing Microservices & Container Networking',
    domain: 'DevOps & Cloud Computing (AWS/Docker)',
    batch: 'Batch W-2026-A',
    mentorName: 'Priya Sundaram',
    date: '2026-07-27',
    time: '17:00 IST',
    durationMinutes: 60,
    meetingPlatform: 'Microsoft Teams',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join/12345',
    status: 'Live'
  }
];

export const INITIAL_LECTURES: RecordedLecture[] = [
  {
    id: 'rec-1',
    title: 'Week 4: Building Secure JWT Authentication & Refresh Tokens',
    domain: 'MERN Stack Development',
    week: 4,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    duration: '1h 24m',
    viewsCount: 342,
    pdfNotesUrl: '#'
  },
  {
    id: 'rec-2',
    title: 'Week 3: CNN Convolutional Layers & Image Augmentation',
    domain: 'Artificial Intelligence & Deep Learning',
    week: 3,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    duration: '1h 45m',
    viewsCount: 289,
    pdfNotesUrl: '#'
  },
  {
    id: 'rec-3',
    title: 'Week 2: Advanced Figma Auto-Layout & Component Variants',
    domain: 'UI/UX Design & Product Strategy',
    week: 2,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
    duration: '1h 10m',
    viewsCount: 410,
    pdfNotesUrl: '#'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Build RESTful API for E-Commerce Backend with Mongoose',
    domain: 'MERN Stack Development',
    batch: 'Batch W-2026-A',
    dueDate: '2026-08-05',
    maxMarks: 100,
    description: 'Implement User Auth, Product Catalog CRUD, Cart Management, and Order processing with Mongoose schemas and Express validators.',
    totalSubmissions: 42
  },
  {
    id: 'asg-2',
    title: 'Image Classification Model using PyTorch & ResNet50',
    domain: 'Artificial Intelligence & Deep Learning',
    batch: 'Batch W-2026-B',
    dueDate: '2026-08-08',
    maxMarks: 100,
    description: 'Train a convolutional model to classify medical X-ray scans with at least 92% validation accuracy.',
    totalSubmissions: 35
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    certificateCode: 'WEBSUM-2026-8891',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@example.com',
    domain: 'MERN Stack Development',
    issueDate: '2026-07-15',
    grade: 'A+ (Distinction)',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WEBSUM-2026-8891',
    verified: true
  },
  {
    id: 'cert-2',
    certificateCode: 'WEBSUM-2026-9042',
    studentName: 'Sneha Patel',
    studentEmail: 'sneha.patel@example.com',
    domain: 'UI/UX Design & Product Strategy',
    issueDate: '2026-07-20',
    grade: 'A+ (Distinction)',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WEBSUM-2026-9042',
    verified: true
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    title: '🎉 National Hackathon 2026 Registration Open for All Interns!',
    content: 'Websums Software Pvt. Ltd. presents the Annual National Innovation Hackathon with total cash prizes of ₹5,00,000 and direct PPO placement offers from Google, Microsoft & Websums.',
    targetRole: 'All',
    authorName: 'Subhasis Roy (CEO)',
    createdAt: '2026-07-26',
    urgent: true
  },
  {
    id: 'anc-2',
    title: '📢 Mid-Term Evaluation & Live Project Submission Guidelines',
    content: 'All batch W-2026-A students must submit their mid-term project repositories by August 5th via the student assignment portal.',
    targetRole: 'Student',
    authorName: 'Dr. Rajesh Verma',
    createdAt: '2026-07-24',
    urgent: false
  }
];

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    companyName: 'Websums Software Pvt. Ltd.',
    roleTitle: 'Junior Software Engineer (Full Stack MERN)',
    location: 'Bangalore / Remote',
    salaryPackage: '₹8.5 LPA - ₹12 LPA',
    type: 'PPO',
    skillsRequired: ['React 19', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind'],
    appliedCount: 128
  },
  {
    id: 'job-2',
    companyName: 'Microsoft India',
    roleTitle: 'Associate Cloud DevOps Engineer',
    location: 'Hyderabad',
    salaryPackage: '₹14 LPA - ₹18 LPA',
    type: 'Full-time',
    skillsRequired: ['AWS/Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    appliedCount: 240
  },
  {
    id: 'job-3',
    companyName: 'Google Cloud Labs',
    roleTitle: 'AI Research & Engineering Intern',
    location: 'Gurgaon / Remote',
    salaryPackage: '₹45,000 / month',
    type: 'Internship',
    skillsRequired: ['Python', 'PyTorch', 'Computer Vision', 'LLMs'],
    appliedCount: 310
  }
];

export const SAMPLE_QUIZ: Quiz = {
  id: 'qz-101',
  title: 'MERN Stack & React 19 Core Concepts Assessment',
  domain: 'MERN Stack Development',
  durationMinutes: 15,
  totalQuestions: 4,
  questions: [
    {
      id: 'q1',
      question: 'Which Hook in React 19 is primarily used for asynchronous data fetching directly in server components or with suspense?',
      options: ['useAsync', 'use', 'useFetch', 'useEffectServer'],
      correctAnswer: 1,
      explanation: 'React 19 introduced the `use` API to read values of promises or contexts directly during render.'
    },
    {
      id: 'q2',
      question: 'In MongoDB Mongoose, which method is used to populate reference documents across collections?',
      options: ['join()', 'aggregate()', 'populate()', 'lookup()'],
      correctAnswer: 2,
      explanation: '`populate()` lets you reference documents in other collections using ObjectIds.'
    },
    {
      id: 'q3',
      question: 'What status code should an Express REST API return upon successful creation of a new resource (e.g. POST /api/students)?',
      options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
      correctAnswer: 1,
      explanation: 'HTTP Status 201 Created signifies that the request succeeded and led to creation of a resource.'
    },
    {
      id: 'q4',
      question: 'What is the purpose of JWT Refresh Tokens in Enterprise Authentication?',
      options: [
        'To encrypt user passwords in database',
        'To obtain a new short-lived Access Token without re-authenticating user credentials',
        'To compress HTTP header payload size',
        'To block CORS cross-origin requests'
      ],
      correctAnswer: 1,
      explanation: 'Refresh tokens allow seamless token renewal without forcing the user to log in again.'
    }
  ]
};

export const ANALYTICS_GRAPH_DATA = [
  { month: 'Jan', enrollment: 320, revenue: 12.5, attendance: 92 },
  { month: 'Feb', enrollment: 450, revenue: 18.0, attendance: 94 },
  { month: 'Mar', enrollment: 590, revenue: 24.2, attendance: 91 },
  { month: 'Apr', enrollment: 780, revenue: 31.0, attendance: 95 },
  { month: 'May', enrollment: 950, revenue: 38.4, attendance: 93 },
  { month: 'Jun', enrollment: 1120, revenue: 45.0, attendance: 96 },
  { month: 'Jul', enrollment: 1248, revenue: 52.8, attendance: 94 }
];
