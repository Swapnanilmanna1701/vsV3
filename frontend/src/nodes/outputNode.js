import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const OutputNode = createNode({
  title: '📤 Output',
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'value'
    }
  ],
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      defaultValue: (id) => id.replace('customOutput-', 'output_')
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'Image'],
      defaultValue: 'Text'
    }
  ],
  height: 'auto',
  style: {
    background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
    borderColor: '#22c55e'
  }
});
