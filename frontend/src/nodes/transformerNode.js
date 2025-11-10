import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const TransformerNode = createNode({
  title: '⚡ Transformer',
  handles: [
    {
      type: 'target',
      position: Position.Top,
      id: 'config',
      style: { left: '50%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'data-in',
      style: { top: '50%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'data-out',
      style: { top: '50%' }
    },
    {
      type: 'source',
      position: Position.Bottom,
      id: 'metadata',
      style: { left: '50%' }
    }
  ],
  fields: [
    {
      name: 'transformType',
      label: 'Transform',
      type: 'select',
      options: ['Uppercase', 'Lowercase', 'Reverse', 'Trim'],
      defaultValue: 'Uppercase'
    }
  ],
  width: 200,
  height: 'auto',
  style: {
    background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
    borderColor: '#22c55e'
  }
});
