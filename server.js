const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:SecurePassword123@localhost:27017/riskmanager?authSource=admin';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Schemas y Modelos
const AssetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    owner: { type: String, required: true },
    location: { type: String, required: true },
    confidentiality: { type: Number, required: true },
    integrity: { type: Number, required: true },
    availability: { type: Number, required: true }
}, { timestamps: true });

const RiskSchema = new mongoose.Schema({
    assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    threat: { type: String, required: true },
    vulnerability: { type: String, required: true },
    prob: { type: Number, required: true },
    impact: { type: Number, required: true },
    riskScore: { type: Number, required: true },
    treated: { type: Boolean, default: false },
    dateIdentified: { type: Date, default: Date.now },
    treatment: {
        type: { type: String, enum: ['mitigate', 'transfer', 'avoid', 'accept', ''] },
        controls: [String],
        residualRisk: Number,
        cost: Number,
        roi: Number
    }
}, { timestamps: true });

const AuditLogSchema = new mongoose.Schema({
    module: { type: String, required: true },
    action: { type: String, required: true },
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const Asset = mongoose.model('Asset', AssetSchema);
const Risk = mongoose.model('Risk', RiskSchema);
const AuditLog = mongoose.model('AuditLog', AuditLogSchema);

// ==================== ROUTES ====================

// Assets Routes
app.get('/api/assets', async (req, res) => {
    try {
        const assets = await Asset.find().sort({ createdAt: -1 });
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/assets', async (req, res) => {
    try {
        const asset = new Asset(req.body);
        await asset.save();
        await AuditLog.create({ module: 'Activos', action: 'Crear', details: `Nuevo activo: ${asset.name}` });
        res.status(201).json(asset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/assets/:id', async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!asset) return res.status(404).json({ error: 'Activo no encontrado' });
        await AuditLog.create({ module: 'Activos', action: 'Actualizar', details: `Activo actualizado: ${asset.name}` });
        res.json(asset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/assets/:id', async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) return res.status(404).json({ error: 'Activo no encontrado' });
        // Delete associated risks
        await Risk.deleteMany({ assetId: req.params.id });
        await AuditLog.create({ module: 'Activos', action: 'Eliminar', details: `Activo eliminado: ${asset.name}` });
        res.json({ message: 'Activo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Risks Routes
app.get('/api/risks', async (req, res) => {
    try {
        const risks = await Risk.find().populate('assetId').sort({ createdAt: -1 });
        res.json(risks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/risks', async (req, res) => {
    try {
        const risk = new Risk(req.body);
        await risk.save();
        await AuditLog.create({ module: 'Riesgos', action: 'Crear', details: `Nuevo riesgo: ${risk.threat}` });
        res.status(201).json(risk);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/risks/:id', async (req, res) => {
    try {
        const risk = await Risk.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!risk) return res.status(404).json({ error: 'Riesgo no encontrado' });
        await AuditLog.create({ module: 'Riesgos', action: 'Actualizar', details: `Riesgo actualizado: ${risk.threat}` });
        res.json(risk);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/risks/:id', async (req, res) => {
    try {
        const risk = await Risk.findByIdAndDelete(req.params.id);
        if (!risk) return res.status(404).json({ error: 'Riesgo no encontrado' });
        await AuditLog.create({ module: 'Riesgos', action: 'Eliminar', details: `Riesgo eliminado: ${risk.threat}` });
        res.json({ message: 'Riesgo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Audit Logs Routes
app.get('/api/audit', async (req, res) => {
    try {
        const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/audit', async (req, res) => {
    try {
        const log = new AuditLog(req.body);
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Dashboard Stats Route
app.get('/api/stats', async (req, res) => {
    try {
        const totalAssets = await Asset.countDocuments();
        const totalRisks = await Risk.countDocuments();
        const risks = await Risk.find();
        const avgRisk = risks.length > 0 
            ? risks.reduce((sum, r) => sum + r.riskScore, 0) / risks.length 
            : 0;
        const controlsImplemented = await Risk.countDocuments({ treated: true });
        
        res.json({
            totalAssets,
            totalRisks,
            avgRisk: avgRisk.toFixed(1),
            controlsImplemented
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Initialize Database with sample data
app.post('/api/init', async (req, res) => {
    try {
        // Clear existing data
        await Asset.deleteMany({});
        await Risk.deleteMany({});
        await AuditLog.deleteMany({});

        // Create sample assets
        const sampleAssets = [
            { name: 'Servidor Base de Datos', type: 'Hardware', value: 5, owner: 'TI', location: 'Data Center', confidentiality: 5, integrity: 5, availability: 5 },
            { name: 'Código Fuente App', type: 'Software', value: 5, owner: 'Desarrollo', location: 'GitHub', confidentiality: 4, integrity: 5, availability: 3 },
            { name: 'Laptops Empleados', type: 'Hardware', value: 3, owner: 'RRHH', location: 'Oficina', confidentiality: 3, integrity: 3, availability: 3 }
        ];

        const createdAssets = await Asset.insertMany(sampleAssets);

        // Create sample risks
        const sampleRisks = [
            { 
                assetId: createdAssets[0]._id, 
                threat: 'Inyección SQL', 
                vulnerability: 'Falta validación de entrada', 
                prob: 3, 
                impact: 5, 
                riskScore: 15, 
                treated: false, 
                dateIdentified: new Date('2026-01-15') 
            },
            { 
                assetId: createdAssets[2]._id, 
                threat: 'Robo de equipo', 
                vulnerability: 'No hay cifrado de disco', 
                prob: 2, 
                impact: 4, 
                riskScore: 8, 
                treated: false, 
                dateIdentified: new Date('2026-01-18') 
            }
        ];

        await Risk.insertMany(sampleRisks);

        // Create initial audit log
        await AuditLog.create({
            module: 'Sistema',
            action: 'Inicialización',
            details: 'Base de datos inicializada con datos de ejemplo'
        });

        res.json({ message: 'Base de datos inicializada correctamente', assets: createdAssets.length, risks: sampleRisks.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date()
    });
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 MongoDB UI disponible en http://localhost:8081`);
});
