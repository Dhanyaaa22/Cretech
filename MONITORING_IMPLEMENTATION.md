# Monitoring Container Implementation

This document provides a complete implementation of the Monitoring container with alerts functionality, following the existing patterns in your codebase.

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
│   │   └── AlertsBySeverityCard.tsx
│   ├── AlertsByTypeCard/
│   │   └── AlertsByTypeCard.tsx
│   ├── AlertsCards/
│   │   └── AlertsCards.tsx        # Parent component
│   └── index.ts                   # Component exports
├── containers/Monitoring/
│   ├── AlertsTab.tsx              # Main container component
│   ├── AlertsTab.interface.ts
│   ├── constants.ts               # Filter constants
│   └── index.ts                   # Container exports
```

## 🎯 Components Implemented

### 1. AlertsBySeverityCard
- **Purpose**: Displays alerts grouped by severity (Critical, Warning, Informational)
- **Features**: 
  - Uses `KSMetricCard` from ks-common
  - Shows counts for each severity level
  - Handles click events for filtering
  - Includes loading state with `CardLoader`

### 2. AlertsByTypeCard
- **Purpose**: Displays alerts grouped by type (Subscription Expiration, Capacity Usage)
- **Features**:
  - Similar structure to AlertsBySeverityCard
  - Type-specific metrics
  - Filter integration

### 3. AlertsCards (Parent Component)
- **Purpose**: Layout component that renders both alert cards
- **Features**:
  - Responsive flexbox layout
  - Matches the pattern from `NodesInClustersCards`

### 4. AlertsTab (Container)
- **Purpose**: Main container component for the alerts tab
- **Features**:
  - Data fetching using RTK Query
  - Redux state management
  - Error handling
  - Loading state management

## 🔧 Redux Integration

### Monitoring Slice
- **State**: 
  - `alertsSummaryData`: Stores alert summary information
  - `alertsLoading`: Loading state
  - `filters`: Filter state for alerts
- **Actions**:
  - `setAlertsSummaryData`: Updates alert data
  - `setAlertsLoading`: Updates loading state
  - `setFilters`: Updates filter state

### API Integration
- **Endpoint**: `/monitoring/alerts`
- **Query Hook**: `useGetAlertsDataQuery`
- **Response Type**: `MonitoringApiResponse`

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

### To integrate with your existing application:

1. **Add to Redux Store**: Include the monitoring reducer in your store configuration
2. **Update API**: Ensure the monitoring API endpoints are available
3. **Add to Router**: Include the AlertsTab in your routing configuration
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

## 🔄 Filter Integration

The components integrate with the existing filter system:
- Uses `ADVANCE_FILTER_KEYS_ALERTS` constants
- Dispatches filter actions on card clicks
- Follows the same pattern as the Assets filters

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
- ✅ Redux slice for monitoring state
- ✅ API service integration
- ✅ TypeScript interfaces for type safety
- ✅ Consistent styling using ks-common
- ✅ React hooks for state and lifecycle management
- ✅ Loading states and error handling
- ✅ Filter integration following existing patterns

This implementation provides a solid foundation for the monitoring alerts functionality and can be easily extended with additional features as needed.