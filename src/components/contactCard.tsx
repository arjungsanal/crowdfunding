"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Mail, Phone, User, MessageSquare, ArrowRight, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderMap = () => {
    if (!isMounted) return null;
    
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.3291480471335!2d76.88189780942955!3d8.564314696056542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bee2c53009c5%3A0x6510861b288460a1!2sUniversity%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1739544010004!5m2!1sen!2sin" 
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      />
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Contact Form */}
        <Card className="w-full lg:w-1/2 border-none shadow-xl bg-white/80 backdrop-blur-sm p-10">
          <CardHeader className="space-y-6 text-center pb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Contact Us
              </h2>
              <p className="text-gray-500">
                Drop us a query and we will get back to you at the earliest!
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </Label>
                  <div className="mt-1 relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 h-12 border-gray-200 hover:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="mt-1 relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 12345 67890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 h-12 border-gray-200 hover:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="mt-1 relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 h-12 border-gray-200 hover:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <div className="mt-1 relative rounded-lg">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Type your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      className="pl-10 min-h-[120px] border-gray-200 hover:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Submit Message
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Map and Contact Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Map */}
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="w-full h-[400px]">
              {renderMap()}
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Our Office</h3>
                    <p className="text-gray-600">University College of Engineering <br />Kariavattom, Trivandrum</p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <a href="mailto:arjungsanal@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    arjungsanal@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <a href="tel:+918848374332" className="text-gray-600 hover:text-blue-600 transition-colors">
                    +91 88483 74332
                  </a>
                </div>

                {/* Social Media */}
                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-blue-600" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-blue-600" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      {isMounted && (
        <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Thank You!</h3>
              </DialogTitle>
              <p className="text-center text-gray-500">
                Thank you for reaching out to us. We will get back to you soon.
              </p>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContactForm;