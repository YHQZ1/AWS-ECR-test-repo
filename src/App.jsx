import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
function Home() {
  return <h2>Home Page</h2>;
}

function Dashboard({ data, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function Profile() {
  return <h2>Profile Page</h2>;
}

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

// Layout
function Layout({ children }) {
  return (
    <div>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <hr />
      <main>{children}</main>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated API delay
        await new Promise((res) => setTimeout(res, 500));

        setData({
          user: "Uttkarsh",
          role: "Full Stack Dev",
          isLoggedIn: true,
        });
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard data={data} loading={loading} />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
