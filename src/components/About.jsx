import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Info, Users, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">University Directory</h1>
            </Link>
            <nav className="flex space-x-2 sm:space-x-4">
              <Button variant="ghost" asChild><Link to="/">Home</Link></Button>
              <Button variant="ghost" asChild><Link to="/departments">Departments</Link></Button>
              <Button variant="ghost" asChild><Link to="/contact">Contact</Link></Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Info className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900">About Our Directory</h2>
          <p className="mt-4 text-lg text-gray-600">
            Connecting students and faculty with ease and efficiency.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-3">
              <Target className="h-6 w-6 mr-3 text-blue-600" />
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to provide a centralized, easy-to-use platform for students, staff, and visitors to find comprehensive information about our university's esteemed faculty. We aim to bridge the communication gap by making office hours, contact details, and department information readily accessible to everyone.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-3">
              <Users className="h-6 w-6 mr-3 text-blue-600" />
              Who We Serve
            </h3>
            <p className="text-gray-700 leading-relaxed">
              This directory is designed for students seeking academic guidance, prospective students exploring our faculty, and staff members needing to connect with colleagues. By providing up-to-date schedules and contact information, we empower our community to build stronger academic relationships.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-3">
              <GraduationCap className="h-6 w-6 mr-3 text-blue-600" />
              A Commitment to Excellence
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Built with modern technology, this platform is fast, reliable, and accessible on any device. We are continuously working to improve the directory and welcome feedback from our users. Thank you for being a part of our academic community.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

