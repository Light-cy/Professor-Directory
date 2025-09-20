import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProfessorById } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Calendar, ArrowLeft, Briefcase, AlertCircle } from 'lucide-react'

export default function ProfessorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [professor, setProfessor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfessor = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getProfessorById(id)
        setProfessor(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfessor()
  }, [id])

  const getScheduleData = () => {
    if (!professor) return []
    return [
      { day: 'Monday', schedule: professor.schedule_monday },
      { day: 'Tuesday', schedule: professor.schedule_tuesday },
      { day: 'Wednesday', schedule: professor.schedule_wednesday },
      { day: 'Thursday', schedule: professor.schedule_thursday },
      { day: 'Friday', schedule: professor.schedule_friday },
    ].filter(item => item.schedule && item.schedule.toLowerCase() !== 'not available')
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Professor Not Found</h2>
        <p className="text-red-600 mb-6">{error}</p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Home
        </Button>
      </div>
    )
  }

  if (!professor) {
    return null // Should be covered by error state
  }

  const schedule = getScheduleData()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
        </Button>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={professor.profile_image_url || '/default-avatar.png'}
                alt={professor.full_name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professor.full_name)}&size=128&background=ffffff&color=3b82f6`
                }}
              />
              <div className="text-center sm:text-left">
                <h1 className="text-4xl font-bold">{professor.full_name}</h1>
                <p className="text-xl text-blue-200 mt-1">{professor.department}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                    <a href={`mailto:${professor.email}`} className="text-blue-600 hover:underline break-all">{professor.email}</a>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                    <span>{professor.office_location || 'Not specified'}</span>
                  </div>
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                    <Link to={`/search?q=${encodeURIComponent(professor.department)}`} className="text-blue-600 hover:underline">
                      More from {professor.department}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Weekly Schedule */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Weekly Schedule</h2>
                {schedule.length > 0 ? (
                  <div className="space-y-3">
                    {schedule.map(item => (
                      <div key={item.day} className="flex">
                        <span className="font-semibold w-24">{item.day}:</span>
                        <span className="text-gray-700">{item.schedule}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No office hours scheduled for this week.</p>
                )}
              </div>
            </div>

            {/* Notes */}
            {professor.notes && (
              <div className="mt-8 pt-6 border-t">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notes</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4" role="alert">
                  <p>{professor.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}