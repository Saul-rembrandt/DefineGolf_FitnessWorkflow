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
import './TrainingFlow.css';

// 自定义节点组件 - 普通流程节点
const CustomNode = ({ data }) => {
  const handleStyle = { opacity: 0 };

  return (
    <div className={`training-node ${data.shape || ''}`}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <Handle type="target" position={Position.Top} id="top" style={handleStyle} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle} />
    </div>
  );
};

// 数据库/圆柱形节点
const DatabaseNode = ({ data }) => {
  const handleStyle = { opacity: 0 };

  return (
    <div className="training-node database">
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div className="database-top"></div>
      <div className="database-body">
        <div>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

// 橙色椭圆节点 - AI系统
const AISystemNode = ({ data }) => {
  const handleStyle = { opacity: 0 };

  return (
    <div className="training-node ai-system">
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle} />
    </div>
  );
};

// 橙色矩形节点 - 个性化规划
const PlanningNode = ({ data }) => {
  const handleStyle = { opacity: 0 };

  return (
    <div className="training-node planning">
      <Handle type="target" position={Position.Top} id="top" style={handleStyle} />
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
  database: DatabaseNode,
  aiSystem: AISystemNode,
  planning: PlanningNode,
};

const initialNodes = [
  // ========== 右侧主流程 ==========
  // 课程 - 起始节点（圆角更大）
  { 
    id: 't1', 
    type: 'custom', 
    position: { x: 400, y: 0 }, 
    data: { label: '课程\ncurriculum', shape: 'rounded' } 
  },
  // 签到
  { 
    id: 't2', 
    type: 'custom', 
    position: { x: 400, y: 120 }, 
    data: { label: '签到\nCheck in' } 
  },
  // 冥想
  { 
    id: 't3', 
    type: 'custom', 
    position: { x: 400, y: 240 }, 
    data: { label: '冥想\nmeditation' } 
  },
  // 热身
  { 
    id: 't4', 
    type: 'custom', 
    position: { x: 400, y: 360 }, 
    data: { label: '热身\nwarm-up' } 
  },
  // 协调性训练
  { 
    id: 't5', 
    type: 'custom', 
    position: { x: 400, y: 480 }, 
    data: { label: '协调性训练\nCoordination training' } 
  },
  // 体能训练
  { 
    id: 't6', 
    type: 'custom', 
    position: { x: 400, y: 600 }, 
    data: { label: '体能训练\nPhysical training' } 
  },
  // 拉伸&放松
  { 
    id: 't7', 
    type: 'custom', 
    position: { x: 400, y: 720 }, 
    data: { label: '拉伸&放松\nStretching' } 
  },
  // 生成并介绍复盘&课后计划 - 结束节点（圆角更大）
  { 
    id: 't8', 
    type: 'custom', 
    position: { x: 400, y: 860 }, 
    data: { 
      label: '生成并介绍复盘&课后计划\nGenerate and present the\nreview & post-session plan', 
      shape: 'rounded' 
    } 
  },

  // ========== 左侧AI系统节点 ==========
  // 动作库 - 数据库节点
  { 
    id: 'db1', 
    type: 'database', 
    position: { x: -100, y: 280 }, 
    data: { label: '动作库\nMovement\nLibraries' } 
  },
  // AI管家系统 - 橙色椭圆
  { 
    id: 'ai1', 
    type: 'aiSystem', 
    position: { x: 80, y: 280 }, 
    data: { label: '人工智能管家系统\nAI Butler System' } 
  },
  // 个性化规划 - 橙色矩形
  { 
    id: 'plan1', 
    type: 'planning', 
    position: { x: 80, y: 420 }, 
    data: { label: '负责每一部分的具体训练内容\n以及训练时长的个性化规划制定\nBe responsible for formulating\npersonalized plans for the specific\ntraining content and duration' } 
  },
];

const initialEdges = [
  // 主流程连线（纵向）
  { id: 'et1', source: 't1', target: 't2', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'et2', source: 't2', target: 't3', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'et3', source: 't3', target: 't4', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'et4', source: 't4', target: 't5', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'et5', source: 't5', target: 't6', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'et6', source: 't6', target: 't7', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'et7', source: 't7', target: 't8', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  
  // AI系统连线
  { id: 'edb1', source: 'db1', target: 'ai1', label: '训练内容\n training content', type: 'smoothstep', style: { stroke: '#F5A623' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F5A623' } },
  { id: 'eai1', source: 'ai1', target: 'plan1', sourceHandle: 'bottom', targetHandle: 'top', label: '管理并记录\n manage and record', type: 'smoothstep', style: { stroke: '#F5A623' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F5A623' } },
  // 规划节点连接到主流程（包括冥想）
  { id: 'eplan0', source: 'plan1', target: 't3', type: 'smoothstep', style: { stroke: '#F5A623' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F5A623' } },
  { id: 'eplan1', source: 'plan1', target: 't4', type: 'smoothstep', style: { stroke: '#F5A623' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F5A623' } },
  { id: 'eplan2', source: 'plan1', target: 't5', sourceHandle: 'bottom', type: 'smoothstep', style: { stroke: '#F5A623' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F5A623' } },
  { id: 'eplan3', source: 'plan1', target: 't6', sourceHandle: 'bottom', type: 'smoothstep', style: { stroke: '#F5A623' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F5A623' } },
  { id: 'eplan4', source: 'plan1', target: 't7', sourceHandle: 'bottom', type: 'smoothstep', style: { stroke: '#F5A623' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F5A623' } },
];

function TrainingFlow() {
  const navigate = useNavigate();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // 节点ID到路由slug的映射（预留，未来可扩展详情页）
  const nodeIdToSlug = {
    't1': 'curriculum',
    't2': 'checkin',
    't3': 'meditation',
    't4': 'warmup',
    't5': 'coordination',
    't6': 'physical',
    't7': 'stretching',
    't8': 'review',
  };

  const onNodeClick = useCallback((event, node) => {
    const slug = nodeIdToSlug[node.id];
    if (slug) {
      // 预留详情页路由，暂时不跳转
      // navigate(`/training/detail/${slug}`);
      console.log('Clicked node:', slug);
    }
  }, [navigate]);

  return (
    <div className="training-flow-container">
      <button className="back-button-float" onClick={() => navigate('/')}>
        返回主流程
      </button>
      <div className="training-flow-wrapper">
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

export default TrainingFlow;
