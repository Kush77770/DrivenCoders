// VIGIL AI - Autonomous Personal Security System
// Real-time data simulation and anomaly detection

class VigilAI {
    constructor() {
        this.dataPoints = 0;
        this.modelAccuracy = 0;
        this.isLearning = true;
        this.alerts = [];
        
        // Baseline patterns
        this.baseline = {
            location: { lat: 37.7749, lng: -122.4194 },
            noiseLevel: 45,
            timePattern: 'daytime'
        };

        this.init();
    }

    init() {
        console.log('VIGIL AI System Initializing...');
        this.startDataCollection();
        this.startTimeUpdate();
        this.simulatePatternLearning();
        this.startAnomalyDetection();
        this.startTimestampUpdater();
    }

    // Start collecting real-time data
    startDataCollection() {
        // Simulate GPS updates
        setInterval(() => {
            this.updateGPSLocation();
        }, 3000);

        // Simulate ambient noise monitoring
        setInterval(() => {
            this.updateAmbientNoise();
        }, 2000);

        // Increment data points
        setInterval(() => {
            this.dataPoints++;
            document.getElementById('dataPoints').textContent = this.dataPoints.toLocaleString();
        }, 1000);
    }

    // Update GPS location with slight variations
    updateGPSLocation() {
        const latVariation = (Math.random() - 0.5) * 0.01;
        const lngVariation = (Math.random() - 0.5) * 0.01;
        
        const currentLat = this.baseline.location.lat + latVariation;
        const currentLng = this.baseline.location.lng + lngVariation;
        
        document.getElementById('gpsCoords').textContent = 
            `Lat: ${currentLat.toFixed(4)}, Long: ${currentLng.toFixed(4)}`;
        
        // Simulate location names
        const locations = [
            'Downtown Area', 
            'Residential Zone', 
            'Commercial District',
            'Safe Zone Alpha',
            'Monitored Area'
        ];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        document.getElementById('locationName').textContent = randomLocation;

        // Determine safety based on location deviation
        const deviation = Math.abs(latVariation) + Math.abs(lngVariation);
        this.updateLocationSafety(deviation);
    }

    updateLocationSafety(deviation) {
        const safetyElement = document.getElementById('locationSafety');
        
        if (deviation < 0.005) {
            safetyElement.className = 'safety-level safe';
            safetyElement.innerHTML = '<span class="safety-icon">✓</span><span>Safe Zone</span>';
        } else if (deviation < 0.008) {
            safetyElement.className = 'safety-level caution';
            safetyElement.innerHTML = '<span class="safety-icon">⚠</span><span>Caution</span>';
            this.addAlert('warning', 'Location Deviation', 'Unusual location pattern detected');
        } else {
            safetyElement.className = 'safety-level danger';
            safetyElement.innerHTML = '<span class="safety-icon">⚠</span><span>Alert</span>';
            this.addAlert('danger', 'Location Anomaly', 'Significant deviation from normal pattern');
        }
    }

    // Update ambient noise levels
    updateAmbientNoise() {
        const baseNoise = this.baseline.noiseLevel;
        const variation = (Math.random() - 0.5) * 30;
        const currentNoise = Math.max(20, Math.min(100, baseNoise + variation));
        
        const percentage = (currentNoise / 100) * 100;
        document.getElementById('noiseFill').style.width = percentage + '%';
        document.getElementById('noiseLevel').textContent = Math.round(currentNoise) + ' dB';
        
        // Update noise context
        let context = '';
        if (currentNoise < 40) {
            context = 'Quiet environment - Normal';
        } else if (currentNoise < 60) {
            context = 'Normal ambient levels';
        } else if (currentNoise < 75) {
            context = 'Elevated noise detected';
            this.addAlert('warning', 'Noise Alert', 'Ambient noise levels elevated');
        } else {
            context = 'High noise levels - Anomaly detected';
            this.addAlert('danger', 'Noise Anomaly', 'Unusually high ambient noise detected');
        }
        
        document.getElementById('noiseContext').textContent = context;
    }

    // Update current time and context
    startTimeUpdate() {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            document.getElementById('currentTime').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
            
            // Determine time context
            let context = '';
            let analysis = '';
            
            if (hours >= 5 && hours < 12) {
                context = 'Morning';
                analysis = 'Normal morning activity pattern';
            } else if (hours >= 12 && hours < 17) {
                context = 'Afternoon';
                analysis = 'Normal afternoon activity pattern';
            } else if (hours >= 17 && hours < 21) {
                context = 'Evening';
                analysis = 'Normal evening activity pattern';
            } else {
                context = 'Night';
                analysis = 'Late night activity - Enhanced monitoring';
                if (hours >= 23 || hours < 5) {
                    // Detect unusual late-night activity
                    if (Math.random() > 0.95) {
                        this.addAlert('warning', 'Temporal Anomaly', 'Unusual activity during late hours');
                    }
                }
            }
            
            document.getElementById('timeContext').textContent = context;
            document.getElementById('temporalAnalysis').textContent = analysis;
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Simulate pattern learning and model improvement
    simulatePatternLearning() {
        setInterval(() => {
            if (this.modelAccuracy < 98) {
                this.modelAccuracy += (Math.random() * 0.5);
                this.modelAccuracy = Math.min(98, this.modelAccuracy);
                document.getElementById('modelAccuracy').textContent = 
                    this.modelAccuracy.toFixed(1) + '%';
            }

            // Update learning status
            if (this.modelAccuracy > 90) {
                document.getElementById('learningStatus').textContent = 'Optimized';
                document.getElementById('learningStatus').style.color = '#00ff00';
            } else if (this.modelAccuracy > 70) {
                document.getElementById('learningStatus').textContent = 'Learning';
                document.getElementById('learningStatus').style.color = '#00d4ff';
            } else {
                document.getElementById('learningStatus').textContent = 'Training';
                document.getElementById('learningStatus').style.color = '#ffa500';
            }
        }, 2000);
    }

    // AI Reasoning Engine - Anomaly Detection
    startAnomalyDetection() {
        setInterval(() => {
            // Random anomaly detection simulation
            const anomalyChance = Math.random();
            
            if (anomalyChance > 0.95) {
                const anomalyTypes = [
                    {
                        type: 'warning',
                        title: 'Behavior Pattern Change',
                        message: 'Detected deviation from normal behavioral pattern'
                    },
                    {
                        type: 'info',
                        title: 'Pattern Update',
                        message: 'Successfully learned new safe pattern'
                    },
                    {
                        type: 'warning',
                        title: 'Environmental Change',
                        message: 'Multiple environmental factors changed simultaneously'
                    }
                ];
                
                const anomaly = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
                this.addAlert(anomaly.type, anomaly.title, anomaly.message);
            }

            // Update baseline chart randomly
            this.updateBaselineChart();
        }, 5000);
    }

    // Update safety baseline comparisons
    updateBaselineChart() {
        const patterns = ['Location Pattern', 'Noise Pattern', 'Temporal Pattern'];
        const chartRows = document.querySelectorAll('.chart-row');
        
        chartRows.forEach((row, index) => {
            const baselineBar = row.querySelector('.chart-baseline');
            const currentBar = row.querySelector('.chart-current');
            const status = row.querySelector('.chart-status');
            
            // Simulate slight variations
            const baselineValue = 60 + Math.random() * 30;
            const currentValue = baselineValue + (Math.random() - 0.5) * 10;
            
            baselineBar.style.width = baselineValue + '%';
            currentBar.style.width = currentValue + '%';
            
            // Determine status
            const deviation = Math.abs(currentValue - baselineValue);
            if (deviation < 5) {
                status.className = 'chart-status normal';
                status.textContent = 'Normal';
            } else {
                status.className = 'chart-status anomaly';
                status.textContent = 'Anomaly';
            }
        });
    }

    // Add alerts to the alert container
    addAlert(type, title, message) {
        // Prevent duplicate alerts
        const recentAlerts = this.alerts.slice(-5);
        if (recentAlerts.some(alert => alert.title === title)) {
            return;
        }

        const alert = {
            type,
            title,
            message,
            timestamp: new Date()
        };
        
        // Add to beginning of alerts array to match DOM insertion order
        this.alerts.unshift(alert);
        
        const alertContainer = document.getElementById('alertContainer');
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item ${type}`;
        
        const icon = type === 'danger' ? '🚨' : type === 'warning' ? '⚠️' : 'ℹ️';
        
        alertElement.innerHTML = `
            <div class="alert-icon">${icon}</div>
            <div class="alert-content">
                <h4>${title}</h4>
                <p>${message}</p>
                <span class="alert-time">${this.getTimeAgo(alert.timestamp)}</span>
            </div>
        `;
        
        // Add to top of container
        alertContainer.insertBefore(alertElement, alertContainer.firstChild);
        
        // Limit to 10 alerts in both DOM and array
        if (alertContainer.children.length > 10) {
            alertContainer.removeChild(alertContainer.lastChild);
            this.alerts = this.alerts.slice(0, 10);
        }
    }

    // Update alert timestamps periodically with a single timer
    startTimestampUpdater() {
        setInterval(() => {
            this.updateAlertTimestamps();
        }, 60000); // Update every minute
    }

    updateAlertTimestamps() {
        const alertElements = document.querySelectorAll('.alert-time');
        alertElements.forEach((element, index) => {
            if (this.alerts[index]) {
                element.textContent = this.getTimeAgo(this.alerts[index].timestamp);
            }
        });
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const seconds = Math.floor((now - timestamp) / 1000);
        
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (seconds < 3600) return minutes + ' min ago';
        const hours = Math.floor(seconds / 3600);
        if (seconds < 86400) return hours + (hours === 1 ? ' hour ago' : ' hours ago');
        const days = Math.floor(seconds / 86400);
        return days + (days === 1 ? ' day ago' : ' days ago');
    }
}

// Initialize VIGIL AI System when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛡️ VIGIL AI - Autonomous Personal Security System');
    console.log('System Status: ACTIVE');
    console.log('No manual activation required - Continuous monitoring enabled');
    
    const vigilAI = new VigilAI();
    
    // Add welcome message
    setTimeout(() => {
        vigilAI.addAlert(
            'info',
            'Welcome to VIGIL AI',
            'Your autonomous personal security system is now protecting you 24/7'
        );
    }, 1000);
});
