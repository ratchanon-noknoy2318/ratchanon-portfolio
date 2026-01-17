'use client';
import { FaChevronDown } from 'react-icons/fa';

const FilterSelect = ({ 
  icon: Icon, 
  value, 
  onChange, 
  options = [], 
  defaultOptionLabel,
  minWidth = '200px'
}) => {
  const selectWrapperStyle = { position: 'relative', minWidth, flex: `1 1 ${minWidth}` };
  
  const selectStyle = {
    width: '100%',
    padding: '12px 40px 12px 40px',
    borderRadius: '50px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    color: '#334155',
    fontSize: '1rem',
    appearance: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    outline: 'none',
    fontWeight: '600',
    textTransform: 'capitalize'
  };

  const iconStyle = { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', zIndex: 1 };
  const chevronStyle = { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' };

  return (
    <div style={selectWrapperStyle}>
      {/* {Icon && <Icon style={iconStyle} />} */}
      <select
        value={value}
        onChange={onChange}
        style={selectStyle}
      >
        <option value="all">{defaultOptionLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <FaChevronDown style={chevronStyle} />
    </div>
  );
};

export default FilterSelect;