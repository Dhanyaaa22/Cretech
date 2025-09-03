import { MONITORING_TABS } from '@routes/routes.interface';
import AlertsTab from './AlertsTab';

interface MonitoringTabsProps {
  handleTabClick: (tab: MONITORING_TABS) => void;
  currentTab: MONITORING_TABS;
}

const MonitoringTabs: React.FC<MonitoringTabsProps> = ({ currentTab }) => {
  const renderTabContent = () => {
    switch (currentTab) {
      case MONITORING_TABS.ALERTS:
        return <AlertsTab />;
      default:
        return <AlertsTab />;
    }
  };

  return <>{renderTabContent()}</>;
};

export default MonitoringTabs;