# 🚀 Guía de Inicio Rápido - RiskManager Pro

## ⚡ Abrir el Sistema (3 opciones)

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

## ❓ Preguntas Frecuentes

**P: ¿Los datos se guardan?**
R: En esta versión (prototipo), los datos están en memoria. Se pierden al recargar. Para persistencia, necesitas la v3.0 con backend.

**P: ¿Funciona sin internet?**
R: Sí, excepto los iconos (Font Awesome CDN). Para offline completo, descarga Font Awesome localmente.

**P: ¿Puedo usar en producción real?**
R: Esta es una versión de demostración. Para producción, implementa backend, autenticación y base de datos.

**P: ¿Es seguro?**
R: Como prototipo frontend, no tiene seguridad de servidor. No uses con datos reales sensibles sin un backend seguro.

**P: ¿Puedo modificar el código?**
R: Sí, es código abierto académico. Revisa los archivos:
- `app.js` - Lógica
- `style.css` - Estilos
- `index.html` - Estructura

**P: ¿Hay límites?**
R: Límites de memoria del navegador (~100MB). Para producción, usa base de datos.

---

## 📱 Atajos de Teclado

(Si implementas en v3.0)
- `Ctrl+N` - Nuevo activo/riesgo
- `Ctrl+S` - Guardar
- `Ctrl+E` - Exportar
- `Esc` - Cerrar modales

---

## 🐛 Solución de Problemas

**El sistema no carga:**
- Verifica que el servidor HTTP esté corriendo
- Revisa la consola del navegador (F12)
- Asegúrate de abrir `index.html` desde servidor, no directamente

**Los iconos no aparecen:**
- Verifica conexión a internet (Font Awesome CDN)
- Espera unos segundos para carga

**Los datos desaparecen:**
- Normal en versión prototipo (in-memory)
- Usa Export CSV antes de cerrar para guardar datos

**Error en consola:**
- Abre DevTools (F12) → Console
- Reporta el error para debug

---

## 📚 Documentación Completa

Para información detallada, consulta:
- **Consigana.md** - Documentación técnica completa
- **README.md** - Características y guías
- **implementation_summary.md** - Resumen de implementación

---

## 🎉 ¡Listo para Usar!

El sistema está completamente funcional. Explora todas las secciones y descubre las capacidades de gestión de riesgos profesional.

**¿Necesitas ayuda?**
Revisa la documentación o inspecciona el código fuente (F12 → Sources).

---

*Creado con 🛡️ por el equipo de Ingeniería en Ciberseguridad*
