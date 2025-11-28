import { useNavigate } from 'react-router-dom';
import '../PageStyles.css';

function Assessment() {
  const navigate = useNavigate();

  return (
    <div className="page-container assessment-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← 返回主页
      </button>
      <div className="page-content">
        <div className="page-icon">📋</div>
        <h1>测评</h1>
        <p className="page-description">体能测试与评估</p>
        <div className="cycle-indicator">
          <span>🔄 循环训练入口</span>
        </div>
        <div className="placeholder-content">
          <p>子模块内容待添加...</p>
        </div>
        <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/tour')}>
            ← 上一步: 参观
          </button>
          <button className="next-button" onClick={() => navigate('/training')}>
            下一步: 体能训练课程 →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
