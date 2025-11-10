import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const DelayNode = createNode({
  title: '⏱️ Delay',
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'input'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output'
    }
  ],
  fields: [
    {
      name: 'duration',
      label: 'Duration',
      type: 'number',
      defaultValue: '1000'
    },
    {
      name: 'unit',
      label: 'Unit',
      type: 'select',
      options: ['milliseconds', 'seconds', 'minutes'],
      defaultValue: 'milliseconds'
    }
  ],
  height: 'auto',
  style: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
    borderColor: '#3b82f6'
  }
});
