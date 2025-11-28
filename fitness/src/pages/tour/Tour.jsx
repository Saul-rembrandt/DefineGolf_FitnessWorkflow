import { useNavigate } from 'react-router-dom';
import '../PageStyles.css';

function Tour() {
  const navigate = useNavigate();

  return (
    <div className="page-container tour-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← 返回主页
      </button>
      <div className="page-content">
        <div className="page-icon">🏃</div>
        <h1>参观</h1>
        <p className="page-description">场馆设施参观介绍</p>
        <div className="placeholder-content">
          <p>子模块内容待添加...</p>
        </div>
        <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/reception')}>
            ← 上一步: 接待
          </button>
          <button className="next-button" onClick={() => navigate('/assessment')}>
            下一步: 测评 →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tour;
