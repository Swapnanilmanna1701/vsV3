import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const LLMNode = createNode({
  title: '🤖 LLM',
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'system',
      style: { top: '33%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'prompt',
      style: { top: '66%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'response'
    }
  ],
  content: <div style={{ color: '#64748b', fontSize: '12px' }}>Language model processing</div>,
  height: 'auto',
  style: {
    background: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%)',
    borderColor: '#8b5cf6'
  }
});
