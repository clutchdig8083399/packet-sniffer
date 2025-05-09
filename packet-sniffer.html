import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/PacketSniffer.module.css';

export default function PacketSniffer() {
  const [demoRunning, setDemoRunning] = useState(false);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [packets, setPackets] = useState([]);
  const packetStreamRef = useRef(null);
  const intervalRef = useRef(null);
  const packetIdRef = useRef(0);

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
      outgoing: {
        source: '192.168.1.5:49152',
        destination: '203.0.113.10:27015',
        length: () => Math.floor(Math.random() * 1000) + 100,
        checksum: () => Math.floor(Math.random() * 65535).toString(16).padStart(4, '0'),
        payload: 'Player position update data'
      },
      incoming: {
        source: '203.0.113.10:27015',
        destination: '192.168.1.5:49152',
        length: () => Math.floor(Math.random() * 1000) + 100,
        checksum: () => Math.floor(Math.random() * 65535).toString(16).padStart(4, '0'),
        payload: 'Game world state update'
      }
    },
    HTTP: {
      outgoing: {
        method: 'GET',
        url: '/api/game/status',
        headers: {
          'User-Agent': 'GameClient/1.0',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer xyz123...'
        },
        payload: ''
      },
      incoming: {
        status: '200 OK',
        headers: {
          'Content-Type': 'application/json',
          'Server': 'GameServer/2.1',
          'Cache-Control': 'no-cache'
        },
        payload: '{"status":"online","players":1024,"uptime":"12h"}'
      }
    }
  };

  const createPacket = () => {
    if (!demoRunning) return;
    
    const packetTypeIndex = Math.floor(Math.random() * packetTypes.length);
    const { type, color, direction } = packetTypes[packetTypeIndex];
    
    const id = packetIdRef.current++;
    const position = direction === 'outgoing' ? 0 : 100;
    const template = packetDataTemplates[type][direction];
    
    // Create packet data based on template
    let packetData;
    if (type === 'TCP') {
      packetData = {
        ...template,
        sequence: template.sequence(),
        acknowledgment: template.acknowledgment(),
        window: template.window()
      };
    } else if (type === 'UDP') {
      packetData = {
        ...template,
        length: template.length(),
        checksum: template.checksum()
      };
    } else {
      packetData = { ...template };
    }
    
    const newPacket = { id, type, color, direction, position, data: packetData };
    
    setPackets(prevPackets => {
      // Keep only the last 20 packets
      const updatedPackets = [...prevPackets, newPacket];
      if (updatedPackets.length > 20) {
        return updatedPackets.slice(updatedPackets.length - 20);
      }
      return updatedPackets;
    });
  };

  const startDemo = () => {
    setDemoRunning(true);
    setPackets([]);
    packetIdRef.current = 0;
    intervalRef.current = setInterval(createPacket, 1000);
  };

  const stopDemo = () => {
    setDemoRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const selectPacket = (packet) => {
    setSelectedPacket(packet);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const renderPacketData = () => {
    if (!selectedPacket) {
      return <p>Click on a packet to inspect its contents</p>;
    }

    const { type, direction, data } = selectedPacket;

    if (type === 'TCP') {
      return (
        <div>
          <p>Packet Type: TCP ({direction})</p>
          <p>Source: {data.source}</p>
          <p>Destination: {data.destination}</p>
          <p>Flags: {data.flags}</p>
          <p>Sequence: {data.sequence}</p>
          <p>Acknowledgment: {data.acknowledgment}</p>
          <p>Window: {data.window}</p>
          <p>Payload: {data.payload}</p>
        </div>
      );
    } else if (type === 'UDP') {
      return (
        <div>
          <p>Packet Type: UDP ({direction})</p>
          <p>Source: {data.source}</p>
          <p>Destination: {data.destination}</p>
          <p>Length: {data.length} bytes</p>
          <p>Checksum: 0x{data.checksum}</p>
          <p>Payload: {data.payload}</p>
        </div>
      );
    } else if (type === 'HTTP') {
      if (direction === 'outgoing') {
        return (
          <div>
            <p>Packet Type: HTTP ({direction})</p>
            <p>Method: {data.method}</p>
            <p>URL: {data.url}</p>
            <p>Headers:</p>
            <ul>
              {Object.entries(data.headers).map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))}
            </ul>
            {data.payload && <p>Payload: {data.payload}</p>}
          </div>
        );
      } else {
        return (
          <div>
            <p>Packet Type: HTTP ({direction})</p>
            <p>Status: {data.status}</p>
            <p>Headers:</p>
            <ul>
              {Object.entries(data.headers).map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))}
            </ul>
            <p>Payload: {data.payload}</p>
          </div>
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Game Packet Sniffer | HostileWeb</title>
        <meta name="description" content="Analyze and understand network traffic in your favorite games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">HostileWeb</Link>
          </div>
          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/packet-sniffer" className={styles.active}>Packet Sniffer</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Game Packet Sniffer</h1>
            <p>Analyze and understand network traffic in your favorite games</p>
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.container}>
            <h2>What is Packet Sniffing?</h2>
            <p>
              Packet sniffing is the practice of capturing and analyzing data packets as they travel across a network. 
              In gaming, this can be used to understand how games communicate with servers, analyze performance issues, 
              or develop tools and modifications.
            </p>
            
            <div className={styles.warningBox}>
              <h3>⚠️ Important Notice</h3>
              <p>
                Packet sniffing should only be used for educational purposes or on networks you own. 
                Using packet sniffers to intercept data on public networks without authorization may be illegal 
                in many jurisdictions and against the terms of service of most games.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.container}>
            <h2>Applications in Gaming</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <h3>Performance Analysis</h3>
                <p>Identify network-related performance issues and bottlenecks in online games.</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Game Development</h3>
                <p>Understand how successful games implement their networking code.</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Security Research</h3>
                <p>Discover potential vulnerabilities in game networking protocols.</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Custom Tools</h3>
                <p>Develop companion apps or tools that enhance gameplay experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.demoSection}>
          <div className={styles.container}>
            <h2>Interactive Packet Visualization</h2>
            <p>See a simplified demonstration of how packet sniffing works:</p>
            <div className={styles.demoContainer}>
              <div className={styles.networkVisualization}>
                <div className={styles.client}>
                  <div className={styles.deviceIcon}>💻</div>
                  <div className={styles.deviceLabel}>Client</div>
                </div>
                <div className={styles.packetStream} ref={packetStreamRef}>
                  {packets.map(packet => (
                    <div
                      key={packet.id}
                      className={`${styles.packet} ${selectedPacket?.id === packet.id ? styles.selected : ''}`}
                      style={{
                        backgroundColor: packet.color,
                        left: `${packet.direction === 'outgoing' ? 
                          (packet.id % 20) * 5 : 
                          100 - (packet.id % 20) * 5}%`
                      }}
                      onClick={() => selectPacket(packet)}
                    />
                  ))}
                </div>
                <div className={styles.server}>
                  <div className={styles.deviceIcon}>🖥️</div>
                  <div className={styles.deviceLabel}>Server</div>
                </div>
              </div>
              <div className={styles.packetInspector}>
                <h3>Packet Inspector</h3>
                <div className={styles.packetData}>
                  {renderPacketData()}
                </div>
              </div>
              <div className={styles.controls}>
                <button 
                  className={styles.startButton}
                  onClick={startDemo}
                  disabled={demoRunning}
                >
                  Start Demo
                </button>
                <button 
                  className={styles.stopButton}
                  onClick={stopDemo}
                  disabled={!demoRunning}
                >
                  Stop Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.toolsSection}>
          <div className={styles.container}>
            <h2>Popular Packet Sniffing Tools</h2>
            <div className={styles.toolsGrid}>
              <div className={styles.toolCard}>
                <h3>Wireshark</h3>
                <p>The industry standard for network protocol analysis. Free and open-source.</p>
                <a href="https://www.wireshark.org/" target="_blank" rel="noopener noreferrer" className={styles.button}>Learn More</a>
              </div>
              <div className={styles.toolCard}>
                <h3>tcpdump</h3>
                <p>A powerful command-line packet analyzer for Unix-like systems.</p>
                <a href="https://www.tcpdump.org/" target="_blank" rel="noopener noreferrer" className={styles.button}>Learn More</a>
              </div>
              <div className={styles.toolCard}>
                <h3>Fiddler</h3>
                <p>Web debugging proxy that can capture HTTP/HTTPS traffic.</p>
                <a href="https://www.telerik.com/fiddler" target="_blank" rel="noopener noreferrer" className={styles.button}>Learn More</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} HostileWeb. All rights reserved.</p>
          <p>Educational purposes only. Use
