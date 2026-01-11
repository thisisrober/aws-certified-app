# AWS Certified Cloud Practitioner - Practice Exam Simulator

<div align="center">

![AWS Cloud Practitioner](public/logo.png)

**An interactive web application to practice for the AWS Cloud Practitioner certification exam**

[🌐 Test the application!](https://thisisrober.es/projects/aws-cloud-practitioner-exam-prep-app/) • [📚 Documentation](#table-of-contents) • [💻 Requirements](#requirements) • [🚀 Quick Start](#quick-start-guide)

</div>

---

## 📋 Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start Guide](#quick-start-guide)
- [Detailed Installation](#detailed-installation)
- [Application Usage](#application-usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

## 📖 Project Description

**AWS Cloud Practitioner Test App** is a modern web application designed to help you prepare for the **AWS Certified Cloud Practitioner** certification exam.

With this tool, you can:
- Practice with questions organized by domain
- Take full 90-minute exam simulations
- Get immediate feedback in study mode
- Visualize your performance by domain
- Review an interactive concept map of topics

The official exam has 65 questions distributed across 4 main domains:
- **Domain 1:** Cloud Concepts (24%)
- **Domain 2:** Security and Compliance (30%)
- **Domain 3:** Cloud Technology and Services (34%)
- **Domain 4:** Billing, Pricing, and Support (12%)

---

## ✨ Features

### 🎯 Study Modes
- **Domain Mastery Tests**: Practice domain-specific questions (30 questions each)
- **Full Exam Simulation**: Complete simulation with 65 questions in 90 minutes
- **Immediate Feedback**: Detailed explanations for each answer

### 📊 Performance Analysis
- Score breakdown by domain
- Progress visualization with charts
- History of recent tests
- Indicators for weak areas

### 🗺️ Study Resources
- **Interactive Concept Map**: XMind mind map with all topics
- **Technical Explanations**: Details for each question
- **Recommendations**: AWS-based preparation guide

### 🎨 Premium Interface
- Modern and responsive design
- Smooth animations
- Intuitive tab system
- Personal notes per question
- Bookmarks for review

---

## 🔧 Prerequisites

To run this project on your machine, you need:

### Required Software

| Software | Minimum Version | Download Link |
|----------|----------------|---------------|
| **Node.js** | 18.x LTS | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x | Installed with Node.js |

### Operating System
- ✅ Windows 10+
- ✅ macOS 10.13+
- ✅ Linux (Ubuntu, Fedora, etc.)

### Web Browser
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Quick Start Guide

### Option 1: Single Command (Easiest)

```bash
# 1. Clone the repository
git clone https://github.com/thisisrober/aws-cloud-practitioner-test-app.git

# 2. Enter the folder
cd aws-cloud-practitioner-test-app

# 3. Install dependencies
npm install

# 4. Start the application
npm run dev

# Done! Open http://localhost:5173 in your browser
```

### Option 2: Without Git (Download ZIP)

1. Download the project as a ZIP from GitHub
2. Extract the folder
3. Open a terminal in the project folder
4. Run the installation commands (see below)

---

## 📦 Detailed Installation

### Step 1: Install Node.js

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the steps
4. Verify it installed correctly:

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

### Step 2: Download the Project

**Option A - With Git:**
```bash
git clone https://github.com/thisisrober/aws-cloud-practitioner-test-app.git
cd aws-cloud-practitioner-test-app
```

**Option B - Download ZIP:**
1. Go to the [project's GitHub](https://github.com/thisisrober/aws-cloud-practitioner-test-app)
2. Click **Code** → **Download ZIP**
3. Extract the folder
4. Open a terminal in the extracted folder

### Step 3: Install Dependencies

```bash
npm install
```

This will download and install all necessary libraries. It may take 2-5 minutes.

### Step 4: Start the Development Server

```bash
npm run dev
```

You should see something like:

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

### Step 5: Open in Your Browser

- Open your favorite browser
- Go to: **http://localhost:5173/**
- Enjoy practicing! 🎉

---

## 💻 Application Usage

### Main Screen

The main page presents three options:

#### 1️⃣ **Practice Tests**
- **Domain Tests**: Choose a specific domain to practice 30 questions
- **Full Exam Simulation**: Complete 90-minute simulation with 65 questions

#### 2️⃣ **Concept Map**
- Visualize all topics and concepts you need to study
- Interactive XMind map
- Useful for understanding the exam structure

#### 3️⃣ **About**
- Guide on how to use the application
- Study tips
- Important information about the exam

### During a Test

#### Main Interface
- **Left Panel**: Question and answer options
- **Right Panel**: Navigation, progress, and analysis

#### Controls
- **Flag Button**: Mark the question for later review
- **Notes Button**: Opens an editor to add personal notes
  - Notes are marked with a blue dot in the sidebar
- **Continue Button**: Confirms your answer and advances

#### Navigation
- **Previous Button**: Goes to the previous unanswered question
- **Next Button**: Advances to the next question
- **Question Grid**: Click any number to go directly to that question

#### Question Indicators
- 🟡 **Yellow/Orange**: Flagged question
- 🟢 **Green**: Correct answer
- 🔴 **Red**: Incorrect answer
- ⚪ **White**: Unanswered

### Study Mode (Domain Tests)

- Receive immediate feedback after answering
- Read the explanation for the correct answer
- Learn while you practice

### Exam Mode (Full Simulation)

- No feedback until finished
- Experience real exam conditions
- Review your answers before finishing
- Get score and breakdown by domain

---

## 🛠️ Available Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter (check code)
npm run lint
```

---

## 🏗️ Technologies Used

### Frontend
- **React 19**: Modern JavaScript framework
- **Vite**: Ultra-fast bundler and development server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformation tool

### Components and Libraries
- **lucide-react**: Professional SVG icons
- **JavaScript ES6+**: Modern JavaScript features

### Development
- **ESLint**: Linter for clean code
- **Node.js**: JavaScript runtime

---

## 📁 Project Structure

```
aws-cloud-practitioner-test-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Top bar with close button
│   │   ├── Menu.jsx             # Main page
│   │   ├── QuestionPanel.jsx    # Question panel
│   │   ├── Sidebar.jsx          # Sidebar with navigation
│   │   ├── Result.jsx           # Final results
│   │   ├── ConceptMap.jsx       # Concept map
│   │   └── Footer.jsx           # Footer
│   ├── data/
│   │   └── questions.js         # Question database
│   ├── utils/
│   │   └── helpers.js           # Helper functions
│   ├── App.jsx                  # Main component
│   ├── main.jsx                 # Entry point
│   ├── App.css                  # Global styles
│   └── index.css                # Base styles
├── public/
│   └── logo.png                 # Application logo
├── index.html                   # Main HTML
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.cjs          # PostCSS configuration
├── eslint.config.js            # ESLint configuration
├── package.json                # Project dependencies
├── package-lock.json           # Exact dependency versions
└── README.md                   # This file
```

---

## 🚀 Production Deployment

### Option 1: Build for Production

```bash
# Generate the optimized version
npm run build

# This creates the 'dist/' folder with all files ready to serve
```

### Option 2: Deploy on Netlify (Recommended - Free)

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: Deploy on Vercel (Free)

```bash
npm install -g vercel
vercel
```

### Option 4: Deploy via FTP to Your Server

1. Run: `npm run build`
2. Upload the contents of the `dist/` folder to your server via FTP
3. If using a subfolder, update `base` in `vite.config.js`:
   ```javascript
   export default {
     base: '/your-folder/',
   }
   ```
4. Rebuild and upload again

---

## ❓ Troubleshooting

### "npm: command not found"
**Solution**: Node.js is not installed. Download it from [nodejs.org](https://nodejs.org/)

### "npm install takes too long"
**Solution**: This is normal on first installation (2-5 minutes). If it's longer, try:
```bash
npm cache clean --force
npm install
```

### Port 5173 is already in use
**Solution**: Use another port:
```bash
npm run dev -- --port 3000
```

### Changes don't reflect after editing code
**Solution**: The development server has automatic hot reload. If it doesn't work:
1. Save the file (Ctrl+S)
2. Wait 1-2 seconds
3. Reload the browser (F5)

### Error "Module not found"
**Solution**: Make sure you've run:
```bash
npm install
```

### The application looks broken/poorly designed
**Solution**: 
1. Clear browser cache (Ctrl+Shift+Del)
2. Reload the page (Ctrl+F5)
3. If it persists, report on GitHub

---

## 📞 Support and Contact

- **GitHub**: [github.com/thisisrober](https://github.com/thisisrober)
- **Website**: [thisisrober.es](https://thisisrober.es)
- **Email**: Contact through my website

---

## 📝 License

This project is under the MIT license. You are free to:
- ✅ Use it freely
- ✅ Modify it
- ✅ Distribute it
- ❌ Sell it without attribution

---

## 🙏 Credits

Made with ❤️ by [thisisrober](https://thisisrober.es)

**Based on open-source technologies:**
- React
- Vite
- Tailwind CSS
- Lucide Icons

---

## 📚 Additional Study Resources

- [AWS Cloud Practitioner Exam Guide](https://aws.amazon.com/certification/certified-cloud-practitioner/)
- [AWS Whitepapers](https://aws.amazon.com/whitepapers/)
- [AWS Skill Builder](https://skillbuilder.aws.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)

---

## 🎯 Tips for Passing the Exam

1. **Use this app regularly**: Practice at least 30 minutes daily
2. **Focus on weak domains**: Performance charts show where you need improvement
3. **Read the explanations**: Don't just look for the correct answer, understand why
4. **Take multiple simulations**: The goal is consistently 70%+, ideally 80%+
5. **Manage your time**: In the full simulation, you have ~1.38 minutes per question
6. **Review before finishing**: Use the review screen to verify doubtful answers

---

<div align="center">

### Was this helpful? Consider leaving a ⭐ on GitHub

**Happy Studying! 🎓**

© 2026 AWS Cloud Practitioner Test App. Made with ❤️ by thisisrober.

</div>