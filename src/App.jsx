import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import SearchResults from './components/SearchResults'
import ProfessorProfile from './components/ProfessorProfile'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import AddEditProfessor from './components/AddEditProfessor'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/professor/:id" element={<ProfessorProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/professor/add" element={<AddEditProfessor />} />
          <Route path="/admin/professor/edit/:id" element={<AddEditProfessor />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

