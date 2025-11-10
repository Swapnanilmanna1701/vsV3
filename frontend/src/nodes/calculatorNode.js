import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const CalculatorNode = createNode({
  title: '🧮 Calculator',
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'input-a',
      style: { top: '30%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'input-b',
      style: { top: '70%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'result'
    }
  ],
  fields: [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      options: ['Add', 'Subtract', 'Multiply', 'Divide'],
      defaultValue: 'Add'
    }
  ],
  height: 'auto',
  style: {
    background: 'linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%)',
    borderColor: '#6366f1'
  }
});
