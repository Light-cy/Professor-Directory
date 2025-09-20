import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, Mail } from 'lucide-react';

export default function Contact() {
  // To receive emails, you need to create a form on a service like formspree.io
  // 1. Go to formspree.io and create a new form.
  // 2. It will give you a URL endpoint.
  // 3. Replace the placeholder URL below with your own Formspree URL.
  const formspreeEndpoint = "https://formspree.io/f/your_form_id_here";

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
              <Button variant="ghost" asChild><Link to="/about">About</Link></Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Mail className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form action={formspreeEndpoint} method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Your message here..."
              />
            </div>

            <div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}