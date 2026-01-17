'use client';

import React from 'react';
import { FaTimes, FaExclamationCircle, FaUserTie, FaLightbulb, FaTasks, FaTools, FaChartLine } from 'react-icons/fa';
import styles from '../styles/Modal.module.css';

const labels = {
  th: {
    problem: 'ปัญหา:',
    role: 'หน้าที่รับผิดชอบ:',
    solution: 'วิธีแก้ปัญหา:',
    situation: 'Situation (สถานการณ์):',
    task: 'Task (โจทย์):',
    action: 'Action (สิ่งที่ทำ):',
    result: 'Result (ผลลัพธ์):',
  },
  en: {
    problem: 'Problem:',
    role: 'Role:',
    solution: 'Solution:',
    situation: 'Situation:',
    task: 'Task:',
    action: 'Action:',
    result: 'Result:',
  },
};

const Modal = ({ project, onClose, language }) => {
  if (!project) return null;
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const currentLabels = labels[language];
  const modalTitleId = 'modal-title';
  const hasStarData = project.details && (project.details.situation || project.details.task || project.details.action || project.details.result);

  // --- Theme Styles ---
  const contentStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    maxWidth: '650px',
    width: '90%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: '1px solid #f1f5f9',
    overflow: 'hidden',
    fontFamily: 'var(--font-sarabun), sans-serif',
  };

  const headerStyle = {
    padding: '12px 16px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 1.4,
  };

  const sectionStyle = {
    backgroundColor: '#f8fafc',
    padding: '12px',
    borderRadius: '12px',
    marginBottom: '8px',
    border: '1px solid #f1f5f9',
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#1e293b',
    fontSize: '0.95rem',
    fontWeight: '700',
    marginBottom: '4px',
    marginTop: 0,
  };

  const iconStyle = {
    color: '#6DA9F3', // Theme Blue
    fontSize: '1.1rem',
  };

  const textStyle = {
    color: '#475569',
    lineHeight: '1.5',
    margin: 0,
    fontSize: '0.9rem',
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose} style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        style={contentStyle}
      >
        <div className={styles.modalHeader} style={headerStyle}>
          <h3 id={modalTitleId} style={titleStyle}>{project.title}</h3>
          <button 
            onClick={onClose} 
            className={styles.closeButton} 
            aria-label="Close modal"
            style={{
              background: '#f8fafc',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#64748b'; }}
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalBody} style={{ padding: '16px', backgroundColor: '#ffffff', maxHeight: '70vh', overflowY: 'auto' }}>
          {hasStarData ? (
            <>
              {project.details.situation && (
                <div className={styles.modalSection} style={sectionStyle}>
                  <h4 style={sectionHeaderStyle}><FaExclamationCircle style={iconStyle} /> {currentLabels.situation}</h4>
                  <p style={textStyle}>{project.details.situation}</p>
                </div>
              )}
              {project.details.task && (
                <div className={styles.modalSection} style={sectionStyle}>
                  <h4 style={sectionHeaderStyle}><FaTasks style={iconStyle} /> {currentLabels.task}</h4>
                  <p style={textStyle}>{project.details.task}</p>
                </div>
              )}
              {project.details.action && (
                <div className={styles.modalSection} style={sectionStyle}>
                  <h4 style={sectionHeaderStyle}><FaTools style={iconStyle} /> {currentLabels.action}</h4>
                  <p style={textStyle}>{project.details.action}</p>
                </div>
              )}
              {project.details.result && (
                <div className={styles.modalSection} style={sectionStyle}>
                  <h4 style={sectionHeaderStyle}><FaChartLine style={iconStyle} /> {currentLabels.result}</h4>
                  <p style={textStyle}>{project.details.result}</p>
                </div>
              )}
            </>
          ) : (
            <>
              {project.details.problem && (
                <div className={styles.modalSection} style={sectionStyle}>
                  <h4 style={sectionHeaderStyle}><FaExclamationCircle style={{ ...iconStyle, color: '#ef4444' }} /> {currentLabels.problem}</h4>
                  <p style={textStyle}>{project.details.problem}</p>
                </div>
              )}
              {project.details.role && (
                <div className={styles.modalSection} style={sectionStyle}>
                  <h4 style={sectionHeaderStyle}><FaUserTie style={iconStyle} /> {currentLabels.role}</h4>
                  <p style={textStyle}>{project.details.role}</p>
                </div>
              )}
              {project.details.solution && (
                <div className={styles.modalSection} style={sectionStyle}>
                  <h4 style={sectionHeaderStyle}><FaLightbulb style={{ ...iconStyle, color: '#eab308' }} /> {currentLabels.solution}</h4>
                  <p style={textStyle}>{project.details.solution}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;