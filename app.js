// Cashira Frontend Application
class CashiraApp {
    constructor() {
        this.apiBase = \'https://crypto-cashier-production.up.railway.app\'; // Cambiar por la URL de Railway
        this.token = localStorage.getItem('cashira_token');
        this.user = null;
        this.currentTenant = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuth();
    }

    setupEventListeners() {
        // Login
        document.getElementById('loginBtn').addEventListener('click', () => {
            document.getElementById('loginModal').style.display = 'block';
        });

        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Close modal
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('loginModal').style.display = 'none';
        });

        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Admin forms
        document.getElementById('createTenantForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createTenant();
        });

        document.getElementById('loadTenantsBtn').addEventListener('click', () => {
            this.loadTenants();
        });

        // Tenant forms
        document.getElementById('createDepositForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createDeposit();
        });

        document.getElementById('loadDepositsBtn').addEventListener('click', () => {
            this.loadDeposits();
        });

        document.getElementById('withdrawalQuoteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.getWithdrawalQuote();
        });

        // Pricing
        document.getElementById('loadPricesBtn').addEventListener('click', () => {
            this.loadPrices();
        });
    }

    async checkAuth() {
        if (this.token) {
            try {
                const response = await this.apiCall('/me');
                this.user = response;
                this.showDashboard();
            } catch (error) {
                console.error('Auth check failed:', error);
                this.logout();
            }
        } else {
            this.showWelcome();
        }
    }

    async login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${this.apiBase}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                this.token = data.access_token;
                localStorage.setItem('cashira_token', this.token);
                
                // Get user info
                const userResponse = await this.apiCall('/me');
                this.user = userResponse;
                
                document.getElementById('loginModal').style.display = 'none';
                this.showDashboard();
                this.showMessage('Login exitoso', 'success');
            } else {
                const error = await response.json();
                this.showMessage(`Error: ${error.detail}`, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('Error de conexión', 'error');
        }
    }

    logout() {
        this.token = null;
        this.user = null;
        this.currentTenant = null;
        localStorage.removeItem('cashira_token');
        this.showWelcome();
        this.showMessage('Sesión cerrada', 'success');
    }

    async apiCall(endpoint, options = {}) {
        const url = `${this.apiBase}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { 'Authorization': `Bearer ${this.token}` })
            },
            ...options
        };

        const response = await fetch(url, config);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'API Error');
        }

        return await response.json();
    }

    showWelcome() {
        document.getElementById('welcomeScreen').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-block';

        // Update user info
        document.getElementById('userEmail').textContent = this.user.email;
        document.getElementById('userRole').textContent = this.user.role;

        // Show appropriate panel
        if (this.user.role === 'ADMIN') {
            document.getElementById('adminPanel').style.display = 'block';
            document.getElementById('tenantPanel').style.display = 'none';
        } else {
            document.getElementById('adminPanel').style.display = 'none';
            document.getElementById('tenantPanel').style.display = 'block';
        }
    }

    async createTenant() {
        const formData = new FormData(document.getElementById('createTenantForm'));
        const data = {
            name: formData.get('name'),
            kyc_level: parseInt(formData.get('kyc_level')),
            chains_enabled: {
                btc: formData.getAll('chains').includes('btc'),
                tron: formData.getAll('chains').includes('tron'),
                bep20: formData.getAll('chains').includes('bep20')
            },
            limits: {
                daily_deposit: 10000,
                daily_withdrawal: 5000
            }
        };

        try {
            const response = await this.apiCall('/admin/tenants', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            
            this.showMessage('Tenant creado exitosamente', 'success');
            document.getElementById('createTenantForm').reset();
            this.loadTenants();
        } catch (error) {
            this.showMessage(`Error: ${error.message}`, 'error');
        }
    }

    async loadTenants() {
        try {
            const tenants = await this.apiCall('/admin/tenants');
            this.displayTenants(tenants);
        } catch (error) {
            this.showMessage(`Error cargando tenants: ${error.message}`, 'error');
        }
    }

    displayTenants(tenants) {
        const container = document.getElementById('tenantsList');
        container.innerHTML = '';

        if (tenants.length === 0) {
            container.innerHTML = '<p>No hay tenants</p>';
            return;
        }

        tenants.forEach(tenant => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div class="list-item-info">
                    <h5>${tenant.name}</h5>
                    <p>KYC Level: ${tenant.kyc_level}</p>
                    <p>Chains: ${Object.keys(tenant.chains_enabled).filter(k => tenant.chains_enabled[k]).join(', ')}</p>
                    <p>Created: ${new Date(tenant.created_at).toLocaleDateString()}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-secondary" onclick="app.selectTenant('${tenant.id}')">Seleccionar</button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    selectTenant(tenantId) {
        this.currentTenant = tenantId;
        this.showMessage('Tenant seleccionado', 'success');
    }

    async createDeposit() {
        if (!this.currentTenant) {
            this.showMessage('Selecciona un tenant primero', 'error');
            return;
        }

        const formData = new FormData(document.getElementById('createDepositForm'));
        const data = {
            chain: formData.get('chain'),
            token: formData.get('chain') === 'btc' ? 'BTC' : 'USDT',
            amount_expected: parseFloat(formData.get('amount_expected'))
        };

        try {
            const response = await this.apiCall(`/tenants/${this.currentTenant}/deposits`, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            
            this.showMessage('Depósito creado exitosamente', 'success');
            this.displayDepositInfo(response);
            document.getElementById('createDepositForm').reset();
            this.loadDeposits();
        } catch (error) {
            this.showMessage(`Error: ${error.message}`, 'error');
        }
    }

    displayDepositInfo(deposit) {
        const info = `
            <div class="card">
                <h4>Información del Depósito</h4>
                <p><strong>ID:</strong> ${deposit.id}</p>
                <p><strong>Chain:</strong> ${deposit.chain}</p>
                <p><strong>Token:</strong> ${deposit.token}</p>
                <p><strong>Monto:</strong> ${deposit.amount_expected}</p>
                <p><strong>Address:</strong></p>
                <div class="address-display">${deposit.address}</div>
                <p><strong>QR Code:</strong></p>
                <div class="qr-code">
                    <img src="${deposit.qr_payload}" alt="QR Code">
                </div>
            </div>
        `;
        
        // Show in a modal or dedicated area
        this.showMessage(info, 'success');
    }

    async loadDeposits() {
        if (!this.currentTenant) {
            this.showMessage('Selecciona un tenant primero', 'error');
            return;
        }

        try {
            const deposits = await this.apiCall(`/tenants/${this.currentTenant}/deposits`);
            this.displayDeposits(deposits);
        } catch (error) {
            this.showMessage(`Error cargando depósitos: ${error.message}`, 'error');
        }
    }

    displayDeposits(deposits) {
        const container = document.getElementById('depositsList');
        container.innerHTML = '';

        if (deposits.length === 0) {
            container.innerHTML = '<p>No hay depósitos</p>';
            return;
        }

        deposits.forEach(deposit => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div class="list-item-info">
                    <h5>${deposit.chain.toUpperCase()} - ${deposit.token}</h5>
                    <p>Monto: ${deposit.amount_expected}</p>
                    <p>Address: ${deposit.address.substring(0, 20)}...</p>
                    <p>Status: <span class="status status-${deposit.status}">${deposit.status}</span></p>
                    <p>Created: ${new Date(deposit.created_at).toLocaleDateString()}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-secondary" onclick="app.viewDeposit('${deposit.id}')">Ver</button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    async getWithdrawalQuote() {
        if (!this.currentTenant) {
            this.showMessage('Selecciona un tenant primero', 'error');
            return;
        }

        const formData = new FormData(document.getElementById('withdrawalQuoteForm'));
        const data = {
            chain: formData.get('chain'),
            token: formData.get('chain') === 'btc' ? 'BTC' : 'USDT',
            request_type: formData.get('request_type'),
            request_amount: parseFloat(formData.get('request_amount'))
        };

        try {
            const response = await this.apiCall(`/tenants/${this.currentTenant}/withdrawals/quote`, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            
            this.displayQuote(response);
        } catch (error) {
            this.showMessage(`Error: ${error.message}`, 'error');
        }
    }

    displayQuote(quote) {
        const container = document.getElementById('quoteResult');
        container.innerHTML = `
            <h5>Cotización de Retiro</h5>
            <p><strong>Monto a recibir:</strong> ${quote.to_receive}</p>
            <p><strong>Monto a descontar:</strong> ${quote.to_deduct}</p>
            <p><strong>Gas estimado:</strong> ${quote.gas_est}</p>
            <p><strong>Fee de plataforma:</strong> ${quote.platform_fee}</p>
            <p><strong>Monto bruto:</strong> ${quote.gross_amount}</p>
        `;
    }

    async loadPrices() {
        try {
            const prices = await this.apiCall('/pricing/quote?base=USD&token=USDT&chain=TRC20');
            this.displayPrices(prices);
        } catch (error) {
            this.showMessage(`Error cargando precios: ${error.message}`, 'error');
        }
    }

    displayPrices(prices) {
        const container = document.getElementById('pricesList');
        container.innerHTML = `
            <div class="list-item">
                <div class="list-item-info">
                    <h5>USDT/TRC20</h5>
                    <p>Precio: $${prices.price}</p>
                    <p>Última actualización: ${new Date(prices.timestamp).toLocaleString()}</p>
                </div>
            </div>
        `;
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existing = document.querySelector('.error, .success');
        if (existing) {
            existing.remove();
        }

        const div = document.createElement('div');
        div.className = type;
        div.innerHTML = message;
        
        // Insert at the top of main content
        const main = document.querySelector('.main .container');
        main.insertBefore(div, main.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (div.parentNode) {
                div.remove();
            }
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CashiraApp();
});
#   U p d a t e d   0 9 / 2 4 / 2 0 2 5   1 4 : 1 9 : 1 8  
 