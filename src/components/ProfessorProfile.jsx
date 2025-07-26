import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { GraduationCap, MapPin, Mail, ArrowLeft, Clock, Calendar } from 'lucide-react'

// Mock data - same as in SearchResults
const mockProfessors = [
  {
    id: 1,
    full_name: "Dr. Eleanor Vance",
    department: "Computer Science",
    office_location: "Turing Hall, Room 314",
    email: "e.vance@university.edu",
    profile_image_url: "/api/placeholder/200/200",
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
    profile_image_url: "/api/placeholder/200/200",
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
    profile_image_url: "/api/placeholder/200/200",
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
    profile_image_url: "/api/placeholder/200/200",
    schedule_monday: "2:00 PM - 4:00 PM (Office Hours)",
    schedule_tuesday: "2:00 PM - 4:00 PM (Office Hours)",
    schedule_wednesday: "Not Available",
    schedule_thursday: "2:00 PM - 4:00 PM (Office Hours)",
    schedule_friday: "Not Available",
    notes: "On sabbatical this semester"
  }
]

export default function ProfessorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [professor, setProfessor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const professorId = parseInt(id)
    const foundProfessor = mockProfessors.find(p => p.id === professorId)
    
    setTimeout(() => {
      setProfessor(foundProfessor)
      setLoading(false)
    }, 300)
  }, [id])

  const getScheduleData = () => {
    if (!professor) return []
    
    return [
      { day: 'Monday', schedule: professor.schedule_monday },
      { day: 'Tuesday', schedule: professor.schedule_tuesday },
      { day: 'Wednesday', schedule: professor.schedule_wednesday },
      { day: 'Thursday', schedule: professor.schedule_thursday },
      { day: 'Friday', schedule: professor.schedule_friday },
    ].filter(item => item.schedule && item.schedule !== 'Not Available')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading professor information...</p>
        </div>
      </div>
    )
  }

  if (!professor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  University Directory
                </Link>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
            </div>
          </div>
        </header>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Professor Not Found</h2>
          <p className="text-gray-600 mb-6">The professor you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    )
  }

  const scheduleData = getScheduleData()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                University Directory
              </Link>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Professor Profile */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={professor.profile_image_url}
                alt={professor.full_name}
                className="w-32 h-32 rounded-full object-cover bg-white/20 border-4 border-white/30"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professor.full_name)}&size=128&background=ffffff&color=3b82f6`
                }}
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{professor.full_name}</h1>
                <p className="text-xl text-blue-100 mb-4">{professor.department}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start text-blue-100">
                    <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{professor.office_location}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-blue-100">
                    <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                    <a 
                      href={`mailto:${professor.email}`}
                      className="hover:text-white transition-colors underline"
                    >
                      {professor.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {professor.notes && (
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Important Notice
                </h3>
                <p className="text-yellow-700">{professor.notes}</p>
              </div>
            )}

            {/* Schedule Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-blue-600" />
                Weekly Schedule & Office Hours
              </h2>

              {scheduleData.length > 0 ? (
                <div className="grid gap-4">
                  {scheduleData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="font-semibold text-gray-900 min-w-[100px]">
                        {item.day}
                      </div>
                      <div className="text-gray-700 flex-1 text-right">
                        {item.schedule}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No office hours currently scheduled</p>
                </div>
              )}
            </div>

            {/* Contact Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.href = `mailto:${professor.email}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/search?q=${encodeURIComponent(professor.department)}`)}
                  className="flex-1"
                >
                  View Department Faculty
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

