import { useState, useEffect, useRef } from 'react'
  // Ref for file input

import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getProfessorById, addProfessor, updateProfessor, uploadImage } from '@/lib/api'
import { toast } from 'sonner'
import { GraduationCap, ArrowLeft, Save, Upload, X } from 'lucide-react'
import { departments } from '@/lib/departments'

export default function AddEditProfessor() {
  const fileInputRef = useRef(null);
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
    const isAuthenticated = localStorage.getItem('adminAuthToken')
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [navigate])

  // Load professor data for editing from API
  useEffect(() => {
    if (isEditing) {
      const fetchProfessor = async () => {
        setLoading(true)
        try {
          const professor = await getProfessorById(id)
          setFormData(professor)
        } catch (err) {
          console.error("Failed to fetch professor", err)
          // Optionally show an error message
          navigate('/admin/dashboard')
        } finally {
          setLoading(false)
        }
      }
      fetchProfessor()
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

  const handleDepartmentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      department: value
    }));

    // Clear error for this field
    if (errors.department) {
      setErrors(prev => ({
        ...prev,
        department: ''
      }));
    }
  };

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
      if (isEditing) {
        await updateProfessor(id, formData);
        toast.success(`Professor "${formData.full_name}" updated successfully.`);
      } else {
        await addProfessor(formData);
        toast.success(`Professor "${formData.full_name}" created successfully.`);
      }
      
      // Navigate back to the dashboard after a short delay to allow the user to see the toast.
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving professor:', error)
      setErrors({ form: error.message || 'Failed to save professor. Please try again.' })
      setLoading(false)
    }
  }

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     // NOTE: This is a client-side preview.
  //     // For a real application, you would upload the file to your backend
  //     // (e.g., to an /api/upload endpoint), and the backend would return a URL.
  //     // You would then set formData.profile_image_url to that returned URL.
  //     const imageUrl = URL.createObjectURL(file)
  //     setFormData(prev => ({
  //       ...prev,
  //       profile_image_url: imageUrl
  //     }))
  //   }
  // }
    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Prepare form data
    const formDataImage = new FormData();
    formDataImage.append('image', file);

    try {
      // Use the API helper to upload the image
      const imageUrl = await uploadImage(formDataImage);
      setFormData(prev => ({
        ...prev,
        profile_image_url: imageUrl
      }));
    } catch (err) {
      console.error('Image upload error:', err);
      // Optionally show a toast or error message here
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

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
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
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <img
                      src="/default-avatar.png"
                      alt="Default Avatar"
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${formData.full_name || 'P'}&size=80&background=e5e7eb&color=6b7280`
                      }}
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
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
                <Select onValueChange={handleDepartmentChange} value={formData.department}>
                  <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dep => (
                      <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

            {/* Form-wide error */}
            {errors.form && (
              <p className="text-sm text-red-600 mt-1 text-center">{errors.form}</p>
            )}

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
