import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, GraduationCap, MapPin, Mail, ArrowLeft } from 'lucide-react'

// Mock data for demonstration - in real app this would come from backend
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

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProfessors, setFilteredProfessors] = useState([])
  const navigate = useNavigate()

  const query = searchParams.get('q') || ''

  useEffect(() => {
    setSearchQuery(query)
    
    // Filter professors based on search query
    if (query.trim()) {
      const filtered = mockProfessors.filter(professor => 
        professor.full_name.toLowerCase().includes(query.toLowerCase()) ||
        professor.department.toLowerCase().includes(query.toLowerCase()) ||
        professor.email.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredProfessors(filtered)
    } else {
      setFilteredProfessors([])
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

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
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by professor name, department, or course code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>
              <Button type="submit" className="px-6 bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {query && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Search Results for "{query}"
            </h2>
            <p className="text-gray-600">
              {filteredProfessors.length} professor{filteredProfessors.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {filteredProfessors.length === 0 && query ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any professors matching "{query}". Try searching with different keywords.
              </p>
              <Button onClick={() => navigate('/')} variant="outline">
                Back to Home
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredProfessors.map((professor) => (
              <div key={professor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={professor.profile_image_url}
                        alt={professor.full_name}
                        className="w-24 h-24 rounded-full object-cover bg-gray-200"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professor.full_name)}&size=96&background=3b82f6&color=ffffff`
                        }}
                      />
                    </div>

                    {/* Professor Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {professor.full_name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-3">{professor.department}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{professor.office_location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                          <a 
                            href={`mailto:${professor.email}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {professor.email}
                          </a>
                        </div>
                      </div>

                      {professor.notes && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <p className="text-sm text-yellow-800">{professor.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Button 
                        onClick={() => navigate(`/professor/${professor.id}`)}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

