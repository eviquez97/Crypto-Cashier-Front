# Cashira Frontend

Frontend web para el sistema Cashira - Crypto Cashier.

## 🚀 Características

- **Interfaz de Usuario Moderna**: Diseño responsive y fácil de usar
- **Autenticación**: Login con JWT y 2FA
- **Panel de Administración**: Gestión de tenants y configuración
- **Panel de Tenant**: Creación de depósitos y retiros
- **Integración API**: Conexión directa con el backend
- **QR Codes**: Generación automática de códigos QR
- **Precios en Tiempo Real**: Cotizaciones actualizadas

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos y responsive
- **JavaScript ES6**: Lógica de aplicación
- **Python**: Servidor proxy para desarrollo
- **Font Awesome**: Iconos
- **Fetch API**: Comunicación con backend

## 📁 Estructura

```
frontend/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── app.js             # Lógica de aplicación
├── server.py          # Servidor de desarrollo
└── README.md          # Este archivo
```

## 🚀 Uso

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
make frontend-dev

# O directamente
cd frontend
API_BASE=http://localhost:8000 python server.py
```

### Producción

```bash
# Iniciar servidor de producción
make frontend

# O directamente
cd frontend
API_BASE=https://tu-railway-url.app python server.py
```

### Testing

```bash
# Test completo (Backend + Frontend)
make test-complete

# Test solo frontend
make test-frontend

# Test integración
make test-integration
```

## 🔧 Configuración

### Variables de Entorno

```bash
# URL del backend API
export API_BASE=http://localhost:8000

# Puerto del frontend
export FRONTEND_PORT=3000
```

### Configuración del Backend

El frontend se conecta automáticamente al backend configurado en Railway. Para desarrollo local:

1. **Backend Local**: `API_BASE=http://localhost:8000`
2. **Backend Railway**: `API_BASE=https://tu-railway-url.app`

## 📱 Funcionalidades

### 🔐 Autenticación

- **Login**: Email y contraseña
- **JWT**: Tokens seguros
- **2FA**: Autenticación de dos factores
- **Roles**: ADMIN, OPERATOR, TENANT_OWNER, etc.

### 👨‍💼 Panel de Administración

- **Crear Tenants**: Gestión de sportbooks
- **Configurar Chains**: BTC, TRON, BEP20
- **Ver Tenants**: Lista y detalles
- **Configurar Límites**: Depósitos y retiros

### 💰 Panel de Tenant

- **Crear Depósitos**: Generar addresses únicas
- **Ver Depósitos**: Estado y transacciones
- **Cotizar Retiros**: Cálculo de fees
- **QR Codes**: Para pagos móviles

### 📊 Monitoreo

- **Precios**: Cotizaciones en tiempo real
- **Estados**: Transacciones y confirmaciones
- **Logs**: Actividad del sistema

## 🎨 Diseño

### Colores

- **Primario**: #667eea (Azul)
- **Secundario**: #764ba2 (Púrpura)
- **Éxito**: #28a745 (Verde)
- **Error**: #dc3545 (Rojo)
- **Advertencia**: #ffc107 (Amarillo)

### Tipografía

- **Fuente**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Tamaños**: Responsive y accesible
- **Pesos**: Normal, bold

### Layout

- **Header**: Navegación y usuario
- **Main**: Contenido principal
- **Cards**: Información organizada
- **Forms**: Inputs y botones
- **Footer**: Información adicional

## 🔌 API Integration

### Endpoints Utilizados

```javascript
// Autenticación
POST /auth/login
GET /me

// Administración
GET /admin/tenants
POST /admin/tenants
POST /admin/tenants/{id}/wallet-keys

// Tenant
POST /tenants/{id}/deposits
GET /tenants/{id}/deposits
POST /tenants/{id}/withdrawals/quote

// Precios
GET /pricing/quote
```

### Manejo de Errores

```javascript
// Ejemplo de manejo de errores
try {
    const response = await this.apiCall('/endpoint');
    this.showMessage('Operación exitosa', 'success');
} catch (error) {
    this.showMessage(`Error: ${error.message}`, 'error');
}
```

## 🧪 Testing

### Tests Automatizados

```bash
# Test completo del sistema
python scripts/test_complete_system.py

# Tests específicos
python scripts/test_complete_system.py backend
python scripts/test_complete_system.py frontend
python scripts/test_complete_system.py endpoints
```

### Tests Manuales

1. **Login**: Probar autenticación
2. **Crear Tenant**: Probar administración
3. **Crear Depósito**: Probar funcionalidad
4. **Cotizar Retiro**: Probar cálculos
5. **Ver Precios**: Probar integración

## 🚀 Despliegue

### Railway

```bash
# Configurar variables
railway variables set API_BASE=https://tu-railway-url.app

# Desplegar
railway service deploy frontend
```

### Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY frontend/ .
RUN pip install -r requirements.txt

EXPOSE 3000
CMD ["python", "server.py"]
```

### Nginx

```nginx
server {
    listen 80;
    server_name cashira.app;
    
    location / {
        proxy_pass http://localhost:3000;
    }
    
    location /api/ {
        proxy_pass https://tu-railway-url.app/;
    }
}
```

## 🔧 Desarrollo

### Estructura del Código

```javascript
class CashiraApp {
    constructor() {
        this.apiBase = 'http://localhost:8000';
        this.token = localStorage.getItem('cashira_token');
        this.user = null;
    }
    
    async apiCall(endpoint, options = {}) {
        // Lógica de llamadas API
    }
    
    showDashboard() {
        // Mostrar panel de control
    }
}
```

### Mejoras Futuras

- [ ] **PWA**: Aplicación web progresiva
- [ ] **Dark Mode**: Tema oscuro
- [ ] **Notificaciones**: Push notifications
- [ ] **Charts**: Gráficos de transacciones
- [ ] **Mobile App**: Aplicación móvil
- [ ] **Real-time**: WebSockets para updates

## 📚 Documentación

- [API Documentation](../docs/API_ENDPOINTS.md)
- [Railway Deployment](../docs/RAILWAY_QUICK_START.md)
- [Security Checklist](../docs/SECURITY_CHECKLIST.md)

## 🆘 Soporte

Si tienes problemas:

1. **Verificar Backend**: `make test-backend`
2. **Verificar Frontend**: `make test-frontend`
3. **Verificar Integración**: `make test-integration`
4. **Revisar Logs**: `railway service logs api`

---

**¡CASHIRA FRONTEND LISTO PARA USAR!** 🎉
