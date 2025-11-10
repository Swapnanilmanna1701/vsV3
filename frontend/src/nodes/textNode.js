import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text ?? '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 220, height: 120 });
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...text.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map(match => match[1]))];
    setVariables(uniqueVars);
    
    updateNodeField(id, 'text', text);
  }, [text, id, updateNodeField]);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      const lines = text.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length), 20);
      const charWidth = 7.5;
      const minWidth = 220;
      const contentWidth = Math.max(minWidth, maxLineLength * charWidth + 50);
      
      textarea.style.width = `${contentWidth - 24}px`;
      textarea.style.height = 'auto';
      
      const scrollHeight = textarea.scrollHeight;
      const titleHeight = 30;
      const labelHeight = 20;
      const padding = 24;
      const variableInfoHeight = variables.length > 0 ? 25 : 0;
      const minTextareaHeight = 60;
      
      const textareaHeight = Math.max(minTextareaHeight, scrollHeight);
      textarea.style.height = `${textareaHeight}px`;
      
      const totalHeight = titleHeight + labelHeight + textareaHeight + variableInfoHeight + padding;
      
      setDimensions({
        width: contentWidth,
        height: totalHeight
      });
    }
  }, [text, variables.length]);

  const baseStyle = {
    width: dimensions.width,
    minHeight: dimensions.height,
    border: '2px solid #f59e0b',
    padding: '12px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
    fontSize: '13px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    position: 'relative'
  };

  const titleStyle = {
    fontWeight: 700,
    marginBottom: '8px',
    fontSize: '14px',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const textareaStyle = {
    width: '100%',
    padding: '6px 8px',
    fontSize: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontFamily: 'inherit',
    resize: 'none',
    minHeight: '60px',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.025em'
  };

  return (
    <div style={baseStyle}>
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          width: '10px',
          height: '10px',
          border: '2px solid white',
          background: '#667eea'
        }}
      />
      
      {variables.map((varName, index) => {
        const handleSpacing = variables.length > 1 
          ? (dimensions.height - 60) / (variables.length + 1)
          : dimensions.height / 2;
        const topPosition = 30 + handleSpacing * (index + 1);
        
        return (
          <Handle
            key={varName}
            type="target"
            position={Position.Left}
            id={varName}
            style={{
              width: '10px',
              height: '10px',
              border: '2px solid white',
              background: '#667eea',
              top: `${topPosition}px`
            }}
          />
        );
      })}
      
      <div style={titleStyle}>
        📝 Text
      </div>
      
      <div>
        <label style={labelStyle}>
          Content
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={textareaStyle}
          placeholder="Enter text with variables like {{variableName}}"
        />
        {variables.length > 0 && (
          <div style={{ 
            marginTop: '8px', 
            fontSize: '10px', 
            color: '#64748b',
            fontStyle: 'italic'
          }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};
