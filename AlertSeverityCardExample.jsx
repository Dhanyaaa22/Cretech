import React, { useState } from 'react';
import AlertSeverityCard from './AlertSeverityCard';

const AlertSeverityCardExample = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      severity: 'success',
      title: 'Success!',
      message: 'Your action was completed successfully.',
      show: true
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Warning',
      message: 'Please check your input before proceeding.',
      show: true
    },
    {
      id: 3,
      severity: 'error',
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      show: true
    },
    {
      id: 4,
      severity: 'info',
      title: 'Information',
      message: 'Here is some useful information for you.',
      show: true
    },
    {
      id: 5,
      severity: 'critical',
      title: 'Critical Alert',
      message: 'This requires immediate attention!',
      show: true
    }
  ]);

  const [customBgColor, setCustomBgColor] = useState('#f0f8ff');

  const handleCloseAlert = (alertId) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, show: false } : alert
      )
    );
  };

  const resetAlerts = () => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert => ({ ...alert, show: true }))
    );
  };

  const addCustomAlert = () => {
    const newAlert = {
      id: Date.now(),
      severity: 'info',
      title: 'Custom Alert',
      message: 'This alert has a custom background color!',
      show: true,
      customBgColor: customBgColor
    };
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AlertSeverityCard Examples</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={resetAlerts} style={{ marginRight: '10px' }}>
          Reset All Alerts
        </button>
        
        <input
          type="color"
          value={customBgColor}
          onChange={(e) => setCustomBgColor(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        
        <button onClick={addCustomAlert}>
          Add Custom Background Alert
        </button>
      </div>

      <div className="alerts-container">
        {alerts.filter(alert => alert.show).map(alert => (
          <AlertSeverityCard
            key={alert.id}
            severity={alert.severity}
            title={alert.title}
            message={alert.message}
            customBgColor={alert.customBgColor}
            onClose={() => handleCloseAlert(alert.id)}
            autoClose={alert.severity === 'success'} // Auto-close success alerts
            autoCloseDelay={3000}
          />
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Usage Examples</h2>
        
        <h3>Basic Usage:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`<AlertSeverityCard
  severity="success"
  title="Success!"
  message="Your action was completed successfully."
  onClose={() => console.log('Alert closed')}
/>`}
        </pre>

        <h3>With Custom Background Color:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`<AlertSeverityCard
  severity="info"
  title="Custom Alert"
  message="This has a custom background color!"
  customBgColor="#e6f3ff"
  onClose={() => console.log('Alert closed')}
/>`}
        </pre>

        <h3>Auto-closing Alert:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`<AlertSeverityCard
  severity="warning"
  title="Auto-closing Alert"
  message="This will close automatically in 5 seconds."
  autoClose={true}
  autoCloseDelay={5000}
  onClose={() => console.log('Alert auto-closed')}
/>`}
        </pre>

        <h3>Available Severity Types:</h3>
        <ul>
          <li><strong>success</strong> - Green theme for successful actions</li>
          <li><strong>warning</strong> - Yellow theme for warnings</li>
          <li><strong>error</strong> - Red theme for errors</li>
          <li><strong>info</strong> - Blue theme for information</li>
          <li><strong>critical</strong> - Red theme with pulsing animation</li>
        </ul>
      </div>
    </div>
  );
};

export default AlertSeverityCardExample;