// Dashboard Application
class CryptoCashierDashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.loadDashboardData();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                if (section && section !== 'logout') {
                    this.navigateToSection(section);
                }
            });
        });

        // Date selector
        document.querySelectorAll('[data-period]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-period]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateDateRange(e.target.dataset.period);
            });
        });

        // Buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleButtonClick(e.target);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Filter functionality
        document.querySelectorAll('.filter-select, .filter-date').forEach(filter => {
            filter.addEventListener('change', () => {
                this.applyFilters();
            });
        });
    }

    navigateToSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');

        // Update page title and subtitle
        const titles = {
            dashboard: { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your overview.' },
            transactions: { title: 'Transactions', subtitle: 'View and manage all your transactions.' },
            balances: { title: 'Balances', subtitle: 'Monitor your cryptocurrency holdings.' },
            clients: { title: 'Clients', subtitle: 'Manage your clients and subaccounts.' },
            reports: { title: 'Reports', subtitle: 'Download reports and analytics.' },
            settings: { title: 'Settings', subtitle: 'Configure your account and preferences.' },
            support: { title: 'Support', subtitle: 'Get help and access documentation.' }
        };

        const sectionInfo = titles[sectionName];
        if (sectionInfo) {
            document.getElementById('pageTitle').textContent = sectionInfo.title;
            document.getElementById('pageSubtitle').textContent = sectionInfo.subtitle;
        }

        this.currentSection = sectionName;
        this.loadSectionData(sectionName);
    }

    initializeCharts() {
        // Volume Chart
        const volumeCtx = document.getElementById('volumeChart');
        if (volumeCtx) {
            this.charts.volume = new Chart(volumeCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Deposits',
                        data: [1200000, 1900000, 1500000, 2500000, 2200000, 3000000],
                        borderColor: '#16f98a',
                        backgroundColor: 'rgba(22, 249, 138, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Withdrawals',
                        data: [800000, 1200000, 900000, 1800000, 1500000, 2200000],
                        borderColor: '#e53e3e',
                        backgroundColor: 'rgba(229, 62, 62, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#a0aec0'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#a0aec0'
                            },
                            grid: {
                                color: '#2d3748'
                            }
                        },
                        y: {
                            ticks: {
                                color: '#a0aec0',
                                callback: function(value) {
                                    return '$' + (value / 1000000).toFixed(1) + 'M';
                                }
                            },
                            grid: {
                                color: '#2d3748'
                            }
                        }
                    }
                }
            });
        }

        // Balance Chart
        const balanceCtx = document.getElementById('balanceChart');
        if (balanceCtx) {
            this.charts.balance = new Chart(balanceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['BTC', 'USDT', 'ETH'],
                    datasets: [{
                        data: [847392, 587971, 127457],
                        backgroundColor: [
                            '#f7931a',
                            '#26a17b',
                            '#627eea'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#a0aec0',
                                padding: 20
                            }
                        }
                    }
                }
            });
        }
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        this.showToast('Dashboard data loaded successfully', 'success');
    }

    loadSectionData(section) {
        switch (section) {
            case 'transactions':
                this.loadTransactions();
                break;
            case 'balances':
                this.loadBalances();
                break;
            case 'clients':
                this.loadClients();
                break;
            case 'reports':
                this.loadReports();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    loadTransactions() {
        // Simulate loading transactions
        console.log('Loading transactions...');
    }

    loadBalances() {
        // Simulate loading balances
        console.log('Loading balances...');
    }

    loadClients() {
        // Simulate loading clients
        console.log('Loading clients...');
    }

    loadReports() {
        // Simulate loading reports
        console.log('Loading reports...');
    }

    loadSettings() {
        // Simulate loading settings
        console.log('Loading settings...');
    }

    updateDateRange(period) {
        console.log(`Updating date range to: ${period} days`);
        // Update charts and data based on selected period
        this.showToast(`Date range updated to last ${period} days`, 'success');
    }

    handleButtonClick(button) {
        const buttonText = button.textContent.trim();
        const buttonClass = button.className;

        if (buttonText.includes('Deposit')) {
            this.handleDeposit();
        } else if (buttonText.includes('Withdraw')) {
            this.handleWithdraw();
        } else if (buttonText.includes('Export')) {
            this.handleExport();
        } else if (buttonText.includes('Download')) {
            this.handleDownload();
        } else if (buttonText.includes('Save')) {
            this.handleSave();
        } else if (buttonText.includes('Create')) {
            this.handleCreate();
        } else if (buttonText.includes('View Details')) {
            this.handleViewDetails();
        }
    }

    handleDeposit() {
        this.showToast('Opening deposit dialog...', 'info');
        // Implement deposit functionality
    }

    handleWithdraw() {
        this.showToast('Opening withdrawal dialog...', 'info');
        // Implement withdrawal functionality
    }

    handleExport() {
        this.showToast('Exporting data to CSV...', 'success');
        // Implement export functionality
    }

    handleDownload() {
        this.showToast('Downloading report...', 'success');
        // Implement download functionality
    }

    handleSave() {
        this.showToast('Settings saved successfully', 'success');
        // Implement save functionality
    }

    handleCreate() {
        this.showToast('Creating new item...', 'info');
        // Implement create functionality
    }

    handleViewDetails() {
        this.showToast('Opening details view...', 'info');
        // Implement view details functionality
    }

    handleSearch(query) {
        console.log(`Searching for: ${query}`);
        // Implement search functionality
    }

    applyFilters() {
        console.log('Applying filters...');
        // Implement filter functionality
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type} fade-in`;
        
        const icon = this.getToastIcon(type);
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    setupAnimations() {
        // Add loading animations to KPI cards
        document.querySelectorAll('.kpi-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });

        // Add hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-1px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }

    // API Integration methods
    async apiCall(endpoint, options = {}) {
        const baseURL = 'https://crypto-cashier-production.up.railway.app';
        const url = `${baseURL}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Call failed:', error);
            this.showToast('API call failed: ' + error.message, 'error');
            throw error;
        }
    }

    // Data loading methods
    async loadRealData() {
        try {
            // Load dashboard KPIs
            const dashboardData = await this.apiCall('/api/dashboard/stats');
            this.updateKPIs(dashboardData);

            // Load transactions
            const transactions = await this.apiCall('/api/transactions');
            this.updateTransactionsTable(transactions);

            // Load balances
            const balances = await this.apiCall('/api/balances');
            this.updateBalances(balances);

        } catch (error) {
            console.error('Failed to load real data:', error);
            this.showToast('Failed to load data from server', 'error');
        }
    }

    updateKPIs(data) {
        // Update KPI cards with real data
        if (data.volume) {
            document.querySelector('.kpi-value').textContent = `$${data.volume.toLocaleString()}`;
        }
        // Update other KPIs...
    }

    updateTransactionsTable(transactions) {
        // Update transactions table with real data
        console.log('Updating transactions table:', transactions);
    }

    updateBalances(balances) {
        // Update balances with real data
        console.log('Updating balances:', balances);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new CryptoCashierDashboard();
    
    // Load real data if API is available
    setTimeout(() => {
        window.dashboard.loadRealData();
    }, 1000);
});

// Utility functions
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

// Export for use in other scripts
window.CryptoCashierDashboard = CryptoCashierDashboard;