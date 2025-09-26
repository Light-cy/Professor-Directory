import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchProfessors } from '@/lib/api'
import { Search, GraduationCap, MapPin, Mail, ArrowLeft } from 'lucide-react'
import Header from './Header';

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [professors, setProfessors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const query = searchParams.get('q') || ''

  useEffect(() => {
    setSearchQuery(query)

    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const results = await searchProfessors(query)
        setProfessors(results)
      } catch (err) {
        setError(err.message)
        setProfessors([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
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
      <Header />

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
            {!loading && !error && (
              <p className="text-gray-600">
                {professors.length} professor{professors.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
        )}

        {loading && <div className="text-center py-12">Loading...</div>}

        {error && (
          <div className="text-center py-12 text-red-500">
            <p>Error fetching results: {error}</p>
          </div>
        )}

        {!loading && !error && professors.length === 0 && query ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any professors matching "{query}". Try searching with different keywords.
              </p>
              <Button onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </div>
          </div>
        ) : !loading && !error && (
          <div className="grid gap-6">
            {professors.map((professor) => (
              <div key={professor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={professor.profile_image_url || '/default-avatar.png'}
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
