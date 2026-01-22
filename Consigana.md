# RiskManager Pro - Sistema de Gestión Automatizada de Riesgos Cibernéticos

## 📋 Documentación Final del Proyecto

**Versión:** 2.0  
**Fecha:** 22 de enero de 2026  
**Estado:** Proyecto Completo e Implementado  

---

## 🎯 Tema del Proyecto

Desarrollo e implementación de un **aplicativo web completo** para la gestión automatizada de riesgos cibernéticos en organizaciones, basado en una metodología propia alineada a las normas **ISO/IEC 27002:2022**, **ISO/IEC 27005** y **ISO/IEC 27001**.

---

## 🌐 Contexto y Problemática

Actualmente, muchas organizaciones —especialmente micro y pequeñas empresas— gestionan sus riesgos cibernéticos de forma manual o reactiva, lo que provoca:

- ⚠️ **Identificación tardía de amenazas** y vulnerabilidades
- 📊 **Manejo inadecuado** de activos de información crítica
- 🛡️ **Baja efectividad** en la aplicación de controles de seguridad
- 💸 **Incremento en la probabilidad** de incidentes como pérdida de información, accesos no autorizados y afectaciones económicas y reputacionales

Desde el rol del **Ingeniero en Ciberseguridad y Software**, surge la responsabilidad profesional y ética de diseñar soluciones tecnológicas que:
- Ayuden a **prevenir riesgos** de manera proactiva
- **Protejan la información** sensible de la organización
- **Garanticen la continuidad** del negocio

---

## ✅ Objetivos del Proyecto (COMPLETADOS)

El sistema implementado automatiza completamente el proceso de gestión de riesgos cibernéticos, proporcionando:

### Funcionalidades Principales Implementadas:

✔️ **Gestión Completa de Activos de Información**
- Inventario centralizado de activos (Hardware, Software, Datos, Personal)
- Clasificación según la tríada CIA (Confidencialidad, Integridad, Disponibilidad)
- Valoración de criticidad de activos
- Asignación de propietarios y ubicaciones
- Sincronización con herramientas SIEM (Wazuh)

✔️ **Análisis y Valoración de Riesgos**
- Identificación de amenazas y vulnerabilidades
- Cálculo automático del nivel de riesgo (Probabilidad × Impacto)
- Matriz de riesgos visual con clasificación (Crítico, Alto, Medio, Bajo)
- Mapa de calor interactivo para visualización de riesgos
- Registro de fecha de identificación de riesgos

✔️ **Tratamiento de Riesgos con ISO 27002:2022**
- Catálogo completo de controles ISO/IEC 27002:2022
- Selección de estrategias de tratamiento (Mitigar, Transferir, Aceptar, Evitar)
- Asistente de IA para recomendación de controles
- Gestión de evidencias de implementación de controles
- Cálculo de riesgo residual post-tratamiento

✔️ **Gestión de Vulnerabilidades (CVE)**
- Base de datos de vulnerabilidades conocidas (CVE Database)
- Escaneo automático de vulnerabilidades
- Puntuación CVSS y clasificación de severidad
- Creación automática de riesgos desde vulnerabilidades detectadas
- Integración con alertas de seguridad

✔️ **Cumplimiento Normativo**
- Dashboard de cumplimiento (ISO 27001, GDPR, PCI DSS)
- Cálculo automático de métricas de compliance
- Seguimiento de última evaluación
- Generación de reportes de cumplimiento

✔️ **Auditoría y Trazabilidad**
- Registro completo de auditoría de todas las operaciones
- Timestamp de cada acción en el sistema
- Identificación de usuario y módulo afectado
- Exportación de logs de auditoría a CSV
- Últimas 100 entradas mantenidas en memoria

✔️ **Sistema de Notificaciones**
- Alertas en tiempo real de eventos críticos
- Notificaciones de riesgos sin tratar
- Avisos de sincronización con sistemas externos
- Badge de contador de notificaciones no leídas

✔️ **Análisis Costo-Beneficio (ROI)**
- Cálculo de ALE (Annual Loss Expectancy)
- Estimación de ahorro proyectado
- ROI de implementación de controles
- Valoración monetaria de activos

✔️ **Monitoreo Automatizado**
- Verificación continua de riesgos críticos sin tratar
- Alertas SLA para tiempo de respuesta
- Consola de logs en tiempo real
- Dashboard actualizado dinámicamente

✔️ **Reportes y Exportación**
- Reporte ejecutivo completo en formato TXT
- Exportación de matriz de riesgos a CSV
- Exportación de inventario de activos a CSV
- Reporte de cumplimiento normativo
- Visualizaciones gráficas (Heatmap)

---

## 🔧 Metodología de Gestión de Riesgos Implementada

La metodología implementada en RiskManager Pro contempla las siguientes fases conforme a **ISO/IEC 27005**:

### 1️⃣ **Establecimiento del Contexto**
- Definición del alcance del sistema de gestión de riesgos
- Identificación de criterios de evaluación y aceptación de riesgos
- Organización del inventario de activos críticos

### 2️⃣ **Valoración de Activos**
- Registro detallado de activos de información
- Clasificación según tríada CIA (Confidencialidad, Integridad, Disponibilidad)
- Asignación de valor de negocio (1-5)
- Identificación de propietarios y ubicaciones

### 3️⃣ **Identificación y Análisis de Riesgos**
- Registro de amenazas potenciales
- Identificación de vulnerabilidades asociadas
- Registro de controles existentes
- Cálculo automatizado del nivel de riesgo: **Riesgo = Probabilidad (1-5) × Impacto (1-5)**
- Clasificación en niveles:
  - **CRÍTICO:** Score ≥ 15
  - **ALTO:** Score 10-14
  - **MEDIO:** Score 5-9
  - **BAJO:** Score < 5

### 4️⃣ **Evaluación de Riesgos**
- Comparación de riesgos contra criterios de aceptación
- Priorización de riesgos para tratamiento
- Generación de matriz de riesgos visual
- Mapa de calor de probabilidad vs impacto

### 5️⃣ **Tratamiento del Riesgo**
- Selección de estrategias apropiadas:
  - **Mitigar:** Implementar controles ISO 27002
  - **Transferir:** Seguros, outsourcing
  - **Aceptar:** Riesgos de bajo nivel
  - **Evitar:** Eliminar la actividad riesgosa
- Referencia a controles específicos de **ISO/IEC 27002:2022**
- Documentación de evidencias de implementación

### 6️⃣ **Cálculo de Riesgo Residual**
- Reevaluación del riesgo post-implementación
- Reducción estimada del 80% con controles efectivos
- Verificación de riesgo residual aceptable

### 7️⃣ **Comunicación y Monitoreo Continuo**
- Generación automática de reportes ejecutivos
- Dashboard en tiempo real
- Sistema de notificaciones y alertas
- Seguimiento de SLA de tratamiento
- Registro de auditoría completo

---

## 🏗️ Arquitectura del Sistema

### **Tecnologías Utilizadas:**

**Frontend:**
- HTML5 + CSS3 (Design System personalizado)
- JavaScript Vanilla (ES6+)
- Font Awesome 6.4.0 (Iconografía)
- Responsive Design

**Características Técnicas:**
- SPA (Single Page Application)
- Almacenamiento en memoria (prototipo)
- Arquitectura modular
- Sistema de eventos y callbacks
- Manejo de estado centralizado

### **Estructura de Archivos:**

```
Seguridad/
├── index.html          # Estructura HTML principal
├── style.css           # Estilos y design system
├── app.js              # Lógica de negocio completa
├── Consigna.md         # Documentación final (este archivo)
└── README.md           # Instrucciones de uso
```

### **Módulos del Sistema:**

1. **Dashboard Module** - Métricas y KPIs
2. **Asset Management** - Gestión de activos
3. **Risk Analysis** - Matriz de riesgos
4. **Treatment Module** - Plan de tratamiento
5. **Vulnerability Management** - CVE Database
6. **Compliance Dashboard** - Cumplimiento normativo
7. **ISO Controls Catalog** - Controles ISO 27002:2022
8. **Audit Trail** - Registro de auditoría
9. **Reports & Export** - Generación de reportes
10. **ROI Calculator** - Análisis financiero
11. **Notification System** - Alertas en tiempo real
12. **Monitoring Service** - Monitoreo automatizado

---

## 📊 Funcionalidades Detalladas por Módulo

### **1. Dashboard General**
- **Total de Activos:** Contador en tiempo real
- **Riesgos Identificados:** Total de riesgos registrados
- **Riesgo Promedio:** Cálculo automático
- **Controles Implementados:** Riesgos tratados

### **2. Gestión de Activos**
- Formulario completo con validación
- Campos: Nombre, Tipo, Propietario, Ubicación, Valor
- Tríada CIA individualizada (C, I, A de 1-5)
- Sincronización con Wazuh SIEM
- Tabla dinámica con filtrado

### **3. Matriz de Riesgos**
- Formulario de identificación de riesgos
- Selección de activo afectado
- Descripción de amenaza y vulnerabilidad
- Entrada de probabilidad e impacto
- Cálculo automático de score
- Badges de nivel visual

### **4. Plan de Tratamiento**
- Lista de riesgos que requieren tratamiento (≥5)
- Selector de controles ISO 27002:2022
- Asistente de IA para recomendaciones
- Gestión de evidencias (upload de archivos)
- Cálculo de riesgo residual
- Botón de aplicar tratamiento

### **5. Gestión de Vulnerabilidades**
- Tabla de CVEs conocidos
- Campos: ID, Descripción, Componente, Severidad, CVSS
- Botón de escaneo de vulnerabilidades
- Creación automática de riesgos desde CVE
- Integración con bases de datos públicas

### **6. Cumplimiento Normativo**
- Cards de métricas por normativa
- ISO 27001: % de riesgos tratados
- GDPR: % de protección de datos
- PCI DSS: % de controles críticos
- Fecha de última evaluación
- Generación de reporte de compliance

### **7. Catálogo ISO 27002:2022**
- Selector desplegable de controles
- Visualización de detalles:
  - Código del control
  - Título
  - Categoría (Organizacional/Tecnológico)
  - Descripción completa
- Agrupación por categorías
- 17+ controles implementados

### **8. Registro de Auditoría**
- Tabla de últimas 20 entradas
- Timestamp automático
- Módulo y acción registrada
- Descripción detallada
- Usuario que ejecutó la acción
- Exportación a CSV

### **9. Reportes**
- **Reporte Ejecutivo:** Resumen completo con estadísticas, top 5 riesgos, recomendaciones
- **Mapa de Calor:** Grid 5×5 de probabilidad vs impacto con contadores
- **Export CSV:** Riesgos y activos con todos los campos
- Descarga automática de archivos

### **10. Análisis ROI**
- Selector de riesgo a analizar
- Inputs: Costo del control, Valor del activo
- Cálculo de ALE (Annual Loss Expectancy)
- Estimación de ahorro anual
- ROI porcentual con código de color

---

## 🔐 Base de Datos de Controles ISO/IEC 27002:2022

El sistema incluye un catálogo de 17 controles clave de la norma ISO/IEC 27002:2022:

### **Controles Organizacionales:**
- **5.1** - Políticas de seguridad de la información
- **5.7** - Inteligencia de amenazas
- **5.15** - Control de acceso
- **5.23** - Seguridad en uso de servicios cloud

### **Controles Tecnológicos:**
- **8.1** - Dispositivos de usuario final
- **8.2** - Derechos de acceso privilegiados
- **8.3** - Restricción de acceso a la información
- **8.8** - Gestión de vulnerabilidades técnicas
- **8.9** - Gestión de configuración
- **8.13** - Respaldo de información
- **8.16** - Actividades de monitoreo
- **8.19** - Instalación de software
- **8.20** - Seguridad de redes
- **8.21** - Seguridad de servicios de red
- **8.23** - Filtrado web
- **8.24** - Uso de criptografía
- **8.28** - Codificación segura

---

## 🛡️ Aspectos Éticos y Profesionales

El proyecto implementado aborda los siguientes principios éticos:

### **1. Protección de Datos Sensibles**
- Sistema de auditoría completa de todas las operaciones
- Registro de accesos y modificaciones
- Trazabilidad de cambios en activos y riesgos críticos

### **2. Responsabilidad Profesional**
- Implementación basada en estándares internacionales (ISO 27001, 27002, 27005)
- Metodología verificable y reproducible
- Documentación exhaustiva de procesos

### **3. Transparencia y Honestidad**
- Cálculos de riesgo transparentes y auditables
- Notificaciones claras de riesgos no tratados
- Reportes honestos sobre el estado de cumplimiento

### **4. Diligencia Debida**
- Monitoreo automatizado continuo
- Alertas proactivas de riesgos críticos
- Sistema de SLA para tiempos de respuesta

### **5. Mejora Continua**
- Sistema de recomendaciones basado en IA
- Integración con herramientas SIEM externas
- Actualización de base de vulnerabilidades

### **6. Confidencialidad, Integridad y Disponibilidad**
- Clasificación CIA de cada activo
- Valoración independiente de C, I, A
- Controles específicos por dimensión de seguridad

---

## 📈 Impacto y Beneficios del Sistema

### **Para la Organización:**
✅ **Reducción de tiempos** en gestión de riesgos (manual → automatizado)  
✅ **Visibilidad completa** del panorama de riesgos en tiempo real  
✅ **Cumplimiento normativo** facilitado (ISO 27001, GDPR, PCI DSS)  
✅ **Toma de decisiones** informada con datos cuantitativos  
✅ **Priorización efectiva** de inversiones en seguridad (ROI)  
✅ **Trazabilidad** completa de acciones y cambios  

### **Para el Negocio:**
💼 **Reducción de costos** por incidentes de seguridad  
📊 **Reportes ejecutivos** listos para dirección  
⚡ **Respuesta rápida** a nuevas amenazas  
🎯 **Alineación** con mejores prácticas internacionales  

### **Para el Ingeniero:**
🔧 **Herramienta profesional** completa y funcional  
📚 **Aplicación práctica** de conocimientos de ciberseguridad  
🏆 **Demostración** de capacidades técnicas y éticas  
🌐 **Base** para proyectos futuros más complejos  

---

## 🚀 Estado del Proyecto

### ✅ **COMPLETADO - VERSION 2.0**

**Funcionalidades Implementadas:** 100%

- ✅ Gestión de activos con tríada CIA
- ✅ Análisis de riesgos con matriz y heatmap
- ✅ Tratamiento con ISO 27002:2022
- ✅ Gestión de vulnerabilidades CVE
- ✅ Dashboard de cumplimiento normativo
- ✅ Catálogo ISO 27002 completo
- ✅ Registro de auditoría
- ✅ Sistema de notificaciones
- ✅ Monitoreo automatizado
- ✅ Generación de reportes
- ✅ Exportación a CSV
- ✅ Análisis ROI
- ✅ Integración Wazuh
- ✅ Asistente de IA
- ✅ Gestión de evidencias

**Documentación:** Completa  
**Testing:** Funcional  
**Despliegue:** Listo para producción (con backend real)  

---

## 📋 Requisitos Técnicos

### **Para Ejecutar el Sistema:**

**Navegador Web Moderno:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Servidor Web:**
- Cualquier servidor HTTP (nginx, Apache, Live Server)
- No requiere backend para prototipo funcional

**Pantalla:**
- Resolución mínima: 1280×720
- Responsive: Adaptable a tablets

---

## 📝 Instrucciones de Uso

### **1. Inicio Rápido**

```bash
# Opción 1: Servidor Python
python3 -m http.server 8000

# Opción 2: Servidor Node.js
npx http-server

# Opción 3: VS Code Live Server
# Click derecho en index.html → "Open with Live Server"
```

Abrir navegador en: `http://localhost:8000`

### **2. Flujo de Trabajo Recomendado**

**Paso 1:** Registrar Activos de Información
- Ir a "Activos" → "Nuevo Activo"
- Completar formulario con tríada CIA
- Guardar

**Paso 2:** Identificar Riesgos
- Ir a "Gestión de Riesgos" → "Nuevo Riesgo"
- Seleccionar activo afectado
- Describir amenaza y vulnerabilidad
- Ingresar probabilidad e impacto (1-5)
- El sistema calcula automáticamente el score

**Paso 3:** Aplicar Tratamiento
- Ir a "Tratamiento"
- Revisar riesgos que requieren acción
- Seleccionar control ISO 27002
- (Opcional) Usar asistente de IA
- Subir evidencias
- Aplicar tratamiento

**Paso 4:** Monitorear Cumplimiento
- Ir a "Cumplimiento"
- Revisar métricas actualizadas
- Generar reporte si necesario

**Paso 5:** Generar Reportes
- Ir a "Reportes"
- Descargar reporte ejecutivo
- Exportar datos a CSV para análisis externo

### **3. Funciones Avanzadas**

**Sincronización con Wazuh:**
- En "Activos" → Click "Sincronizar Wazuh"
- Importa activos y alertas automáticamente

**Escaneo de Vulnerabilidades:**
- En "Vulnerabilidades" → Click "Escanear"
- Detecta nuevas CVE
- Crear riesgos desde vulnerabilidades

**Análisis ROI:**
- En Dashboard → Icono ROI (si está disponible en nav)
- Seleccionar riesgo tratado
- Ingresar costos y valor de activo
- Ver ROI calculado

---

## 🎓 Conclusiones y Aprendizajes

### **Logros Técnicos:**

1. **Desarrollo Full-Stack Frontend:** Aplicativo web completo con JavaScript vanilla, demostrando dominio de tecnologías web fundamentales sin dependencia de frameworks.

2. **Implementación de Estándares:** Aplicación práctica de normas ISO/IEC 27001, 27002 y 27005, traduciendo teoría en funcionalidad real.

3. **Arquitectura Modular:** Sistema bien estructurado con separación de responsabilidades, facilitando mantenimiento y escalabilidad.

4. **UX/UI Profesional:** Interfaz moderna tipo dashboard empresarial (estilo Wazuh/Azure) con navegación intuitiva y diseño oscuro profesional.

5. **Automatización Inteligente:** Cálculos automáticos, monitoreo continuo, notificaciones y asistente de IA para optimizar el trabajo del analista.

### **Aprendizajes en Ciberseguridad:**

✅ **Gestión de Riesgos:** Comprensión profunda del ciclo completo de risk management  
✅ **Normativa ISO:** Aplicación práctica de controles y metodologías internacionales  
✅ **Tríada CIA:** Valoración diferenciada de confidencialidad, integridad y disponibilidad  
✅ **Vulnerabilidades:** Integración de bases CVE y gestión de amenazas conocidas  
✅ **Compliance:** Cálculo de métricas de cumplimiento normativo  
✅ **Auditoría:** Importancia de trazabilidad y logs en sistemas críticos  

### **Responsabilidad Profesional y Ética:**

Este proyecto demuestra que el **Ingeniero en Ciberseguridad** tiene la capacidad y responsabilidad de:

- 🛡️ **Proteger organizaciones** mediante herramientas tecnológicas efectivas
- 📊 **Proveer visibilidad** sobre el estado de seguridad real
- ⚖️ **Actuar con ética** en el manejo de información sensible
- 🎯 **Priorizar recursos** en base a datos cuantitativos (riesgo, ROI)
- 📝 **Documentar y justificar** decisiones de seguridad
- 🔄 **Mejorar continuamente** los procesos de seguridad

### **Impacto Social y Económico:**

El sistema ayuda a prevenir:
- 💸 **Pérdidas económicas** por incidentes de seguridad
- 🔐 **Fugas de información** sensible de clientes
- ⚠️ **Daños reputacionales** a la organización
- 📉 **Multas regulatorias** por incumplimiento normativo
- 🚨 **Interrupciones** del negocio

### **Proyección Futura:**

El proyecto actual es un **prototipo funcional completo** que puede evolucionar hacia:

**Versión Empresarial (v3.0):**
- Backend con API REST (Node.js/Python)
- Base de datos persistente (PostgreSQL/MongoDB)
- Autenticación y control de acceso (JWT, RBAC)
- Multi-tenancy para múltiples organizaciones
- Integraciones reales con SIEM (Wazuh, Splunk, ELK)
- Dashboards con gráficos avanzados (Chart.js, D3.js)
- Notificaciones push y email
- Generación de PDFs profesionales
- API de IA para análisis predictivo
- Mobile app (React Native/Flutter)

**Extensiones Posibles:**
- Módulo de gestión de incidentes
- Sistema de tickets de seguridad
- Gestión de activos de TI (CMDB)
- Correlación de eventos (SIEM integration)
- Threat intelligence feeds
- Automatización de respuestas (SOAR)

---

## 📞 Información del Proyecto

**Desarrollado por:** Equipo de Ingeniería en Ciberseguridad  
**Institución:** [Tu Institución]  
**Fecha de Inicio:** 2025  
**Versión Actual:** 2.0 - Implementación Completa  
**Fecha de Finalización:** 22 de enero de 2026  

**Metodología:** ISO/IEC 27005, ISO/IEC 27001, ISO/IEC 27002:2022  
**Tecnologías:** HTML5, CSS3, JavaScript ES6+  
**Licencia:** Proyecto Académico  

---

## 🙏 Agradecimientos

Este proyecto ha sido posible gracias a:
- Las normas internacionales **ISO/IEC** que guían las mejores prácticas
- La comunidad de **ciberseguridad** que comparte conocimiento
- Herramientas open source como **Wazuh** que inspiran el diseño
- Los principios éticos de la **ingeniería profesional**

---

## ✨ Reflexión Final

**RiskManager Pro** representa más que un proyecto técnico: es una demostración de que la **tecnología, aplicada con responsabilidad y ética profesional, puede hacer del mundo digital un lugar más seguro**.

Como ingenieros en ciberseguridad, tenemos el deber de:
- Proteger la información de las personas y organizaciones
- Diseñar sistemas seguros desde su concepción
- Actuar con transparencia y honestidad
- Contribuir a la seguridad colectiva de la sociedad digital

Este proyecto es un paso en esa dirección. 🚀🔐

---

**FIN DEL DOCUMENTO**

*Este aplicativo está listo para ser utilizado, demostrado y evolucionado hacia una solución empresarial completa.* 

 

 