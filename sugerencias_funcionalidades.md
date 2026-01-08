# Sugerencias de Funcionalidades Adicionales

Estado actual del proyecto: **Prototipo Funcional Completo (Fase 1 + Plus)**

## Funcionalidades Implementadas (Simulación/Prototipo)

### 1. Integración con Wazuh (SIEM) [IMPLEMENTADO - MOCK]
*   **Sincronización de Inventario**: Se agregó un botón para simular la importación de activos desde un agente Wazuh.
*   **Alertas como Riesgos**: El sistema importa alertas críticas simuladas y las convierte automáticamente en riesgos registrados.

### 2. Asistente de IA para "Tratamiento de Riesgos" [IMPLEMENTADO - MOCK]
*   **Asesor Inteligente**: Se implementó un botón "IA" que analiza la amenaza y sugiere controles ISO 27002 contextuales.

### 3. Simulación de Costo-Beneficio (ROI de Seguridad) [IMPLEMENTADO]
*   **Módulo Financiero**: Se agregó la pestaña "Análisis Costo-Beneficio" que calcula el ALE (Pérdida Anual Esperada) y el ROI de aplicar controles.

### 4. Matriz de Calor Interactiva (Heatmap) [IMPLEMENTADO]
*   **Visualización**: Se desarrolló una grilla de 5x5 dinámica en la sección de reportes que agrupa los riesgos según su Probabilidad e Impacto.

### 5. Gestión de Evidencias [IMPLEMENTADO - MOCK]
*   **Repositorio**: Se añadió un ícono de "Clip" en el tratamiento de riesgos que abre un modal permitiendo la subida (simulada) de archivos de evidencia.

### 6. Notificaciones y SLA [IMPLEMENTADO]
*   **Alertas**: Sistema de campana de notificaciones en el header que alerta automáticamente si hay riesgos críticos sin tratar (violando SLA).
