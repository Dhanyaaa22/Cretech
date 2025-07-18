export enum ROUTER_PATHS {
  HOME = '/',
  INTRODUCTION = '/introduction',
  SUBSCRIPTIONS = '/subscriptions',
  OVERVIEW = '/overview',
  ASSETS = '/assets',
  ADMINISTRATION = '/administration',
  REQUESTS = 'requests',
  MONITORING = '/monitoring',
  NOT_FOUND = '/404',
  ALERTS = "ALERTS",
}

export enum SUBSCRIPTION_DETAILS_TABS {
  CURRENT_CONSUMPTION = 'current_consumption',
  CONSUMPTION_TREND = 'consumption_trend',
  SUBSCRIPTION_TIMELINE = 'subscription_timeline',
  ASSETS = 'assets',
  // ALERT_MONITORS = 'alert_monitors',
}

export enum ASSETS_TABS {
  NODES_IN_CLUSTERS = 'nodes_in_clusters',
  VOLUMES_IN_CLUSTERS = 'volumes_in_clusters',
  NODES_IN_GRIDS = 'nodes_in_grids',
}

export enum SUBSCRIPTIONS_TABS {
  SUBSCRIPTIONS = 'subscriptions',
  PERFORMANCE_LEVELS = 'performance_levels',
}

export enum ADMINISTRATION_TABS {
  REQUESTS = 'requests',
  COLLECTOR_MANAGEMENT = 'collector_management',
  SERVICE_LEVEL = 'service_level',
}

export enum MONITORING_TABS {
  ALERTS = 'alerts',
  ALERT_MONITORS = 'alert_monitors',
  REPORTS = 'reports',
}