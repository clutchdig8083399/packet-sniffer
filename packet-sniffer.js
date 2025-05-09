// Packet Sniffer Demo Script

document.addEventListener('DOMContentLoaded', function() {
    const packetStream = document.getElementById('packetStream');
    const packetData = document.getElementById('packetData');
    const startDemoBtn = document.getElementById('startDemo');
    const stopDemoBtn = document.getElementById('stopDemo');
    
    let demoRunning = false;
    let packetInterval;
    let packets = [];
    let packetId = 0;
    
    // Packet types and their colors
    const packetTypes = [
        { type: 'TCP', color: '#0066cc', direction: 'outgoing' },
        { type: 'UDP', color: '#28a745', direction: 'outgoing' },
        { type: 'TCP', color: '#0066cc', direction: 'incoming' },
        { type: 'UDP', color: '#28a745', direction: 'incoming' },
        { type: 'HTTP', color: '#fd7e14', direction: 'outgoing' },
        { type: 'HTTP', color: '#fd7e14', direction: 'incoming' }
    ];
    
    // Sample packet data templates
    const packetDataTemplates = {
        TCP: {
            outgoing: {
                source: '192.168.1.5:54321',
                destination: '203.0.113.10:80',
                flags: 'SYN, ACK',
                sequence: () => Math.floor(Math.random() * 1000000),
                acknowledgment: () => Math.floor(Math.random() * 1000000),
                window: () => Math.floor(Math.random() * 65535),
                payload: 'Game client requesting server status'
            },
            incoming: {
                source: '203.0.113.10:80',
                destination: '192.168.1.5:54321',
                flags: 'ACK',
                sequence: () => Math.floor(Math.random() * 1000000),
                acknowledgment: () => Math.floor(Math.random() * 1000000),
                window: () => Math.floor(Math.random() * 65535),
                payload: 'Server acknowledging client request'
            }
        },
        UDP: {
