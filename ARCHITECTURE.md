# 🏗️ Arquitectura del Sistema - RiskManager Pro

## 📐 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVEGADOR WEB                          │
│                    http://localhost:3000                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │            Frontend (index.html + app-api.js)         │  │
│  │  • UI Moderna con CSS personalizado                   │  │
│  │  • JavaScript para interacción                        │  │
│  │  • Llamadas AJAX a la API REST                        │  │
│  └───────────────┬───────────────────────────────────────┘  │
└──────────────────┼──────────────────────────────────────────┘
                   │
                   │ HTTP/REST API
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND - Node.js + Express.js                 │
│                    http://localhost:3000                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   server.js                            │  │
│  │  • Express.js - Framework Web                         │  │
│  │  • CORS - Cross-Origin Resource Sharing               │  │
│  │  • Mongoose - ODM para MongoDB                        │  │
│  │  • API RESTful - Endpoints CRUD                       │  │
│  │                                                        │  │
│  │  Rutas principales:                                    │  │
│  │  GET    /api/assets      - Listar activos            │  │
│  │  POST   /api/assets      - Crear activo              │  │
│  │  PUT    /api/assets/:id  - Actualizar activo         │  │
│  │  DELETE /api/assets/:id  - Eliminar activo           │  │
│  │  GET    /api/risks       - Listar riesgos            │  │
│  │  POST   /api/risks       - Crear riesgo              │  │
│  │  GET    /api/audit       - Registro de auditoría     │  │
│  │  GET    /api/stats       - Estadísticas dashboard    │  │
│  │  GET    /api/health      - Estado del sistema        │  │
│  │  POST   /api/init        - Inicializar BD            │  │
│  └───────────────┬───────────────────────────────────────┘  │
└──────────────────┼──────────────────────────────────────────┘
                   │
                   │ MongoDB Driver
                   │ (Mongoose)
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE DATOS                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           MongoDB en Docker Container                │   │
│  │              mongodb://localhost:27017               │   │
│  │                                                       │   │
│  │  Base de Datos: riskmanager                          │   │
│  │  ┌──────────────────────────────────┐                │   │
│  │  │  Colecciones:                   │                │   │
│  │  │  • assets      - Activos TI     │                │   │
│  │  │  • risks       - Riesgos        │                │   │
│  │  │  • auditlogs   - Auditoría      │                │   │
│  │  └──────────────────────────────────┘                │   │
│  │                                                       │   │
│  │  Volúmenes Persistentes:                             │   │
│  │  • mongodb_data      - Datos de BD                   │   │
│  │  • mongodb_config    - Configuración                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Mongo Express (UI Admin)                   │   │
│  │              http://localhost:8081                   │   │
│  │  • Interfaz web para administrar MongoDB             │   │
│  │  • Visualizar colecciones y documentos               │   │
│  │  • Ejecutar queries manualmente                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Datos

### Ejemplo: Crear un Nuevo Activo

```
1. Usuario completa formulario en el navegador (Frontend)
   ↓
2. JavaScript captura el submit y envía POST request
   fetch('/api/assets', { method: 'POST', body: JSON.stringify(data) })
   ↓
3. Express.js recibe el request en server.js
   app.post('/api/assets', async (req, res) => { ... })
   ↓
4. Mongoose crea un nuevo documento
   const asset = new Asset(req.body)
   await asset.save()
   ↓
5. MongoDB guarda el documento en la colección 'assets'
   ↓
6. Mongoose devuelve el documento guardado con _id
   ↓
7. Express envía respuesta JSON al cliente
   res.status(201).json(asset)
   ↓
8. Frontend recibe la respuesta y actualiza la UI
   await loadAssets()
   renderAssets()
```

## 🗄️ Esquemas de Base de Datos

### Asset (Activos)

```javascript
{
  _id: ObjectId,
  name: String,              // "Servidor Base de Datos"
  type: String,              // "Hardware"
  value: Number,             // 1-5
  owner: String,             // "TI"
  location: String,          // "Data Center"
  confidentiality: Number,   // 1-5
  integrity: Number,         // 1-5
  availability: Number,      // 1-5
  createdAt: Date,
  updatedAt: Date
}
```

### Risk (Riesgos)

```javascript
{
  _id: ObjectId,
  assetId: ObjectId,         // Referencia a Asset
  threat: String,            // "Inyección SQL"
  vulnerability: String,     // "Falta validación"
  prob: Number,              // 1-5
  impact: Number,            // 1-5
  riskScore: Number,         // prob × impact
  treated: Boolean,          // false
  dateIdentified: Date,
  treatment: {
    type: String,            // "mitigate"
    controls: [String],      // ["ISO 8.28"]
    residualRisk: Number,
    cost: Number,
    roi: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### AuditLog (Auditoría)

```javascript
{
  _id: ObjectId,
  module: String,            // "Activos"
  action: String,            // "Crear"
  details: String,           // "Nuevo activo: Servidor..."
  timestamp: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🐳 Docker Compose

### Servicios

1. **mongodb** - Base de datos principal
   - Puerto: 27017
   - Usuario: admin
   - Contraseña: SecurePassword123
   - Volúmenes persistentes

2. **mongo-express** - UI de administración
   - Puerto: 8081
   - Interfaz web para gestionar MongoDB

### Red

- **riskmanager-network** - Red bridge para comunicación entre contenedores

### Volúmenes

- **mongodb_data** - Almacena los datos de MongoDB
- **mongodb_config** - Almacena configuración de MongoDB

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/health | Estado del servidor y MongoDB |
| GET | /api/stats | Estadísticas del dashboard |
| POST | /api/init | Inicializar BD con datos de ejemplo |
| GET | /api/assets | Obtener todos los activos |
| POST | /api/assets | Crear nuevo activo |
| PUT | /api/assets/:id | Actualizar activo |
| DELETE | /api/assets/:id | Eliminar activo |
| GET | /api/risks | Obtener todos los riesgos |
| POST | /api/risks | Crear nuevo riesgo |
| PUT | /api/risks/:id | Actualizar riesgo |
| DELETE | /api/risks/:id | Eliminar riesgo |
| GET | /api/audit | Obtener logs de auditoría |
| POST | /api/audit | Crear entrada de auditoría |

## 🔐 Seguridad

### Configuración Actual (Desarrollo)

- CORS habilitado para desarrollo local
- Credenciales en archivo `.env`
- MongoDB con autenticación básica

### Recomendaciones para Producción

1. **Variables de entorno seguras**
   - Usar secretos en vez de `.env`
   - Rotar contraseñas periódicamente

2. **CORS restrictivo**
   - Limitar origins permitidos
   - Solo dominios confiables

3. **HTTPS/TLS**
   - Certificados SSL
   - Encriptar comunicaciones

4. **Rate Limiting**
   - Limitar requests por IP
   - Prevenir ataques DoS

5. **Validación de entrada**
   - Sanitizar datos del usuario
   - Prevenir inyecciones

## 📦 Dependencias Principales

### Backend (Node.js)

```json
{
  "express": "^4.18.2",      // Framework web
  "mongoose": "^8.0.3",      // ODM para MongoDB
  "cors": "^2.8.5",          // CORS middleware
  "dotenv": "^16.3.1"        // Variables de entorno
}
```

### Frontend

- HTML5
- CSS3 (Variables CSS)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.4.0 (CDN)
- Fetch API para llamadas HTTP

## 🚀 Despliegue

### Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar MongoDB
docker-compose up -d

# 3. Iniciar servidor
npm start

# 4. Abrir navegador
http://localhost:3000
```

### Producción (Ejemplo)

```bash
# Opción 1: Docker Compose completo
docker-compose -f docker-compose.prod.yml up -d

# Opción 2: Separado
# - MongoDB en servicio gestionado (MongoDB Atlas)
# - Backend en servidor Node.js
# - Frontend en CDN/Servidor web
```

## 📊 Monitoreo

### Logs

```bash
# Logs del servidor Node.js
npm start (ver output en terminal)

# Logs de MongoDB
docker-compose logs mongodb

# Logs en tiempo real
docker-compose logs -f
```

### Health Check

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:
```json
{
  "status": "OK",
  "mongodb": "Connected",
  "timestamp": "2026-01-22T..."
}
```

## 🔧 Mantenimiento

### Backup Regular

```bash
# Crear backup
docker exec riskmanager-mongodb mongodump \
  --username admin \
  --password SecurePassword123 \
  --authenticationDatabase admin \
  --out /data/backup

# Copiar a host
docker cp riskmanager-mongodb:/data/backup ./backup-$(date +%Y%m%d)
```

### Actualizar Dependencias

```bash
# Ver versiones desactualizadas
npm outdated

# Actualizar
npm update

# O actualizar específica
npm install express@latest
```

### Limpiar Sistema

```bash
# Limpiar contenedores parados
docker container prune

# Limpiar volúmenes no usados
docker volume prune

# Limpiar todo (¡CUIDADO!)
docker system prune -a --volumes
```

---

**Última actualización:** Enero 2026  
**Versión:** 2.0.0
