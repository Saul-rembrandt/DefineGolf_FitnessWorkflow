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
    <div style={{ ...data.style, position: 'relative' }}>
      {/* 默认左入右出 */}
      <Handle type="target" position={Position.Left} id="l" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="r" isConnectable={isConnectable} />
      
      {/* 额外支持上入上出，用于循环 */}
      <Handle type="target" position={Position.Top} id="t-in" isConnectable={isConnectable} style={{ left: '50%' }} />
      <Handle type="source" position={Position.Top} id="t-out" isConnectable={isConnectable} style={{ left: '50%' }} />
      
      <div>{data.label}</div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// 节点颜色配置
const nodeColors = {
  reception: '#4CAF50',
  tour: '#2196F3',
  assessment: '#FF9800',
  training: '#9C27B0',
  reward: '#E91E63',
};

// 初始节点配置 - 横向布局适合PC端
const initialNodes = [
  {
    id: 'reception',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { label: '🤝 接待' },
    style: { 
      background: nodeColors.reception,
      color: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
    },
  },
  {
    id: 'tour',
    type: 'custom',
    position: { x: 250, y: 0 },
    data: { label: '🏃 参观' },
    style: { 
      background: nodeColors.tour,
      color: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
    },
  },
  {
    id: 'assessment',
    type: 'custom',
    position: { x: 500, y: 0 },
    data: { label: '📋 测评' },
    style: { 
      background: nodeColors.assessment,
      color: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
    },
  },
  {
    id: 'training',
    type: 'custom',
    position: { x: 750, y: 0 },
    data: { label: '💪 体能训练课程' },
    style: { 
      background: nodeColors.training,
      color: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
    },
  },
  {
    id: 'reward',
    type: 'custom',
    position: { x: 1050, y: 0 },
    data: { label: '🏆 获得成就性奖励' },
    style: { 
      background: nodeColors.reward,
      color: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
    },
  },
];

// 初始边配置
const initialEdges = [
  {
    id: 'e1',
    source: 'reception',
    target: 'tour',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#333', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e2',
    source: 'tour',
    target: 'assessment',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#333', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e3',
    source: 'assessment',
    target: 'training',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#333', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e4',
    source: 'training',
    target: 'reward',
    sourceHandle: 'r',
    targetHandle: 'l',
    animated: true,
    style: { stroke: '#333', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e5',
    source: 'reward',
    target: 'assessment',
    sourceHandle: 't-out',
    targetHandle: 't-in',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#FF5722', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    label: '循环训练',
    labelStyle: { fill: '#FF5722', fontWeight: 'bold' },
  },
];

function FlowChart() {
  const navigate = useNavigate();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event, node) => {
    const routes = {
      reception: '/reception/flow',
      tour: '/tour',
      assessment: '/assessment',
      training: '/training/flow',
      reward: '/reward',
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
          fitView
          fitViewOptions={{ padding: 0.5 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowChart;
// Re-export to fix HMR issue

