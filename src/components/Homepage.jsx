import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, GraduationCap } from 'lucide-react'

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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">University Directory</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Departments</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
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
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Computer Science</h3>
              <p className="text-gray-600 mb-4">Find professors in the CS department</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/search?q=Computer Science')}
                className="w-full"
              >
                Browse CS Faculty
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mathematics</h3>
              <p className="text-gray-600 mb-4">Find professors in the Math department</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/search?q=Mathematics')}
                className="w-full"
              >
                Browse Math Faculty
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Physics</h3>
              <p className="text-gray-600 mb-4">Find professors in the Physics department</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/search?q=Physics')}
                className="w-full"
              >
                Browse Physics Faculty
              </Button>
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

