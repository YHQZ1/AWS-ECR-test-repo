import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Dummy pages (replace with actual files later)
function Home() {
  return <h2>Home Page</h2>;
}

function Dashboard({ data }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

// Layout wrapper
function Layout({ children }) {
  return (
    <div>
      <nav>
        <a href="/">Home</a> | <a href="/dashboard">Dashboard</a>
      </nav>
      <main>{children}</main>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);

  // Simulated API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        // replace with real API
        const res = await Promise.resolve({
          user: "Uttkarsh",
          role: "Developer",
        });
        setData(res);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard data={data} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;