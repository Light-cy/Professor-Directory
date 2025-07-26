import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { GraduationCap, Plus, Edit, Trash2, LogOut, Users, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

// Mock data - same as in other components
const mockProfessors = [
  {
    id: 1,
    full_name: "Dr. Eleanor Vance",
    department: "Computer Science",
    office_location: "Turing Hall, Room 314",
    email: "e.vance@university.edu",
    profile_image_url: "/api/placeholder/150/150",
    schedule_monday: "10:00 AM - 12:00 PM (Office Hours)",
    schedule_tuesday: "2:00 PM - 4:00 PM (By appointment)",
    schedule_wednesday: "10:00 AM - 12:00 PM (Office Hours)",
    schedule_thursday: "Not Available",
    schedule_friday: "1:00 PM - 3:00 PM (Office Hours)",
    notes: ""
  },
  {
    id: 2,
    full_name: "Prof. Marcus Chen",
    department: "Computer Science",
    office_location: "Turing Hall, Room 201",
    email: "m.chen@university.edu",
    profile_image_url: "/api/placeholder/150/150",
    schedule_monday: "9:00 AM - 11:00 AM (Office Hours)",
    schedule_tuesday: "Not Available",
    schedule_wednesday: "9:00 AM - 11:00 AM (Office Hours)",
    schedule_thursday: "2:00 PM - 4:00 PM (By appointment)",
    schedule_friday: "9:00 AM - 11:00 AM (Office Hours)",
    notes: ""
  },
  {
    id: 3,
    full_name: "Dr. Sarah Johnson",
    department: "Mathematics",
    office_location: "Newton Building, Room 105",
    email: "s.johnson@university.edu",
    profile_image_url: "/api/placeholder/150/150",
    schedule_monday: "11:00 AM - 1:00 PM (Office Hours)",
    schedule_tuesday: "11:00 AM - 1:00 PM (Office Hours)",
    schedule_wednesday: "Not Available",
    schedule_thursday: "11:00 AM - 1:00 PM (Office Hours)",
    schedule_friday: "10:00 AM - 12:00 PM (Office Hours)",
    notes: ""
  },
  {
    id: 4,
    full_name: "Prof. David Wilson",
    department: "Physics",
    office_location: "Einstein Hall, Room 402",
    email: "d.wilson@university.edu",
    profile_image_url: "/api/placeholder/150/150",
    schedule_monday: "2:00 PM - 4:00 PM (Office Hours)",
    schedule_tuesday: "2:00 PM - 4:00 PM (Office Hours)",
    schedule_wednesday: "Not Available",
    schedule_thursday: "2:00 PM - 4:00 PM (Office Hours)",
    schedule_friday: "Not Available",
    notes: "On sabbatical this semester"
  }
]

export default function AdminDashboard() {
  const [professors, setProfessors] = useState(mockProfessors)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProfessors, setFilteredProfessors] = useState(mockProfessors)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const navigate = useNavigate()

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth')
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [navigate])

  // Filter professors based on search
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = professors.filter(professor =>
        professor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professor.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProfessors(filtered)
    } else {
      setFilteredProfessors(professors)
    }
  }, [searchTerm, professors])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    navigate('/admin/login')
  }

  const handleDelete = (id) => {
    // In real app, this would make API call to delete
    setProfessors(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  const confirmDelete = (professor) => {
    setDeleteConfirm(professor)
  }

  const cancelDelete = () => {
    setDeleteConfirm(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">University Directory Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                View Public Site
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Professors</p>
                <p className="text-2xl font-bold text-gray-900">{professors.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(professors.map(p => p.department)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Search Results</p>
                <p className="text-2xl font-bold text-gray-900">{filteredProfessors.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search professors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button 
              onClick={() => navigate('/admin/professor/add')}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Professor</span>
            </Button>
          </div>
        </div>

        {/* Professors Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Professors ({filteredProfessors.length})
            </h2>
          </div>
          
          {filteredProfessors.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No professors found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first professor.'}
              </p>
              <Button onClick={() => navigate('/admin/professor/add')}>
                Add New Professor
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Professor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Office
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProfessors.map((professor) => (
                    <tr key={professor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={professor.profile_image_url}
                            alt={professor.full_name}
                            className="w-10 h-10 rounded-full object-cover bg-gray-200"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professor.full_name)}&size=40&background=3b82f6&color=ffffff`
                            }}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {professor.full_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {professor.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {professor.office_location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {professor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/professor/edit/${professor.id}`)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => confirmDelete(professor)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{deleteConfirm.full_name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleDelete(deleteConfirm.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

