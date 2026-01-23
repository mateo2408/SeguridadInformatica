// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Data Storage (Will be loaded from MongoDB)
let assets = [];
let risks = [];
let auditLog = [];

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

// Compliance Status
let complianceMetrics = {
    iso27001: 0,
    gdpr: 0,
    pci: 0,
    lastAssessment: null
};

// Notifications
let notifications = [];

// ==================== API FUNCTIONS ====================

async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        addNotification('Error', `Error de API: ${error.message}`);
        throw error;
    }
}

async function loadAssets() {
    try {
        assets = await apiRequest('/assets');
        renderAssets();
        populateAssetSelect();
        populateROIRiskSelect();
    } catch (error) {
        console.error('Error loading assets:', error);
    }
}

async function loadRisks() {
    try {
        const risksData = await apiRequest('/risks');
        risks = risksData.map(risk => ({
            ...risk,
            id: risk._id,
            assetId: risk.assetId._id || risk.assetId,
            assetName: risk.assetId.name || ''
        }));
        renderRisks();
        renderTreatment();
    } catch (error) {
        console.error('Error loading risks:', error);
    }
}

async function loadAuditLog() {
    try {
        auditLog = await apiRequest('/audit');
        renderAuditLog();
    } catch (error) {
        console.error('Error loading audit log:', error);
    }
}

async function loadStats() {
    try {
        const stats = await apiRequest('/stats');
        document.getElementById('dash-total-assets').innerText = stats.totalAssets;
        document.getElementById('dash-total-risks').innerText = stats.totalRisks;
        document.getElementById('dash-avg-risk').innerText = stats.avgRisk;
        document.getElementById('dash-controls').innerText = stats.controlsImplemented;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function initializeDatabase() {
    try {
        const result = await apiRequest('/init', { method: 'POST' });
        addNotification('Sistema', 'Base de datos inicializada correctamente');
        await loadData();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

async function loadData() {
    await Promise.all([
        loadAssets(),
        loadRisks(),
        loadAuditLog(),
        loadStats()
    ]);
    updateDashboard();
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', async () => {
    // Check if backend is running
    try {
        const health = await apiRequest('/health');
        console.log('✅ Backend Status:', health);
        
        // Load initial data
        await loadData();
        
        // If no data, show init button
        if (assets.length === 0) {
            const shouldInit = confirm('No hay datos en la base de datos. ¿Desea inicializar con datos de ejemplo?');
            if (shouldInit) {
                await initializeDatabase();
            }
        }
    } catch (error) {
        console.error('❌ Backend no disponible:', error);
        alert('Error: No se puede conectar al servidor backend. Asegúrese de que el servidor esté ejecutándose en http://localhost:3000');
    }

    renderComplianceDashboard();
    renderVulnerabilities();
    populateControlSelect();
    checkSLA();
    startRiskMonitoring();
    logAudit('Sistema', 'Inicio de sesión', 'Usuario Admin inició sesión en el sistema');
});

// Notifications
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
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.nav-btn')).find(b => b.getAttribute('onclick').includes(tabId));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

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

async function addAsset(e) {
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
        name,
        type,
        value,
        owner,
        location,
        confidentiality: conf,
        integrity: integ,
        availability: avail
    };

    try {
        await apiRequest('/assets', {
            method: 'POST',
            body: JSON.stringify(newAsset)
        });
        
        await loadAssets();
        await loadStats();
        hideAssetForm();
        addNotification('Activo', `Activo "${name}" registrado exitosamente`);
    } catch (error) {
        alert('Error al crear activo: ' + error.message);
    }
}

function renderAssets() {
    const tbody = document.getElementById('assets-table-body');
    tbody.innerHTML = '';
    assets.forEach(asset => {
        const row = `
            <tr>
                <td>#${asset._id ? asset._id.substring(asset._id.length - 6) : asset.id}</td>
                <td><strong>${asset.name}</strong></td>
                <td>${asset.type}</td>
                <td>${getAssetValueLabel(asset.value)}</td>
                <td><button class="btn" style="padding: 2px 8px; font-size: 0.8rem;" onclick="deleteAsset('${asset._id || asset.id}')"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function deleteAsset(id) {
    if (!confirm('¿Está seguro de eliminar este activo?')) return;
    
    try {
        await apiRequest(`/assets/${id}`, { method: 'DELETE' });
        await loadAssets();
        await loadRisks();
        await loadStats();
        addNotification('Activo', 'Activo eliminado correctamente');
    } catch (error) {
        alert('Error al eliminar activo: ' + error.message);
    }
}

function getAssetValueLabel(val) {
    if (val >= 5) return '<span style="color: #ff6b6b">Alto (Crítico)</span>';
    if (val >= 3) return '<span style="color: #ffce3b">Medio</span>';
    return '<span style="color: #4cd964">Bajo</span>';
}

function populateAssetSelect() {
    const select = document.getElementById('riskAssetSelect');
    if (!select) return;
    select.innerHTML = '';
    assets.forEach(asset => {
        const option = document.createElement('option');
        option.value = asset._id || asset.id;
        option.innerText = `${asset.name}`;
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

async function addRisk(e) {
    e.preventDefault();
    const assetId = document.getElementById('riskAssetSelect').value;
    const threat = document.getElementById('riskThreat').value;
    const vulnerability = document.getElementById('riskVuln')?.value || 'No especificada';
    const prob = parseInt(document.getElementById('riskProb').value);
    const impact = parseInt(document.getElementById('riskImpact').value);
    const riskScore = prob * impact;

    const newRisk = {
        assetId,
        threat,
        vulnerability,
        prob,
        impact,
        riskScore,
        treated: false,
        dateIdentified: new Date()
    };

    try {
        await apiRequest('/risks', {
            method: 'POST',
            body: JSON.stringify(newRisk)
        });
        
        await loadRisks();
        await loadStats();
        hideRiskForm();
        addNotification('Riesgo', `Riesgo "${threat}" registrado`);
    } catch (error) {
        alert('Error al crear riesgo: ' + error.message);
    }
}

function renderRisks() {
    const tbody = document.getElementById('risks-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    risks.forEach(risk => {
        const assetName = risk.assetName || 'Unknown';
        const level = getRiskLevel(risk.riskScore);
        const riskId = risk._id ? risk._id.substring(risk._id.length - 6) : risk.id;

        const row = `
            <tr>
                <td>R-${riskId}</td>
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
    if (!tbody) return;
    tbody.innerHTML = '';
    const untreatedRisks = risks.filter(r => r.riskScore >= 5);

    untreatedRisks.forEach(risk => {
        const level = getRiskLevel(risk.riskScore);
        const riskId = risk._id ? risk._id.substring(risk._id.length - 6) : risk.id;

        const actionBtn = risk.treated
            ? '<span style="color: var(--success);"><i class="fa-solid fa-check"></i> Tratado</span>'
            : `<button class="btn btn-primary" style="font-size: 0.8rem;" onclick="applyTreatment('${risk._id || risk.id}')">Aplicar Control</button>`;

        const residual = risk.treated && risk.treatment?.residualRisk
            ? risk.treatment.residualRisk
            : '-';

        const row = `
            <tr>
                <td>R-${riskId}: ${risk.threat}</td>
                <td><span class="badge ${level.class}">${risk.riskScore}</span></td>
                <td>Mitigar</td>
                <td>
                    <select class="form-control" id="control-${risk._id || risk.id}" style="font-size: 0.8rem; padding: 5px; width: 150px; display:inline-block;" ${risk.treated ? 'disabled' : ''}>
                        <option>Control de Acceso (ISO 5.15)</option>
                        <option>Backup (ISO 8.13)</option>
                        <option>Firewall / Red (ISO 8.20)</option>
                        <option>Cifrado (ISO 8.24)</option>
                    </select>
                </td>
                <td>${residual}</td>
                <td>${actionBtn}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function applyTreatment(riskId) {
    const controlSelect = document.getElementById(`control-${riskId}`);
    const control = controlSelect ? controlSelect.value : 'Control de Acceso (ISO 5.15)';
    
    const risk = risks.find(r => (r._id || r.id) === riskId);
    if (!risk) return;

    const residualRisk = Math.floor(risk.riskScore * 0.2); // 80% reduction
    
    try {
        await apiRequest(`/risks/${riskId}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...risk,
                treated: true,
                treatment: {
                    type: 'mitigate',
                    controls: [control],
                    residualRisk: residualRisk,
                    cost: 5000,
                    roi: 80
                }
            })
        });
        
        await loadRisks();
        await loadStats();
        addNotification('Tratamiento', `Control aplicado al riesgo: ${risk.threat}`);
    } catch (error) {
        alert('Error al aplicar tratamiento: ' + error.message);
    }
}

// --- DASHBOARD ---

function updateDashboard() {
    loadStats();
}

// --- AUDIT LOG ---

async function logAudit(module, action, details) {
    try {
        await apiRequest('/audit', {
            method: 'POST',
            body: JSON.stringify({ module, action, details })
        });
        await loadAuditLog();
    } catch (error) {
        console.error('Error logging audit:', error);
    }
}

function renderAuditLog() {
    const tbody = document.getElementById('audit-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    auditLog.slice(0, 50).forEach(log => {
        const date = new Date(log.timestamp || log.createdAt);
        const row = `
            <tr>
                <td>${date.toLocaleString()}</td>
                <td>${log.module}</td>
                <td>${log.action}</td>
                <td>${log.details}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// --- COMPLIANCE ---

function renderComplianceDashboard() {
    const iso = document.getElementById('comp-iso');
    const gdpr = document.getElementById('comp-gdpr');
    const pci = document.getElementById('comp-pci');

    if (iso) {
        complianceMetrics.iso27001 = Math.min(85 + Math.floor(Math.random() * 10), 100);
        iso.innerText = `${complianceMetrics.iso27001}%`;
    }
    if (gdpr) {
        complianceMetrics.gdpr = Math.min(75 + Math.floor(Math.random() * 15), 100);
        gdpr.innerText = `${complianceMetrics.gdpr}%`;
    }
    if (pci) {
        complianceMetrics.pci = Math.min(60 + Math.floor(Math.random() * 20), 100);
        pci.innerText = `${complianceMetrics.pci}%`;
    }
}

// --- VULNERABILITIES ---

function renderVulnerabilities() {
    const tbody = document.getElementById('vuln-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    vulnerabilityDB.forEach(vuln => {
        const sevClass = vuln.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high';
        const row = `
            <tr>
                <td>${vuln.id}</td>
                <td>${vuln.description}</td>
                <td>${vuln.affected}</td>
                <td><span class="badge ${sevClass}">${vuln.severity}</span></td>
                <td>${vuln.cvss}</td>
                <td><button class="btn btn-primary" style="font-size:0.8rem;" onclick="createRiskFromVuln('${vuln.id}')">Crear Riesgo</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function createRiskFromVuln(vulnId) {
    const vuln = vulnerabilityDB.find(v => v.id === vulnId);
    if (!vuln || assets.length === 0) {
        alert('No hay activos disponibles para asociar este riesgo');
        return;
    }

    const assetId = assets[0]._id || assets[0].id;
    const newRisk = {
        assetId: assetId,
        threat: vuln.description,
        vulnerability: vuln.id,
        prob: vuln.cvss >= 9 ? 5 : 4,
        impact: vuln.cvss >= 9 ? 5 : 4,
        riskScore: vuln.cvss >= 9 ? 25 : 16,
        treated: false,
        dateIdentified: new Date()
    };

    try {
        await apiRequest('/risks', {
            method: 'POST',
            body: JSON.stringify(newRisk)
        });
        
        await loadRisks();
        await loadStats();
        addNotification('Vulnerabilidad', `Riesgo creado desde CVE: ${vulnId}`);
    } catch (error) {
        alert('Error al crear riesgo desde vulnerabilidad: ' + error.message);
    }
}

// --- ISO CONTROLS ---

function populateControlSelect() {
    const tbody = document.getElementById('iso-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    Object.keys(ISO27002Controls).forEach(key => {
        const ctrl = ISO27002Controls[key];
        const row = `
            <tr>
                <td><strong>ISO ${key}</strong></td>
                <td>${ctrl.category}</td>
                <td>${ctrl.title}</td>
                <td>${ctrl.description}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// --- ROI ANALYSIS ---

function populateROIRiskSelect() {
    const select = document.getElementById('roi-risk-select');
    if (!select) return;
    select.innerHTML = '';
    risks.forEach(risk => {
        const option = document.createElement('option');
        option.value = risk._id || risk.id;
        option.innerText = `${risk.threat} (Score: ${risk.riskScore})`;
        select.appendChild(option);
    });
}

function calculateROI(e) {
    if (e) e.preventDefault();
    const riskId = document.getElementById('roi-risk-select')?.value;
    const cost = parseFloat(document.getElementById('roi-cost')?.value || 0);
    
    const risk = risks.find(r => (r._id || r.id) === riskId);
    if (!risk) return;

    const lossWithoutControl = risk.riskScore * 10000;
    const lossWithControl = Math.floor(lossWithoutControl * 0.2);
    const savings = lossWithoutControl - lossWithControl;
    const roi = ((savings - cost) / cost * 100).toFixed(2);

    const result = document.getElementById('roi-result');
    if (result) {
        result.innerHTML = `
            <h4>Resultados del Análisis</h4>
            <p><strong>Pérdida sin control:</strong> $${lossWithoutControl.toLocaleString()}</p>
            <p><strong>Pérdida con control:</strong> $${lossWithControl.toLocaleString()}</p>
            <p><strong>Ahorro potencial:</strong> $${savings.toLocaleString()}</p>
            <p><strong>Costo del control:</strong> $${cost.toLocaleString()}</p>
            <p><strong>ROI:</strong> <span style="color: ${roi > 0 ? 'var(--success)' : 'var(--danger)'}; font-size: 1.5rem;">${roi}%</span></p>
            <p>${roi > 0 ? '✅ Control recomendado' : '⚠️ Evaluar alternativas'}</p>
        `;
    }
}

// --- REPORTS ---

function generateReport() {
    window.print();
}

function exportData() {
    const data = {
        assets,
        risks,
        auditLog: auditLog.slice(0, 100),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `riskmanager-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// --- SLA MONITORING ---

function checkSLA() {
    const criticalRisks = risks.filter(r => r.riskScore >= 15);
    if (criticalRisks.length > 0) {
        addNotification('SLA', `${criticalRisks.length} riesgo(s) crítico(s) requieren atención inmediata`);
    }
}

function startRiskMonitoring() {
    setInterval(() => {
        checkSLA();
    }, 300000); // Every 5 minutes
}
