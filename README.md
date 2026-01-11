# AWS Certified Cloud Practitioner - Practice exam simulator

<div align="center">

![AWS Cloud Practitioner](public/logo.png)

**An interactive web application to practice for the AWS Cloud Practitioner certification exam**

[🌐 Test the application!](https://thisisrober.es/projects/aws-cloud-practitioner-exam-prep-app/)

</div>

---

## 📋 Table of Contents

- [Project description](#project-description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick start guide](#quick-start-guide)
- [Detailed installation](#detailed-installation)
- [Application usage](#application-usage)
- [Technologies used](#technologies-used)
- [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Support and contact](#support-and-contact)
- [License](#license)
- [Credits](#credits)
- [Additional study resources](#additional-study-resources)
- [Tips for passing the exam](#tips-for-passing-the-exam)

---

## 📖 Project description

**AWS Cloud Practitioner Exam Prep App** is a modern web application designed to help you prepare for the **AWS Certified Cloud Practitioner** certification exam.

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

### 🎯 Study modes
- **Domain mastery tests**: practice domain-specific questions (30 questions each)
- **Full exam simulation**: complete simulation with 65 questions in 90 minutes
- **Immediate feedback**: detailed explanations for each answer

### 📊 Performance analysis
- Score breakdown by domain
- Progress visualization with charts
- History of recent tests
- Indicators for weak areas

### 🗺️ Study resources
- **Interactive concept map**: XMind map with all topics
- **Technical explanations**: details for each question
- **Recommendations**: AWS-based preparation guide

### 🎨 Intuitive interface
- Modern and responsive design
- Smooth animations
- Intuitive tab system
- Personal notes per question
- Bookmarks for review

---

## 🔧 Prerequisites

To run this project on your machine, you need:

### Required software

| Software | Minimum Version | Download Link |
|----------|----------------|---------------|
| **Node.js** | 18.x LTS | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x | Installed with Node.js |

### Operating system
- ✅ Windows 10+
- ✅ macOS 10.13+
- ✅ Linux (Ubuntu, Fedora, etc.)

### Web browser
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Quick start guide

### Option 1: single command (easiest)

```bash
# 1. Clone the repository
git clone https://github.com/thisisrober/aws-cloud-practitioner-test-app.git

# 2. Enter the folder
cd aws-cloud-practitioner-test-app

# 3. Install dependencies
npm install

# 4. Start the application
npm run dev

# Done! Open http://localhost:5173/projects/aws-cloud-practitioner-exam-prep-app/ in your browser
```

### Option 2: Docker Hub (pre-built image - fastest)

```bash
# 1. Pull the image from Docker Hub
docker pull thisisrober/aws-exam-prep-app:latest

# 2. Run the container
docker run -d -p 5173:5173 --name aws-exam-app thisisrober/aws-exam-prep-app:latest

# Done! Open http://localhost:5173 in your browser
```

No need to clone or build - the image is ready to use!

### Option 3: without git (Download ZIP)

1. Download the project as a ZIP from GitHub
2. Extract the folder
3. Open a terminal in the project folder
4. Run the installation commands (see below)

---

## 📦 Detailed installation

### Step 1: install Node.js

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the steps
4. Verify it installed correctly:

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

### Step 2: download the project

**Option A - with Git:**
```bash
git clone https://github.com/thisisrober/aws-cloud-practitioner-test-app.git
cd aws-cloud-practitioner-test-app
```

**Option B - download ZIP:**
1. Go to the [project's GitHub](https://github.com/thisisrober/aws-cloud-practitioner-test-app)
2. Click **Code** → **Download ZIP**
3. Extract the folder
4. Open a terminal in the extracted folder

### Step 3: install dependencies

```bash
npm install
```

This will download and install all necessary libraries. It may take 2-5 minutes.

### Step 4: start the development server

```bash
npm run dev
```

You should see something like:

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

### Step 5: open in your browser

- Open your favorite browser
- Go to: **http://localhost:5173/**
- Enjoy practicing! 🎉

---

## 💻 Application usage

### Main Screen

The main page presents three options:

#### 1️⃣ **Practice Tests**
- **Domain Tests**: choose a specific domain to practice 30 questions
- **Full Exam Simulation**: complete 90-minute simulation with 65 questions

#### 2️⃣ **Concept Map**
- Visualize all topics and concepts you need to study
- Interactive XMind map
- Useful for understanding the exam structure

#### 3️⃣ **About**
- Guide on how to use the application
- Study tips
- Important information about the exam

### During a test

#### Main interface
- **Left panel**: question and answer options
- **Right panel**: navigation, progress, and analysis

#### Controls
- **Flag button**: mark the question for later review
- **Notes button**: opens an editor to add personal notes
  - Notes are marked with a blue dot in the sidebar
- **Continue button**: confirms your answer and advances

#### Navigation
- **Previous button**: goes to the previous unanswered question
- **Next button**: advances to the next question
- **Question grid**: click any number to go directly to that question

#### Question indicators
- 🟡 **Yellow/Orange**: flagged question
- 🟢 **Green**: correct answer
- 🔴 **Red**: incorrect answer
- ⚪ **White**: unanswered

### Study mode (domain tests)

- Receive immediate feedback after answering
- Read the explanation for the correct answer
- Learn while you practice

### Exam mode (full simulation)

- No feedback until finished
- Experience real exam conditions
- Review your answers before finishing
- Get score and breakdown by domain

---

## 🏗️ Technologies Used

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS**
- **PostCSS**

### Components and libraries
- **lucide-react**
- **JavaScript ES6+**

### Development
- **ESLint**
- **Node.js**

---

## 📁 Project structure

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

## ❓ Troubleshooting

### "npm: command not found"
**Solution**: Node.js is not installed. Download it from [nodejs.org](https://nodejs.org/)

### "npm install takes too long"
**Solution**: this is normal on first installation (2-5 minutes). If it's longer, try:
```bash
npm cache clean --force
npm install
```

### Port 5173 is already in use
**Solution**: use another port:
```bash
npm run dev -- --port 3000
```

### Changes don't reflect after editing code
**Solution**: the development server has automatic hot reload. If it doesn't work:
1. Save the file (Ctrl+S)
2. Wait 1-2 seconds
3. Reload the browser (F5)

### Error "Module not found"
**Solution**: make sure you've run:
```bash
npm install
```

### The application looks broken/poorly designed
**Solution**: 
1. Clear browser cache (Ctrl+Shift+Del)
2. Reload the page (Ctrl+F5)
3. If it persists, report on GitHub

---

## 📞 Support and contact

- **GitHub**: [github.com/thisisrober](https://github.com/thisisrober)
- **Website**: [thisisrober.es](https://thisisrober.es)
- **Email**: Contact through my website
- **LinkedIn**: [linkedin.com/in/thisisrober/](https://www.linkedin.com/in/thisisrober/)

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

## 📚 Additional study resources

- [AWS Cloud Practitioner Exam Guide](https://aws.amazon.com/certification/certified-cloud-practitioner/)
- [AWS Whitepapers](https://aws.amazon.com/whitepapers/)
- [AWS Skill Builder](https://skillbuilder.aws.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)

---

## 🎯 Tips for passing the exam

1. **Use this app regularly**: practice at least 30 minutes daily
2. **Focus on weak domains**: performance charts show where you need improvement
3. **Read the explanations**: don't just look for the correct answer, understand why
4. **Take multiple simulations**: the goal is consistently 70%+, ideally 80%+
5. **Manage your time**: in the full simulation, you have ~1.38 minutes per question
6. **Review before finishing**: use the review screen to verify doubtful answers

---

<div align="center">

### Was this helpful? Consider leaving a ⭐ on GitHub

**Happy Studying! 🎓**

© 2026 AWS Cloud Practitioner Exam Prep App. Made with ❤️ by thisisrober.

</div>