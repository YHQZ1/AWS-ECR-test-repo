import React, { useState, useEffect } from 'react';

function App() {
  const [health, setHealth] = useState('Checking...');
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState(null);

  // Use VITE_ prefix for environment variables in Vite
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBackendStatus = async () => {
      try {
        // Fetching from the health endpoint
        const healthRes = await fetch(`${API_BASE_URL}/api/health`);
        const healthJson = await healthRes.json();
        setHealth(healthJson.status);

        // Fetching the test data
        const dataRes = await fetch(`${API_BASE_URL}/api/data`);
        const dataJson = await dataRes.json();
        setBackendData(dataJson);
      } catch (err) {
        console.error("Connection failed:", err);
        setError("Could not connect to the API. Check VITE_API_URL.");
        setHealth("Offline ❌");
      }
    };

    fetchBackendStatus();
  }, [API_BASE_URL]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Hatch Full-Stack Orchestration 🐣</h1>
        <div style={styles.badge}>
          Status: <span style={{ color: health.includes('live') ? '#4ade80' : '#ff4444' }}>{health}</span>
        </div>
      </header>

      <main style={styles.main}>
        {error && <p style={styles.error}>{error}</p>}
        
        {backendData ? (
          <div style={styles.card}>
            <h3>Data from {backendData.user}'s Backend:</h3>
            <ul style={styles.list}>
              {backendData.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          !error && <p>Syncing with AWS Fargate...</p>
        )}
      </main>

      <footer style={styles.footer}>
        <p>API Base URL: <code>{API_BASE_URL}</code></p>
      </footer>
    </div>
  );
}

// Simple Clean Styles
const styles = {
  container: { padding: '40px', backgroundColor: '#050505', color: '#e0e0e0', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' },
  header: { borderBottom: '1px solid #222', paddingBottom: '20px', marginBottom: '30px' },
  badge: { fontSize: '1.1rem', fontWeight: 'bold' },
  main: { maxWidth: '600px' },
  card: { backgroundColor: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #333' },
  list: { paddingLeft: '20px' },
  listItem: { marginBottom: '12px', color: '#bbb' },
  error: { color: '#ff4444', backgroundColor: '#2a0000', padding: '10px', borderRadius: '4px' },
  footer: { marginTop: '40px', fontSize: '0.8rem', opacity: 0.5 }
};

export default App;