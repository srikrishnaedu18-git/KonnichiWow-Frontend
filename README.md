### Documentation - Konnichowow - Frontend 
    - Explore the live demo here: https://konnichi-wow-frontend.vercel.app for a real-time experience. 
    - Kindly view the folder for documented images ( public/ )

## Overview

    Modern, anime-themed quiz platform built with React, Redux Toolkit, and Tailwind CSS, designed for immersive learning and playful engagement. The application features:

    1. Dynamic question navigation with real-time answer tracking
    2. Progress visualization through animated bars and badges
    3. Detailed answer review with instant feedback and explanations
    4. Responsive layout with fixed side panels and scrollable center
    5. Framer Motion animations for mascot interactions and button feedback
    6. Modular architecture supporting themed sections like Gojo’s Intern Interview and Levi’s Elite Drill

## Technologies Used

    1. React
    2. Tailwind CSS
    3. Framer Motion
    4. Redux Toolkit
    5. Responsive Design
    6. Modular Components
    7. State Management
    8. Animation
    9. Props-driven Architecture
    10. Utility-first Styling

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

    npm create vite@latest quiz-app -- --template react
    cd quiz-app
    npm install
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm install @reduxjs/toolkit react-redux
    npm install lucide-react
    npm install -D eslint prettier eslint-plugin-react eslint-config-prettier
    npm install react-router-dom
    npm install framer-motion

### In src/index.css, replace with:

    @import "tailwindcss";

### In postcss.config.js

    export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
    }
### Run Development Server

    npm run dev

### Implemented Features

**Quiz Interface**  
Displays questions, options, and explanations in a clean, responsive card layout.

**Answer Validation**  
Highlights correct answers in green and incorrect ones in red for instant feedback.

**Progress Tracking**  
Visual progress bar updates with each question answered.

**XP System**  
XP increases with every correct answer, motivating consistent performance.

**Heart System**  
Hearts increase based on quiz completion and streaks, rewarding effort and persistence.

**Badge Unlocks**  
Earn badges like Conqueror, Ace, and Learner based on final score.

**Review Mode**  
After finishing, users can revisit all questions and see their answers vs. correct ones.

**Redux Integration**  
Global state tracks selections, scores, and resets across components.

**Keyboard Navigation**  
Arrow keys and Enter allow smooth quiz progression without mouse input.

**Themed Quiz Sections**  
Gojo and Levi quizzes feature unique mascots, gradients, and animations.
