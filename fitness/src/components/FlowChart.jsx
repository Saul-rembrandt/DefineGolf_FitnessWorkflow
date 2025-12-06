import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
  Handle,
} from '@xyflow/react';
import { useNavigate } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import './FlowChart.css';

// 自定义节点，支持多方向连接
const CustomNode = ({ data, isConnectable }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} id="l" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="r" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Top} id="t" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      <div>{data.label}</div>
    </div>
  );
};

// 灰色圆角起始节点
const StartNode = ({ data, isConnectable }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Handle type="source" position={Position.Right} id="r" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Top} id="t-top" isConnectable={isConnectable} style={{ top: '25%' }} />
      <Handle type="source" position={Position.Bottom} id="t-bottom" isConnectable={isConnectable} style={{ bottom: '25%' }} />
      <Handle type="target" position={Position.Top} id="t" isConnectable={isConnectable} />
      <div>{data.label}</div>
    </div>
  );
};

// Class 分组节点
const GroupNode = ({ data }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} id="l" />
      <Handle type="source" position={Position.Right} id="r" />
      <Handle type="target" position={Position.Top} id="t" />
      <Handle type="target" position={Position.Bottom} id="b" />
      <div className="group-title">{data.title}</div>
      <div className="group-content">
        {data.items && data.items.map((item, index) => (
          <div 
            key={index} 
            className="group-item"
            style={{ background: data.colors ? data.colors[index] : '#2196F3' }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// Reward 节点（橙色文字+图标）
const RewardNode = ({ data, isConnectable }) => {
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <Handle type="source" position={Position.Top} id="t" isConnectable={isConnectable} />
      <div>{data.label}</div>
      <div style={{ fontSize: '32px', marginTop: '5px' }}>💎</div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
  start: StartNode,
  group: GroupNode,
  reward: RewardNode,
};

// 节点颜色配置 - 每个节点使用不同颜色
const nodeColors = {
  start: '#9E9E9E',           // 灰色 - 起始节点
  receptionNewcomer: '#4CAF50', // 绿色 - 新人接待
  tour: '#2196F3',            // 蓝色 - 参观
  assessment: '#FF9800',      // 橙色 - 测评
  report: '#00BCD4',          // 青色 - 测评报告
  member: '#8BC34A',          // 浅绿 - 成为会员
  leaveNewcomer: '#607D8B',   // 蓝灰 - 新人离开
  receptionMember: '#9C27B0', // 紫色 - 学员接待
  training: '#E91E63',        // 粉红 - 训练
  leaveMember: '#795548',     // 棕色 - 学员离开
  onlineClass: '#3F51B5',     // 靛蓝 - 线上课程
  offlineClass: '#673AB7',    // 深紫 - 线下课程
  exam: '#009688',            // 青绿 - 测试
  graduation: '#FF5722',      // 深橙 - 毕业
  reward: '#FFC107',          // 琥珀 - 奖励
};

// 通用节点样式
const baseNodeStyle = {
  color: 'white',
  padding: '15px 25px',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '14px',
  border: 'none',
  textAlign: 'center',
  minWidth: '120px',
  whiteSpace: 'pre-line',  // 让 \n 换行符生效
  lineHeight: '1.4',
};

// 初始节点配置 - 按照图片结构
const initialNodes = [
  // === 第一行：新人路线 ===
  {
    id: 'arrival',
    type: 'start',
    position: { x: 0, y: 100 },
    data: { label: '抵达和离开\nArrival and Departure' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.start,
      borderRadius: '20px',
      minWidth: '150px',
    },
  },
  {
    id: 'reception-newcomer',
    type: 'custom',
    position: { x: 250, y: 0 },
    data: { label: '欢迎和接待（新人）\n Welcome and Reception\n(Newcomer)' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.receptionNewcomer,
    },
  },
  {
    id: 'tour',
    type: 'custom',
    position: { x: 500, y: 0 },
    data: { label: '场地参观\nTour the Club Venue' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.tour,
    },
  },
  {
    id: 'assessment',
    type: 'custom',
    position: { x: 750, y: 0 },
    data: { label: '测评\nAssessment' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.assessment,
    },
  },
  {
    id: 'report',
    type: 'custom',
    position: { x: 1000, y: 0 },
    data: { label: '测评分析和课程介绍\nAssessment Report & Plan' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.report,
      minWidth: '180px',
    },
  },
  {
    id: 'member',
    type: 'custom',
    position: { x: 1300, y: 0 },
    data: { label: '成为会员\nBecome a Member' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.member,
    },
  },
  {
    id: 'leave-newcomer',
    type: 'custom',
    position: { x: 1550, y: 0 },
    data: { label: '离开\nLeave' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.leaveNewcomer,
    },
  },
  
  // === 第二行：学员路线 ===
  {
    id: 'reception-member',
    type: 'custom',
    position: { x: 250, y: 200 },
    data: { label: '欢迎和接待（学员）\nWelcome and Reception\n(Members)' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.receptionMember,
    },
  },
  {
    id: 'training',
    type: 'custom',
    position: { x: 500, y: 200 },
    data: { label: '训练\nTraining' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.training,
    },
  },
  {
    id: 'leave-member',
    type: 'custom',
    position: { x: 750, y: 200 },
    data: { label: '离开\nLeave' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.leaveMember,
    },
  },
  
  // === 第三行：训练成长 ===
  {
    id: 'growth',
    type: 'start',
    position: { x: 0, y: 450 },
    data: { label: '训练成长\nTraining and Growth' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.start,
      borderRadius: '20px',
      minWidth: '150px',
    },
  },
  {
    id: 'class',
    type: 'group',
    position: { x: 250, y: 450 },
    data: { 
      title: 'Class',
      items: ['线上课程\nOnline Training', '线下课程（一对N）\nOffline Training\n1-1, 1-N'],
      colors: [nodeColors.onlineClass, nodeColors.offlineClass]
    },
    style: { 
      background: '#F3E5F5',
      border: '2px solid #CE93D8',
      borderRadius: '8px',
      padding: '10px',
      minWidth: '180px',
    },
  },
  {
    id: 'exam',
    type: 'custom',
    position: { x: 550, y: 450 },
    data: { label: '测试\nExam' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.exam,
    },
  },
  {
    id: 'graduation',
    type: 'custom',
    position: { x: 800, y: 450 },
    data: { label: '毕业\nGraduation' },
    style: { 
      ...baseNodeStyle,
      background: nodeColors.graduation,
    },
  },
  
  // === Reward 节点 ===
  {
    id: 'reward1',
    type: 'reward',
    position: { x: 550, y: 380 },
    data: { label: 'Reward 1' },
    style: { 
      color: nodeColors.reward,
      fontWeight: 'bold',
      fontSize: '14px',
      background: 'transparent',
    },
  },
];

// 初始边配置
const initialEdges = [
  // 新人路线
  {
    id: 'e-arrival-newcomer',
    source: 'arrival',
    target: 'reception-newcomer',
    sourceHandle: 't-top',
    targetHandle: 'l',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-newcomer-tour',
    source: 'reception-newcomer',
    target: 'tour',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-tour-assessment',
    source: 'tour',
    target: 'assessment',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-assessment-report',
    source: 'assessment',
    target: 'report',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-report-member',
    source: 'report',
    target: 'member',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-member-leave',
    source: 'member',
    target: 'leave-newcomer',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  
  // 学员路线
  {
    id: 'e-arrival-member',
    source: 'arrival',
    target: 'reception-member',
    sourceHandle: 't-bottom',
    targetHandle: 'l',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-reception-training',
    source: 'reception-member',
    target: 'training',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-training-leave',
    source: 'training',
    target: 'leave-member',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  
  // 虚线连接（从训练到训练成长）
  {
    id: 'e-training-growth',
    source: 'training',
    target: 'growth',
    sourceHandle: 'b',
    targetHandle: 't',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#9E9E9E', strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#9E9E9E' },
  },
  
  // 训练成长路线
  {
    id: 'e-growth-class',
    source: 'growth',
    target: 'class',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-class-exam',
    source: 'class',
    target: 'exam',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  {
    id: 'e-exam-graduation',
    source: 'exam',
    target: 'graduation',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2196F3' },
  },
  
  // 循环边（从测试回到class）
  {
    id: 'e-exam-class-loop',
    source: 'exam',
    target: 'class',
    sourceHandle: 'b',
    targetHandle: 'b',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#FF5722', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    label: '循环训练\nTraining Cycle',
    labelStyle: { fill: '#FF5722', fontWeight: 'bold', fontSize: '12px' },
    labelBgStyle: { fill: 'white', fillOpacity: 0.8 },
  },
  
  // Reward 连接
  {
    id: 'e-reward-exam',
    source: 'reward1',
    target: 'exam',
    sourceHandle: 't',
    targetHandle: 'b',
    animated: false,
    style: { stroke: '#FF9800', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#FF9800' },
  },
];

function FlowChart() {
  const navigate = useNavigate();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event, node) => {
    const routes = {
      'reception-newcomer': '/reception/flow',
      'reception-member': '/reception/flow',
      'tour': '/tour',
      'assessment': '/assessment',
      'training': '/training/flow',
      'reward1': '/reward',
      'graduation': '/reward',
    };
    if (routes[node.id]) {
      navigate(routes[node.id]);
    }
  }, [navigate]);

  return (
    <div className="flowchart-container">
      <div className="flowchart-wrapper" style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          nodeOrigin={[0.5, 0.5]}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowChart;

