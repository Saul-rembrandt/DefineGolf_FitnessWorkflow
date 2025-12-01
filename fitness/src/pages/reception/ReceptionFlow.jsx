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
import './ReceptionFlow.css';

// 自定义节点组件
const CustomNode = ({ data }) => {
  // 隐藏连接点，使其不可见但保持连接功能
  const handleStyle = { opacity: 0 };

  return (
    <div className={`reception-node ${data.shape || ''}`}>
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      
      {/* 额外添加左右 Handle，用于分支连接 */}
      <Handle type="source" position={Position.Left} id="l" style={{ ...handleStyle, top: '50%' }} />
      <Handle type="source" position={Position.Right} id="r" style={{ ...handleStyle, top: '50%' }} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  // 左侧流程
  { id: 'l1', type: 'custom', position: { x: 0, y: 0 }, data: { label: '预约参观' } },
  { id: 'l2', type: 'custom', position: { x: 0, y: 150 }, data: { label: '新人欢迎仪式\nNewer Welcome\nCeremony' } },
  { id: 'l3', type: 'custom', position: { x: 0, y: 300 }, data: { label: '代泊车\nValet parking' } },
  { id: 'l4', type: 'custom', position: { x: 0, y: 450 }, data: { label: '登记' } },
  { id: 'l5', type: 'custom', position: { x: 0, y: 600 }, data: { label: '洽谈，了解学员情况\n为宾客提供食物\nDiscuss and understand the students\'\nsituation;Provide food for the guests' }, style: { width: 250 } },
  { id: 'l6', type: 'custom', position: { x: 0, y: 850 }, data: { label: '参观场馆\nVisiting the g...' } },

  // 右侧流程
  { id: 'r1', type: 'custom', position: { x: 400, y: 0 }, data: { label: '进入园区\nEnter the area' } },
  { id: 'r2', type: 'custom', position: { x: 400, y: 150 }, data: { label: '车牌识别\nLicense plate\nrecognition' } },
  { id: 'r3', type: 'custom', position: { x: 400, y: 300 }, data: { label: 'Is VIP ?'} },
  
  // 分支
  { id: 'r4a', type: 'custom', position: { x: 250, y: 540 }, data: { label: '欢迎口号\nwelcome slogan' } },
  { id: 'r4b', type: 'custom', position: { x: 550, y: 450 }, data: { label: '迎宾礼仪\nWelcome Etiquette' } },
  { id: 'r4c', type: 'custom', position: { x: 550, y: 550 }, data: { label: '贵宾室提前打开' } },
  
  { id: 'r5', type: 'custom', position: { x: 400, y: 700 }, data: { label: '泊车' } },
  { id: 'r6', type: 'custom', position: { x: 400, y: 850 }, data: { label: '登记并询问是否需要\n贵宾室' } },
  { id: 'r7', type: 'custom', position: { x: 400, y: 1000 }, data: { label: '训练\ntraining' } },
];

const initialEdges = [
  // 左侧连线
  { id: 'el1', source: 'l1', target: 'l2', label: '入园', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'el2', source: 'l2', target: 'l3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'el3', source: 'l3', target: 'l4', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'el4', source: 'l4', target: 'l5', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'el5', source: 'l5', target: 'l6', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // 右侧连线
  { id: 'er1', source: 'r1', target: 'r2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'er2', source: 'r2', target: 'r3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  
  // 菱形分支
  { id: 'er3a', source: 'r3', target: 'r4a', sourceHandle: 'l', label: 'No', type: 'smoothstep' },
  { id: 'er3b', source: 'r3', target: 'r4b', sourceHandle: 'r', label: 'Yes', type: 'smoothstep' },
  
  { id: 'er4b', source: 'r4b', target: 'r4c', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  
  // 汇聚到泊车
  { id: 'er5a', source: 'r4a', target: 'r5', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'er5b', source: 'r4c', target: 'r5', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  
  { id: 'er6', source: 'r5', target: 'r6', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'er7', source: 'r6', target: 'r7', label: '孩子\nchild', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
];

function ReceptionFlow() {
  const navigate = useNavigate();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // 左侧节点ID到路由slug的映射
  const nodeIdToSlug = {
    'l1': 'appointment',   // 预约参观
    'l2': 'welcome',       // 新人欢迎仪式
    'l3': 'valet',         // 代泊车
    'l4': 'registration',  // 登记
    'l5': 'consultation',  // 洽谈
    'l6': 'tour',          // 参观场馆
  };

  const onNodeClick = useCallback((event, node) => {
    const slug = nodeIdToSlug[node.id];
    if (slug) {
      navigate(`/reception/detail/${slug}`);
    }
  }, [navigate]);

  return (
    <div className="reception-flow-container">
      <button className="back-button-float" onClick={() => navigate('/')}>
        返回主流程
      </button>
      <div className="reception-flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          nodeOrigin={[0.5, 0.5]}
        >
          <Controls />
          <MiniMap />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default ReceptionFlow;
