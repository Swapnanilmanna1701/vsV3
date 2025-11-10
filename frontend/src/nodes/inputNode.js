import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const InputNode = createNode({
  title: '📥 Input',
  handles: [
    {
      type: 'source',
      position: Position.Right,
      id: 'value'
    }
  ],
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      defaultValue: (id) => id.replace('customInput-', 'input_')
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'File'],
      defaultValue: 'Text'
    }
  ],
  height: 'auto',
  style: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
    borderColor: '#3b82f6'
  }
});
