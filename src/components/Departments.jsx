import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen } from 'lucide-react';
import { departments } from '@/lib/departments';
import Header from './Header';

export default function Departments() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Departments</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore the diverse academic departments at our university.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map(dep => (
            <div 
              key={dep} 
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/search?q=${encodeURIComponent(dep)}`)}
            >
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{dep}</h3>
              <p className="text-gray-500 text-sm">
                View faculty and resources for the {dep} department.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

