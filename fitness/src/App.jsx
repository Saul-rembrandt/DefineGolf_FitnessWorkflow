import { Routes, Route } from 'react-router-dom';
import FlowChart from './components/FlowChart';
import { ReceptionFlow, DetailPage } from './pages/reception/index';
import Reception from './pages/Reception';
import Tour from './pages/Tour';
import Assessment from './pages/Assessment';
import Training from './pages/Training';
import Reward from './pages/Reward';
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
