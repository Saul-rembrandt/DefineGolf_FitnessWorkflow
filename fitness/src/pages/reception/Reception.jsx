import { useNavigate } from 'react-router-dom';
import '../PageStyles.css';

function Reception() {
  const navigate = useNavigate();

  return (
    <div className="page-container reception-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← 返回主页
      </button>
      <div className="page-content">
        <div className="page-icon">🤝</div>
        <h1>接待</h1>
        <p className="page-description">客户到店接待流程</p>
        <div className="placeholder-content">
          <p>子模块内容待添加...</p>
        </div>
        <button className="next-button" onClick={() => navigate('/tour')}>
          下一步: 参观 →
        </button>
      </div>
    </div>
  );
}

export default Reception;
