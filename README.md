<div align="center">

  <h1>🎓 Websums ERP - Internship & LMS Management Platform</h1>

  <p><b>An Enterprise-Grade Full-Stack Internship & Learning Management System (ERP)</b></p>

  <p>
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-repository-structure">Repository Structure</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-role-dashboards">Role Dashboards</a>
  </p>

  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📌 About The Project

**Websums ERP System** is a modern, responsive, role-based Internship Management and Learning Platform built for tech education companies, institutes, and corporate internship programs. It bridges the gap between CEOs/Administrators, Technical Mentors, and Students by offering real-time tracking, live class scheduling, lecture recording distribution, attendance verification, and PDF report generation.

Designed with **glassmorphism UI standards**, high-contrast dark/light mode aesthetics, and scalable TypeScript architecture.

---

## ✨ Key Features

### 🏢 1. CEO & Executive Dashboard
- **Mentor Management**: Add, update, and manage domain-specific mentors.
- **Analytics & Financials**: Monitor payment records, student enrollments, and revenue metrics.
- **Attendance Verification**: Review date-filtered attendance across all domains and export branded PDF reports.
- **Certificate System**: Issue and verify authentic internship completion certificates.

### 👨‍🏫 2. Mentor Management Hub
- **Live Class Scheduler**: Schedule live interactive classes (Google Meet, Zoom integration).
- **Recorded Lecture Portal**: Upload and link session recordings (Google Drive / YouTube / MP4 streaming).
- **Student Progress Tracker**: Track assignment submissions, attendance logs, and student status.

### 🎓 3. Student Learning Portal
- **Interactive Dashboard**: View enrolled courses, upcoming live sessions, and announcements.
- **Integrated Video Player**: Stream recorded lectures with automated embedded video players (YouTube, Drive, MP4).
- **Attendance & Resume Builder**: Track attendance percentages and generate dynamic PDF resumes & certificates.

---

## 🛠️ Tech Stack

| Tier | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite, TypeScript |
| **Styling & UI** | Tailwind CSS, Glassmorphic Utility Classes, Lucide React Icons |
| **State & Context** | React Context API (`AuthContext`, `DataContext`) |
| **Document Generation** | Dynamic PDF Generator Engine |
| **Backend Server** | Node.js, Express.js |
| **Data Persistence** | REST APIs / JSON Mock Data Engine |

---

## 📁 Repository Structure

```
INTERNSHIP-WEBSITE/
├── client/                   # React + TypeScript Frontend (Vite)
│   ├── src/
│   │   ├── components/       # Role-based & common UI components
│   │   │   ├── ceo/          # Executive dashboard components
│   │   │   ├── mentor/       # Mentor management & lecture tools
│   │   │   ├── student/      # Student learning portal
│   │   │   ├── landing/      # Public landing page & domain grids
│   │   │   ├── navbar/       # Navigation & footer components
│   │   │   └── common/       # Modals (Payment, Resume, PDF, Auth)
│   │   ├── context/          # State management (AuthContext, DataContext)
│   │   ├── data/             # Mock data & initial datasets
│   │   ├── types/            # TypeScript interfaces & types
│   │   └── utils/            # PDF generators & verifiers
│   ├── package.json
│   └── vite.config.ts
├── server/                   # Express.js REST API Backend
│   ├── index.js              # Server entry point
│   └── package.json
├── .gitignore
├── package.json              # Root scripts
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher) or **yarn**

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/websumssoftware-cloud/Websums-ERP-System.git
   cd Websums-ERP-System
   ```

2. **Install Dependencies**
   
   *Client Setup:*
   ```bash
   cd client
   npm install
   ```

   *Server Setup:*
   ```bash
   cd ../server
   npm install
   ```

3. **Run the Application**

   *Start the Backend Server:*
   ```bash
   cd server
   npm run dev
   ```

   *Start the Frontend App (in a new terminal):*
   ```bash
   cd client
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 🛡️ License & Credits

Distributed under the **MIT License**. Created & Maintained by **Websums Software Cloud Team**.

<div align="center">
  <sub>Built with ❤️ for Websums Software Internship & ERP Ecosystem</sub>
</div>
