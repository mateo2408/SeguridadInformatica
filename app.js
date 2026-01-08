// Data Storage (In-memory for prototype)
let assets = [
    { id: 1, name: 'Servidor Base de Datos', type: 'Hardware', value: 5 },
    { id: 2, name: 'Código Fuente App', type: 'Software', value: 5 },
    { id: 3, name: 'Laptops Empleados', type: 'Hardware', value: 3 }
];

let risks = [
    { id: 1, assetId: 1, threat: 'Inyección SQL', prob: 3, impact: 5, riskScore: 15, treated: false },
    { id: 2, assetId: 3, threat: 'Robo de equipo', prob: 2, impact: 4, riskScore: 8, treated: false }
];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    renderAssets();
    renderRisks();
    renderTreatment();
    populateAssetSelect();
    populateROIRiskSelect();
    checkSLA();
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

    const newAsset = {
        id: assets.length + 1,
        name,
        type,
        value
    };

    assets.push(newAsset);
    renderAssets();
    populateAssetSelect();
    updateDashboard();
    hideAssetForm();
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
