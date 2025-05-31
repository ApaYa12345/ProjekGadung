import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from '../ui/Logo';

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Logo variant="full" size="lg" className="mb-4" />
            <p className="text-neutral-300 mt-4">
              Helping BINUS students find accommodations, food, and healthcare near campus.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-secondary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/accommodations" className="text-neutral-300 hover:text-white transition-colors">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-neutral-300 hover:text-white transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/clinics" className="text-neutral-300 hover:text-white transition-colors">
                  Clinics & Healthcare
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-neutral-300 hover:text-white transition-colors">
                  Current Promotions
                </Link>
              </li>
              <li>
                <Link to="/maps" className="text-neutral-300 hover:text-white transition-colors">
                  Campus Maps
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-neutral-300 hover:text-white transition-colors">
                  Our Partners
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-neutral-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">
                  BINUS University, Jl. K.H. Syahdan No. 9, Palmerah, Jakarta Barat 11480
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">+62 21 5345830</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">support@binuslife.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-12 pt-6 text-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} BINUSLIFE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;