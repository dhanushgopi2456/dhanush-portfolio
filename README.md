# 🚀 Dhanush Gopi Kavala — Portfolio Website

A fully responsive, animated personal portfolio website built with **Node.js**, **Express.js**, and **MongoDB**. Features a sleek dark theme with glassmorphism, dynamic content loaded from a database, and a working contact form with email integration.

## 🌐 Live Preview

> Run locally at `http://localhost:3000`

---

## ✨ Features

- **Dynamic Content** — All data (projects, skills, certifications, achievements) loaded from MongoDB via REST APIs
- **Dark Theme** — Premium glassmorphism design with gradient accents and particle background
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Contact Form** — Sends email notifications directly via Gmail (Nodemailer)
- **Smooth Animations** — AOS scroll animations, typing effect, 3D tilt cards, floating badges
- **Project Links** — GitHub buttons on all project and certification cards
- **Social Links** — GitHub, LinkedIn, Twitter/X, GeeksforGeeks, LeetCode

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | HTML5, CSS3, JavaScript             |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB (Mongoose)                  |
| Email      | Nodemailer (Gmail SMTP)             |
| Animation  | AOS Library, Custom CSS/JS          |
| Icons      | Font Awesome 6                      |
| Fonts      | Google Fonts (Inter, Fira Code)     |

---

## 📂 Project Structure

```
My Portfolio Website/
├── controllers/          # API controllers
│   ├── profileController.js
│   ├── projectController.js
│   ├── skillController.js
│   ├── certificationController.js
│   ├── achievementController.js
│   └── contactController.js
├── models/               # Mongoose schemas
│   ├── Profile.js
│   ├── Education.js
│   ├── Project.js
│   ├── Skill.js
│   ├── Certification.js
│   ├── Achievement.js
│   └── Contact.js
├── routes/               # Express routes
│   ├── profileRoutes.js
│   ├── projectRoutes.js
│   ├── skillRoutes.js
│   ├── certificationRoutes.js
│   ├── achievementRoutes.js
│   └── contactRoutes.js
├── seed/
│   └── seed.js           # Database seeder script
├── public/
│   ├── index.html        # Main HTML file
│   ├── css/style.css     # All styles
│   ├── js/main.js        # App logic & API calls
│   ├── js/particles.js   # Particle background animation
│   └── images/           # Profile & about images
├── server.js             # Express server entry point
├── package.json
├── .env                  # Environment variables (not in repo)
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+)
- **MongoDB** (running locally or MongoDB Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/dhanushgopi2456/dhanush-portfolio.git
cd dhanush-portfolio

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and Gmail credentials
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=your_gmail@gmail.com
```

> **Note:** For `EMAIL_PASS`, use a [Gmail App Password](https://myaccount.google.com/apppasswords) (requires 2-Step Verification enabled).

### Run the App

```bash
# Seed the database with portfolio data
npm run seed

# Start the development server
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 📡 API Endpoints

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| GET    | `/api/profile`        | Profile & education data  |
| GET    | `/api/projects`       | All projects              |
| GET    | `/api/skills`         | All skills                |
| GET    | `/api/certifications` | All certifications        |
| GET    | `/api/achievements`   | All achievements          |
| POST   | `/api/contact`        | Submit contact form       |

---

## 📜 Sections

1. **Hero** — Animated intro with typing effect and profile image
2. **About** — Bio, education, contact info
3. **Education** — Timeline layout with degrees and CGPA
4. **Projects** — Filterable cards (Main / Practice) with GitHub links
5. **Skills** — Categorized skill cards with tool tags
6. **Certifications** — Cards with issuer icons and certificate links
7. **Achievements** — Research paper publication with certificate link
8. **Contact** — Working form with email delivery

---

## 👨‍💻 Author

**Dhanush Gopi Kavala**

- 🔗 [LinkedIn](https://www.linkedin.com/in/dhanush-gopi-kavala)
- 🐙 [GitHub](https://github.com/dhanushgopi2456)
- 𝕏 [Twitter](https://x.com/home)
- 💻 [LeetCode](https://leetcode.com/u/Dhanush_Gopi/)
- 📧 gopidhanush615@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
