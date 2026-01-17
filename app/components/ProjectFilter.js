'use client';
import { forwardRef, useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSelect from './FilterSelect';

const ProjectFilter = forwardRef(({ currentFilter, setFilter, language, isSticky, filterOptions = {}, getSkillIcon }, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const allLabel = language === 'th' ? 'ทั้งหมด' : 'All';
  const isGrouped = !Array.isArray(filterOptions) && filterOptions.categories;

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2.5rem',
    position: isSticky ? 'sticky' : 'relative',
    top: isSticky ? '20px' : 'auto',
    zIndex: 100,
    padding: '10px',
    backgroundColor: isSticky ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
    backdropFilter: isSticky ? 'blur(12px)' : 'none',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    boxShadow: isSticky ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
    gap: '0.8rem',
    flexWrap: 'wrap',
    width: isMobile ? '95%' : 'auto',
    maxWidth: isMobile ? '400px' : 'none',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  const buttonStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 16px',
    borderRadius: '50px',
    border: isActive ? '1px solid #6DA9F3' : '1px solid #e2e8f0',
    backgroundColor: isActive ? '#6DA9F3' : '#ffffff',
    color: isActive ? '#ffffff' : '#64748b',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: isActive ? '0 4px 12px rgba(109, 169, 243, 0.3)' : '0 2px 5px rgba(0,0,0,0.03)',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  });

  const renderButton = (value, label, icon = null) => (
    <button
      key={value}
      onClick={() => setFilter(value)}
      style={buttonStyle(currentFilter === value)}
      onMouseEnter={(e) => {
        if (currentFilter !== value) {
            e.currentTarget.style.borderColor = '#6DA9F3';
            e.currentTarget.style.color = '#6DA9F3';
            e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (currentFilter !== value) {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {icon && <span style={{ fontSize: '1rem', display: 'flex' }}>{icon}</span>}
      {label}
    </button>
  );

  if (isMobile) {
    const options = isGrouped ? filterOptions.technologies : (Array.isArray(filterOptions) ? filterOptions : []);
    return (
      <div ref={ref} style={containerStyle}>
        <FilterSelect
          icon={FaFilter}
          value={currentFilter}
          onChange={(e) => setFilter(e.target.value)}
          options={options}
          defaultOptionLabel={allLabel}
          minWidth="100%"
        />
      </div>
    );
  }

  return (
    <div ref={ref} style={containerStyle}>
      {renderButton('all', allLabel)}
      
      {isGrouped ? (
        <>
          {filterOptions.technologies.map(tech => renderButton(tech, tech, getSkillIcon ? getSkillIcon(tech) : null))}
        </>
      ) : (
        (Array.isArray(filterOptions) ? filterOptions : []).map(opt => renderButton(opt, opt, getSkillIcon ? getSkillIcon(opt) : null))
      )}
    </div>
  );
});

ProjectFilter.displayName = 'ProjectFilter';

export default ProjectFilter;
