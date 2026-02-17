import React from 'react';
import { Github, ExternalLink, Heart } from 'lucide-react';

const Footer = ({ onTabChange }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Other Certifications */}
          <div>
            <h3 className="font-bold text-lg mb-3">Other Certifications</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors cursor-pointer">
                  AWS Cloud Practitioner
                  </a>
                </li>
              <li><i>(more coming soon!)</i></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => onTabChange('tests')} className="hover:text-orange-400 transition-colors cursor-pointer">Practice Tests</button></li>
              <li><button onClick={() => onTabChange('concepts')} className="hover:text-orange-400 transition-colors cursor-pointer">Concept Map</button></li>
              <li><button onClick={() => onTabChange('about')} className="hover:text-orange-400 transition-colors cursor-pointer">About</button></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-3">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/thisisrober"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-bold"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://thisisrober.es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-bold"
              >
                <ExternalLink className="w-4 h-4" />
                Website
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          {/* Copyright */}
          <p className="text-slate-400 text-center text-sm flex items-center justify-center gap-1">
            © {currentYear} Made with <Heart className="w-4 h-4 text-red-500" /> by
            <a href="https://thisisrober.es" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 font-bold transition-colors">
              thisisrober
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
