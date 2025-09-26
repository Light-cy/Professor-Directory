
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, GraduationCap, BookOpen, User, School, Users } from 'lucide-react';
import { departments } from '@/lib/departments';
import Header from './Header';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Show only top 4 departments
  const topDepartments = departments.slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6 animate-fade-in">
            <BookOpen className="h-16 w-16 text-pink-400 mr-4 animate-wiggle" />
            <GraduationCap className="h-16 w-16 text-indigo-500 animate-bounce" />
            <User className="h-16 w-16 text-blue-400 ml-4 animate-wiggle" />
          </div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">Find Your Professor</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in">
            Search for professors by name, department, or course code to find their office locations, contact information, and office hours.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-6 w-6 animate-pulse" />
                <Input
                  type="text"
                  placeholder="Search by professor name, department, or course code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg rounded-xl border-2 bg-white/70 border-indigo-200 focus:border-indigo-400 transition-all duration-200"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="px-8 py-6 text-lg bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Stats Section */}
          <section className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16 my-10 px-4">
            {/* Departments Card */}
            <div className="text-center border p-5 rounded-lg shadow-md hover:shadow-lg transition w-44 sm:w-64 bg-fuchsia-50/70">
              <div className="p-2 bg-gradient-to-br from-[#4FA7F7] to-[#0A2342] rounded-lg w-14 h-14 flex items-center justify-center mx-auto">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-xl sm:text-3xl font-bold my-2">8+</h2>
              <p className="text-gray-600 text-sm sm:text-base font-semibold">Faculties</p>
            </div>



            {/* Faculty Members Card */}
            <div className="text-center border p-5 rounded-lg shadow-md hover:shadow-lg transition w-44 sm:w-64 bg-fuchsia-50/70  ">
              <div className="p-2 bg-gradient-to-br from-[#4FA7F7] to-[#0A2342] rounded-lg w-14 h-14 flex items-center justify-center mx-auto">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-xl sm:text-3xl font-bold my-2">200+</h2>
              <p className="text-gray-600 text-sm sm:text-base font-semibold">Faculty Members</p>
            </div>
          </section>

          {/* Quick Links - Top Departments */}
          <div className="mt-16 animate-fade-in">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Top Departments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {topDepartments.map(dep => (
                <div
                  key={dep}
                  className="bg-white rounded-xl shadow-lg p-6 text-left hover:shadow-2xl transition-shadow transform hover:-translate-y-1 flex flex-col items-center justify-between animate-pop-in"
                  style={{ minHeight: '260px', height: '100%' }}
                >
                  <BookOpen className="h-10 w-10 text-pink-400 mb-2 animate-wiggle" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center">{dep}</h4>
                  <p className="text-gray-600 mb-4 text-sm text-center flex-1">Find professors and resources.😊</p>
                  <div className="w-full mt-auto">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(dep)}`)}
                      className="w-full rounded-lg hover:cursor-pointer"
                    >
                      View Faculty
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button
                variant="secondary"
                className="px-6 py-3 text-md rounded-xl bg-pink-100 text-indigo-700 font-semibold shadow hover:bg-pink-200 hover:cursor-pointer transition-all duration-200 animate-fade-in"
                onClick={() => navigate('/departments')}
              >
                View All Departments
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 mt-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-semibold">&copy; 2024 StudyConnect. All rights reserved.</p>
            <div className="flex justify-center mt-2 space-x-2">
              <BookOpen className="h-5 w-5 text-pink-200 animate-wiggle" />
              <GraduationCap className="h-5 w-5 text-indigo-200 animate-bounce" />
              <User className="h-5 w-5 text-blue-200 animate-wiggle" />
            </div>
          </div>
        </div>
      </footer>
      {/* Animations */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        .animate-wiggle { animation: wiggle 2s infinite; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce { animation: bounce 1.5s infinite; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease; }
        @keyframes pop-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in { animation: pop-in 0.7s cubic-bezier(.17,.67,.83,.67); }
      `}</style>
    </div>
  );
}
