# Documento de Ruta de Implementación (Implementation Path)

Este documento detalla la hoja de ruta para llevar el sistema de "Gestión Automatizada de Riesgos Cibernéticos" desde su fase actual de prototipo hasta un producto de producción completo y robusto.

## Fase 1: Prototipo y Validación (Actual)
*   **Objetivo**: Demostrar la viabilidad del flujo de gestión de riesgos (Activos -> Riesgos -> Tratamiento).
*   **Tecnologías**: HTML5, CSS3, JavaScript (Vanilla).
*   **Almacenamiento**: Local (en navegador) o datos volátiles.
*   **Entregable**: Interfaz funcional para demostración de concepto.

## Fase 2: Persistencia y Autenticación
*   **Objetivo**: Permitir guardar datos reales y gestionar múltiples usuarios.
*   **Backend**: Desarrollo de API RESTful (Node.js/Express o Python/FastAPI).
*   **Base de Datos**: Implementación de base de datos relacional (PostgreSQL) para integridad de datos de auditoría.
*   **Seguridad**: Implementación de Login (JWT/OAuth2) y Roles (Admin, Analista, Auditor).

## Fase 3: Integración con Estándares
*   **Objetivo**: Cargar catálogos completos de ISO/IEC 27002:2022 y NIST.
*   **Funcionalidad**: 
    *   Importación masiva de controles.
    *   Mapeo automático de amenazas comunes a controles sugeridos.
    
## Fase 4: Automatización e Interoperabilidad
*   **Objetivo**: Conectar con herramientas de monitoreo real (como Wazuh).
*   **Integración**:
    *   Uso de la API de Wazuh para detectar activos automáticamente.
    *   Ingesta de vulnerabilidades detectadas por scanners (Nessus, OpenVAS) para pre-llenar la matriz de riesgos.
    
## Fase 5: Inteligencia y Reporte Avanzado
*   **Objetivo**: Predicción y soporte a la decisión.
*   **Funcionalidad**:
    *   Dashboards ejecutivos con métricas en tiempo real.
    *   Motor de IA para sugerir planes de tratamiento basados en el histórico de incidentes.
