# 🚀 QUICK START - RiskManager Pro con MongoDB

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Docker Desktop** (https://www.docker.com/products/docker-desktop/)
- **Node.js** v18 o superior (https://nodejs.org/)
- **npm** (se instala automáticamente con Node.js)

---

## 🎯 Instalación Paso a Paso

### Paso 1: Verificar Requisitos

Abre una terminal y verifica que tienes todo instalado:

```bash
# Verificar Docker
docker --version
# Debe mostrar: Docker version 20.x.x o superior

# Verificar Node.js
node --version
# Debe mostrar: v18.x.x o superior

# Verificar npm
npm --version
# Debe mostrar: 9.x.x o superior
```

### Paso 2: Instalar Dependencias de Node.js

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- `express` - Framework web para Node.js
- `mongoose` - ODM (Object Data Modeling) para MongoDB
- `cors` - Middleware para habilitar CORS
- `dotenv` - Para manejar variables de entorno

---

## 🐳 Configuración de Docker y MongoDB

### Paso 3: Iniciar MongoDB con Docker

Inicia los contenedores de MongoDB y Mongo Express (interfaz web para MongoDB):

```bash
docker-compose up -d
```

**¿Qué hace este comando?**
- Descarga las imágenes de MongoDB 7.0 y Mongo Express
- Crea un contenedor para MongoDB en el puerto 27017
- Crea un contenedor para Mongo Express (UI) en el puerto 8081
- Crea volúmenes persistentes para almacenar los datos

**Verificar que los contenedores están corriendo:**

```bash
docker-compose ps
```

Deberías ver algo como:

```
NAME                          STATUS    PORTS
riskmanager-mongodb           Up        0.0.0.0:27017->27017/tcp
riskmanager-mongo-express     Up        0.0.0.0:8081->8081/tcp
```

---

## 🚀 Iniciar la Aplicación

### Paso 4: Iniciar el Servidor Backend

En la misma terminal, ejecuta:

```bash
npm start
```

Deberías ver en la consola:

```
✅ Conectado a MongoDB
🚀 Servidor corriendo en http://localhost:3000
📊 MongoDB UI disponible en http://localhost:8081
```

**¡NO CIERRES ESTA TERMINAL!** El servidor debe seguir ejecutándose.

---

## 🌐 Acceder a la Aplicación

### Abrir la Aplicación Web

1. Abre tu navegador web (Chrome, Firefox, Safari, etc.)
2. Ve a: **http://localhost:3000**

### Interfaz de Mongo Express (Opcional)

Para ver y administrar la base de datos MongoDB directamente:

1. Abre en tu navegador: **http://localhost:8081**
2. Credenciales:
   - **Usuario:** `admin`
   - **Contraseña:** `admin`

---

## 🎮 Uso de la Aplicación

### Primera Vez: Inicializar la Base de Datos

Cuando abras la aplicación por primera vez, verás un mensaje preguntando si deseas inicializar la base de datos con datos de ejemplo.

**Haz clic en "Aceptar"** para cargar datos de muestra que incluyen:
- 3 activos de ejemplo
- 2 riesgos de ejemplo
- Registro inicial de auditoría

### Navegación Principal

La aplicación tiene las siguientes secciones (disponibles en el menú lateral):

1. **📊 Dashboard** - Vista general de métricas y estadísticas
2. **💻 Activos** - Gestión de activos de la organización
3. **⚠️ Gestión de Riesgos** - Matriz de riesgos identificados
4. **🛡️ Tratamiento** - Plan de tratamiento de riesgos
5. **🔍 Vulnerabilidades** - Base de datos de CVEs
6. **✅ Cumplimiento** - Métricas de compliance (ISO 27001, GDPR, PCI)
7. **📚 ISO 27002** - Catálogo de controles
8. **📋 Auditoría** - Registro de eventos del sistema
9. **📄 Reportes** - Exportación y generación de reportes

---

## 📝 Operaciones Básicas

### Crear un Nuevo Activo

1. Ve a la sección **Activos**
2. Haz clic en **"+ Nuevo Activo"**
3. Completa el formulario:
   - Nombre del activo
   - Tipo (Hardware, Software, Datos, etc.)
   - Valor (1-5, siendo 5 el más crítico)
   - Propietario
   - Ubicación
   - Clasificación CIA (Confidencialidad, Integridad, Disponibilidad)
4. Haz clic en **"Agregar Activo"**

### Crear un Nuevo Riesgo

1. Ve a la sección **Gestión de Riesgos**
2. Haz clic en **"+ Nuevo Riesgo"**
3. Selecciona el activo afectado
4. Describe la amenaza
5. Especifica la vulnerabilidad
6. Define Probabilidad (1-5) e Impacto (1-5)
7. El sistema calculará automáticamente el Score de Riesgo
8. Haz clic en **"Agregar Riesgo"**

### Aplicar Tratamiento a un Riesgo

1. Ve a la sección **Tratamiento**
2. Verás solo los riesgos de nivel Medio, Alto o Crítico
3. Selecciona un control ISO 27002 del menú desplegable
4. Haz clic en **"Aplicar Control"**
5. El sistema calculará automáticamente el riesgo residual

---

## 🛠️ Comandos Útiles

### Ver Logs de Docker

```bash
# Ver logs de todos los contenedores
docker-compose logs

# Ver logs en tiempo real
docker-compose logs -f

# Ver solo logs de MongoDB
docker-compose logs mongodb
```

### Reiniciar los Contenedores

```bash
# Detener contenedores
docker-compose down

# Iniciar nuevamente
docker-compose up -d
```

### Limpiar y Reiniciar la Base de Datos

```bash
# Detener contenedores y eliminar volúmenes
docker-compose down -v

# Iniciar nuevamente (creará una BD limpia)
docker-compose up -d
```

### Modo Desarrollo (con auto-recarga)

Si quieres que el servidor se reinicie automáticamente al hacer cambios:

```bash
npm run dev
```

---

## 🔧 Solución de Problemas

### Error: "Cannot connect to MongoDB"

**Solución:**
1. Verifica que Docker Desktop esté ejecutándose
2. Verifica que los contenedores estén activos: `docker-compose ps`
3. Reinicia los contenedores: `docker-compose restart`

### Error: "Port 3000 is already in use"

**Solución:**
1. Cierra cualquier aplicación que esté usando el puerto 3000
2. O cambia el puerto en el archivo `.env`:
   ```
   PORT=3001
   ```

### Error: "Port 27017 is already in use"

**Solución:**
1. Tienes otra instancia de MongoDB corriendo
2. Detenla o cambia el puerto en `docker-compose.yml`

### La aplicación no muestra datos

**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Si ves errores de CORS o conexión, verifica que el servidor backend esté corriendo
4. Reinicia el servidor: Ctrl+C y luego `npm start`

---

## 📊 Verificar el Estado del Sistema

### Health Check de la API

Abre en tu navegador:
```
http://localhost:3000/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "mongodb": "Connected",
  "timestamp": "2026-01-22T..."
}
```

---

## 🗃️ Backup y Restauración

### Hacer Backup de la Base de Datos

```bash
# Backup completo de MongoDB
docker exec riskmanager-mongodb mongodump \
  --username admin \
  --password SecurePassword123 \
  --authenticationDatabase admin \
  --out /data/backup

# Copiar backup a tu máquina
docker cp riskmanager-mongodb:/data/backup ./backup
```

### Restaurar Base de Datos

```bash
# Copiar backup al contenedor
docker cp ./backup riskmanager-mongodb:/data/backup

# Restaurar
docker exec riskmanager-mongodb mongorestore \
  --username admin \
  --password SecurePassword123 \
  --authenticationDatabase admin \
  /data/backup
```

---

## 🔐 Seguridad y Credenciales

### Credenciales por Defecto

**MongoDB:**
- Usuario: `admin`
- Contraseña: `SecurePassword123`
- Base de datos: `riskmanager`

**Mongo Express (UI):**
- Usuario: `admin`
- Contraseña: `admin`

⚠️ **IMPORTANTE:** Estas son credenciales de desarrollo. Para producción, cámbialas en el archivo `.env`

---

## 📦 Exportar e Importar Datos

### Exportar Datos

1. Ve a la sección **Reportes**
2. Haz clic en **"Exportar Datos"**
3. Se descargará un archivo JSON con toda la información

### Importar Datos (Vía API)

```bash
curl -X POST http://localhost:3000/api/init
```

---

## 🛑 Detener la Aplicación

### Detener el Servidor Node.js

1. Ve a la terminal donde está corriendo el servidor
2. Presiona **Ctrl + C**

### Detener Contenedores Docker

```bash
# Detener contenedores (los datos se mantienen)
docker-compose stop

# Detener y eliminar contenedores (los datos se mantienen en volúmenes)
docker-compose down

# Detener, eliminar contenedores Y BORRAR DATOS
docker-compose down -v
```

---

## 📚 Estructura de Archivos

```
/Seguridad/
├── index.html              # Interfaz web principal
├── app-api.js              # JavaScript frontend (conecta con API)
├── app.js                  # JavaScript original (sin BD)
├── style.css               # Estilos de la aplicación
├── server.js               # Servidor backend Node.js + API
├── package.json            # Dependencias de Node.js
├── docker-compose.yml      # Configuración de Docker
├── Dockerfile              # Imagen Docker de la app
├── .env                    # Variables de entorno
├── .env.example            # Ejemplo de variables de entorno
├── .dockerignore           # Archivos ignorados por Docker
├── .gitignore              # Archivos ignorados por Git
├── README.md               # Documentación completa
└── QUICK_START.md          # Esta guía rápida
```

---

## 🌟 Características Destacadas

- ✅ **Persistencia de datos** - Todos los datos se guardan en MongoDB
- ✅ **API RESTful** - Backend profesional con Express.js
- ✅ **Docker** - Base de datos en contenedores, fácil de desplegar
- ✅ **UI Moderna** - Interfaz web responsive y profesional
- ✅ **ISO 27002:2022** - Controles actualizados
- ✅ **Auditoría** - Registro completo de todas las acciones
- ✅ **Exportación** - Descarga datos en formato JSON
- ✅ **Tiempo Real** - Actualizaciones automáticas del dashboard

---

## 🆘 Soporte y Ayuda

### Verificar Logs de la Aplicación

1. **Logs del servidor:** Mira la terminal donde ejecutaste `npm start`
2. **Logs del navegador:** Presiona F12 → Pestaña "Console"
3. **Logs de MongoDB:** `docker-compose logs mongodb`

### Reiniciar Todo desde Cero

```bash
# 1. Detener servidor Node.js
Ctrl + C (en la terminal del servidor)

# 2. Detener y limpiar Docker
docker-compose down -v

# 3. Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# 4. Iniciar Docker
docker-compose up -d

# 5. Iniciar servidor
npm start

# 6. Abrir navegador en http://localhost:3000
```

---

## ✨ Próximos Pasos

1. **Personaliza la aplicación** según las necesidades de tu organización
2. **Agrega más activos y riesgos** reales
3. **Explora la API** en `http://localhost:3000/api/`
4. **Revisa MongoDB** directamente en Mongo Express
5. **Genera reportes** y exporta datos para análisis

---

## 📞 Información Adicional

Para documentación completa, consulta [README.md](README.md)

**Versión:** 2.0.0  
**Última actualización:** Enero 2026

---

¡Disfruta usando RiskManager Pro! 🛡️🚀


### Opción 1: Python (Más Simple)
```bash
python3 -m http.server 8000
```
Luego abrir: http://localhost:8000

### Opción 2: Node.js
```bash
npx http-server
```

### Opción 3: VS Code
1. Click derecho en `index.html`
2. Seleccionar "Open with Live Server"

---

## 🎯 Primer Uso - 5 Minutos

### Paso 1: Explorar Dashboard (30 seg)
- La página inicia en el Dashboard
- Ver métricas: Activos, Riesgos, Promedio, Controles
- Todo en 0 (sistema nuevo)

### Paso 2: Registrar un Activo (1 min)
1. Click en **"Activos"** (menú izquierdo)
2. Click botón **"Nuevo Activo"**
3. Llenar formulario:
   - Nombre: "Servidor Base de Datos"
   - Tipo: Hardware
   - Propietario: "TI"
   - Ubicación: "Data Center"
   - Confidencialidad: 5
   - Integridad: 5
   - Disponibilidad: 5
4. Click **"Guardar Activo"**

### Paso 3: Identificar un Riesgo (1 min)
1. Click en **"Gestión de Riesgos"**
2. Click **"Nuevo Riesgo"**
3. Llenar:
   - Activo: Seleccionar el que creaste
   - Amenaza: "Ataque de ransomware"
   - Probabilidad: 4
   - Impacto: 5
4. Click **"Calcular y Guardar"**
   - Sistema calcula: 4 × 5 = 20 (CRÍTICO)

### Paso 4: Aplicar Tratamiento (1 min)
1. Click en **"Tratamiento"**
2. Ver el riesgo listado
3. Seleccionar control ISO 27002
4. Click **"Aplicar Control"**
5. Ver riesgo residual calculado

### Paso 5: Ver Resultados (1 min)
1. Volver a **"Dashboard"**
   - Ver métricas actualizadas
2. Ir a **"Reportes"**
   - Click **"Reporte Ejecutivo"**
   - Se descarga archivo TXT
3. Ver **"Mapa de Calor"**
   - Visualizar riesgo en grid

---

## 🎨 Funciones Destacadas

### 🔔 Notificaciones
- Click en campana (arriba derecha)
- Ver alertas del sistema

### 🛡️ Vulnerabilidades
1. Click **"Vulnerabilidades"**
2. Ver base CVE
3. Click **"Escanear Vulnerabilidades"**
4. Click **"Crear Riesgo"** desde CVE

### ✅ Cumplimiento
1. Click **"Cumplimiento"**
2. Ver % de ISO 27001, GDPR, PCI
3. Click **"Generar Reporte"**

### 📚 Controles ISO
1. Click **"ISO 27002"**
2. Seleccionar un control del dropdown
3. Ver detalles y descripción

### 📋 Auditoría
1. Click **"Auditoría"**
2. Ver log de todas las acciones
3. Click **"Exportar Log"** → CSV

### 🤖 Asistente IA
En "Tratamiento":
1. Click botón **"✨ IA"** junto a un riesgo
2. Ver recomendación automática

### 🔄 Wazuh Sync
En "Activos":
1. Click **"🔄 Sincronizar Wazuh"**
2. Importa activos y alertas simuladas

---

## 📊 Escenario Completo de Demo

### Contexto: Pequeña empresa de e-commerce

**Activos a crear:**
1. Servidor Web (Hardware, Valor: 4, CIA: 4,5,5)
2. Base de Datos Clientes (Datos, Valor: 5, CIA: 5,5,4)
3. Laptops Empleados (Hardware, Valor: 3, CIA: 3,3,3)
4. Sistema de Pagos (Software, Valor: 5, CIA: 5,5,5)

**Riesgos a identificar:**
1. SQL Injection → DB Clientes (Prob: 3, Imp: 5) = 15 CRÍTICO
2. DDoS → Servidor Web (Prob: 4, Imp: 4) = 16 CRÍTICO
3. Robo Laptop → Laptops (Prob: 2, Imp: 3) = 6 MEDIO
4. Fraude Tarjetas → Sistema Pagos (Prob: 3, Imp: 5) = 15 CRÍTICO

**Tratamientos:**
- SQL Injection → Control 8.28 (Codificación Segura)
- DDoS → Control 8.21 (Seguridad Servicios de Red)
- Robo → Control 8.1 (Dispositivos Usuario) + 8.24 (Criptografía)
- Fraude → Control 5.15 (Control de Acceso)

**Resultados esperados:**
- Dashboard: 4 activos, 4 riesgos, promedio 13
- Cumplimiento: ~50-75% según tratamientos
- Reporte ejecutivo: 4 riesgos en top 5

---

## 🎓 Tips y Trucos

### Navegación
- El menú izquierdo es tu guía
- El título superior muestra dónde estás
- Las notificaciones aparecen automáticamente

### Riesgos
- CRÍTICO (≥15) = Rojo
- ALTO (10-14) = Naranja
- MEDIO (5-9) = Amarillo
- BAJO (<5) = Verde

### Valores CIA
- 1 = Muy bajo
- 3 = Medio
- 5 = Crítico/Alto

### Exportaciones
- Todos los reportes se descargan automáticamente
- Nombres incluyen la fecha
- Formatos: TXT, CSV

### Mapa de Calor
- Eje X = Probabilidad (1-5)
- Eje Y = Impacto (1-5)
- Números = Cantidad de riesgos en esa celda
- Colores = Nivel de riesgo

---