import { useNavigate } from 'react-router-dom';
import './PageStyles.css';

function Training() {
  const navigate = useNavigate();

  return (
    <div className="page-container training-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← 返回主页
      </button>
      <div className="page-content">
        <div className="page-icon">💪</div>
        <h1>体能训练课程</h1>
        <p className="page-description">个性化训练方案</p>
        <div className="placeholder-content">
          <p>子模块内容待添加...</p>
        </div>
        <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/assessment')}>
            ← 上一步: 测评
          </button>
          <button className="next-button" onClick={() => navigate('/reward')}>
            下一步: 获得成就性奖励 →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Training;
