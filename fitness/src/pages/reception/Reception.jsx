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

        {/* 图片放在文字下方，包裹在圆角容器中 */}
        <div className="image-container">
          <img className="module-hero" src="/images/reception/贵宾室.png" alt="接待" />
        </div>

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
