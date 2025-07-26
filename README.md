# Professor Information & Scheduling Website - Frontend

A modern, responsive React frontend for a university professor directory and scheduling system. This application provides both a public interface for students to search for professors and a secure admin panel for managing professor information.

## Features

### Public Interface
- **Homepage**: Clean, university-branded landing page with prominent search functionality
- **Search Results**: Displays professor cards with essential information (photo, name, department, office, email)
- **Professor Profile**: Detailed view showing complete professor information and weekly schedule
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Panel
- **Secure Login**: Password-protected access with demo credentials
- **Dashboard**: Overview of all professors with search and management capabilities
- **Add/Edit Professors**: Comprehensive form for creating and updating professor profiles
- **Delete Confirmation**: Safe deletion with confirmation dialogs
- **Statistics**: Real-time counts of professors and departments

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide Icons** - Beautiful, consistent icons
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Homepage.jsx        # Public homepage
│   ├── SearchResults.jsx   # Search results page
│   ├── ProfessorProfile.jsx # Professor detail page
│   ├── AdminLogin.jsx      # Admin login page
│   ├── AdminDashboard.jsx  # Admin dashboard
│   └── AddEditProfessor.jsx # Add/edit professor form
├── App.jsx                 # Main app with routing
├── App.css                 # Global styles
└── main.jsx               # App entry point
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation
1. Navigate to the project directory:
   ```bash
   cd professor-website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production
```bash
pnpm run build
```

The built files will be in the `dist/` directory.

## Usage

### Public Interface
1. Visit the homepage
2. Use the search bar to find professors by name, department, or course code
3. Click on professor cards to view detailed profiles
4. Browse departments using the quick links

### Admin Panel
1. Navigate to `/admin/login`
2. Use the demo credentials:
   - Username: `admin`
   - Password: `admin`
3. Manage professors through the dashboard
4. Add new professors or edit existing ones

## Mock Data

The application currently uses mock data for demonstration purposes. In a production environment, this would be replaced with API calls to a backend service.

### Sample Professors
- Dr. Eleanor Vance (Computer Science)
- Prof. Marcus Chen (Computer Science)
- Dr. Sarah Johnson (Mathematics)
- Prof. David Wilson (Physics)

## Features Implemented

### Public Interface ✅
- [x] Responsive homepage with search
- [x] Search results with professor cards
- [x] Detailed professor profiles
- [x] Weekly schedule display
- [x] Contact information with mailto links
- [x] Department browsing
- [x] Mobile-optimized design

### Admin Panel ✅
- [x] Secure login with authentication
- [x] Professor management dashboard
- [x] Add new professor form
- [x] Edit existing professor form
- [x] Delete with confirmation
- [x] Search and filter professors
- [x] Statistics dashboard
- [x] Image upload interface
- [x] Schedule management

### Technical Features ✅
- [x] React Router for navigation
- [x] Responsive design (mobile-first)
- [x] Form validation
- [x] Loading states
- [x] Error handling
- [x] Local storage for auth state
- [x] Professional UI/UX design

## Backend Integration

This frontend is designed to work with a Flask backend. The following API endpoints are expected:

### Public Endpoints
- `GET /api/professors` - Get all professors
- `GET /api/professors/search?q=query` - Search professors
- `GET /api/professors/:id` - Get professor by ID

### Admin Endpoints
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/professors` - Get all professors (admin)
- `POST /api/admin/professors` - Create new professor
- `PUT /api/admin/professors/:id` - Update professor
- `DELETE /api/admin/professors/:id` - Delete professor

## Customization

### Styling
- Modify `src/App.css` for global styles
- Update Tailwind classes in components for styling changes
- Customize the color scheme in the CSS variables

### Branding
- Update university name and logo in components
- Modify the color palette in `App.css`
- Change the favicon in `public/`

### Data Structure
The application expects professor objects with this structure:
```javascript
{
  id: number,
  full_name: string,
  department: string,
  office_location: string,
  email: string,
  profile_image_url: string,
  schedule_monday: string,
  schedule_tuesday: string,
  schedule_wednesday: string,
  schedule_thursday: string,
  schedule_friday: string,
  notes: string
}
```

## License

This project is created for educational and demonstration purposes.

## Support

For questions or issues, please refer to the project documentation or contact the development team.

