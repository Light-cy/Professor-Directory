import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast.success("Message sent! Redirecting to the homepage.");
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to send message.");
      setIsSubmitting(false);
    }
  };

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
          <form
            action="https://formsubmit.co/leon.jinooo@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* FormSubmit.co settings to improve deliverability */}
            <input type="hidden" name="_subject" value="New Submission from Professor Directory" />

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
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
