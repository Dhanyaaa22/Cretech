// Sample alerts data matching the NetApp BlueXP interface
const alertsData = [
    {
        id: 1783,
        severity: 'Critical',
        alert: 'Capacity usage > 90%',
        triggeredTime: 'July 25, 2023, 9:44 AM',
        subscriptionNumber: '1789858600',
        trackingId: 'Honda-AHO',
        performanceServiceLevel: 'Extreme',
        status: 'Active'
    },
    {
        id: 1784,
        severity: 'Critical',
        alert: 'Capacity usage > 90%',
        triggeredTime: 'July 23, 2023, 4:56 AM',
        subscriptionNumber: '1951152300',
        trackingId: 'BMW-AHO',
        performanceServiceLevel: 'Standard',
        status: 'Resolved'
    },
    {
        id: 1785,
        severity: 'Warning',
        alert: 'Capacity usage > 80%',
        triggeredTime: 'July 22, 2023, 4:56 AM',
        subscriptionNumber: '1899053400',
        trackingId: 'Ferrari-AHO',
        performanceServiceLevel: 'Extreme',
        status: 'Active'
    },
    {
        id: 1786,
        severity: 'Critical',
        alert: 'Subscription expiry < 0 days',
        triggeredTime: 'July 22, 2023, 4:56 AM',
        subscriptionNumber: '1654987400',
        trackingId: 'Honda-AHO',
        performanceServiceLevel: '-',
        status: 'Active'
    },
    {
        id: 1794,
        severity: 'Critical',
        alert: 'Subscription expiry < 0 days',
        triggeredTime: 'July 22, 2023, 4:56 AM',
        subscriptionNumber: '1961039500',
        trackingId: 'Toyota-AHO',
        performanceServiceLevel: '-',
        status: 'Active'
    },
    {
        id: 1799,
        severity: 'Warning',
        alert: 'Subscription expiry < 30 days',
        triggeredTime: 'July 22, 2023, 4:56 AM',
        subscriptionNumber: '1961039501',
        trackingId: 'Honda-AHO',
        performanceServiceLevel: '-',
        status: 'Active'
    }
];

// DOM elements
let currentSortColumn = null;
let currentSortDirection = 'asc';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabSwitching();
    populateAlertsTable();
    initializeTableSorting();
    initializeTableActions();
    updateAlertCounts();
});

// Tab switching functionality
function initializeTabSwitching() {
    const tabs = document.querySelectorAll('.sub-nav-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Populate the alerts table with data
function populateAlertsTable() {
    const tableBody = document.getElementById('alerts-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    alertsData.forEach(alert => {
        const row = createTableRow(alert);
        tableBody.appendChild(row);
    });
}

// Create a table row for an alert
function createTableRow(alert) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <span class="severity-badge ${alert.severity.toLowerCase()}">
                <i class="fas ${getSeverityIcon(alert.severity)}"></i>
                ${alert.severity}
            </span>
        </td>
        <td>${alert.id}</td>
        <td>
            <a href="#" class="alert-link">${alert.alert}</a>
        </td>
        <td>${alert.triggeredTime}</td>
        <td>
            <a href="#" class="alert-link">${alert.subscriptionNumber}</a>
        </td>
        <td>${alert.trackingId}</td>
        <td>${alert.performanceServiceLevel}</td>
        <td>
            <span class="status-badge ${alert.status.toLowerCase()}">
                <i class="fas ${getStatusIcon(alert.status)}"></i>
                ${alert.status}
            </span>
        </td>
    `;

    return row;
}

// Get icon for severity
function getSeverityIcon(severity) {
    switch (severity.toLowerCase()) {
        case 'critical':
            return 'fa-times-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'informational':
            return 'fa-info-circle';
        default:
            return 'fa-circle';
    }
}

// Get icon for status
function getStatusIcon(status) {
    switch (status.toLowerCase()) {
        case 'active':
            return 'fa-bell';
        case 'resolved':
            return 'fa-check-circle';
        default:
            return 'fa-circle';
    }
}

// Initialize table sorting functionality
function initializeTableSorting() {
    const headers = document.querySelectorAll('.alerts-table th');
    
    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            sortTable(index, header);
        });
    });
}

// Sort table by column
function sortTable(columnIndex, headerElement) {
    const table = document.querySelector('.alerts-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Determine sort direction
    if (currentSortColumn === columnIndex) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortDirection = 'asc';
        currentSortColumn = columnIndex;
    }
    
    // Update header icons
    updateSortIcons(headerElement, currentSortDirection);
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = getCellValue(a, columnIndex);
        const bValue = getCellValue(b, columnIndex);
        
        if (currentSortDirection === 'asc') {
            return aValue.localeCompare(bValue, undefined, { numeric: true });
        } else {
            return bValue.localeCompare(aValue, undefined, { numeric: true });
        }
    });
    
    // Reappend sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

// Get cell value for sorting
function getCellValue(row, columnIndex) {
    const cell = row.cells[columnIndex];
    return cell.textContent.trim();
}

// Update sort icons in table headers
function updateSortIcons(activeHeader, direction) {
    // Reset all icons
    document.querySelectorAll('.alerts-table th i').forEach(icon => {
        icon.className = 'fas fa-sort';
    });
    
    // Set active header icon
    const icon = activeHeader.querySelector('i');
    if (direction === 'asc') {
        icon.className = 'fas fa-sort-up';
    } else {
        icon.className = 'fas fa-sort-down';
    }
}

// Initialize table action buttons
function initializeTableActions() {
    const filterBtn = document.querySelector('.filter-btn');
    const exportBtn = document.querySelector('.export-btn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            // Placeholder for filter functionality
            console.log('Filter functionality not implemented');
            showToast('Filter functionality will be implemented in a future version');
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportTableData();
        });
    }
}

// Export table data as CSV
function exportTableData() {
    const headers = ['Severity', 'Alert ID', 'Alert', 'Triggered Time', 'Subscription Number', 'Tracking ID', 'Performance Service Level', 'Status'];
    
    let csvContent = headers.join(',') + '\n';
    
    alertsData.forEach(alert => {
        const row = [
            alert.severity,
            alert.id,
            `"${alert.alert}"`,
            `"${alert.triggeredTime}"`,
            alert.subscriptionNumber,
            alert.trackingId,
            alert.performanceServiceLevel,
            alert.status
        ];
        csvContent += row.join(',') + '\n';
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alerts-export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showToast('Alerts data exported successfully');
}

// Update alert counts in summary cards
function updateAlertCounts() {
    const criticalCount = alertsData.filter(alert => alert.severity === 'Critical').length;
    const warningCount = alertsData.filter(alert => alert.severity === 'Warning').length;
    const informationalCount = alertsData.filter(alert => alert.severity === 'Informational').length;
    
    const capacityCount = alertsData.filter(alert => alert.alert.includes('Capacity')).length;
    const subscriptionCount = alertsData.filter(alert => alert.alert.includes('Subscription')).length;
    
    // Update severity counts
    const severityCards = document.querySelectorAll('.severity-cards .alert-card');
    if (severityCards[0]) severityCards[0].querySelector('.alert-count').textContent = criticalCount;
    if (severityCards[1]) severityCards[1].querySelector('.alert-count').textContent = warningCount;
    if (severityCards[2]) severityCards[2].querySelector('.alert-count').textContent = informationalCount;
    
    // Update type counts
    const typeCards = document.querySelectorAll('.type-cards .alert-card');
    if (typeCards[0]) typeCards[0].querySelector('.alert-count').textContent = subscriptionCount;
    if (typeCards[1]) typeCards[1].querySelector('.alert-count').textContent = capacityCount;
    
    // Update table header count
    const tableHeader = document.querySelector('.table-header h3');
    if (tableHeader) {
        tableHeader.textContent = `Alerts (${alertsData.length})`;
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 12px 16px;
        border-radius: 6px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .toast-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                margin-left: auto;
                padding: 0;
                opacity: 0.8;
            }
            
            .toast-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// Add event listeners for alert card view links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-link')) {
        e.preventDefault();
        const card = e.target.closest('.alert-card');
        const alertType = card.querySelector('.alert-label').textContent;
        showToast(`Showing alerts for: ${alertType}`);
        
        // Here you could implement filtering logic
        // For now, just show a notification
    }
    
    if (e.target.classList.contains('alert-link')) {
        e.preventDefault();
        showToast('Alert details view not implemented');
    }
});

// Simulate real-time updates
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Update the last updated timestamp
        const lastUpdated = document.querySelector('.last-updated span');
        if (lastUpdated) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            };
            lastUpdated.textContent = `Last updated: ${now.toLocaleDateString('en-US', options)}`;
        }
    }, 30000); // Update every 30 seconds
}

// Start real-time updates
simulateRealTimeUpdates();

// Handle responsive navigation
function initializeResponsiveNav() {
    const pageNav = document.querySelector('.page-nav');
    const subNav = document.querySelector('.sub-nav');
    
    // Add touch scroll for mobile
    if (window.innerWidth <= 768) {
        [pageNav, subNav].forEach(nav => {
            if (nav) {
                nav.style.scrollBehavior = 'smooth';
            }
        });
    }
}

// Initialize responsive features
window.addEventListener('resize', initializeResponsiveNav);
initializeResponsiveNav();