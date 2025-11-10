import { useState, useRef, useEffect } from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({
  id,
  data,
  title,
  handles = [],
  fields = [],
  children,
  width = 220,
  height = 'auto',
  style = {},
  titleStyle = {},
  contentStyle = {}
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initial = {};
    fields.forEach(field => {
      const defaultVal = typeof field.defaultValue === 'function' 
        ? field.defaultValue(id, data)
        : field.defaultValue ?? '';
      initial[field.name] = data?.[field.name] ?? defaultVal;
    });
    return initial;
  });

  const [nodeDimensions, setNodeDimensions] = useState({ width, height });
  const fieldRefs = useRef({});

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({ ...prev, [fieldName]: value }));
  };

  useEffect(() => {
    if (fields.length === 0) return;

    let maxWidth = width;
    let totalHeight = 0;

    const titleHeight = 30;
    const padding = 24;
    const labelHeight = 20;
    const fieldGap = 8;

    totalHeight += titleHeight + padding;

    fields.forEach((field, index) => {
      const fieldRef = fieldRefs.current[field.name];
      if (!fieldRef) return;

      const value = fieldValues[field.name] || '';

      if (field.type === 'textarea') {
        fieldRef.style.height = 'auto';
        const scrollHeight = fieldRef.scrollHeight;
        const minTextareaHeight = (field.rows || 2) * 20;
        const textareaHeight = Math.max(minTextareaHeight, scrollHeight);
        fieldRef.style.height = `${textareaHeight}px`;

        const lines = value.toString().split('\n');
        const maxLineLength = Math.max(...lines.map(line => line.length), 10);
        const charWidth = 7.5;
        const calculatedWidth = maxLineLength * charWidth + 50;
        maxWidth = Math.max(maxWidth, calculatedWidth);

        totalHeight += labelHeight + textareaHeight + fieldGap;
      } else if (field.type !== 'select') {
        const valueLength = value.toString().length;
        const charWidth = 7.5;
        const minInputWidth = 150;
        const calculatedWidth = Math.max(minInputWidth, valueLength * charWidth + 50);
        maxWidth = Math.max(maxWidth, calculatedWidth);

        totalHeight += labelHeight + 32 + fieldGap;
      } else {
        totalHeight += labelHeight + 32 + fieldGap;
      }
    });

    setNodeDimensions({
      width: maxWidth,
      height: totalHeight
    });
  }, [fieldValues, fields, width]);

  const baseStyle = {
    width: fields.length > 0 ? nodeDimensions.width : width,
    minHeight: fields.length > 0 && nodeDimensions.height !== 'auto' ? nodeDimensions.height : (height === 'auto' ? '80px' : height),
    border: '2px solid #e2e8f0',
    padding: '12px',
    borderRadius: '12px',
    background: 'white',
    fontSize: '13px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    ...style
  };

  const defaultTitleStyle = {
    fontWeight: 700,
    marginBottom: '8px',
    fontSize: '14px',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    ...titleStyle
  };

  const defaultContentStyle = {
    fontSize: '12px',
    color: '#475569',
    ...contentStyle
  };

  return (
    <div style={baseStyle}>
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id || index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={{
            width: '10px',
            height: '10px',
            border: '2px solid white',
            background: '#667eea',
            ...handle.style
          }}
        />
      ))}
      
      <div style={defaultTitleStyle}>
        {title}
      </div>
      
      <div style={defaultContentStyle}>
        {fields.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {fields.map(field => (
              <div key={field.name}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em'
                }}>
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={fieldValues[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    style={{ 
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      background: 'white'
                    }}
                  >
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    ref={(el) => { if (el) fieldRefs.current[field.name] = el; }}
                    value={fieldValues[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    style={{ 
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontFamily: 'inherit',
                      resize: 'none',
                      overflow: 'hidden',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      boxSizing: 'border-box'
                    }}
                    rows={field.rows || 2}
                  />
                ) : (
                  <input
                    ref={(el) => { if (el) fieldRefs.current[field.name] = el; }}
                    type={field.type || 'text'}
                    value={fieldValues[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    style={{ 
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : children}
      </div>
    </div>
  );
};

export const createNode = (config) => {
  return ({ id, data }) => (
    <BaseNode
      id={id}
      data={data}
      title={config.title}
      handles={config.handles || []}
      fields={config.fields || []}
      width={config.width}
      height={config.height}
      style={config.style}
      titleStyle={config.titleStyle}
      contentStyle={config.contentStyle}
    >
      {config.content}
    </BaseNode>
  );
};
