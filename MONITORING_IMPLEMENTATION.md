# Monitoring Container Implementation - Alerts Tab

This document provides a complete implementation of the Alerts functionality for the existing Monitoring container, following the established patterns and structure of your codebase.

## 📂 File Structure Created

```
src/
├── services/monitoring/
│   ├── monitoring.interface.ts    # TypeScript interfaces for alerts
│   └── monitoring.api.ts          # API service for monitoring endpoints
├── redux/monitoring/
│   ├── monitoringSlice.interface.ts
│   └── monitoringSlice.ts         # Redux slice for monitoring state
├── components/monitoring/
│   ├── AlertsBySeverityCard/
│   │   ├── AlertsBySeverityCard.tsx
│   │   └── AlertsBySeverityCard.interface.ts
│   ├── AlertsByTypeCard/
│   │   ├── AlertsByTypeCard.tsx
│   │   └── AlertsByTypeCard.interface.ts
│   ├── AlertsCards/
│   │   ├── AlertsCards.tsx        # Parent component
│   │   └── AlertsCards.interface.ts
│   └── index.ts                   # Component exports
├── containers/Monitoring/
│   ├── AlertsTab.tsx              # Main container component
│   ├── AlertsTab.interface.ts     # Includes AlertsTabReturn interface
│   └── index.ts                   # Container exports
```

## 🎯 Components Implemented

### 1. AlertsBySeverityCard
- **Purpose**: Displays alerts grouped by severity (Critical, Warning, Informational)
- **Props**: `AlertsBySeverityCardProps` - receives `alertsSummaryData`, `alertsLoading`, and optional `className`
- **Features**: 
  - Uses `KSMetricCard` from ks-common
  - Shows counts for each severity level
  - Handles click events for filtering
  - Includes loading state with `CardLoader`

### 2. AlertsByTypeCard
- **Purpose**: Displays alerts grouped by type (Subscription Expiration, Capacity Usage)
- **Props**: `AlertsByTypeCardProps` - receives `alertsSummaryData`, `alertsLoading`, and optional `className`
- **Features**:
  - Similar structure to AlertsBySeverityCard
  - Type-specific metrics
  - Filter integration

### 3. AlertsCards (Parent Component)
- **Purpose**: Layout component that renders both alert cards
- **Props**: `AlertsCardsProps` - receives `alertsSummaryData`, `alertsLoading`, and optional `className`
- **Features**:
  - Responsive flexbox layout
  - Passes props down to child cards
  - Matches the pattern from `NodesInClustersCards`

### 4. AlertsTab (Container)
- **Purpose**: Main container component for the alerts tab
- **Props**: `AlertsTabProps` - receives optional `className`
- **Return Interface**: `AlertsTabReturn` - provides `alertsSummaryData`, `alertsLoading`, and `refetchAlertsData`
- **Features**:
  - Data fetching using RTK Query
  - Redux state management
  - Error handling
  - Loading state management
  - Returns constant interface for container usage

## 🔧 Redux Integration

### Monitoring Slice (Updated)
- **State**: 
  - `monitorsData`: Existing monitors data
  - `monitorsLoading`: Existing monitors loading state  
  - `monitorsTimestamp`: Existing monitors timestamp
  - `alertsSummaryData`: NEW - Stores alert summary information
  - `alertsLoading`: NEW - Loading state for alerts
- **Actions**:
  - `setMonitorsData`: Existing action
  - `setMonitorsLoading`: Existing action
  - `setMonitorsTimestamp`: Existing action
  - `setAlertsSummaryData`: NEW - Updates alert data
  - `setAlertsLoading`: NEW - Updates loading state

### API Integration
- **Endpoint**: `/monitoring/alerts`
- **Method**: Direct API call using `MonitoringAPI.getAlertsData`
- **Response Type**: `ApiResponse<MonitoringApiResponse>`
- **Pattern**: Follows existing `getAllMonitors` implementation

## 🎨 Styling & UI

- **Framework**: Uses `ks-common` library for consistent styling
- **Layout**: Responsive design with Tailwind CSS classes
- **Icons**: NetApp BXP Style React icons
- **Color Scheme**: Follows existing color patterns (i8, i6, i4, etc.)

## 📋 Data Structure

### AlertsSummaryData Interface
```typescript
interface AlertsSummaryData {
  critical_alerts: Alert[];
  warning_alerts: Alert[];
  informational_alerts: Alert[];
  subscription_expiration_alerts: Alert[];
  capacity_usage_alerts: Alert[];
}
```

### Alert Interface
```typescript
interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  type: AlertType;
  timestamp: string;
  source: string;
  status: AlertStatus;
}
```

## 🔗 Integration Points

### Integration with existing Monitoring system:

1. **Redux Store**: ✅ Already integrated - updated existing monitoring slice
2. **API Service**: ✅ Added `getAlertsData` to existing `MonitoringAPI`
3. **Add to MonitoringTabs**: Include the AlertsTab in your tab routing
4. **Localization**: Add the required translation keys to your locales

### Required Translation Keys:
```typescript
'keystone.labels.criticalAlerts'
'keystone.labels.warningAlerts'
'keystone.labels.informationalAlerts'
'keystone.labels.subscriptionExpiration'
'keystone.labels.capacityUsage'
'keystone.headers.unresolvedAlertsBySeverity'
'keystone.headers.unresolvedAlertsByType'
```

## 🚀 Usage Example

```tsx
import { AlertsTab } from '@containers/Monitoring';

// In your tab container or routing component
<AlertsTab />
```

## 🔄 Current Implementation Notes

- **No Filters**: Currently implemented without filter functionality to match existing monitoring pattern
- **Direct API Calls**: Uses the same pattern as existing monitors functionality
- **Error Handling**: Includes proper error handling with notifications
- **Loading States**: Manages loading states consistently with existing code

## 📈 Future Enhancements

1. **AlertsTable**: Add a data table component for detailed alert viewing
2. **Alert Details**: Implement drill-down functionality
3. **Real-time Updates**: Add WebSocket integration for live updates
4. **Alert Actions**: Add acknowledge/resolve functionality

## ✅ Features Completed

- ✅ Two metric cards (AlertsBySeverityCard, AlertsByTypeCard)
- ✅ Parent component (AlertsCards) 
- ✅ Interface definitions for component communication
- ✅ AlertsTab container implementation
- ✅ Updated existing monitoring Redux slice
- ✅ Extended existing MonitoringAPI service
- ✅ TypeScript interfaces for type safety
- ✅ Consistent styling using ks-common
- ✅ React hooks for state and lifecycle management
- ✅ Loading states and error handling
- ✅ Follows established monitoring patterns
- ✅ Proper props flow from container to components
- ✅ Return constants interface for container usage

## 🎯 Key Alignments with Existing Code

- **API Pattern**: Matches `getAllMonitors` implementation exactly
- **Redux Structure**: Extends existing monitoring slice without breaking changes
- **Error Handling**: Uses same notification system as MonitoringPage
- **Component Structure**: Follows same patterns as other tab components
- **Props Flow**: Container manages data, components receive props
- **Loading States**: Consistent with existing monitoring loading management

This implementation seamlessly integrates with your existing monitoring system and provides a solid foundation for alerts functionality.