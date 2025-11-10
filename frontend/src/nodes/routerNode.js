import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const RouterNode = createNode({
  title: '🔀 Router',
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'input'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'route-a',
      style: { top: '25%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'route-b',
      style: { top: '45%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'route-c',
      style: { top: '65%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'default',
      style: { top: '85%' }
    }
  ],
  fields: [
    {
      name: 'routingKey',
      label: 'Route By',
      type: 'text',
      defaultValue: 'type'
    }
  ],
  height: 'auto',
  width: 180,
  style: {
    background: 'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%)',
    borderColor: '#ec4899'
  }
});
