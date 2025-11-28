import { Routes, Route } from 'react-router-dom';
import FlowChart from './components/FlowChart';
import { ReceptionFlow, DetailPage, Reception } from './pages/reception/index';
import { Tour } from './pages/tour/index';
import { Assessment } from './pages/assessment/index';
import { Training } from './pages/training/index';
import { Reward } from './pages/reward/index';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FlowChart />} />
      <Route path="/reception/flow" element={<ReceptionFlow />} />
      <Route path="/reception/detail/:slug" element={<DetailPage />} />
      <Route path="/reception" element={<Reception />} />
      <Route path="/tour" element={<Tour />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/training" element={<Training />} />
      <Route path="/reward" element={<Reward />} />
    </Routes>
  );
}

export default App;
