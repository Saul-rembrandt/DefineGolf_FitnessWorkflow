import { useNavigate } from 'react-router-dom';
import './AppointmentArrival.css';

function AppointmentArrival() {
  const navigate = useNavigate();

  return (
    <div className="page-container appointment-page">
      <button className="back-button" onClick={() => navigate('/reception/flow')}>
        ← 返回接待流程
      </button>
      
      <div className="content-wrapper">
        <h1 className="page-title">预约到达 (24-72小时或更早)</h1>
        
        <div className="info-card">
          <div className="info-header">
            <div className="info-item">
              <strong>工作人员 Staff:</strong> 销售顾问 Sales Consultant
            </div>
            <div className="info-item">
              <strong>位置 Location:</strong> 贵宾关系维护中心 VIP Relationship Management Center
            </div>
          </div>

          <div className="content-body">
            <div className="section cn-section">
              <h3 className="lang-title">中文 Chinese</h3>
              <p>
                在贵宾行程开始前，我们会优先通过其最常使用的电话或电邮，以体贴而礼貌的方式再次确认抵达时间、当天需求及随行人员安排，让贵宾清晰感受到所有行程已由我们全面接管。例如："XX先生/女士，您好。为确保您明日的体验一如既往顺畅，我们想再次确认您的抵达时间与随行人员安排。您抵达后，其余事项都将由我们全程代您处理。"
              </p>
              <p>
                与此同时，我们也会主动询问贵宾是否需要安排专车服务，以提升抵达体验："若您希望抵达更为舒适或有其他情况，我们可为您安排专车，全程私密无干扰。整体服务费用约在 300–1,000 RMB 之间，具体将依据您所需的车辆与安保级别进行确认。"
              </p>
              <p>
                在此基础上，我们会根据贵宾以往的行为记录及个人偏好，提前完成行程节奏、饮品选择、球具习惯等各项细节的个性化预设，确保其在整个体验中感受到毫无断层的高品质服务。
              </p>
              <div className="highlight-box">
                <strong>亮点：</strong>形成一对一全托管式体验，降低贵宾决策成本，提高满意度。通过提前沟通记录偏好，为后续多次复购奠定关系基础
              </div>
            </div>

            <div className="vertical-divider"></div>

            <div className="section en-section">
              <h3 className="lang-title">英文 English</h3>
              <p>
                Before the VIP's itinerary begins, we will first use their most frequently used phone number or email to reconfirm the arrival time, the needs for the day, and the arrangements for accompanying guests in a considerate and polite manner, allowing the VIP to clearly feel that all arrangements have been fully taken over by us. For example:
                <br/>
                "Hello Mr./Ms. XX. To ensure your experience tomorrow is as smooth as always, we would like to reconfirm your arrival time and the arrangements for your accompanying guests. After you arrive, all other matters will be handled entirely by us."
              </p>
              <p>
                At the same time, we will proactively ask whether the VIP needs a private car service to enhance the arrival experience:
                <br/>
                "If you would like a more comfortable arrival or have other considerations, we can arrange a private car for you. The total service fee is approximately RMB 300–1,000, and the exact amount will be confirmed based on the vehicle type and level of security you require."
              </p>
              <p>
                On this basis, we will preset personalized details in advance—such as the pace of the itinerary, beverage preferences, and golf equipment habits—according to the VIP's past behavior records and personal preferences, ensuring that they feel a seamless and high-quality service throughout the entire experience.
              </p>
              <div className="highlight-box">
                <strong>Highlight:</strong> Creating a one-on-one, fully managed experience that reduces the VIP's decision-making cost and improves satisfaction. By communicating in advance and recording preferences, we lay a foundation for future repeated purchases.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentArrival;
