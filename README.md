# Professor Information & Scheduling Website - Complete Guide

A modern, responsive React frontend application for a university professor directory and scheduling system. This application provides both a public interface for students to search for professors and a secure admin panel for managing professor information.

# Package manager used for this project:
- pnpm
-- to install dependencies and imports
pnpm install
-- to run server
pnpm dev

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [File Explanations](#file-explanations)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Code Architecture](#code-architecture)
- [Component Details](#component-details)
- [Styling System](#styling-system)
- [Data Management](#data-management)
- [Deployment](#deployment)
- [Customization](#customization)

## 🎯 Overview

This is a **Professor Directory Website** built with modern web technologies. Think of it as a digital phone book for university professors, but much more advanced. Students can search for professors, view their office hours, and contact them easily. Administrators can manage all professor information through a secure dashboard.

### What This Application Does:
- **For Students**: Search and find professor information, office hours, and contact details
- **For Administrators**: Add, edit, and delete professor profiles through a secure admin panel
- **For Everyone**: Provides a clean, mobile-friendly interface that works on all devices

## ✨ Features

### 🌐 Public Interface (What Students See)
- **Homepage**: Beautiful landing page with search functionality
- **Search System**: Find professors by name, department, or course code
- **Professor Profiles**: Detailed pages showing:
  - Contact information (email, office location)
  - Weekly schedule and office hours
  - Department information
  - Profile photos
- **Responsive Design**: Works perfectly on phones, tablets, and computers

### 🔐 Admin Panel (What Administrators See)
- **Secure Login**: Password-protected access (demo: admin/admin)
- **Dashboard**: Overview with statistics and professor management
- **Add/Edit Professors**: Complete forms for managing professor data
- **Delete Confirmation**: Safe deletion with confirmation dialogs
- **Search & Filter**: Find specific professors quickly
- **Image Upload**: Add profile photos for professors

## 🛠 Technology Stack

### Core Technologies
- **React 19**: The main framework for building the user interface
- **Vite**: Fast development server and build tool
- **React Router**: Handles navigation between different pages
- **JavaScript (ES6+)**: Modern JavaScript features

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality, pre-built UI components
- **Lucide Icons**: Beautiful, consistent icons throughout the app

### Development Tools
- **pnpm**: Fast, efficient package manager
- **ESLint**: Code quality and error checking
- **PostCSS**: CSS processing and optimization

## 📁 Project Structure

```
professor-website/
├── public/                     # Static files (favicon, etc.)
│   └── favicon.ico            # Website icon
├── src/                       # Main source code
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components (buttons, inputs, etc.)
│   │   ├── Homepage.jsx      # Main landing page
│   │   ├── SearchResults.jsx # Search results page
│   │   ├── ProfessorProfile.jsx # Individual professor page
│   │   ├── AdminLogin.jsx    # Admin login page
│   │   ├── AdminDashboard.jsx # Admin management dashboard
│   │   └── AddEditProfessor.jsx # Add/edit professor form
│   ├── hooks/                # Custom React hooks
│   │   └── use-mobile.js     # Mobile device detection
│   ├── lib/                  # Utility functions
│   │   └── utils.js          # Helper functions for styling
│   ├── App.jsx               # Main app component with routing
│   ├── App.css               # Global styles and Tailwind configuration
│   ├── index.css             # Additional CSS (currently empty)
│   └── main.jsx              # App entry point
├── components.json            # shadcn/ui configuration
├── eslint.config.js          # Code quality rules
├── index.html                # Main HTML template
├── jsconfig.json             # JavaScript project configuration
├── package.json              # Project dependencies and scripts
├── pnpm-lock.yaml            # Locked dependency versions
├── README.md                 # This documentation file
└── vite.config.js            # Vite build tool configuration
```

## 📄 File Explanations

### 🏠 Root Files

#### `package.json`
**Purpose**: This is like a recipe book for your project. It tells the computer:
- What ingredients (dependencies) your project needs
- What commands you can run (like `pnpm run dev`)
- Basic information about your project

**Key Parts**:
```json
{
  "scripts": {
    "dev": "vite",           // Start development server
    "build": "vite build",   // Build for production
    "preview": "vite preview" // Preview built version
  },
  "dependencies": {
    "react": "^19.1.0",      // Main React library
    "react-router-dom": "^7.6.1", // Page navigation
    "tailwindcss": "^4.1.7"  // Styling framework
  }
}
```

#### `vite.config.js`
**Purpose**: Configuration for Vite (the build tool). Think of it as settings for how your project gets built and served.

**What it does**:
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],  // Enable React and Tailwind
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // "@" means "src" folder
    },
  },
})
```

#### `components.json`
**Purpose**: Configuration for shadcn/ui components. This tells the system how to generate and style UI components.

### 🎨 Source Files (`src/`)

#### `main.jsx` - The Starting Point
**Purpose**: This is where your React app begins. It's like the ignition key for your car.

**What it does**:
```javascript
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  // Start the main app
  </StrictMode>,
)
```

#### `App.jsx` - The Traffic Controller
**Purpose**: This file controls which page users see based on the URL. It's like a traffic controller directing cars to different roads.

**How it works**:
```javascript
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />           // Home page
        <Route path="/search" element={<SearchResults />} /> // Search page
        <Route path="/professor/:id" element={<ProfessorProfile />} /> // Professor page
        <Route path="/admin/login" element={<AdminLogin />} /> // Admin login
        // ... more routes
      </Routes>
    </Router>
  )
}
```

### 🧩 Components (`src/components/`)

#### `Homepage.jsx` - The Welcome Mat
**Purpose**: The first page users see. It's like the front door of your website.

**Key Features**:
- **Search Bar**: Users can type professor names, departments, or course codes
- **Quick Links**: Buttons for popular departments (Computer Science, Math, Physics)
- **Navigation**: Header with site logo and menu
- **Responsive Design**: Looks good on all screen sizes

**Important Code**:
```javascript
const handleSearch = (e) => {
  e.preventDefault()
  if (searchQuery.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
  }
}
```

#### `SearchResults.jsx` - The Phone Book
**Purpose**: Shows a list of professors based on search terms. Like looking up names in a phone book.

**Key Features**:
- **Professor Cards**: Each professor gets a card with photo, name, department, office, email
- **Search Filtering**: Filters results based on name, department, or email
- **No Results Handling**: Shows helpful message when no professors are found
- **Navigation**: Easy links back to home and to individual professor pages

**Mock Data**: Contains sample professor information for demonstration:
```javascript
const mockProfessors = [
  {
    id: 1,
    full_name: "Dr. Eleanor Vance",
    department: "Computer Science",
    office_location: "Turing Hall, Room 314",
    email: "e.vance@university.edu",
    // ... schedule and other info
  }
]
```

#### `ProfessorProfile.jsx` - The Detailed View
**Purpose**: Shows complete information about a single professor. Like a detailed business card.

**Key Features**:
- **Header Section**: Large profile photo, name, department, contact info
- **Weekly Schedule**: Shows office hours for each day of the week
- **Contact Actions**: Email button and department browsing
- **Loading States**: Shows spinner while loading data
- **Error Handling**: Shows message if professor not found

**Schedule Display**:
```javascript
const getScheduleData = () => {
  return [
    { day: 'Monday', schedule: professor.schedule_monday },
    { day: 'Tuesday', schedule: professor.schedule_tuesday },
    // ... filters out "Not Available" days
  ].filter(item => item.schedule && item.schedule !== 'Not Available')
}
```

#### `AdminLogin.jsx` - The Security Guard
**Purpose**: Protects the admin area. Only people with the right password can enter.

**Key Features**:
- **Login Form**: Username and password fields
- **Password Visibility**: Toggle to show/hide password
- **Demo Credentials**: Shows admin/admin for testing
- **Error Handling**: Shows error messages for wrong credentials
- **Loading States**: Shows spinner during login process

**Authentication Logic**:
```javascript
const handleSubmit = async (e) => {
  if (formData.username === 'admin' && formData.password === 'admin') {
    localStorage.setItem('adminAuth', 'true')  // Remember login
    navigate('/admin/dashboard')
  } else {
    setError('Invalid username or password')
  }
}
```

#### `AdminDashboard.jsx` - The Control Center
**Purpose**: The main admin page where administrators manage all professors. Like a control center.

**Key Features**:
- **Statistics Cards**: Shows total professors, departments, search results
- **Professor Table**: Lists all professors with edit/delete buttons
- **Search Functionality**: Filter professors by name, department, or email
- **Add New Button**: Quick access to add new professors
- **Delete Confirmation**: Modal popup to confirm deletions

**Authentication Check**:
```javascript
useEffect(() => {
  const isAuthenticated = localStorage.getItem('adminAuth')
  if (!isAuthenticated) {
    navigate('/admin/login')  // Redirect if not logged in
  }
}, [navigate])
```

#### `AddEditProfessor.jsx` - The Form Master
**Purpose**: Form for adding new professors or editing existing ones. Like filling out a detailed application.

**Key Features**:
- **Dual Mode**: Works for both adding new and editing existing professors
- **Image Upload**: Upload and preview profile photos
- **Form Validation**: Checks required fields and email format
- **Schedule Input**: Separate fields for each day of the week
- **Auto-save**: Prevents data loss with proper state management

**Form Validation**:
```javascript
const validateForm = () => {
  const newErrors = {}
  
  if (!formData.full_name.trim()) {
    newErrors.full_name = 'Full name is required'
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address'
  }
  
  return Object.keys(newErrors).length === 0
}
```

### 🎨 UI Components (`src/components/ui/`)

These are pre-built, reusable components from shadcn/ui. Think of them as LEGO blocks you can use to build your interface:

- **Button**: Clickable buttons with different styles
- **Input**: Text input fields
- **Card**: Container for grouping related content
- **Dialog**: Popup windows for confirmations
- **Table**: Data tables for displaying lists
- **And many more...**

### 🔧 Utilities (`src/lib/` and `src/hooks/`)

#### `utils.js` - The Helper
**Purpose**: Contains utility functions used throughout the app.

```javascript
export function cn(...inputs) {
  return twMerge(clsx(inputs));  // Combines CSS classes smartly
}
```

#### `use-mobile.js` - The Device Detective
**Purpose**: Detects if the user is on a mobile device.

```javascript
export function useIsMobile() {
  // Returns true if screen width is less than 768px
  return !!isMobile
}
```

### 🎨 Styling (`src/App.css`)

**Purpose**: Contains all the styling configuration for the app using Tailwind CSS.

**Key Features**:
- **CSS Variables**: Defines colors and spacing that can be reused
- **Dark Mode Support**: Includes dark theme colors
- **Component Styling**: Base styles for all UI components

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**: The JavaScript runtime
- **pnpm**: Package manager (faster than npm)

### Installation Steps

1. **Install pnpm** (if not already installed):
```bash
npm install -g pnpm
```

2. **Install project dependencies**:
```bash
pnpm install
```

3. **Start the development server**:
```bash
pnpm run dev
```

4. **Open your browser** and visit: `http://localhost:5173`

### Available Commands

```bash
pnpm run dev      # Start development server
pnpm run build    # Build for production
pnpm run preview  # Preview production build
pnpm run lint     # Check code quality
```

## 📖 Usage Guide

### For Students (Public Interface)

1. **Homepage** (`/`):
   - Use the search bar to find professors
   - Click department quick links for browsing
   - Navigate using the header menu

2. **Search Results** (`/search`):
   - View professor cards with basic information
   - Click "View Details" for complete professor information
   - Use "Back to Home" to return to homepage

3. **Professor Profile** (`/professor/:id`):
   - View complete professor information
   - See weekly schedule and office hours
   - Click email to send messages
   - Browse department faculty

### For Administrators (Admin Interface)

1. **Login** (`/admin/login`):
   - Use credentials: `admin` / `admin`
   - Access the administrative dashboard

2. **Dashboard** (`/admin/dashboard`):
   - View statistics (total professors, departments)
   - Search and filter professors
   - Edit or delete existing professors
   - Add new professors

3. **Add/Edit Professor** (`/admin/professor/add` or `/admin/professor/edit/:id`):
   - Fill in professor information
   - Upload profile images
   - Set weekly schedules
   - Save changes

## 🏗 Code Architecture

### Component Hierarchy
```
App
├── Homepage
├── SearchResults
├── ProfessorProfile
├── AdminLogin
├── AdminDashboard
└── AddEditProfessor
```

### Data Flow
1. **Mock Data**: Currently uses hardcoded data for demonstration
2. **State Management**: Uses React's built-in `useState` and `useEffect`
3. **Routing**: React Router handles navigation between pages
4. **Authentication**: Simple localStorage-based admin authentication

### Key Patterns Used

#### 1. **Component Composition**
Each page is a separate component that can be reused and maintained independently.

#### 2. **Props and State**
- **Props**: Data passed from parent to child components
- **State**: Data that can change within a component

#### 3. **Hooks**
- **useState**: Manages component state
- **useEffect**: Handles side effects (API calls, subscriptions)
- **useNavigate**: Programmatic navigation
- **useParams**: Access URL parameters

#### 4. **Conditional Rendering**
Shows different content based on conditions:
```javascript
{loading ? <Spinner /> : <Content />}
{user ? <Dashboard /> : <Login />}
```

## 🎨 Styling System

### Tailwind CSS Classes
The app uses utility-first CSS classes:

```javascript
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
```

**Breakdown**:
- `bg-white`: White background
- `rounded-lg`: Large rounded corners
- `shadow-md`: Medium shadow
- `p-6`: Padding of 1.5rem
- `hover:shadow-lg`: Larger shadow on hover
- `transition-shadow`: Smooth shadow animation

### Color Scheme
- **Primary**: Blue (`blue-600`, `blue-700`)
- **Secondary**: Gray (`gray-50`, `gray-100`, `gray-900`)
- **Success**: Green
- **Error**: Red
- **Warning**: Yellow

### Responsive Design
Uses Tailwind's responsive prefixes:
- `sm:`: Small screens (640px+)
- `md:`: Medium screens (768px+)
- `lg:`: Large screens (1024px+)

## 💾 Data Management

### Current Implementation (Mock Data)
The app currently uses hardcoded data stored in each component:

```javascript
const mockProfessors = [
  {
    id: 1,
    full_name: "Dr. Eleanor Vance",
    department: "Computer Science",
    office_location: "Turing Hall, Room 314",
    email: "e.vance@university.edu",
    profile_image_url: "/api/placeholder/150/150",
    schedule_monday: "10:00 AM - 12:00 PM (Office Hours)",
    // ... more fields
  }
]
```

### Data Structure
Each professor object contains:
- **Basic Info**: `id`, `full_name`, `department`, `email`, `office_location`
- **Image**: `profile_image_url`
- **Schedule**: `schedule_monday` through `schedule_friday`
- **Notes**: `notes` for additional information

### Future Backend Integration
The app is designed to work with a REST API:

**Expected Endpoints**:
```
GET /api/professors          # Get all professors
GET /api/professors/:id      # Get specific professor
POST /api/professors         # Create new professor
PUT /api/professors/:id      # Update professor
DELETE /api/professors/:id   # Delete professor
POST /api/admin/login        # Admin authentication
```

# for deployement on vercel the api call flow is like this since we are using a proxy but on local server the url in the .env file will be used that line is commented in the api.js file but we can use it for when working locally 
The flow is:

Frontend React app
→ calls /api/... (because API_BASE_URL = '/api').

Vercel hosting
→ sees that request coming in.
→ checks vercel.json.
→ finds a rewrite rule for /api/(.*).

Vercel rewrites
→ forwards the request to your real backend URL (e.g. https://professorsite-xxxx.b4a.run/api/...).

Backend responds
→ response goes back through Vercel.
→ React app receives the data.

✅ This way your frontend never needs to know the real backend URL.
✅ CORS issues disappear because everything looks like it’s coming from the same domain.
✅ If the backend URL changes, you just update vercel.json (no frontend code changes).

So yeah — your summary is 💯 correct:
Frontend → Vercel (via /api/...) → Backend → Response back to frontend.

## 🚀 Deployment

### Building for Production

1. **Build the app**:
```bash
pnpm run build
```

2. **Preview the build**:
```bash
pnpm run preview
```

### Deployment Options

#### Static Hosting (Recommended)
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use GitHub Actions for deployment

#### Traditional Hosting
- Upload the `dist` folder contents to your web server
- Configure your server to serve `index.html` for all routes

### Environment Configuration
For production, you'll need to:
1. Replace mock data with real API calls
2. Configure proper authentication
3. Set up environment variables for API endpoints

## 🎛 Customization

### Changing Colors
Edit `src/App.css` to modify the color scheme:

```css
:root {
  --primary: oklch(0.205 0 0);        /* Change primary color */
  --background: oklch(1 0 0);         /* Change background */
  --foreground: oklch(0.145 0 0);     /* Change text color */
}
```

### Adding New Pages
1. Create a new component in `src/components/`
2. Add the route in `src/App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

### Modifying Professor Data Structure
1. Update the mock data objects
2. Modify form fields in `AddEditProfessor.jsx`
3. Update display components to show new fields

### Changing Branding
1. **Logo**: Replace the `GraduationCap` icon in headers
2. **Title**: Change "University Directory" throughout the app
3. **Colors**: Modify the CSS variables in `App.css`
4. **Favicon**: Replace `public/favicon.ico`

## 🔧 Development Tips

### Code Organization
- Keep components small and focused
- Use descriptive variable names
- Add comments for complex logic
- Follow consistent naming conventions

### Performance
- Use React's `memo` for expensive components
- Implement proper loading states
- Optimize images and assets
- Use code splitting for large apps

### Debugging
- Use React Developer Tools browser extension
- Check the browser console for errors
- Use `console.log()` for debugging state changes
- Test on different screen sizes

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Use consistent indentation (2 spaces)
- Follow React best practices
- Write descriptive commit messages
- Add comments for complex logic

## 📝 License

This project is created for educational and demonstration purposes.

## 🆘 Support

### Common Issues

**1. "pnpm not found"**
- Install pnpm: `npm install -g pnpm`

**2. "Port 5173 already in use"**
- Kill the process or use a different port: `pnpm run dev --port 3000`

**3. "Module not found"**
- Delete `node_modules` and run `pnpm install` again

**4. "Build fails"**
- Check for TypeScript errors
- Ensure all imports are correct
- Run `pnpm run lint` to check for issues

### Getting Help
- Check the browser console for error messages
- Review this documentation
- Look at the component code for examples
- Test with the demo credentials (admin/admin)

---

**Happy Coding! 🎉**

This README provides a complete guide to understanding and working with the Professor Directory application. Whether you're a student learning React, a developer contributing to the project, or an administrator using the system, this guide should help you understand how everything works together.
