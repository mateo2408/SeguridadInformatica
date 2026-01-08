# Sugerencias de Funcionalidades Adicionales

Estado actual del proyecto: **Prototipo Funcional (Fase 1)**

## Funcionalidades Implementadas (Simulación/Prototipo)

### 1. Integración con Wazuh (SIEM) [IMPLEMENTADO - MOCK]
*   **Sincronización de Inventario**: Se agregó un botón para simular la importación de activos desde un agente Wazuh.
*   **Alertas como Riesgos**: El sistema importa alertas críticas simuladas y las convierte automáticamente en riesgos registrados.

### 2. Asistente de IA para "Tratamiento de Riesgos" [IMPLEMENTADO - MOCK]
*   **Asesor Inteligente**: Se implementó un botón "IA" que analiza la amenaza y sugiere controles ISO 27002 contextuales (ej. sugerir WAF para SQL Injection).

### 4. Matriz de Calor Interactiva (Heatmap) [IMPLEMENTADO]
*   **Visualización**: Se desarrolló una grilla de 5x5 dinámica en la sección de reportes que agrupa los riesgos según su Probabilidad e Impacto.

---

## Funcionalidades Pendientes (Próximos Pasos)

### 3. Simulación de Costo-Beneficio (ROI de Seguridad)
*   Un módulo financiero que permita estimar el costo de implementación del control vs. la Pérdida Expectada Anual (ALE - Annual Loss Expectancy). Esto ayuda a justificar presupuestos de ciberseguridad ante la directiva.

### 5. Gestión de Evidencias
*   Capacidad de subir archivos (screenshots, pdfs log) que sirvan como evidencia de que un control ha sido implementado, crucial para auditorías de certificación ISO 27001.

### 6. Notificaciones y SLA
*   Sistema de correos o alertas Slack/Teams cuando un riesgo crítico no ha sido tratado en el tiempo establecido (SLA).
