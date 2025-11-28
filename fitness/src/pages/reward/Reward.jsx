import { useNavigate } from 'react-router-dom';
import '../PageStyles.css';

function Reward() {
  const navigate = useNavigate();

  return (
    <div className="page-container reward-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← 返回主页
      </button>
      <div className="page-content">
        <div className="page-icon">🏆</div>
        <h1>获得成就性奖励</h1>
        <p className="page-description">完成阶段目标获得奖励</p>
        <div className="placeholder-content">
          <p>子模块内容待添加...</p>
        </div>
        <div className="nav-buttons">
          <button className="prev-button" onClick={() => navigate('/training')}>
            ← 上一步: 体能训练课程
          </button>
          <button className="cycle-button" onClick={() => navigate('/assessment')}>
            🔄 继续训练循环 → 返回测评
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reward;
