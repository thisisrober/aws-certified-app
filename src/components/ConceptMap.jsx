import React, { useContext } from 'react';
import { MapPin } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const ConceptMap = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-orange-500" />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AWS Domains Concept Map</h2>
      </div>
      <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Interactive mind map showing the key concepts and topics you should study for each domain.</p>
      <div className={`rounded-2xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <iframe
          src="https://app.xmind.com/embed/e4ZeBvRJ?sheet-id=34e508c5-955b-4ab0-93a2-94036e5eccd9"
          width="100%"
          height="540"
          frameBorder="0"
          scrolling="no"
          allow="fullscreen"
          className="block"
        />
      </div>
    </div>
  );
};

export default ConceptMap;
