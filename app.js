// Data Storage (In-memory for prototype)
let assets = [
    { id: 1, name: 'Servidor Base de Datos', type: 'Hardware', value: 5, owner: 'TI', location: 'Data Center', confidentiality: 5, integrity: 5, availability: 5 },
    { id: 2, name: 'Código Fuente App', type: 'Software', value: 5, owner: 'Desarrollo', location: 'GitHub', confidentiality: 4, integrity: 5, availability: 3 },
    { id: 3, name: 'Laptops Empleados', type: 'Hardware', value: 3, owner: 'RRHH', location: 'Oficina', confidentiality: 3, integrity: 3, availability: 3 }
];

let risks = [
    { id: 1, assetId: 1, threat: 'Inyección SQL', vulnerability: 'Falta validación de entrada', prob: 3, impact: 5, riskScore: 15, treated: false, dateIdentified: '2026-01-15' },
    { id: 2, assetId: 3, threat: 'Robo de equipo', vulnerability: 'No hay cifrado de disco', prob: 2, impact: 4, riskScore: 8, treated: false, dateIdentified: '2026-01-18' }
];

// ISO/IEC 27002:2022 Controls Database
const ISO27002Controls = {
    '5.1': { category: 'Organizational', title: 'Políticas de seguridad de la información', description: 'Proporcionar dirección y apoyo de gestión' },
    '5.7': { category: 'Organizational', title: 'Inteligencia de amenazas', description: 'Recopilar y analizar información sobre amenazas' },
    '5.15': { category: 'Organizational', title: 'Control de acceso', description: 'Limitar acceso a información y sistemas' },
    '5.23': { category: 'Organizational', title: 'Seguridad de la información en uso de servicios cloud', description: 'Gestionar riesgos en cloud' },
    '8.1': { category: 'Technological', title: 'Dispositivos de usuario final', description: 'Proteger información en dispositivos de usuario' },
    '8.2': { category: 'Technological', title: 'Derechos de acceso privilegiados', description: 'Gestionar y controlar accesos privilegiados' },
    '8.3': { category: 'Technological', title: 'Restricción de acceso a la información', description: 'Restringir acceso según política' },
    '8.8': { category: 'Technological', title: 'Gestión de vulnerabilidades técnicas', description: 'Prevenir explotación de vulnerabilidades' },
    '8.9': { category: 'Technological', title: 'Gestión de configuración', description: 'Establecer configuraciones seguras' },
    '8.13': { category: 'Technological', title: 'Respaldo de información', description: 'Mantener copias de seguridad' },
    '8.16': { category: 'Technological', title: 'Actividades de monitoreo', description: 'Detectar comportamiento anómalo' },
    '8.19': { category: 'Technological', title: 'Instalación de software en sistemas operativos', description: 'Controlar instalación de software' },
    '8.20': { category: 'Technological', title: 'Seguridad de redes', description: 'Proteger redes y dispositivos' },
    '8.21': { category: 'Technological', title: 'Seguridad de servicios de red', description: 'Implementar mecanismos de seguridad en servicios' },
    '8.23': { category: 'Technological', title: 'Filtrado web', description: 'Gestionar acceso a sitios web externos' },
    '8.24': { category: 'Technological', title: 'Uso de criptografía', description: 'Proteger confidencialidad e integridad' },
    '8.28': { category: 'Technological', title: 'Codificación segura', description: 'Aplicar principios de desarrollo seguro' }
};

// Vulnerability Database
const vulnerabilityDB = [
    { id: 'CVE-2023-44487', severity: 'CRITICAL', description: 'HTTP/2 Rapid Reset Attack', affected: 'Web Servers', cvss: 7.5 },
    { id: 'CVE-2023-4966', severity: 'CRITICAL', description: 'Citrix Bleed', affected: 'Citrix NetScaler', cvss: 9.4 },
    { id: 'CVE-2023-36884', severity: 'HIGH', description: 'Microsoft Office RCE', affected: 'MS Office', cvss: 8.8 },
    { id: 'CVE-2023-22518', severity: 'CRITICAL', description: 'Atlassian Confluence Auth Bypass', affected: 'Confluence', cvss: 9.8 }
];

// Audit Trail
let auditLog = [];

// Compliance Status
let complianceMetrics = {
    iso27001: 0,
    gdpr: 0,
    pci: 0,
    lastAssessment: null
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    renderAssets();
    renderRisks();
    renderTreatment();
    populateAssetSelect();
    populateROIRiskSelect();
    populateControlSelect();
    checkSLA();
    renderComplianceDashboard();
    renderAuditLog();
    renderVulnerabilities();
    startRiskMonitoring();
    logAudit('Sistema', 'Inicio de sesión', 'Usuario Admin inició sesión en el sistema');
});

// Notifications
let notifications = [];

function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function addNotification(type, msg) {
    notifications.push({ type, msg, date: new Date() });
    const badge = document.getElementById('notif-badge');
    badge.innerText = notifications.length;
    badge.style.display = 'block';

    const list = document.getElementById('notif-list');
    const li = document.createElement('li');
    li.innerHTML = `<strong>${type}:</strong> ${msg}<br><span style="font-size:0.7em; color:#888;">${new Date().toLocaleTimeString()}</span>`;
    list.prepend(li);
}

// Navigation Logic
function switchTab(tabId) {
    // Buttons state
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // Find button by onclick attribute (simple hack for this prototype)
    const btn = Array.from(document.querySelectorAll('.nav-btn')).find(b => b.getAttribute('onclick').includes(tabId));
    if (btn) btn.classList.add('active');

    // View sections state
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // Update Title
    const titles = {
        'dashboard': 'Dashboard General',
        'assets': 'Gestión de Activos',
        'risks': 'Matriz de Riesgos',
        'treatment': 'Plan de Tratamiento',
        'vulnerabilities': 'Gestión de Vulnerabilidades',
        'compliance': 'Cumplimiento Normativo',
        'iso-controls': 'Catálogo ISO/IEC 27002:2022',
        'audit': 'Registro de Auditoría',
        'reports': 'Reportes',
        'roi': 'Análisis Costo-Beneficio (ROI)'
    };
    document.getElementById('page-title').innerText = titles[tabId];
}

// --- ASSET MANAGEMENT ---

function showAssetForm() {
    document.getElementById('asset-form-card').style.display = 'block';
}

function hideAssetForm() {
    document.getElementById('asset-form-card').style.display = 'none';
    document.getElementById('assetForm').reset();
}

function addAsset(e) {
    e.preventDefault();
    const name = document.getElementById('assetName').value;
    const type = document.getElementById('assetType').value;
    const value = parseInt(document.getElementById('assetValue').value);
    const owner = document.getElementById('assetOwner')?.value || 'No asignado';
    const location = document.getElementById('assetLocation')?.value || 'No especificado';
    const conf = parseInt(document.getElementById('assetConf')?.value || value);
    const integ = parseInt(document.getElementById('assetInteg')?.value || value);
    const avail = parseInt(document.getElementById('assetAvail')?.value || value);

    const newAsset = {
        id: assets.length + 1,
        name,
        type,
        value,
        owner,
        location,
        confidentiality: conf,
        integrity: integ,
        availability: avail
    };

    assets.push(newAsset);
    logAudit('Activos', 'Crear', `Nuevo activo registrado: ${name}`);
    renderAssets();
    populateAssetSelect();
    updateDashboard();
    hideAssetForm();
    addNotification('Activo', `Activo "${name}" registrado exitosamente`);
}

function renderAssets() {
    const tbody = document.getElementById('assets-table-body');
    tbody.innerHTML = '';
    assets.forEach(asset => {
        const row = `
            <tr>
                <td>#${asset.id}</td>
                <td><strong>${asset.name}</strong></td>
                <td>${asset.type}</td>
                <td>${getAssetValueLabel(asset.value)}</td>
                <td><button class="btn" style="padding: 2px 8px; font-size: 0.8rem;"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function getAssetValueLabel(val) {
    if (val >= 5) return '<span style="color: #ff6b6b">Alto (Crítico)</span>';
    if (val >= 3) return '<span style="color: #ffce3b">Medio</span>';
    return '<span style="color: #4cd964">Bajo</span>';
}

function populateAssetSelect() {
    const select = document.getElementById('riskAssetSelect');
    select.innerHTML = '';
    assets.forEach(asset => {
        const option = document.createElement('option');
        option.value = asset.id;
        option.innerText = `${asset.name} (ID: ${asset.id})`;
        select.appendChild(option);
    });
}

// --- RISK MANAGEMENT ---

function showRiskForm() {
    document.getElementById('risk-form-card').style.display = 'block';
}

function hideRiskForm() {
    document.getElementById('risk-form-card').style.display = 'none';
    document.getElementById('riskForm').reset();
}

function addRisk(e) {
    e.preventDefault();
    const assetId = parseInt(document.getElementById('riskAssetSelect').value);
    const threat = document.getElementById('riskThreat').value;
    const prob = parseInt(document.getElementById('riskProb').value);
    const impact = parseInt(document.getElementById('riskImpact').value);
    const riskScore = prob * impact;

    const newRisk = {
        id: risks.length + 1,
        assetId,
        threat,
        prob,
        impact,
        riskScore,
        treated: false
    };

    risks.push(newRisk);
    renderRisks();
    renderTreatment();
    updateDashboard();
    hideRiskForm();
}

function renderRisks() {
    const tbody = document.getElementById('risks-table-body');
    tbody.innerHTML = '';
    risks.forEach(risk => {
        const asset = assets.find(a => a.id === risk.assetId);
        const assetName = asset ? asset.name : 'Unknown';
        const level = getRiskLevel(risk.riskScore);

        const row = `
            <tr>
                <td>R-${risk.id}</td>
                <td>${assetName}</td>
                <td>${risk.threat}</td>
                <td>${risk.prob} x ${risk.impact} = <strong>${risk.riskScore}</strong></td>
                <td><span class="badge ${level.class}">${level.label}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function getRiskLevel(score) {
    if (score >= 15) return { label: 'CRÍTICO', class: 'badge-critical' };
    if (score >= 10) return { label: 'ALTO', class: 'badge-high' };
    if (score >= 5) return { label: 'MEDIO', class: 'badge-medium' };
    return { label: 'BAJO', class: 'badge-low' };
}

// --- TREATMENT ---

function renderTreatment() {
    const tbody = document.getElementById('treatment-table-body');
    tbody.innerHTML = '';
    // Filter only risks that need treatment (Medium/High/Critical)
    const untreatedRisks = risks.filter(r => r.riskScore >= 5);

    untreatedRisks.forEach(risk => {
        const asset = assets.find(a => a.id === risk.assetId);
        const level = getRiskLevel(risk.riskScore);

        // If already treated, show different status (simplified for prototype)
        const actionBtn = risk.treated
            ? '<span style="color: var(--success);"><i class="fa-solid fa-check"></i> Tratado</span>'
            : `<button class="btn btn-primary" style="font-size: 0.8rem;" onclick="applyTreatment(${risk.id})">Aplicar Control</button>`;

        const residual = risk.treated
            ? Math.floor(risk.riskScore * 0.2) // Assume 80% reduction
            : '-';

        const row = `
            <tr>
                <td>R-${risk.id}: ${risk.threat}</td>
                <td><span class="badge ${level.class}">${risk.riskScore}</span></td>
                <td>Mitigar</td>
                <td>
                    <select class="form-control" style="font-size: 0.8rem; padding: 5px; width: 150px; display:inline-block;" ${risk.treated ? 'disabled' : ''}>
                        <option>Control de Acceso (ISO 5.15)</option>
                        <option>Backup (ISO 8.13)</option>
                        <option>Firewall / Red (ISO 8.20)</option>
                    </select>
                    <button id="ai-btn-${risk.id}" class="btn" style="background-color: #6f42c1; color: white; padding: 3px 8px; font-size: 0.75rem; margin-left: 5px;" onclick="askAI(${risk.id}, this)">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> IA
                    </button>
                    <button class="btn" style="background-color: var(--accent-blue); color: white; padding: 3px 8px; font-size: 0.75rem; margin-left: 5px;" onclick="openEvidenceModal(${risk.id})">
                        <i class="fa-solid fa-paperclip"></i>
                    </button>
                </td>
                <td>${residual}</td>
                <td>${actionBtn}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function applyTreatment(riskId) {
    const risk = risks.find(r => r.id === riskId);
    if (risk) {
        risk.treated = true;
        renderTreatment();
        updateDashboard();
        alert(`Control aplicado exitosamente al riesgo R-${riskId}. El riesgo residual ha disminuido.`);
    }
}

// --- DASHBOARD UPDATE ---

function updateDashboard() {
    document.getElementById('dash-total-assets').innerText = assets.length;
    document.getElementById('dash-total-risks').innerText = risks.length;

    // Avg Risk
    const totalScore = risks.reduce((sum, r) => sum + r.riskScore, 0);
    const avg = risks.length ? (totalScore / risks.length).toFixed(1) : 0;
    document.getElementById('dash-avg-risk').innerText = avg;

    // Treated Controls
    const treatedCount = risks.filter(r => r.treated).length;
    document.getElementById('dash-controls').innerText = treatedCount;

    renderHeatmap();
}

// --- ADVANCED FEATURES (MOCK) ---

function syncWazuh() {
    const btn = event.srcElement;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sincronizando...';
    btn.disabled = true;

    setTimeout(() => {
        // Mock Assets found by Wazuh
        const wazuhAssets = [
            { id: assets.length + 1, name: 'srv-db-prod-01 (Wazuh Agent)', type: 'Hardware', value: 5 },
            { id: assets.length + 2, name: 'nginx-proxy (Wazuh Agent)', type: 'Software', value: 3 }
        ];
        assets.push(...wazuhAssets);

        // Mock Risks from Wazuh Alerts
        const wazuhRisks = [
            { id: risks.length + 1, assetId: assets.length - 1, threat: 'Vulnerabilidad Critica (CVE-2023-XXXX) detectada', prob: 4, impact: 5, riskScore: 20, treated: false },
            { id: risks.length + 2, assetId: assets.length, threat: 'SSH Root Login Enable', prob: 5, impact: 3, riskScore: 15, treated: false }
        ];
        risks.push(...wazuhRisks);

        renderAssets();
        renderRisks();
        renderTreatment();
        populateAssetSelect();
        updateDashboard();

        // Added Notification
        addNotification('SIEM', 'Se han importado 2 activos y 2 alertas críticas desde Wazuh.');

        alert('Sincronización con Wazuh completada. Se han importado nuevos activos y detecciones de riesgos.');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

function askAI(riskId) {
    const risk = risks.find(r => r.id === riskId);
    if (!risk) return;

    const btn = document.getElementById(`ai-btn-${riskId}`);
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles fa-beat"></i> Pensando...';

    setTimeout(() => {
        // Mock AI Response based on simple keywords
        let suggestion = "Se recomienda implementar controles de acceso estrictos.";
        if (risk.threat.toLowerCase().includes('sql')) suggestion = "Sugerencia AI: Implementar WAF y validar entradas (Input Validation) según OWASP. Referencia ISO 27002 8.28 (Secure Coding).";
        else if (risk.threat.toLowerCase().includes('dos')) suggestion = "Sugerencia AI: Configurar limitación de tasa (Rate Limiting) y usar servicios anti-DDoS. Referencia ISO 27002 8.21.";
        else if (risk.threat.toLowerCase().includes('robo')) suggestion = "Sugerencia AI: Cifrado de disco completo y políticas de bloqueo remoto. Referencia ISO 27002 8.1.";

        // Find the select element in the same row (this is a bit hacky, cleaner to use ID)
        // For prototype, prompt alert is easiest or inject text
        alert(suggestion);
        btn.innerHTML = originalContent; // Reset button
    }, 1000);
}

function renderHeatmap() {
    const container = document.getElementById('heatmap-container');
    if (!container) return; // Guard for pages where element might not exist yet

    container.innerHTML = '<div class="heatmap-grid" id="heatmap-grid"></div>';
    const grid = document.getElementById('heatmap-grid');

    // Grid Layout:
    // Rows (Y): Impact 5 -> 1
    // Cols (X): Prob 1 -> 5

    // Add Y Labels
    // We need to construct this thoughtfully.
    // CSS Grid expects linear children.

    // Row 5 (Impact 5)
    // Label 5 + 5 Cells

    for (let impact = 5; impact >= 1; impact--) {
        // Y Axis Label
        const labelY = document.createElement('div');
        labelY.className = 'heatmap-axis-y';
        labelY.innerText = impact;
        grid.appendChild(labelY);

        for (let prob = 1; prob <= 5; prob++) {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';

            // Calculate color based on Risk Score (Prob * Impact)
            const score = prob * impact;
            cell.style.backgroundColor = getHeatmapColor(score);

            // Count risks in this cell
            const count = risks.filter(r => r.prob === prob && r.impact === impact).length;
            if (count > 0) {
                cell.innerHTML = `<span class="heatmap-count-badge">${count}</span>`;
                cell.title = `${count} Riesgos (Prob: ${prob}, Imp: ${impact})`;
            }

            grid.appendChild(cell);
        }
    }

    // Bottom numeric row (X Axis Labels)
    // Empty corner
    grid.appendChild(document.createElement('div'));

    for (let i = 1; i <= 5; i++) {
        const labelX = document.createElement('div');
        labelX.className = 'heatmap-axis-x';
        labelX.innerText = i;
        grid.appendChild(labelX);
    }

    // Add Axis Names Overlay (Optional, or just keep simple numbers)
}

function getHeatmapColor(score) {
    // Gradient from Green to Red
    // Low (1-4): Greenish
    // Med (5-9): Yellowish
    // High (10-15): Orange
    // Critical (16-25): Red
    if (score >= 15) return '#dc3545'; // Red
    if (score >= 10) return '#fd7e14'; // Orange
    if (score >= 5) return '#ffc107'; // Yellow
    return '#28a745'; // Green
}

// --- ROI & FINANCE MODULE ---

function populateROIRiskSelect() {
    const select = document.getElementById('roiRiskSelect');
    if (!select) return;
    select.innerHTML = '<option value="">-- Seleccione Riesgo --</option>';
    risks.forEach(r => {
        const asset = assets.find(a => a.id === r.assetId);
        select.innerHTML += `<option value="${r.id}">R-${r.id}: ${r.threat} (Activo: ${asset?.name})</option>`;
    });
}

function calculateROI() {
    const riskId = parseInt(document.getElementById('roiRiskSelect').value);
    const cost = parseFloat(document.getElementById('controlCost').value) || 0;
    const assetVal = parseFloat(document.getElementById('assetValueMoney').value) || 0;

    if (!riskId) return;

    const risk = risks.find(r => r.id === riskId);

    // Simplified ALE Calculation
    // ALE = Annual Loss Expectancy = Asset Value * Exposure Factor * Annualized Rate of Occurrence
    // For prototype: Impact (1-5) maps to Exposure Factor (10% - 100%)
    // Prob (1-5) maps to Occurrence (0.1 - 10 times/year)

    const exposureFactor = risk.impact * 0.20; // Max 100%
    const occurrence = risk.prob * 0.5; // Arbitrary scaler

    const aleCurrent = assetVal * exposureFactor * occurrence;

    // ALE After Control (Assume 80% risk reduction)
    const aleResidual = aleCurrent * 0.20;

    // Savings
    const savings = aleCurrent - aleResidual;

    // ROI = (Savings - Cost) / Cost * 100
    const roi = ((savings - cost) / cost) * 100;

    document.getElementById('roi-ale-current').innerText = aleCurrent.toLocaleString(undefined, { maximumFractionDigits: 0 });
    document.getElementById('roi-cost').innerText = cost.toLocaleString(undefined, { maximumFractionDigits: 0 });
    document.getElementById('roi-savings').innerText = savings.toLocaleString(undefined, { maximumFractionDigits: 0 });

    const roiEl = document.getElementById('roi-percent');
    roiEl.innerText = roi.toFixed(1) + '%';
    roiEl.style.color = roi > 0 ? 'var(--success)' : 'var(--danger)';
}

// --- EVIDENCE MODULE ---
let currentEvidenceRiskId = null;

function openEvidenceModal(riskId) {
    currentEvidenceRiskId = riskId;
    document.getElementById('evidence-modal').style.display = 'block';
    renderEvidenceList();
}

function closeEvidenceModal() {
    document.getElementById('evidence-modal').style.display = 'none';
    currentEvidenceRiskId = null;
}

function handleFiles(files) {
    // Mock upload
    const risk = risks.find(r => r.id === currentEvidenceRiskId);
    if (!risk.evidence) risk.evidence = [];

    Array.from(files).forEach(file => {
        risk.evidence.push({ name: file.name, date: new Date().toLocaleDateString() });
    });
    renderEvidenceList();
}

function saveEvidence() {
    alert('Evidencias guardadas en el registro del riesgo.');
    closeEvidenceModal();
}

function renderEvidenceList() {
    const list = document.getElementById('evidence-list');
    list.innerHTML = '';
    const risk = risks.find(r => r.id === currentEvidenceRiskId);
    if (risk && risk.evidence) {
        risk.evidence.forEach(f => {
            list.innerHTML += `<li><i class="fa-solid fa-file"></i> ${f.name} <span style="font-size:0.8rem; color:#888;">${f.date}</span></li>`;
        });
    }
}

// --- SLA / NOTIFICATIONS ---

function checkSLA() {
    // Mock check: If a Critical risk exists and is untreated, warn user.
    const criticalUntreated = risks.filter(r => r.riskScore >= 15 && !r.treated);

    if (criticalUntreated.length > 0) {
        addNotification('SLA Crítico', `Existen ${criticalUntreated.length} riesgos críticos sin tratar que exceden el tiempo de respuesta.`);
    }
}

// --- AUDIT LOG MODULE ---

function logAudit(module, action, description) {
    const entry = {
        id: auditLog.length + 1,
        timestamp: new Date().toLocaleString('es-ES'),
        module,
        action,
        description,
        user: 'Admin User'
    };
    auditLog.unshift(entry);
    
    // Keep last 100 entries
    if (auditLog.length > 100) auditLog.pop();
    
    renderAuditLog();
}

function renderAuditLog() {
    const tbody = document.getElementById('audit-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    const recentLogs = auditLog.slice(0, 20); // Show last 20
    
    recentLogs.forEach(log => {
        const row = `
            <tr>
                <td>${log.timestamp}</td>
                <td>${log.module}</td>
                <td>${log.action}</td>
                <td>${log.description}</td>
                <td>${log.user}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function exportAuditLog() {
    const csv = ['Timestamp,Module,Action,Description,User'];
    auditLog.forEach(log => {
        csv.push(`${log.timestamp},${log.module},${log.action},"${log.description}",${log.user}`);
    });
    
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_log_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    logAudit('Auditoría', 'Exportar', 'Registro de auditoría exportado');
}

// --- COMPLIANCE DASHBOARD ---

function renderComplianceDashboard() {
    updateComplianceMetrics();
    
    document.getElementById('comp-iso27001').innerText = complianceMetrics.iso27001 + '%';
    document.getElementById('comp-gdpr').innerText = complianceMetrics.gdpr + '%';
    document.getElementById('comp-pci').innerText = complianceMetrics.pci + '%';
    
    const lastAssess = complianceMetrics.lastAssessment || 'Nunca';
    document.getElementById('comp-last-assessment').innerText = lastAssess;
}

function updateComplianceMetrics() {
    // Calculate based on treated risks and implemented controls
    const totalRisks = risks.length;
    const treatedRisks = risks.filter(r => r.treated).length;
    const highRisksTreated = risks.filter(r => r.riskScore >= 10 && r.treated).length;
    const highRisksTotal = risks.filter(r => r.riskScore >= 10).length;
    
    // ISO 27001 (based on risk treatment)
    complianceMetrics.iso27001 = totalRisks > 0 ? Math.round((treatedRisks / totalRisks) * 100) : 0;
    
    // GDPR (based on data protection assets)
    const dataAssets = assets.filter(a => a.type === 'Datos' && a.confidentiality >= 4).length;
    const protectedDataAssets = dataAssets > 0 ? Math.round((dataAssets * 0.7)) : 0; // Mock
    complianceMetrics.gdpr = dataAssets > 0 ? Math.round((protectedDataAssets / dataAssets) * 100) : 0;
    
    // PCI DSS (based on critical controls)
    complianceMetrics.pci = highRisksTotal > 0 ? Math.round((highRisksTreated / highRisksTotal) * 100) : 0;
    
    complianceMetrics.lastAssessment = new Date().toLocaleDateString('es-ES');
}

function generateComplianceReport() {
    updateComplianceMetrics();
    
    const report = `
=================================================
       REPORTE DE CUMPLIMIENTO NORMATIVO
=================================================
Fecha: ${new Date().toLocaleString('es-ES')}
Organización: Mi Empresa

--- MÉTRICAS DE CUMPLIMIENTO ---
ISO/IEC 27001: ${complianceMetrics.iso27001}%
GDPR: ${complianceMetrics.gdpr}%
PCI DSS: ${complianceMetrics.pci}%

--- RESUMEN DE RIESGOS ---
Total de Activos: ${assets.length}
Riesgos Identificados: ${risks.length}
Riesgos Tratados: ${risks.filter(r => r.treated).length}
Riesgos Críticos Pendientes: ${risks.filter(r => r.riskScore >= 15 && !r.treated).length}

--- RECOMENDACIONES ---
${complianceMetrics.iso27001 < 80 ? '⚠ ISO 27001: Se requiere mayor cobertura de tratamiento de riesgos\n' : ''}
${complianceMetrics.gdpr < 80 ? '⚠ GDPR: Mejorar controles de protección de datos personales\n' : ''}
${complianceMetrics.pci < 80 ? '⚠ PCI DSS: Implementar controles de seguridad para datos de tarjetas\n' : ''}

=================================================
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance_report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    
    logAudit('Cumplimiento', 'Generar Reporte', 'Reporte de cumplimiento generado');
    addNotification('Reporte', 'Reporte de cumplimiento descargado');
}

// --- VULNERABILITY MANAGEMENT ---

function renderVulnerabilities() {
    const tbody = document.getElementById('vuln-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    vulnerabilityDB.forEach(vuln => {
        const severityClass = vuln.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high';
        const row = `
            <tr>
                <td><strong>${vuln.id}</strong></td>
                <td>${vuln.description}</td>
                <td>${vuln.affected}</td>
                <td><span class="badge ${severityClass}">${vuln.severity}</span></td>
                <td>${vuln.cvss}</td>
                <td><button class="btn btn-primary" style="font-size: 0.8rem; padding: 4px 10px;" onclick="createRiskFromVuln('${vuln.id}')">Crear Riesgo</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function createRiskFromVuln(vulnId) {
    const vuln = vulnerabilityDB.find(v => v.id === vulnId);
    if (!vuln) return;
    
    // Find or create an asset for the affected component
    let asset = assets.find(a => a.name.includes(vuln.affected));
    if (!asset) {
        asset = {
            id: assets.length + 1,
            name: `${vuln.affected} (Auto-detectado)`,
            type: 'Software',
            value: 4,
            owner: 'TI',
            location: 'Infraestructura',
            confidentiality: 4,
            integrity: 4,
            availability: 4
        };
        assets.push(asset);
    }
    
    // Create risk based on CVSS score
    const prob = vuln.cvss >= 9 ? 5 : vuln.cvss >= 7 ? 4 : 3;
    const impact = vuln.severity === 'CRITICAL' ? 5 : 4;
    
    const newRisk = {
        id: risks.length + 1,
        assetId: asset.id,
        threat: `${vuln.id}: ${vuln.description}`,
        vulnerability: `Vulnerabilidad conocida CVSS ${vuln.cvss}`,
        prob,
        impact,
        riskScore: prob * impact,
        treated: false,
        dateIdentified: new Date().toISOString().split('T')[0]
    };
    
    risks.push(newRisk);
    renderRisks();
    renderTreatment();
    updateDashboard();
    
    logAudit('Vulnerabilidades', 'Crear Riesgo', `Riesgo creado desde vulnerabilidad ${vulnId}`);
    addNotification('Vulnerabilidad', `Riesgo R-${newRisk.id} creado desde ${vulnId}`);
    
    alert(`Riesgo R-${newRisk.id} creado exitosamente desde la vulnerabilidad ${vulnId}`);
}

function scanVulnerabilities() {
    const btn = event.target;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Escaneando...';
    
    setTimeout(() => {
        // Mock: Add a new vulnerability
        const newVuln = {
            id: 'CVE-2026-' + Math.floor(Math.random() * 10000),
            severity: Math.random() > 0.5 ? 'CRITICAL' : 'HIGH',
            description: 'Nueva vulnerabilidad detectada en el sistema',
            affected: 'Sistema Operativo',
            cvss: (7 + Math.random() * 3).toFixed(1)
        };
        
        vulnerabilityDB.push(newVuln);
        renderVulnerabilities();
        
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-shield-virus"></i> Escanear Vulnerabilidades';
        
        addNotification('Scan', `Escaneo completado. Se encontró 1 nueva vulnerabilidad`);
        logAudit('Vulnerabilidades', 'Escanear', 'Escaneo de vulnerabilidades completado');
    }, 2000);
}

// --- AUTOMATED RISK MONITORING ---

let monitoringInterval = null;

function startRiskMonitoring() {
    // Check for new high risks every 30 seconds
    monitoringInterval = setInterval(() => {
        const untreatedCritical = risks.filter(r => r.riskScore >= 15 && !r.treated);
        const untreatedHigh = risks.filter(r => r.riskScore >= 10 && r.riskScore < 15 && !r.treated);
        
        if (untreatedCritical.length > 0) {
            console.warn(`⚠️ ALERTA: ${untreatedCritical.length} riesgos críticos sin tratar`);
        }
        
        if (untreatedHigh.length > 0) {
            console.info(`ℹ️ INFO: ${untreatedHigh.length} riesgos altos sin tratar`);
        }
    }, 30000);
}

function stopRiskMonitoring() {
    if (monitoringInterval) {
        clearInterval(monitoringInterval);
        monitoringInterval = null;
    }
}

// --- ISO 27002 CONTROLS ---

function populateControlSelect() {
    const select = document.getElementById('isoControlSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Seleccione Control ISO 27002:2022 --</option>';
    Object.keys(ISO27002Controls).forEach(key => {
        const control = ISO27002Controls[key];
        select.innerHTML += `<option value="${key}">${key} - ${control.title}</option>`;
    });
}

function showControlDetails() {
    const select = document.getElementById('isoControlSelect');
    const detailsDiv = document.getElementById('control-details');
    
    if (!select.value) {
        detailsDiv.style.display = 'none';
        return;
    }
    
    const control = ISO27002Controls[select.value];
    detailsDiv.innerHTML = `
        <div style="background-color: var(--bg-dark); padding: 15px; border-radius: 4px; margin-top: 10px;">
            <h4 style="color: var(--accent-blue);">${select.value}: ${control.title}</h4>
            <p style="margin: 10px 0;"><strong>Categoría:</strong> ${control.category}</p>
            <p style="margin: 10px 0;"><strong>Descripción:</strong> ${control.description}</p>
        </div>
    `;
    detailsDiv.style.display = 'block';
}

// --- ENHANCED EXPORT FUNCTIONS ---

function exportRisksCSV() {
    const csv = ['ID,Activo,Amenaza,Vulnerabilidad,Probabilidad,Impacto,Score,Nivel,Tratado,Fecha'];
    
    risks.forEach(risk => {
        const asset = assets.find(a => a.id === risk.assetId);
        const level = getRiskLevel(risk.riskScore).label;
        csv.push(`R-${risk.id},"${asset?.name || 'Unknown'}","${risk.threat}","${risk.vulnerability || 'N/A'}",${risk.prob},${risk.impact},${risk.riskScore},${level},${risk.treated ? 'Sí' : 'No'},${risk.dateIdentified || 'N/A'}`);
    });
    
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `risks_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    logAudit('Exportación', 'CSV Riesgos', 'Matriz de riesgos exportada a CSV');
    addNotification('Exportación', 'Matriz de riesgos exportada exitosamente');
}

function exportAssetsCSV() {
    const csv = ['ID,Nombre,Tipo,Propietario,Ubicación,Valor,Confidencialidad,Integridad,Disponibilidad'];
    
    assets.forEach(asset => {
        csv.push(`${asset.id},"${asset.name}",${asset.type},"${asset.owner || 'N/A'}","${asset.location || 'N/A'}",${asset.value},${asset.confidentiality},${asset.integrity},${asset.availability}`);
    });
    
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assets_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    logAudit('Exportación', 'CSV Activos', 'Inventario de activos exportado a CSV');
    addNotification('Exportación', 'Inventario de activos exportado exitosamente');
}

function generateExecutiveReport() {
    updateComplianceMetrics();
    
    const report = `
╔═══════════════════════════════════════════════╗
║     REPORTE EJECUTIVO DE RIESGOS CYBER       ║
╚═══════════════════════════════════════════════╝

Fecha: ${new Date().toLocaleString('es-ES')}
Generado por: RiskManager Pro

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 RESUMEN GENERAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Activos Totales: ${assets.length}
Riesgos Identificados: ${risks.length}
Riesgos Tratados: ${risks.filter(r => r.treated).length}
Riesgo Promedio: ${(risks.reduce((sum, r) => sum + r.riskScore, 0) / risks.length).toFixed(1)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  RIESGOS POR NIVEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRÍTICO (≥15): ${risks.filter(r => r.riskScore >= 15).length}
ALTO (10-14): ${risks.filter(r => r.riskScore >= 10 && r.riskScore < 15).length}
MEDIO (5-9): ${risks.filter(r => r.riskScore >= 5 && r.riskScore < 10).length}
BAJO (<5): ${risks.filter(r => r.riskScore < 5).length}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 CUMPLIMIENTO NORMATIVO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ISO/IEC 27001:2022: ${complianceMetrics.iso27001}%
GDPR: ${complianceMetrics.gdpr}%
PCI DSS: ${complianceMetrics.pci}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 TOP 5 RIESGOS CRÍTICOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${risks.sort((a, b) => b.riskScore - a.riskScore).slice(0, 5).map((r, i) => {
    const asset = assets.find(a => a.id === r.assetId);
    return `${i+1}. [R-${r.id}] ${r.threat}\n   Activo: ${asset?.name}\n   Score: ${r.riskScore} | Estado: ${r.treated ? '✓ Tratado' : '✗ Pendiente'}\n`;
}).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 RECOMENDACIONES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${risks.filter(r => !r.treated && r.riskScore >= 10).length > 0 ? 
  `• Priorizar tratamiento de ${risks.filter(r => !r.treated && r.riskScore >= 10).length} riesgos altos/críticos\n` : ''}
${complianceMetrics.iso27001 < 80 ? '• Aumentar cobertura de controles ISO 27001\n' : ''}
${assets.filter(a => a.value >= 4 && a.confidentiality >= 4).length > 0 ? 
  `• Revisar protección de ${assets.filter(a => a.value >= 4).length} activos críticos\n` : ''}
• Realizar evaluaciones periódicas de riesgos
• Mantener actualizado el inventario de activos
• Documentar evidencias de controles implementados

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este reporte fue generado automáticamente por RiskManager.
Metodología basada en ISO/IEC 27005 e ISO/IEC 27002:2022

═══════════════════════════════════════════════
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `executive_report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    
    logAudit('Reportes', 'Generar Ejecutivo', 'Reporte ejecutivo generado');
    addNotification('Reporte', 'Reporte ejecutivo descargado');
}
