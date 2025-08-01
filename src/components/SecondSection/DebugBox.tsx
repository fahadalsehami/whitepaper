import React from 'react';

interface DebugBoxProps {
  color?: string;
  label?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  // Accept any other props (id, data-*, etc)
  [key: string]: any;
}

const DebugBox = React.forwardRef<HTMLDivElement, DebugBoxProps>(
  ({ color = 'red', label, children, style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        border: `2px dashed ${color}`,
        position: 'relative',
        margin: 2,
        ...style,
      }}
      {...rest}
    >
      {label && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: color,
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            padding: '0 6px',
            borderBottomRightRadius: 6,
            zIndex: 1000,
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  )
);

export default DebugBox; 