import { Routes, Route } from 'react-router-dom';
import PathSelection from './PathSelection';
import WebDevRoadmap from './WebDevRoadmap';
import CyberSecurityRoadmap from './CyberSecurityRoadmap';

export default function LearningPath() {
  return (
    <Routes>
      <Route index element={<PathSelection />} />
      <Route path="webdev" element={<WebDevRoadmap />} />
      <Route path="cybersecurity" element={<CyberSecurityRoadmap />} />
    </Routes>
  );
}
