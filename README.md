# 🛡️ RiskManager Pro - Sistema de Gestión de Riesgos Cibernéticos

> **Aplicativo web profesional para la gestión automatizada de riesgos de seguridad de la información, basado en ISO/IEC 27001, 27002:2022 y 27005**

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![Status](https://img.shields.io/badge/status-completed-success.svg)
![ISO](https://img.shields.io/badge/ISO-27001%20%7C%2027002%20%7C%2027005-orange.svg)

---

## 🚀 Inicio Rápido

### **Opción 1: Servidor Python**
```bash
python3 -m http.server 8000
```

### **Opción 2: Servidor Node.js**
```bash
npx http-server
```

### **Opción 3: VS Code Live Server**
1. Abrir `index.html` en VS Code
2. Click derecho → "Open with Live Server"

**Luego abrir:** `http://localhost:8000`

---

## ✨ Características Principales

### 🎯 **Gestión Completa de Riesgos**
- ✅ Inventario de activos con clasificación CIA
- ✅ Matriz de riesgos automatizada
- ✅ Plan de tratamiento con ISO 27002:2022
- ✅ Cálculo de riesgo residual
- ✅ Mapa de calor visual

### 🔐 **Cumplimiento Normativo**
- ✅ Dashboard de compliance (ISO 27001, GDPR, PCI DSS)
- ✅ Catálogo de controles ISO/IEC 27002:2022
- ✅ Reportes de cumplimiento
- ✅ Métricas actualizadas en tiempo real

### 🛡️ **Gestión de Vulnerabilidades**
- ✅ Base de datos CVE integrada
- ✅ Escaneo de vulnerabilidades
- ✅ Puntuación CVSS
- ✅ Creación automática de riesgos desde CVE

### 📊 **Reportes y Análisis**
- ✅ Reporte ejecutivo completo
- ✅ Exportación a CSV (riesgos y activos)
- ✅ Análisis ROI y costo-beneficio
- ✅ Visualizaciones gráficas

### 🔍 **Auditoría y Trazabilidad**
- ✅ Registro completo de operaciones
- ✅ Timestamps de todas las acciones
- ✅ Exportación de logs
- ✅ Identificación de usuarios

### 🤖 **Funciones Avanzadas**
- ✅ Asistente de IA para recomendaciones
- ✅ Integración con Wazuh SIEM
- ✅ Monitoreo automatizado 24/7
- ✅ Sistema de notificaciones en tiempo real
- ✅ Gestión de evidencias

---

## 📁 Estructura del Proyecto

```
Seguridad/
├── index.html          # Interfaz principal del sistema
├── style.css           # Estilos y design system
├── app.js              # Lógica de negocio completa
├── Consigana.md        # Documentación técnica detallada
├── README.md           # Este archivo
└── ...                 # Archivos adicionales
```

---

## 🎨 Capturas de Pantalla

### Dashboard Principal
Métricas en tiempo real: Total activos, Riesgos identificados, Riesgo promedio, Controles implementados

### Matriz de Riesgos
Visualización completa de amenazas con clasificación por nivel (Crítico, Alto, Medio, Bajo)

### Mapa de Calor
Grid interactivo 5×5 de Probabilidad vs Impacto con contadores de riesgos

### Dashboard de Cumplimiento
ISO 27001, GDPR y PCI DSS con porcentajes calculados automáticamente

---

## 🔧 Módulos del Sistema

| Módulo | Descripción |
|--------|-------------|
| **Dashboard** | Métricas generales y KPIs en tiempo real |
| **Activos** | Inventario completo con clasificación CIA |
| **Riesgos** | Matriz de análisis de riesgos |
| **Tratamiento** | Plan de controles ISO 27002 |
| **Vulnerabilidades** | Base CVE y escaneo |
| **Cumplimiento** | Dashboard normativo |
| **ISO 27002** | Catálogo de controles |
| **Auditoría** | Registro de actividades |
| **Reportes** | Generación y exportación |

---

## 💡 Guía de Uso

### 1️⃣ **Registrar Activos**
```
Activos → Nuevo Activo → Completar formulario → Guardar
```
- Nombre, tipo, propietario, ubicación
- Valores CIA individuales (1-5)

### 2️⃣ **Identificar Riesgos**
```
Gestión de Riesgos → Nuevo Riesgo → Seleccionar activo → Ingresar datos
```
- Amenaza y vulnerabilidad
- Probabilidad e Impacto (1-5)
- Sistema calcula score automáticamente

### 3️⃣ **Aplicar Tratamiento**
```
Tratamiento → Seleccionar control → Usar IA → Subir evidencias → Aplicar
```
- Controles ISO 27002:2022
- Asistente de IA para recomendaciones
- Upload de documentos de evidencia

### 4️⃣ **Generar Reportes**
```
Reportes → Reporte Ejecutivo / Export CSV
```
- Reporte ejecutivo en TXT
- CSV de riesgos y activos
- Reporte de cumplimiento

---

## 📊 Metodología (ISO/IEC 27005)

1. **Establecimiento del Contexto** - Definir alcance
2. **Valoración de Activos** - Inventario con CIA
3. **Identificación de Riesgos** - Amenazas y vulnerabilidades
4. **Análisis de Riesgos** - Cálculo: Probabilidad × Impacto
5. **Evaluación de Riesgos** - Priorización
6. **Tratamiento** - Aplicar controles ISO 27002
7. **Monitoreo** - Seguimiento continuo

---

## 🎯 Fórmulas y Cálculos

### Nivel de Riesgo
```
Riesgo = Probabilidad (1-5) × Impacto (1-5)

Clasificación:
- CRÍTICO: Score ≥ 15
- ALTO: Score 10-14
- MEDIO: Score 5-9
- BAJO: Score < 5
```

### Riesgo Residual
```
Riesgo Residual = Riesgo Original × 0.20
(Asume 80% de reducción con controles efectivos)
```

### ROI
```
ALE = Valor Activo × Exposure Factor × Occurrence Rate
Ahorro = ALE Actual - ALE Residual
ROI = ((Ahorro - Costo Control) / Costo Control) × 100
```

### Cumplimiento
```
ISO 27001 = (Riesgos Tratados / Total Riesgos) × 100
GDPR = (Activos Datos Protegidos / Total Activos Datos) × 100
PCI DSS = (Riesgos Críticos Tratados / Total Críticos) × 100
```

---

## 🔐 Controles ISO/IEC 27002:2022 Incluidos

### Organizacionales
- 5.1 - Políticas de seguridad
- 5.7 - Inteligencia de amenazas
- 5.15 - Control de acceso
- 5.23 - Seguridad en cloud

### Tecnológicos
- 8.1 - Dispositivos de usuario
- 8.2 - Accesos privilegiados
- 8.3 - Restricción de acceso
- 8.8 - Gestión de vulnerabilidades
- 8.9 - Gestión de configuración
- 8.13 - Respaldo de información
- 8.16 - Monitoreo
- 8.19 - Instalación de software
- 8.20 - Seguridad de redes
- 8.21 - Servicios de red
- 8.23 - Filtrado web
- 8.24 - Criptografía
- 8.28 - Codificación segura

---

## 🛠️ Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Iconos:** Font Awesome 6.4.0
- **Arquitectura:** SPA (Single Page Application)
- **Almacenamiento:** In-memory (prototipo)
- **Estilo:** Design System personalizado (Dark Mode)

---

## 📋 Requisitos

### Navegador Web Moderno
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Servidor HTTP (cualquiera)
- Python http.server
- Node.js http-server
- VS Code Live Server
- Nginx / Apache

### Pantalla
- Resolución mínima: 1280×720
- Responsive: Adaptable

---

## 🚀 Próximos Pasos (v3.0 Empresarial)

- [ ] Backend con API REST (Node.js/FastAPI)
- [ ] Base de datos persistente (PostgreSQL)
- [ ] Autenticación y RBAC
- [ ] Multi-tenancy
- [ ] Integración real Wazuh/Splunk
- [ ] Gráficos avanzados (Chart.js)
- [ ] Generación PDF profesional
- [ ] Notificaciones push/email
- [ ] API de IA predictiva
- [ ] Mobile app

---

## 📄 Licencia

**Proyecto Académico** - Uso educativo y demostrativo

---

## 👥 Contribuciones

Este es un proyecto académico completo. Para sugerencias o mejoras:
1. Revisar la documentación en `Consigana.md`
2. Proponer cambios vía issues
3. Mantener alineación con estándares ISO

---

## 📞 Contacto

**Proyecto:** RiskManager Pro v2.0  
**Desarrollado por:** Equipo de Ingeniería en Ciberseguridad  
**Fecha:** Enero 2026  

---

## 🙏 Agradecimientos

- Normas ISO/IEC (27001, 27002, 27005)
- Comunidad de ciberseguridad
- Proyecto Wazuh (inspiración de diseño)
- Principios éticos de la ingeniería

---

## 📚 Documentación Adicional

Para documentación técnica completa, ver: **[Consigana.md](Consigana.md)**

Incluye:
- Arquitectura detallada
- Metodología completa
- Aspectos éticos
- Guías de uso
- Análisis de impacto
- Proyección futura

---

**¡Gracias por usar RiskManager Pro! 🛡️🚀**

*Haciendo del mundo digital un lugar más seguro, un riesgo a la vez.*
