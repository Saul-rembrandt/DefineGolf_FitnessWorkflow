import { useNavigate, useParams } from 'react-router-dom';
import receptionData from './reception.json';
import './DetailPage.css';

// 节点ID与JSON数据的映射关系
const nodeIdToDataIndex = {
  'l1': 0,  // 预约参观
  'l2': 1,  // 新人欢迎仪式
  'l3': 2,  // 代泊车
  'l4': 3,  // 登记
  'l5': 4,  // 洽谈
  'l6': 5,  // 参观场馆
};

// 路由slug与节点ID的映射
const slugToNodeId = {
  'appointment': 'l1',
  'welcome': 'l2',
  'valet': 'l3',
  'registration': 'l4',
  'consultation': 'l5',
  'tour': 'l6',
};

function DetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  
  const nodeId = slugToNodeId[slug];
  const dataIndex = nodeIdToDataIndex[nodeId];
  const data = receptionData[dataIndex];

  // 根据 slug 映射到 public 中的示意图片（放在 public/images/reception）
  const slugToImage = {
    appointment: '/images/reception/预约参观.jpeg',
    welcome: '/images/reception/贵宾室.png',
    valet: '/images/reception/贵宾室.png',
    registration: '/images/reception/贵宾室.png',
    consultation: '/images/reception/洽谈.jpg',
    tour: '/images/reception/参观场馆.jpeg',
  };

  const heroImage = slugToImage[slug];

  if (!data) {
    return (
      <div className="detail-page">
        <button className="back-button" onClick={() => navigate('/reception/flow')}>
          ← 返回接待流程
        </button>
        <div className="content-wrapper">
          <h1 className="page-title">页面未找到</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <button className="back-button" onClick={() => navigate('/reception/flow')}>
        ← 返回接待流程
      </button>
      
      <div className="content-wrapper">
        <h1 className="page-title">{data.title}</h1>
        
        <div className="info-card">
          <div className="info-header">
            <div className="info-item">
              <strong>工作人员 Staff:</strong> {data.cn.staff} / {data.en.staff}
            </div>
            <div className="info-item">
              <strong>位置 Location:</strong> {data.cn.location} / {data.en.location}
            </div>
          </div>

          <div className="content-body">
            <div className="section cn-section">
              <h3 className="lang-title">中文 Chinese</h3>
              {data.cn.description && (
                <div className="description">
                  {data.cn.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              {data.cn.highlight && (
                <div className="highlight-box">
                  <strong>亮点：</strong>{data.cn.highlight}
                </div>
              )}
            </div>

            <div className="vertical-divider"></div>

            <div className="section en-section">
              <h3 className="lang-title">英文 English</h3>
              {data.en.description && (
                <div className="description">
                  {data.en.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              {data.en.highlight && (
                <div className="highlight-box">
                  <strong>Highlight:</strong> {data.en.highlight}
                </div>
              )}
            </div>
          </div>
        </div>

        {heroImage && (
          <div className="image-container">
            <img src={heroImage} alt={data.title} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
