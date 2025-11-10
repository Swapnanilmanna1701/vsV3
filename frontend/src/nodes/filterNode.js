import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const FilterNode = createNode({
  title: '🔍 Filter',
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'data-in'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'filtered-out',
      style: { top: '40%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'rejected-out',
      style: { top: '70%' }
    }
  ],
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      type: 'textarea',
      defaultValue: 'value > 0',
      rows: 2
    }
  ],
  height: 'auto',
  style: {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
    borderColor: '#f59e0b'
  }
});
