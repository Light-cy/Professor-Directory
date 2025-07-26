import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GraduationCap, ArrowLeft, Save, Upload, X } from 'lucide-react'

// Mock data for editing
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
  }
]

export default function AddEditProfessor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  
  const [formData, setFormData] = useState({
    full_name: '',
    department: '',
    office_location: '',
    email: '',
    profile_image_url: '',
    schedule_monday: '',
    schedule_tuesday: '',
    schedule_wednesday: '',
    schedule_thursday: '',
    schedule_friday: '',
    notes: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth')
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [navigate])

  // Load professor data for editing
  useEffect(() => {
    if (isEditing) {
      const professorId = parseInt(id)
      const professor = mockProfessors.find(p => p.id === professorId)
      if (professor) {
        setFormData(professor)
      } else {
        navigate('/admin/dashboard')
      }
    }
  }, [id, isEditing, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In real app, this would make API call to save/update professor
      console.log(isEditing ? 'Updating professor:' : 'Creating professor:', formData)
      
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error saving professor:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In real app, this would upload to server and get URL
      const imageUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        profile_image_url: imageUrl
      }))
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      profile_image_url: ''
    }))
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
                <h1 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Professor' : 'Add New Professor'}
                </h1>
                <p className="text-sm text-gray-500">University Directory Management</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Professor Information
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isEditing ? 'Update the professor details below.' : 'Fill in the details for the new professor.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                {formData.profile_image_url ? (
                  <div className="relative">
                    <img
                      src={formData.profile_image_url}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button type="button" variant="outline" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="e.g., Dr. Eleanor Vance"
                  className={errors.full_name ? 'border-red-500' : ''}
                />
                {errors.full_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.full_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <Input
                  id="department"
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  className={errors.department ? 'border-red-500' : ''}
                />
                {errors.department && (
                  <p className="text-sm text-red-600 mt-1">{errors.department}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g., e.vance@university.edu"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="office_location" className="block text-sm font-medium text-gray-700 mb-2">
                  Office Location
                </label>
                <Input
                  id="office_location"
                  name="office_location"
                  type="text"
                  value={formData.office_location}
                  onChange={handleInputChange}
                  placeholder="e.g., Turing Hall, Room 314"
                />
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                  <div key={day}>
                    <label htmlFor={`schedule_${day}`} className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {day}
                    </label>
                    <Input
                      id={`schedule_${day}`}
                      name={`schedule_${day}`}
                      type="text"
                      value={formData[`schedule_${day}`]}
                      onChange={handleInputChange}
                      placeholder="e.g., 10:00 AM - 12:00 PM (Office Hours)"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Leave blank or enter "Not Available" for days with no scheduled hours.
              </p>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="e.g., On sabbatical this semester"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/dashboard')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update Professor' : 'Create Professor'}
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

