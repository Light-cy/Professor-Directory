import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, GraduationCap, User } from 'lucide-react'
import { departments } from '@/lib/departments'

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">University Directory</span>
            </Link>
            <div className="flex items-center space-x-2">
              <nav className="hidden md:flex space-x-1">
                <Button variant="ghost" asChild><Link to="/about">About</Link></Button>
                <Button variant="ghost" asChild><Link to="/departments">Departments</Link></Button>
                <Button variant="ghost" asChild><Link to="/contact">Contact</Link></Button>
              </nav>
              <div className="hidden md:block h-6 w-px bg-gray-200 mx-3" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Professor
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Search for professors by name, department, or course code to find their office locations, 
            contact information, and office hours.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by professor name, department, or course code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-lg"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Browse by Department</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map(dep => (
                <div key={dep} className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{dep}</h4>
                  <p className="text-gray-600 mb-4 text-sm">Find professors and resources in the {dep} department.</p>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(dep)}`)}
                    className="w-full"
                  >
                    View Faculty
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 University Directory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
