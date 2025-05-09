import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/PacketSniffer.module.css';

export default function PacketSniffer() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPackets, setCapturedPackets] = useState([]);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [filter, setFilter] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const captureIntervalRef = useRef(null);
  
  // Start packet capture simulation
  const startCapture = () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    
    // Generate simulated packets at intervals
    captureIntervalRef.current = setInterval(() => {
      const newPacket = generateRandomPacket();
      setCapturedPackets(prev => [...prev, newPacket]);
    }, 800);
  };
  
  // Stop packet capture simulation
  const stopCapture = () => {
    setIsCapturing(false);
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
  };
  
  // Clear captured packets
  const clearCapture = () => {
    setCapturedPackets([]);
    setSelectedPacket(null);
  };
  
  // Generate a random packet for simulation
  const generateRandomPacket = () => {
    const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS', 'ICMP'];
    const sources = ['192.168.1.5', '10.0.0.15', '172.16.0.10'];
    const destinations = ['203.0.113.10', '198.51.100.5', '8.8.8.8', '104.21.32.35'];
    const ports = [80, 443, 53, 21, 22, 25, 3389, 27015, 7777];
    const sizes = [64, 128, 256, 512, 1024, 1500];
    
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const sourcePort = ports[Math.floor(Math.random() * ports.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const destPort = ports[Math.floor(Math.random() * ports.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const timestamp = new Date().toISOString();
    
    // Generate flags for TCP
    let flags = '';
    if (protocol === 'TCP') {
      const possibleFlags = ['SYN', 'ACK', 'FIN', 'RST', 'PSH'];
      const numFlags = Math.floor(Math.random() * 3) + 1;
      const selectedFlags = [];
      
      for (let i = 0; i < numFlags; i++) {
        const flag = possibleFlags[Math.floor(Math.random() * possibleFlags.length)];
        if (!selectedFlags.includes(flag)) {
          selectedFlags.push(flag);
        }
      }
      
      flags = selectedFlags.join(', ');
    }
    
    // Generate payload preview
    const payloadTypes = [
      'Game state update',
      'Player position data',
      'Chat message',
      'Authentication request',
      'Server status query',
      'Resource download',
      'Matchmaking request'
    ];
    
    const payload = payloadTypes[Math.floor(Math.random() * payloadTypes.length)];
    
    return {
      id: Date.now() + Math.random(),
      timestamp,
      protocol,
      source: `${source}:${sourcePort}`,
      destination: `${destination}:${destPort}`,
      size,
      flags,
      payload,
      direction: Math.random() > 0.5 ? 'outgoing' : 'incoming'
    };
  };
  
  // Handle file upload for PCAP analysis simulation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadedFile(file);
    
    // Simulate processing a PCAP file
    setTimeout(() => {
      // Generate a set of realistic packets as if parsed from a PCAP
      const simulatedPackets = Array(25).fill().map(() => generateRandomPacket());
      setCapturedPackets(simulatedPackets);
    }, 1000);
  };
  
  // Filter packets based on search input
  const filteredPackets = capturedPackets.filter(packet => {
    if (!filter) return true;
    
    const searchLower = filter.toLowerCase();
    return (
      packet.protocol.toLowerCase().includes(searchLower) ||
      packet.source.toLowerCase().includes(searchLower) ||
      packet.destination.toLowerCase().includes(searchLower) ||
      packet.payload.toLowerCase().includes(searchLower)
    );
  });
  
  // Export captured packets as JSON
  const exportCapture = () => {
    if (capturedPackets.length === 0) return;
    
    const dataStr = JSON.stringify(capturedPackets, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `packet-capture-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, []);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Game Packet Sniffer | HostileWeb</title>
        <meta name="description" content="Analyze network traffic in games with our packet sniffer tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>Game Packet Sniffer</h1>
        
        <div className={styles.description}>
          <p>
            Analyze network traffic in your games to understand how they communicate.
            This tool provides a simulation of packet capturing for educational purposes.
          </p>
          <div className={styles.warning}>
            <p>⚠️ For educational purposes only. Real packet sniffing may violate terms of service or laws.</p>
          </div>
        </div>
        
        <div className={styles.controlPanel}>
          <div className={styles.captureControls}>
            <button 
              className={`${styles.button} ${styles.startButton}`}
              onClick={startCapture}
              disabled={isCapturing}
            >
              Start Capture
            </button>
            <button 
              className={`${styles.button} ${styles.stopButton}`}
              onClick={stopCapture}
              disabled={!isCapturing}
            >
              Stop Capture
            </button>
            <button 
              className={`${styles.button} ${styles.clearButton}`}
              onClick={clearCapture}
              disabled={capturedPackets.length === 0}
            >
              Clear
            </button>
            <button 
              className={`${styles.button} ${styles.exportButton}`}
              onClick={exportCapture}
              disabled={capturedPackets.length === 0}
            >
              Export JSON
            </button>
          </div>
          
          <div className={styles.fileUpload}>
            <label className={styles.fileInputLabel}>
              Upload PCAP File (Demo)
              <input 
                type="file" 
                accept=".pcap,.pcapng" 
                onChange={handleFileUpload} 
                className={styles.fileInput}
              />
            </label>
            {uploadedFile && (
              <span className={styles.fileName}>
                {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)} KB)
              </span>
            )}
          </div>
          
          <div className={styles.filterContainer}>
            <input
              type="text"
              placeholder="Filter packets (protocol, IP, payload...)"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>
        
        <div className={styles.packetAnalyzer}>
          <div className={styles.packetList}>
            <div className={styles.packetHeader}>
              <div className={styles.packetHeaderItem} style={{ width: '10%' }}>Protocol</div>
              <div className={styles.packetHeaderItem} style={{ width: '20%' }}>Source</div>
              <div className={styles.packetHeaderItem} style={{ width: '20%' }}>Destination</div>
              <div className={styles.packetHeaderItem} style={{ width: '10%' }}>Size</div>
              <div className={styles.packetHeaderItem} style={{ width: '15%' }}>Direction</div>
              <div className={styles.packetHeaderItem} style={{ width: '25%' }}>Payload</div>
            </div>
            
            <div className={styles.packetRows}>
              {filteredPackets.length > 0 ? (
                filteredPackets.map(packet => (
                  <div 
                    key={packet.id} 
                    className={`${styles.packetRow} ${selectedPacket?.id === packet.id ? styles.selectedPacket : ''}`}
                    onClick={() => setSelectedPacket(packet)}
                  >
                    <div className={styles.packetCell} style={{ width: '10%' }}>{packet.protocol}</div>
                    <div className={styles.packetCell} style={{ width: '20%' }}>{packet.source}</div>
                    <div className={styles.packetCell} style={{ width: '20%' }}>{packet.destination}</div>
                    <div className={styles.packetCell} style={{ width: '10%' }}>{packet.size} bytes</div>
                    <div className={styles.packetCell} style={{ width: '15%' }}>{packet.direction}</div>
                    <div className={styles.packetCell} style={{ width: '25%' }}>{packet.payload}</div>
                  </div>
                ))
              ) : (
                <div className={styles.noPackets}>
                  {isCapturing ? 'Waiting for packets...' : 'No packets captured. Click "Start Capture" to begin.'}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.packetDetails}>
            <h3>Packet Details</h3>
            {selectedPacket ? (
              <div className={styles.packetInfo}>
                <div className={styles.packetInfoRow}>
                  <span className={styles.packetInfoLabel}>Timestamp:</span>
                  <span className={styles.packetInfoValue}>{selectedPacket.timestamp}</span>
                </div>
                <div className={styles.packetInfoRow}>
                  <span className={styles.packetInfoLabel}>Protocol:</span>
                  <span className={styles.packetInfoValue}>{selectedPacket.protocol}</span>
                </div>
                <div className={styles.packetInfoRow}>
                  <span className={styles.packetInfoLabel}>Source:</span>
                  <span className={styles.packetInfoValue}>{selectedPacket.source}</span>
                </div>
                <div className={styles.packetInfoRow}>
                  <span className={styles.packetInfoLabel}>Destination:</span>
                  <span className={styles.packetInfoValue}>{selectedPacket.destination}</span>
                </div>
                <div className={styles.packetInfoRow}>
                  <span className={styles.packetInfoLabel}>Size:</span>
                  <span className={styles.packetInfoValue}>{selectedPacket.size} bytes</span>
                </div>
                <div className={styles.packetInfoRow}>
                  <span className={styles.packetInfoLabel}>Direction:</span>
                  <span className={styles.packetInfoValue}>{selectedPacket.direction}</span>
                </div>
                {selectedPacket.flags && (
                  <div className={styles.packetInfoRow}>
                    <span className={styles.packetInfoLabel}>Flags:</span>
                    <span className={styles.packetInfoValue}>{selectedPacket.flags}</span>
                  </div>
                )}
                <div className={styles.packetInfoRow}>
                  <span className={styles.packetInfoLabel}>Payload:</span>
                  <span className={styles.packetInfoValue}>{selectedPacket.payload}</span>
                </div>
                
                <div className={styles.hexDump}>
                  <h4>Hex Dump (Simulated)</h4>
                  <pre className={styles.hexContent}>
                    {generateHexDump(selectedPacket)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className={styles.noPacketSelected}>
                Select a packet to view details
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.infoSection}>
          <h2>About Game Packet Sniffing</h2>
          <p>
            Packet sniffing is the process of capturing and analyzing data packets that travel across a network.
            For gamers and developers, understanding network traffic can help:
          </p>
          <ul>
            <li>Diagnose connection issues and lag</li>
            <li>Understand how games communicate with servers</li>
            <li>Analyze bandwidth usage</li>
            <li>Identify potential security vulnerabilities</li>
          </ul>
          <p>
            Popular tools for real packet analysis include Wireshark, tcpdump, and specialized
            game networking tools. This simulation demonstrates the concept without requiring
            special permissions or potentially violating terms of service.
          </p>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} HostileWeb | Educational purposes only</p>
        <Link href="/">Back to Home</Link>
      </footer>
    </div>
  );
}

// Helper function to generate a simulated hex dump
function generateHexDump(packet) {
  const lines = [];
  const bytes = [];
  
  // Generate pseudo-random bytes based on packet properties
  const seed = packet.id.toString() + packet.source + packet.destination;
  let seedValue = 0;
  for (let i = 0; i < seed.length; i++) {
    seedValue += seed.charCodeAt(i);
  }
  
  for (let i = 0; i < packet.size; i++) {
