import { useState } from "react";
import "./App.css";

/* =========================================================
   APP
========================================================= */

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Initial marketplace products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tomato",
      quantity: 500,
      available: 500,
      price: 24,
      grade: "Grade A",
      emoji: "🍅",
      location: "Tirunelveli",
      farmer: "Abi Farms",
    },
    {
      id: 2,
      name: "Paddy",
      quantity: 1000,
      available: 1000,
      price: 25,
      grade: "Grade A",
      emoji: "🌾",
      location: "Thoothukudi",
      farmer: "Green Valley Farms",
    },
    {
      id: 3,
      name: "Chilli",
      quantity: 300,
      available: 300,
      price: 180,
      grade: "Grade A",
      emoji: "🌶️",
      location: "Tirunelveli",
      farmer: "Abi Farms",
    },
  ]);

  // Customer orders
  const [orders, setOrders] = useState([]);

  /* -----------------------------------------
     ADD NEW PRODUCE
  ----------------------------------------- */

  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      quantity: Number(product.quantity),
      available: Number(product.quantity),
      price: Number(product.price),
    };

    setProducts((prevProducts) => [
      ...prevProducts,
      newProduct,
    ]);
  };

  /* -----------------------------------------
     PLACE CUSTOMER ORDER
  ----------------------------------------- */

  const handlePlaceOrder = (
    selectedProduct,
    quantity,
    customerName
  ) => {
    const orderQuantity = Number(quantity);

    if (!selectedProduct) {
      return false;
    }

    if (
      orderQuantity <= 0 ||
      orderQuantity > selectedProduct.available
    ) {
      alert("Invalid quantity.");
      return false;
    }

    // Reduce available produce
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              available:
                product.available - orderQuantity,
            }
          : product
      )
    );

    // Create order
    const newOrder = {
      id: `ORD${Date.now().toString().slice(-6)}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      emoji: selectedProduct.emoji,
      customer: customerName,
      quantity: orderQuantity,
      price: selectedProduct.price,
      total:
        orderQuantity * selectedProduct.price,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    setOrders((prevOrders) => [
      newOrder,
      ...prevOrders,
    ]);

    return true;
  };

  /* -----------------------------------------
     UPDATE ORDER STATUS
  ----------------------------------------- */

  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );
  };

  /* -----------------------------------------
     LOGIN
  ----------------------------------------- */

  if (!loggedIn) {
    return (
      <LoginPage
        onLogin={(email) => {
          setUserEmail(email);
          setLoggedIn(true);
        }}
      />
    );
  }

  /* -----------------------------------------
     DASHBOARD
  ----------------------------------------- */

  return (
    <Dashboard
      userEmail={userEmail}
      products={products}
      orders={orders}
      onAddProduct={handleAddProduct}
      onPlaceOrder={handlePlaceOrder}
      updateOrderStatus={updateOrderStatus}
      onLogout={() => {
        setLoggedIn(false);
        setUserEmail("");
      }}
    />
  );
}

/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    onLogin(email);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-icon">🌱</div>

          <div>
            <h2>AgriNex</h2>
            <span>Smart Agriculture Intelligence</span>
          </div>
        </div>

        <div className="login-content">
          <div className="ai-badge">
            ✨ AI-POWERED AGRICULTURAL PLATFORM
          </div>

          <h1>
            Grow smarter.
            <br />
            <span>Earn better.</span>
          </h1>

          <p>
            AgriNex connects farmers with markets, storage,
            processing and transportation to help maximize the
            value of every harvest.
          </p>

          <div className="login-features">
            <div className="login-feature">
              <div>🧠</div>
              <span>
                <strong>AI Value Recommendations</strong>
                <small>
                  Find the most profitable route for your produce
                </small>
              </span>
            </div>

            <div className="login-feature">
              <div>📈</div>
              <span>
                <strong>Market Intelligence</strong>
                <small>
                  Track prices and identify better opportunities
                </small>
              </span>
            </div>

            <div className="login-feature">
              <div>🛒</div>
              <span>
                <strong>Direct Farmer Marketplace</strong>
                <small>
                  Sell produce directly to customers
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="login-footer">
          © 2026 AgriNex • Smart Agriculture for a Better Tomorrow
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="mobile-logo">🌱</div>

          <h2>Welcome to AgriNex 👋</h2>

          <p className="login-subtitle">
            Sign in to access your agri dashboard
          </p>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button" className="forgot">
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className="login-button">
              Sign In →
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            className="demo-button"
            type="button"
            onClick={() => onLogin("farmer@agrinex.com")}
          >
            🌾 Farmer Demo Login
          </button>

          <p className="signup-text">
            Don't have an account?
            <strong> Create an account</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  userEmail,
  products,
  orders,
  onAddProduct,
  onPlaceOrder,
  updateOrderStatus,
  onLogout,
}) {
  const [activePage, setActivePage] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "🏠",
    },
    {
      id: "produce",
      label: "My Produce",
      icon: "🌾",
    },
    {
      id: "market",
      label: "Market Intelligence",
      icon: "📊",
    },
    {
      id: "ai",
      label: "AI Advisor",
      icon: "🤖",
    },
    {
      id: "processing",
      label: "Processing",
      icon: "🏭",
    },
    {
      id: "storage",
      label: "Cold Storage",
      icon: "❄️",
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: "🛒",
    },
    {
      id: "orders",
      label: "Orders",
      icon: "📦",
    },
    {
      id: "waste",
      label: "Waste Reduction",
      icon: "♻️",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "📈",
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: "🔔",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
    },
  ];

  /* -----------------------------------------
     PAGE CHANGE
  ----------------------------------------- */

  const handlePageChange = (page) => {
    setActivePage(page);

    // Close mobile sidebar
    setSidebarOpen(false);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* -----------------------------------------
     LOGOUT
  ----------------------------------------- */

  const handleLogout = () => {
    setSidebarOpen(false);
    onLogout();
  };

  /* -----------------------------------------
     RENDER PAGE
  ----------------------------------------- */

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardHome
            setActivePage={handlePageChange}
            products={products}
            orders={orders}
          />
        );

      case "produce":
        return (
          <ProducePage
            products={products}
            onAddProduct={onAddProduct}
          />
        );

      case "market":
        return <MarketPage />;

      case "ai":
        return <AIAdvisorPage />;

      case "processing":
        return <ProcessingPage />;

      case "storage":
        return <StoragePage />;

      case "marketplace":
        return (
          <MarketplacePage
            products={products}
            onPlaceOrder={onPlaceOrder}
          />
        );

      case "orders":
        return (
          <OrdersPage
            orders={orders}
            updateOrderStatus={updateOrderStatus}
          />
        );

      case "waste":
        return <WastePage products={products} />;

      case "analytics":
        return (
          <AnalyticsPage
            orders={orders}
          />
        );

      case "alerts":
        return (
          <AlertsPage
            orders={orders}
          />
        );

      case "settings":
        return <SettingsPage />;

      default:
        return (
          <DashboardHome
            setActivePage={handlePageChange}
            products={products}
            orders={orders}
          />
        );
    }
  };

  return (
    <div className="app-layout">

      {/* =========================================
          MOBILE TOP BAR
      ========================================= */}

      <header className="mobile-topbar">

        <button
          className="mobile-menu-button"
          onClick={() =>
            setSidebarOpen(true)
          }
          aria-label="Open navigation menu"
        >
          ☰
        </button>

        <div className="mobile-brand">

          <span className="mobile-brand-icon">
            🌱
          </span>

          <div>
            <strong>AgriNex</strong>
            <small>
              Smart Agriculture
            </small>
          </div>

        </div>

        <div className="mobile-user-icon">
          👤
        </div>

      </header>


      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}


      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside
        className={`sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        }`}
      >

        {/* SIDEBAR HEADER */}

        <div className="sidebar-header">

          <div className="brand-logo">

            <div className="brand-icon">
              🌱
            </div>

            <div className="brand-text">

              <strong>
                AgriNex
              </strong>

              <span>
                Smart Agriculture
              </span>

            </div>

          </div>

          {/* MOBILE CLOSE */}

          <button
            className="sidebar-close-button"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Close navigation menu"
          >
            ×
          </button>

        </div>


        {/* =========================================
            NAVIGATION
        ========================================= */}

        <nav className="sidebar-nav">

          <div className="nav-section-title">
            MAIN MENU
          </div>

          {menuItems.map((item) => (

            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handlePageChange(item.id)
              }
            >

              <span className="nav-icon">
                {item.icon}
              </span>

              <span className="nav-label">
                {item.label}
              </span>

            </button>

          ))}

        </nav>


        {/* =========================================
            SIDEBAR FOOTER
        ========================================= */}

        <div className="sidebar-footer">

          <div className="sidebar-user">

            <div className="sidebar-user-avatar">
              👤
            </div>

            <div className="sidebar-user-info">

              <strong>
                Farmer
              </strong>

              <span title={userEmail}>
                {userEmail ||
                  "farmer@agrinex.com"}
              </span>

            </div>

          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* =========================================
          MAIN AREA
      ========================================= */}

      <main className="main-area">

        {/* DESKTOP HEADER */}

        <header className="dashboard-header">

          <div className="header-left">

            <div className="header-title">

              {menuItems.find(
                (item) =>
                  item.id === activePage
              )?.label ||
                "Dashboard"}

            </div>

          </div>


          <div className="header-right">

            <button
              className="header-notification"
              onClick={() =>
                handlePageChange("alerts")
              }
              title="Notifications"
            >
              🔔
            </button>

            <div className="header-user">

              <div className="header-user-avatar">
                👤
              </div>

              <div className="header-user-info">

                <strong>
                  Farmer
                </strong>

                <span title={userEmail}>
                  {userEmail ||
                    "farmer@agrinex.com"}
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* =========================================
            PAGE CONTENT
        ========================================= */}

        <div className="dashboard-content">

          {renderPage()}

        </div>

      </main>

    </div>
  );
}
/* =========================================================
   DASHBOARD HOME
========================================================= */

function DashboardHome({
  setActivePage,
  orders,
  products,
}) {
  const totalProduce = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const totalOrders = orders.length;

  return (
    <>
      <div className="welcome">
        <div>
          <span className="page-badge">
            🌾 AGRINEX INTELLIGENCE
          </span>

          <h1>
            Farmer Dashboard! 👋
          </h1>

          <p>
            Your smart agricultural command center.
          </p>
        </div>

        <button
          className="primary-action"
          onClick={() => setActivePage("produce")}
        >
          + Add Produce
        </button>
      </div>

      {/* STATS */}

      <section className="dashboard-stats">

        <StatCard
          icon="🌾"
          title="Total Produce"
          value={`${totalProduce.toLocaleString()} kg`}
          change="Available on platform"
        />

        <StatCard
          icon="💰"
          title="Estimated Value"
          value="₹68,400"
          change="↑ 8.4% potential"
        />

        <StatCard
          icon="📦"
          title="Active Orders"
          value={String(totalOrders).padStart(2, "0")}
          change={
            totalOrders
              ? "New customer orders"
              : "No orders yet"
          }
        />

        <StatCard
          icon="♻️"
          title="Estimated Waste Stock"
          value={`${products.reduce((sum, product) => {
            const quantity = Math.max(0, Number(product.available ?? product.quantity) || 0);
            const crop = String(product.name || "").toLowerCase();
            const riskRate = /tomato|leafy|spinach|banana|mango|brinjal|eggplant/.test(crop)
              ? 0.15
              : /chilli|chili|pepper|potato|onion/.test(crop)
                ? 0.08
                : /paddy|rice|wheat|millet|maize|corn/.test(crop)
                  ? 0.02
                  : 0.05;
            return sum + quantity * riskRate;
          }, 0).toLocaleString(undefined, { maximumFractionDigits: 1 })} kg`}
          change="Crop-based demo estimate"
        />

      </section>

      {/* AI HERO */}

      <section className="dashboard-hero">
        <div className="hero-content">
          <span>
            🧠 AI RECOMMENDATION ENGINE
          </span>

          <h2>
            Turn every kilogram
            <br />
            into <em>maximum value.</em>
          </h2>

          <p>
            AgriNex analyzes market prices, storage,
            processing and storage to recommend
            the best pathway for your harvest.
          </p>

          <button
            onClick={() => setActivePage("ai")}
          >
            Analyze New Produce →
          </button>
        </div>

        <div className="hero-crop">
          🌾
        </div>
      </section>

      {/* DIRECT MARKETPLACE */}

      <section className="recommendation">

        <div className="section-title">
          <div>
            <span>
              🛒 DIRECT FARMER MARKETPLACE
            </span>

            <h2>
              Sell directly to customers
            </h2>
          </div>

          <b>
            ● No Middleman
          </b>
        </div>

        <div className="recommendation-body">

          <div className="tomato">
            🧑‍🌾
          </div>

          <div className="recommendation-info">

            <h3>
              Farmer → Customer
            </h3>

            <p>
              List your harvest, set your price and
              receive direct customer orders.
            </p>

            <div className="recommendation-box">

              <strong>
                💰 Farmer controls the price
              </strong>

              <span>
                Direct sales can reduce dependence
                on traditional intermediaries.
              </span>

            </div>

          </div>
        </div>

        <div className="routes">

          <div>
            <span>Farmer</span>
            <strong>🌾 List</strong>
          </div>

          <div>
            <span>Marketplace</span>
            <strong>🛒 Browse</strong>
          </div>

          <div className="best">
            <span>Customer ⭐</span>
            <strong>📦 Order</strong>
          </div>

          <div>
            <span>Farmer</span>
            <strong>💰 Earn</strong>
          </div>

        </div>
      </section>

      {/* QUICK ACCESS */}

      <section className="quick-section">

        <div className="section-heading">
          <h2>Quick Access</h2>
          <p>
            Manage your agricultural activities
          </p>
        </div>

        <div className="quick-grid">

          <QuickCard
            icon="🌾"
            title="My Produce"
            text="Manage your crop batches"
            onClick={() =>
              setActivePage("produce")
            }
          />

          <QuickCard
            icon="📊"
            title="Market Prices"
            text="Check current crop prices"
            onClick={() =>
              setActivePage("market")
            }
          />

          <QuickCard
            icon="🛒"
            title="Marketplace"
            text="Sell directly to customers"
            onClick={() =>
              setActivePage("marketplace")
            }
          />

          <QuickCard
            icon="📦"
            title="Orders"
            text="View customer orders"
            onClick={() =>
              setActivePage("orders")
            }
          />

        </div>
      </section>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  change,
}) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <span>{title}</span>

      <strong>{value}</strong>

      <small>{change}</small>

    </div>
  );
}

/* =========================================================
   QUICK CARD
========================================================= */

function QuickCard({
  icon,
  title,
  text,
  onClick,
}) {
  return (
    <button
      className="quick-card"
      onClick={onClick}
    >
      <div className="quick-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <span className="arrow">
        →
      </span>
    </button>
  );
}

/* =========================================================
   MY PRODUCE
========================================================= */

function ProducePage({
  products,
  onAddProduct,
}) {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    grade: "Grade A",
    emoji: "🌾",
    location: "Tirunelveli",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.quantity ||
      !form.price
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onAddProduct({
      ...form,
      farmer: "Abi Farms",
    });

    setForm({
      name: "",
      quantity: "",
      price: "",
      grade: "Grade A",
      emoji: "🌾",
      location: "Tirunelveli",
    });

    setShowForm(false);

    alert("Produce successfully listed!");
  };

  return (
    <div className="module-page">

      <div className="module-header">
        <div>
          <span className="page-badge">
            🌾 FARM MANAGEMENT
          </span>

          <h1>My Produce</h1>

          <p>
            Manage your crops and list them directly
            on the marketplace.
          </p>
        </div>

        <button
          className="primary-action"
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          + Add New Produce
        </button>
      </div>

      {showForm && (
        <div className="form-card">

          <h2>
            🛒 List Produce for Direct Sale
          </h2>

          <p>
            Customers will be able to see this
            product in the marketplace.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <input
                placeholder="Crop name e.g. Tomato"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Quantity (kg)"
                value={form.quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Price per kg ₹"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
              />

              <select
                value={form.grade}
                onChange={(e) =>
                  setForm({
                    ...form,
                    grade: e.target.value,
                  })
                }
              >
                <option>Grade A</option>
                <option>Grade B</option>
                <option>Grade C</option>
              </select>

              <select
                value={form.emoji}
                onChange={(e) =>
                  setForm({
                    ...form,
                    emoji: e.target.value,
                  })
                }
              >
                <option value="🌾">
                  🌾 Paddy
                </option>
                <option value="🍅">
                  🍅 Tomato
                </option>
                <option value="🌶️">
                  🌶️ Chilli
                </option>
                <option value="🥔">
                  🥔 Potato
                </option>
                <option value="🧅">
                  🧅 Onion
                </option>
              </select>

              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
              />

            </div>

            <button
              className="primary-action"
              type="submit"
            >
              🚀 List on Marketplace
            </button>

          </form>
        </div>
      )}

      <div className="batch-grid">

        {products.map((product) => (
          <div
            className="batch-card"
            key={product.id}
          >
            <div className="batch-top">

              <span className="batch-crop">
                {product.emoji} {product.name}
              </span>

              <span className="status ready">
                Listed
              </span>

            </div>

            <h3>
              {product.available} kg Available
            </h3>

            <p>
              {product.grade} • ₹
              {product.price}/kg
            </p>

            <div className="batch-value">
              <span>
                Marketplace Value
              </span>

              <strong>
                ₹
                {(
                  product.available *
                  product.price
                ).toLocaleString()}
              </strong>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

/* =========================================================
   MARKET INTELLIGENCE
========================================================= */

function MarketPage() {
  const [selectedCrop, setSelectedCrop] = useState(null);

  const marketData = [
    {
      id: 1,
      crop: "Tomato",
      icon: "🍅",
      price: 24,
      change: "+12.5%",
      changeValue: 12.5,
      demand: "High",
      demandClass: "high",
      trend: "up",
      location: "Local Market",
      advice:
        "Demand is currently high. Farmers can monitor the market before deciding when to sell."
    },
    {
      id: 2,
      crop: "Paddy",
      icon: "🌾",
      price: 25,
      change: "+5.2%",
      changeValue: 5.2,
      demand: "Stable",
      demandClass: "stable",
      trend: "up",
      location: "Regional Market",
      advice:
        "The market is relatively stable. Farmers can compare nearby buyers before selling."
    },
    {
      id: 3,
      crop: "Potato",
      icon: "🥔",
      price: 28,
      change: "-2.1%",
      changeValue: -2.1,
      demand: "Moderate",
      demandClass: "moderate",
      trend: "down",
      location: "Local Market",
      advice:
        "Prices have decreased slightly. Farmers may compare different markets before selling."
    },
    {
      id: 4,
      crop: "Chilli",
      icon: "🌶️",
      price: 180,
      change: "+15.8%",
      changeValue: 15.8,
      demand: "High",
      demandClass: "high",
      trend: "up",
      location: "Regional Market",
      advice:
        "The displayed price has increased in this prototype dataset. Continue monitoring before selling."
    },
    {
      id: 5,
      crop: "Onion",
      icon: "🧅",
      price: 32,
      change: "+7.4%",
      changeValue: 7.4,
      demand: "High",
      demandClass: "high",
      trend: "up",
      location: "Local Market",
      advice:
        "Demand is high in the displayed market data. Compare available buyers and prices."
    },
    {
      id: 6,
      crop: "Banana",
      icon: "🍌",
      price: 38,
      change: "+3.8%",
      changeValue: 3.8,
      demand: "Stable",
      demandClass: "stable",
      trend: "up",
      location: "Regional Market",
      advice:
        "Prices are showing a moderate increase in the displayed data."
    }
  ];

  const highlightedCrop = marketData.reduce((highest, crop) =>
    crop.changeValue > highest.changeValue ? crop : highest
  );

  return (
    <div className="module-page market-page">

      {/* HEADER */}
      <div className="module-header">
        <div>
          <div className="section-label">
            📊 MARKET INTELLIGENCE
          </div>

          <h1>Market Prices</h1>

          <p>
            Monitor agricultural prices, demand and market trends.
          </p>
        </div>
      </div>

      {/* MARKET HIGHLIGHT */}
      <div className="market-highlight">

        <div className="market-highlight-content">

          <div className="highlight-label">
            📈 HIGH PRICE TREND
          </div>

          <h2>
            {highlightedCrop.icon} {highlightedCrop.crop}
          </h2>

          <div className="highlight-price">
            ₹{highlightedCrop.price}/kg
          </div>

          <p>
            Price change: {highlightedCrop.change} in the displayed
            market data
          </p>

        </div>

        <div className="highlight-icon">
          {highlightedCrop.icon}
        </div>

      </div>

      {/* MARKET TABLE */}
      <div className="market-table-card">

        <div className="market-table-header">
          <div>
            <h2>Current Market Prices</h2>

            <p>
              Compare crop prices and demand levels.
            </p>
          </div>

          <span className="demo-data-label">
            Prototype Data
          </span>
        </div>

        <div className="responsive-table">

          <table>

            <thead>
              <tr>
                <th>CROP</th>
                <th>CURRENT PRICE</th>
                <th>CHANGE</th>
                <th>DEMAND</th>
                <th>MARKET</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {marketData.map((crop) => (

                <tr key={crop.id}>

                  <td>
                    <div className="crop-name">
                      <span className="crop-icon">
                        {crop.icon}
                      </span>

                      <strong>{crop.crop}</strong>
                    </div>
                  </td>

                  <td>
                    ₹{crop.price}/kg
                  </td>

                  <td>
                    <span
                      className={
                        crop.trend === "up"
                          ? "price-up"
                          : "price-down"
                      }
                    >
                      {crop.trend === "up" ? "↑" : "↓"}{" "}
                      {crop.change}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`demand-badge ${crop.demandClass}`}
                    >
                      {crop.demand}
                    </span>
                  </td>

                  <td>
                    {crop.location}
                  </td>

                  <td>
                    <button
                      className="view-market-btn"
                      onClick={() => setSelectedCrop(crop)}
                    >
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* CROP DETAILS */}
      {selectedCrop && (

        <div className="market-details-overlay">

          <div className="market-details-modal">

            <button
              className="market-modal-close"
              onClick={() => setSelectedCrop(null)}
            >
              ×
            </button>

            <div className="market-details-icon">
              {selectedCrop.icon}
            </div>

            <h2>{selectedCrop.crop}</h2>

            <p className="market-details-subtitle">
              Market Information
            </p>

            <div className="market-detail-grid">

              <div>
                <span>Current Price</span>

                <strong>
                  ₹{selectedCrop.price}/kg
                </strong>
              </div>

              <div>
                <span>Price Change</span>

                <strong
                  className={
                    selectedCrop.trend === "up"
                      ? "price-up"
                      : "price-down"
                  }
                >
                  {selectedCrop.change}
                </strong>
              </div>

              <div>
                <span>Demand</span>

                <strong>
                  {selectedCrop.demand}
                </strong>
              </div>

              <div>
                <span>Market</span>

                <strong>
                  {selectedCrop.location}
                </strong>
              </div>

            </div>

            {/* SIMPLE TREND */}
            <div className="price-trend-box">

              <h3>Price Trend</h3>

              <div className="trend-chart">

                <div className="trend-line">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>

              <div className="trend-labels">
                <span>Earlier</span>
                <span>Current</span>
              </div>

            </div>

            {/* FARMER INFORMATION */}
            <div className="market-advice">

              <h3>🌱 Farmer Information</h3>

              <p>
                {selectedCrop.advice}
              </p>

            </div>

            <button
              className="primary-action market-close-btn"
              onClick={() => setSelectedCrop(null)}
            >
              Close Details
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================================================
   AI ADVISOR
========================================================= */

function AIAdvisorPage() {
  const [soilType, setSoilType] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [moisture, setMoisture] = useState("");
  const [season, setSeason] = useState("");
  const [location, setLocation] = useState("");

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecommendation = (e) => {
    e.preventDefault();

    if (
      !soilType ||
      !temperature ||
      !rainfall ||
      !moisture ||
      !season ||
      !location
    ) {
      alert("Please fill in all the farming details.");
      return;
    }

    setLoading(true);
    setRecommendation(null);

    // Simulate AI processing
    setTimeout(() => {
      const temp = Number(temperature);
      const rain = Number(rainfall);
      const soilMoisture = Number(moisture);

      let crop = "Tomato";
      let cropIcon = "🍅";
      let water = "Medium";
      let duration = "90–120 days";
      let reason =
        "The entered conditions are suitable for growing tomato.";

      // Simple prototype recommendation logic
      if (
        soilType === "Clay" &&
        rain >= 100 &&
        temp >= 20 &&
        temp <= 32
      ) {
        crop = "Paddy";
        cropIcon = "🌾";
        water = "High";
        duration = "120–150 days";
        reason =
          "The combination of clay soil and higher rainfall can support paddy cultivation.";
      } else if (
        soilType === "Sandy" &&
        temp >= 22 &&
        temp <= 35 &&
        rain < 100
      ) {
        crop = "Groundnut";
        cropIcon = "🥜";
        water = "Low–Medium";
        duration = "100–120 days";
        reason =
          "Sandy soil with moderate temperature and lower rainfall can support groundnut cultivation.";
      } else if (
        soilType === "Loamy" &&
        temp >= 20 &&
        temp <= 35
      ) {
        crop = "Tomato";
        cropIcon = "🍅";
        water = "Medium";
        duration = "90–120 days";
        reason =
          "Loamy soil and moderate temperature provide suitable conditions for tomato cultivation.";
      } else if (
        soilType === "Black Soil" &&
        temp >= 20 &&
        temp <= 35
      ) {
        crop = "Chilli";
        cropIcon = "🌶️";
        water = "Medium";
        duration = "120–150 days";
        reason =
          "Black soil with suitable temperature can support chilli cultivation.";
      } else if (temp > 32 && rain < 80) {
        crop = "Millet";
        cropIcon = "🌾";
        water = "Low";
        duration = "70–100 days";
        reason =
          "Higher temperature and lower rainfall conditions can be suitable for drought-tolerant millet crops.";
      }

      let irrigation = "Moderate irrigation is recommended.";

      if (soilMoisture < 30) {
        irrigation =
          "Soil moisture is low. Irrigation may be required soon. Avoid over-watering.";
      } else if (soilMoisture >= 30 && soilMoisture <= 60) {
        irrigation =
          "Soil moisture is in a moderate range. Monitor moisture before the next irrigation.";
      } else {
        irrigation =
          "Soil moisture is relatively high. Avoid unnecessary irrigation to reduce water wastage.";
      }

      let weatherAdvice =
        "Monitor local weather conditions regularly before irrigation and spraying.";

      if (rain >= 150) {
        weatherAdvice =
          "High rainfall conditions detected. Monitor drainage and avoid unnecessary irrigation.";
      } else if (rain < 50) {
        weatherAdvice =
          "Low rainfall conditions detected. Plan irrigation carefully and conserve available water.";
      }

      setRecommendation({
        crop,
        cropIcon,
        water,
        duration,
        reason,
        irrigation,
        weatherAdvice,
        location,
        season
      });

      setLoading(false);
    }, 1200);
  };

  const resetAdvisor = () => {
    setSoilType("");
    setTemperature("");
    setRainfall("");
    setMoisture("");
    setSeason("");
    setLocation("");
    setRecommendation(null);
  };

  return (
    <div className="module-page ai-advisor-page">

      {/* HEADER */}
      <div className="module-header">
        <div>
          <div className="section-label">
            🤖 AI FARMING INTELLIGENCE
          </div>

          <h1>AI Advisor</h1>

          <p>
            Get farming recommendations based on soil, weather and
            environmental conditions.
          </p>
        </div>
      </div>

      {/* INTRO CARD */}
      <div className="ai-intro-card">

        <div className="ai-intro-icon">
          🤖
        </div>

        <div>
          <h2>Smart Farming Assistant</h2>

          <p>
            Enter your field conditions and AgriNex will generate a
            prototype farming recommendation.
          </p>
        </div>

      </div>

      {/* FARMING INPUT FORM */}
      {!recommendation && (
        <div className="ai-form-card">

          <div className="ai-card-header">
            <div>
              <h2>🌱 Enter Farming Conditions</h2>

              <p>
                Provide the available information about your farm.
              </p>
            </div>

            <span className="ai-badge">
              AI ANALYSIS
            </span>
          </div>

          <form onSubmit={generateRecommendation}>

            <div className="ai-form-grid">

              {/* SOIL */}
              <div className="ai-field">

                <label>
                  Soil Type
                </label>

                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                >
                  <option value="">
                    Select soil type
                  </option>

                  <option value="Loamy">
                    Loamy Soil
                  </option>

                  <option value="Clay">
                    Clay Soil
                  </option>

                  <option value="Sandy">
                    Sandy Soil
                  </option>

                  <option value="Black Soil">
                    Black Soil
                  </option>
                </select>

              </div>

              {/* TEMPERATURE */}
              <div className="ai-field">

                <label>
                  Temperature (°C)
                </label>

                <input
                  type="number"
                  placeholder="e.g. 28"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  min="0"
                  max="60"
                />

              </div>

              {/* RAINFALL */}
              <div className="ai-field">

                <label>
                  Expected Rainfall (mm)
                </label>

                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  min="0"
                />

              </div>

              {/* SOIL MOISTURE */}
              <div className="ai-field">

                <label>
                  Soil Moisture (%)
                </label>

                <input
                  type="number"
                  placeholder="e.g. 45"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  min="0"
                  max="100"
                />

              </div>

              {/* SEASON */}
              <div className="ai-field">

                <label>
                  Season
                </label>

                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                >
                  <option value="">
                    Select season
                  </option>

                  <option value="Kharif">
                    Kharif
                  </option>

                  <option value="Rabi">
                    Rabi
                  </option>

                  <option value="Summer">
                    Summer
                  </option>

                  <option value="Year Round">
                    Year Round
                  </option>
                </select>

              </div>

              {/* LOCATION */}
              <div className="ai-field">

                <label>
                  Farm Location
                </label>

                <input
                  type="text"
                  placeholder="e.g. Tirunelveli"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

              </div>

            </div>

            <div className="ai-form-footer">

              <p>
                💡 Tip: More accurate farm information can help
                produce better recommendations.
              </p>

              <button
                type="submit"
                className="primary-action ai-analyze-button"
                disabled={loading}
              >
                {loading
                  ? "🤖 Analyzing..."
                  : "🤖 Analyze Farm"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* AI RESULT */}
      {recommendation && (

        <div className="ai-result-section">

          {/* RESULT HEADER */}
          <div className="ai-result-header">

            <div>
              <div className="section-label">
                🤖 AI ANALYSIS COMPLETE
              </div>

              <h2>Farming Recommendation</h2>

              <p>
                Analysis generated for {recommendation.location}
              </p>
            </div>

            <button
              className="secondary-action"
              onClick={resetAdvisor}
            >
              🔄 New Analysis
            </button>

          </div>

          {/* MAIN RECOMMENDATION */}
          <div className="ai-recommendation-card">

            <div className="recommended-crop-icon">
              {recommendation.cropIcon}
            </div>

            <div className="recommended-crop-content">

              <span>
                RECOMMENDED CROP
              </span>

              <h2>
                {recommendation.crop}
              </h2>

              <p>
                {recommendation.reason}
              </p>

            </div>

            <div className="recommendation-confidence">
              <span>AI MATCH</span>
              <strong>Recommended</strong>
            </div>

          </div>

          {/* RESULT CARDS */}
          <div className="ai-result-grid">

            <div className="ai-result-card">

              <div className="result-card-icon">
                💧
              </div>

              <div>
                <span>Water Requirement</span>

                <strong>
                  {recommendation.water}
                </strong>
              </div>

            </div>

            <div className="ai-result-card">

              <div className="result-card-icon">
                📅
              </div>

              <div>
                <span>Growing Period</span>

                <strong>
                  {recommendation.duration}
                </strong>
              </div>

            </div>

            <div className="ai-result-card">

              <div className="result-card-icon">
                🌦️
              </div>

              <div>
                <span>Season</span>

                <strong>
                  {recommendation.season}
                </strong>
              </div>

            </div>

            <div className="ai-result-card">

              <div className="result-card-icon">
                📍
              </div>

              <div>
                <span>Farm Location</span>

                <strong>
                  {recommendation.location}
                </strong>
              </div>

            </div>

          </div>

          {/* FARMING ACTIONS */}
          <div className="ai-advice-grid">

            <div className="ai-advice-card irrigation-advice">

              <div className="advice-icon">
                💧
              </div>

              <div>
                <h3>Smart Irrigation Advice</h3>

                <p>
                  {recommendation.irrigation}
                </p>
              </div>

            </div>

            <div className="ai-advice-card weather-advice">

              <div className="advice-icon">
                🌦️
              </div>

              <div>
                <h3>Weather Intelligence</h3>

                <p>
                  {recommendation.weatherAdvice}
                </p>
              </div>

            </div>

          </div>

          {/* NEXT ACTIONS */}
          <div className="ai-next-actions">

            <h3>🌱 Recommended Next Steps</h3>

            <div className="next-action-list">

              <div>
                <span>1</span>
                <p>
                  Monitor soil moisture regularly.
                </p>
              </div>

              <div>
                <span>2</span>
                <p>
                  Check Market Intelligence before selling your produce.
                </p>
              </div>

              <div>
                <span>3</span>
                <p>
                  Use Cold Storage if the produce cannot be sold immediately.
                </p>
              </div>

              <div>
                <span>4</span>
                <p>
                  Plan transportation based on your harvest quantity and destination.
                </p>
              </div>

            </div>

          </div>

          <div className="ai-disclaimer">
            ⚠️ This is a prototype rule-based recommendation for the
            AgriNex demonstration. Actual farming decisions should use
            validated local agricultural and weather data.
          </div>

        </div>

      )}

    </div>
  );
}

/* =========================================================
   PROCESSING
========================================================= */

function ProcessingPage() {
  const units = [
    {
      icon: "🏭",
      name: "Sri Lakshmi Food Processing",
      type: "Tomato Processing",
      distance: "4.2 km",
      capacity: "2,500 kg/day",
    },
    {
      icon: "🏭",
      name: "Green Valley Agro Foods",
      type: "Fruit & Vegetable Processing",
      distance: "7.8 km",
      capacity: "5,000 kg/day",
    },
    {
      icon: "🏭",
      name: "FarmFresh Processing Center",
      type: "Dehydration & Packaging",
      distance: "12.4 km",
      capacity: "3,000 kg/day",
    },
  ];

  return (
    <div className="module-page">

      <div className="module-header">
        <div>
          <span className="page-badge">
            🏭 VALUE ADDITION
          </span>

          <h1>Processing Units</h1>

          <p>
            Find processing facilities for your harvest.
          </p>
        </div>
      </div>

      <div className="facility-grid">

        {units.map((unit, index) => (
          <div
            className="facility-card"
            key={index}
          >

            <div className="facility-icon">
              {unit.icon}
            </div>

            <h3>{unit.name}</h3>

            <p>{unit.type}</p>

            <div className="facility-details">

              <span>
                📍 {unit.distance}
              </span>

              <span>
                ⚙️ {unit.capacity}
              </span>

            </div>

            <button className="outline-button">
              Contact Unit
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

/* =========================================================
   STORAGE
========================================================= */

function StoragePage() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [produce, setProduce] = useState("");
  const [quantity, setQuantity] = useState("");
  const [days, setDays] = useState("");
  const [reservation, setReservation] = useState(null);

  const facilities = [
    {
      id: 1,
      name: "Green Cold Storage",
      distance: "3.4 km",
      capacity: 8000,
      available: 3200,
      price: 1.5
    },
    {
      id: 2,
      name: "FarmSafe Storage",
      distance: "6.7 km",
      capacity: 12000,
      available: 5800,
      price: 1.8
    },
    {
      id: 3,
      name: "AgroCool Center",
      distance: "9.2 km",
      capacity: 20000,
      available: 9500,
      price: 2.0
    }
  ];

  const selectFacility = (facility) => {
    setSelectedFacility(facility);
    setReservation(null);
    setProduce("");
    setQuantity("");
    setDays("");
  };

  const calculateCost = () => {
    if (!produce || !quantity || !days) {
      alert("Please enter produce, quantity and storage duration.");
      return;
    }

    const qty = Number(quantity);
    const duration = Number(days);

    if (qty <= 0 || duration <= 0) {
      alert("Please enter valid quantity and duration.");
      return;
    }

    if (qty > selectedFacility.available) {
      alert(
        `Only ${selectedFacility.available.toLocaleString()} kg is currently available at this facility.`
      );
      return;
    }

    const totalCost = qty * selectedFacility.price * duration;

    setReservation({
      facility: selectedFacility.name,
      produce,
      quantity: qty,
      days: duration,
      price: selectedFacility.price,
      totalCost
    });
  };

  const cancelReservation = () => {
    setReservation(null);
    setSelectedFacility(null);
  };

  return (
    <div className="module-page storage-page">

      {/* PAGE HEADER */}
      <div className="module-header">
        <div>
          <div className="section-label">
            ❄️ STORAGE INTELLIGENCE
          </div>

          <h1>Cold Storage</h1>

          <p>
            Find available cold-storage capacity and safely preserve your
            agricultural produce.
          </p>
        </div>
      </div>

      {/* STORAGE STATISTICS */}
      <div className="dashboard-stats">

        <StatCard
          title="Available Facilities"
          value="18"
        />

        <StatCard
          title="Total Available Capacity"
          value="42,500 kg"
        />

        <StatCard
          title="Average Cost"
          value="₹1.80/kg"
        />

      </div>

      {/* FACILITIES */}
      {!selectedFacility && !reservation && (
        <div className="storage-section">

          <div className="section-heading">
            <div>
              <h2>Available Cold Storage Facilities</h2>

              <p>
                Choose a storage facility based on distance, capacity and
                pricing.
              </p>
            </div>
          </div>

          <div className="facility-grid">

            {facilities.map((facility) => (
              <div className="storage-card" key={facility.id}>

                <div className="storage-icon">
                  ❄️
                </div>

                <h3>{facility.name}</h3>

                <p className="storage-distance">
                  📍 {facility.distance}
                </p>

                <div className="storage-details">

                  <div>
                    <span>Capacity</span>
                    <strong>
                      {facility.capacity.toLocaleString()} kg
                    </strong>
                  </div>

                  <div>
                    <span>Available</span>
                    <strong>
                      {facility.available.toLocaleString()} kg
                    </strong>
                  </div>

                  <div>
                    <span>Price</span>
                    <strong>
                      ₹{facility.price.toFixed(2)}/kg/day
                    </strong>
                  </div>

                </div>

                <button
                  className="primary-action"
                  onClick={() => selectFacility(facility)}
                >
                  Reserve Storage
                </button>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* RESERVATION FORM */}
      {selectedFacility && !reservation && (
        <div className="storage-reservation">

          <button
            className="back-button"
            onClick={() => setSelectedFacility(null)}
          >
            ← Back to Facilities
          </button>

          <div className="reservation-card">

            <div className="reservation-header">

              <div className="storage-icon">
                ❄️
              </div>

              <div>
                <h2>{selectedFacility.name}</h2>

                <p>
                  📍 {selectedFacility.distance} away
                </p>
              </div>

            </div>

            <div className="selected-storage-info">

              <div>
                <span>Available Capacity</span>
                <strong>
                  {selectedFacility.available.toLocaleString()} kg
                </strong>
              </div>

              <div>
                <span>Storage Price</span>
                <strong>
                  ₹{selectedFacility.price.toFixed(2)}/kg/day
                </strong>
              </div>

            </div>

            <div className="storage-form">

              <div className="form-field">
                <label>Produce</label>

                <input
                  type="text"
                  placeholder="e.g. Tomatoes"
                  value={produce}
                  onChange={(e) => setProduce(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Quantity (kg)</label>

                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 1000"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />

                <small>
                  Maximum available:{" "}
                  {selectedFacility.available.toLocaleString()} kg
                </small>
              </div>

              <div className="form-field">
                <label>Storage Duration (days)</label>

                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 7"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>

            </div>

            {quantity && days && Number(quantity) > 0 && Number(days) > 0 && (
              <div className="cost-preview">

                <div>
                  <span>Estimated Storage Cost</span>

                  <strong>
                    ₹
                    {(
                      Number(quantity) *
                      selectedFacility.price *
                      Number(days)
                    ).toLocaleString()}
                  </strong>
                </div>

                <small>
                  {quantity} kg × ₹{selectedFacility.price.toFixed(2)}/kg ×{" "}
                  {days} day(s)
                </small>

              </div>
            )}

            <button
              className="primary-action confirm-storage"
              onClick={calculateCost}
            >
              ✅ Confirm Storage Reservation
            </button>

          </div>

        </div>
      )}

      {/* RESERVATION CONFIRMATION */}
      {reservation && (
        <div className="storage-confirmation">

          <div className="confirmation-icon">
            ✅
          </div>

          <div className="confirmation-content">

            <div className="confirmation-title">

              <div>
                <h2>Storage Reserved Successfully!</h2>

                <p>
                  Your agricultural produce has been scheduled for cold
                  storage.
                </p>
              </div>

              <span className="reservation-status">
                RESERVED
              </span>

            </div>

            <div className="reservation-details">

              <div>
                <span>Storage Facility</span>
                <strong>
                  ❄️ {reservation.facility}
                </strong>
              </div>

              <div>
                <span>Produce</span>
                <strong>
                  🌾 {reservation.produce}
                </strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>
                  {reservation.quantity.toLocaleString()} kg
                </strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>
                  {reservation.days} day(s)
                </strong>
              </div>

              <div>
                <span>Rate</span>
                <strong>
                  ₹{reservation.price.toFixed(2)}/kg/day
                </strong>
              </div>

              <div>
                <span>Total Cost</span>
                <strong className="total-storage-cost">
                  ₹{reservation.totalCost.toLocaleString()}
                </strong>
              </div>

            </div>

            <div className="storage-success-message">
              ❄️ Your produce can now be stored safely.
            </div>

            <button
              className="secondary-action"
              onClick={cancelReservation}
            >
              Make Another Reservation
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   MARKETPLACE
========================================================= */

function MarketplacePage({
  products,
  onPlaceOrder,
}) {
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [quantity, setQuantity] = useState(1);

  const [customerName, setCustomerName] =
    useState("");

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.location
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleOrder = (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert("Please enter customer name.");
      return;
    }

    const success = onPlaceOrder(
      selectedProduct,
      quantity,
      customerName
    );

    if (success) {
      alert(
        "🎉 Order placed successfully!"
      );

      setSelectedProduct(null);
      setQuantity(1);
      setCustomerName("");
    }
  };

  return (
    <div className="module-page">

      <div className="module-header">

        <div>
          <span className="page-badge">
            🛒 DIRECT MARKETPLACE
          </span>

          <h1>
            Farmer to Customer Marketplace
          </h1>

          <p>
            Buy fresh agricultural products directly
            from farmers.
          </p>
        </div>

      </div>

      {/* MARKETPLACE BANNER */}

      <div className="market-highlight">

        <div>
          <span>
            🌱 DIRECT FARMER SALES
          </span>

          <h2>
            Fresh produce.
            <br />
            Direct from farms.
          </h2>

          <p>
            Customers can discover produce,
            compare prices and place orders
            directly with farmers.
          </p>
        </div>

        <div className="market-big-icon">
          🧑‍🌾
        </div>

      </div>

      {/* SEARCH */}

      <div className="marketplace-search">

        <input
          placeholder="Search produce or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* PRODUCTS */}

      <div className="buyer-grid">

        {filteredProducts.map((product) => (
          <div
            className="buyer-card"
            key={product.id}
          >

            <div className="buyer-icon">
              {product.emoji}
            </div>

            <h3>
              {product.name}
            </h3>

            <p>
              Farmer:{" "}
              <strong>
                {product.farmer}
              </strong>
            </p>

            <div className="buyer-info">

              <span>
                💰 ₹{product.price}/kg
              </span>

              <span>
                📦 {product.available} kg
              </span>

              <span>
                📍 {product.location}
              </span>

              <span>
                ⭐ {product.grade}
              </span>

            </div>

            <button
              className="primary-action"
              disabled={product.available <= 0}
              onClick={() => {
                setSelectedProduct(product);
                setQuantity(1);
              }}
            >
              {product.available > 0
                ? "🛒 Buy Now"
                : "Sold Out"}
            </button>

          </div>
        ))}

      </div>

      {filteredProducts.length === 0 && (
        <div className="table-card">
          <h2>
            No products found
          </h2>

          <p>
            Try searching for another crop or
            location.
          </p>
        </div>
      )}

      {/* ORDER MODAL */}

      {selectedProduct && (
        <div className="order-modal-overlay">

          <div className="order-modal">

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ✕
            </button>

            <div className="buyer-icon">
              {selectedProduct.emoji}
            </div>

            <h2>
              Order {selectedProduct.name}
            </h2>

            <p>
              Direct from{" "}
              <strong>
                {selectedProduct.farmer}
              </strong>
            </p>

            <form onSubmit={handleOrder}>

              <label>
                Customer Name
              </label>

              <input
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
              />

              <label>
                Quantity (kg)
              </label>

              <input
                type="number"
                min="1"
                max={selectedProduct.available}
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
              />

              <div className="order-summary">

                <span>
                  Price
                </span>

                <strong>
                  ₹{selectedProduct.price}/kg
                </strong>

                <span>
                  Quantity
                </span>

                <strong>
                  {quantity} kg
                </strong>

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {(
                    Number(quantity || 0) *
                    selectedProduct.price
                  ).toLocaleString()}
                </strong>

              </div>

              <button
                type="submit"
                className="primary-action"
              >
                Confirm Order →
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

/* =========================================================
   ORDERS
========================================================= */

function OrdersPage({
  orders,
  updateOrderStatus,
}) {
  return (
    <div className="module-page">

      <div className="module-header">

        <div>
          <span className="page-badge">
            📦 ORDER MANAGEMENT
          </span>

          <h1>Customer Orders</h1>

          <p>
            Manage orders received from customers.
          </p>
        </div>

      </div>

      {orders.length === 0 ? (
        <div className="table-card">

          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              📦
            </div>

            <h2>
              No orders yet
            </h2>

            <p>
              Customer orders will appear here
              after they purchase your produce.
            </p>
          </div>

        </div>
      ) : (
        <div className="table-card">

          <h2>
            Recent Orders
          </h2>

          <div className="responsive-table">

            <table>

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (
                  <tr key={order.id}>

                    <td>
                      <strong>
                        {order.id}
                      </strong>
                    </td>

                    <td>
                      {order.emoji}{" "}
                      {order.productName}
                    </td>

                    <td>
                      {order.customer}
                    </td>

                    <td>
                      {order.quantity} kg
                    </td>

                    <td>
                      ₹
                      {order.total.toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>

                      {order.status ===
                        "Pending" && (
                        <button
                          className="small-button"
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "Confirmed"
                            )
                          }
                        >
                          Confirm
                        </button>
                      )}

                      {order.status ===
                        "Confirmed" && (
                        <button
                          className="small-button"
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "Delivered"
                            )
                          }
                        >
                          Mark Delivered
                        </button>
                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   WASTE REDUCTION
========================================================= */

function WastePage({ products = [] }) {
  // Demo estimate: crop-specific risk rates are applied to currently available stock.
  // Replace these rules with the AI model output when the backend is connected.
  const getRiskRate = (cropName = "") => {
    const crop = String(cropName).toLowerCase();
    if (/tomato|leafy|spinach|banana|mango|brinjal|eggplant/.test(crop)) return 0.15;
    if (/chilli|chili|pepper|potato|onion/.test(crop)) return 0.08;
    if (/paddy|rice|wheat|millet|maize|corn/.test(crop)) return 0.02;
    return 0.05;
  };

  const stockByCrop = products.reduce((totals, product) => {
    const crop = product.name || "Unknown crop";
    const quantity = Math.max(0, Number(product.available ?? product.quantity) || 0);
    if (!totals[crop]) totals[crop] = { stock: 0, estimatedWaste: 0 };
    totals[crop].stock += quantity;
    totals[crop].estimatedWaste += quantity * getRiskRate(crop);
    return totals;
  }, {});

  const cropEntries = Object.entries(stockByCrop).sort(
    ([, a], [, b]) => b.estimatedWaste - a.estimatedWaste
  );
  const totalCurrentStock = cropEntries.reduce((sum, [, data]) => sum + data.stock, 0);
  const totalEstimatedWaste = cropEntries.reduce((sum, [, data]) => sum + data.estimatedWaste, 0);
  const cropsAtRisk = cropEntries.filter(([, data]) => data.estimatedWaste > 0).length;

  const formatKg = (value) => `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg`;

  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <span className="page-badge">♻️ SUSTAINABILITY</span>
          <h1>Waste Reduction</h1>
          <p>Estimate how much of your available crop stock may be at risk of waste.</p>
        </div>
      </div>

      <div className="waste-stats">
        <div>
          <span>Estimated Waste Stock</span>
          <strong>{formatKg(totalEstimatedWaste)}</strong>
          <small>Crop-based demo estimate</small>
        </div>
        <div>
          <span>Current Stock</span>
          <strong>{formatKg(totalCurrentStock)}</strong>
          <small>Available quantity from My Produce</small>
        </div>
        <div>
          <span>Crops Analyzed</span>
          <strong>{cropEntries.length}</strong>
          <small>{cropsAtRisk} crop types with estimated risk</small>
        </div>
      </div>

      <div className="waste-card">
        <h2>🌾 Estimated Waste by Crop</h2>
        {cropEntries.length === 0 ? (
          <p>No produce entries yet. Add stock in My Produce to see estimates here.</p>
        ) : (
          <div className="tips">
            {cropEntries.map(([crop, data]) => (
              <div key={crop}>
                <span>🌱</span>
                <strong>{crop}</strong>
                <p>Current stock: {formatKg(data.stock)}</p>
                <p>Estimated waste stock: {formatKg(data.estimatedWaste)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="waste-card">
        <h2>♻️ Waste Prevention Suggestions</h2>
        <div className="tips">
          <div>
            <span>🍅</span>
            <strong>Highly Perishable Crops</strong>
            <p>Prioritize checking crops such as tomatoes and leafy vegetables.</p>
          </div>
          <div>
            <span>❄️</span>
            <strong>Storage</strong>
            <p>Consider suitable cold storage for crops that need temperature-controlled conditions.</p>
          </div>
          <div>
            <span>🏭</span>
            <strong>Surplus Produce</strong>
            <p>Consider processing surplus crops before their quality declines.</p>
          </div>
        </div>
        <small className="waste-note">
          These values are demo estimates calculated from available stock and crop-type risk rates; they are not measured waste. A real AI estimate needs harvest dates, storage conditions, shelf life, and model/backend integration.
        </small>
      </div>
    </div>
  );
}

/* =========================================================
   ANALYTICS
========================================================= */

function AnalyticsPage({ orders }) {

  const revenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="module-page">

      <div className="module-header">
        <div>
          <span className="page-badge">
            📈 FARM ANALYTICS
          </span>

          <h1>Analytics</h1>

          <p>
            Understand your production and
            financial performance.
          </p>
        </div>
      </div>

      <div className="analytics-grid">

        <div className="analytics-card">
          <span>
            Marketplace Revenue
          </span>

          <strong>
            ₹{revenue.toLocaleString()}
          </strong>

          <small>
            From direct customer orders
          </small>
        </div>

        <div className="analytics-card">
          <span>
            Average Crop Value
          </span>

          <strong>
            ₹24.8/kg
          </strong>

          <small>
            ↑ 6.8%
          </small>
        </div>

        <div className="analytics-card">
          <span>
            Production
          </span>

          <strong>
            8,420 kg
          </strong>

          <small>
            ↑ 11.5%
          </small>
        </div>

        <div className="analytics-card">
          <span>
            Waste Rate
          </span>

          <strong>
            6.4%
          </strong>

          <small>
            ↓ 18.4%
          </small>
        </div>

      </div>

      <div className="chart-card">

        <h2>Monthly Revenue</h2>

        <div className="fake-chart">

          <div style={{ height: "40%" }}>
            <span>Jan</span>
          </div>

          <div style={{ height: "55%" }}>
            <span>Feb</span>
          </div>

          <div style={{ height: "45%" }}>
            <span>Mar</span>
          </div>

          <div style={{ height: "70%" }}>
            <span>Apr</span>
          </div>

          <div style={{ height: "62%" }}>
            <span>May</span>
          </div>

          <div style={{ height: "85%" }}>
            <span>Jun</span>
          </div>

          <div style={{ height: "95%" }}>
            <span>Jul</span>
          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   ALERTS
========================================================= */

function AlertsPage({ orders }) {

  const alerts = [
    {
      icon: "⚠️",
      title: "Tomato Batch Needs Attention",
      text:
        "AGX1024 should be processed within 24 hours.",
      time: "10 minutes ago",
    },
    {
      icon: "📈",
      title: "Chilli Prices Increased",
      text:
        "Market price increased by 15.8% this week.",
      time: "1 hour ago",
    },
    {
      icon: "❄️",
      title: "Storage Available",
      text:
        "3,200 kg storage capacity available 3.4 km away.",
      time: "3 hours ago",
    },
    {
      icon: "🚚",
      title: "Transport Reminder",
      text:
        "Your booked vehicle arrives tomorrow at 9:00 AM.",
      time: "Yesterday",
    },
  ];

  if (orders.length > 0) {
    alerts.unshift({
      icon: "🛒",
      title: "New Customer Order",
      text:
        `You received ${orders.length} customer order(s) through the direct marketplace.`,
      time: "Just now",
    });
  }

  return (
    <div className="module-page">

      <div className="module-header">

        <div>
          <span className="page-badge">
            🔔 NOTIFICATIONS
          </span>

          <h1>
            Alerts & Notifications
          </h1>

          <p>
            Important updates about your farm
            activities.
          </p>
        </div>

      </div>

      <div className="alerts-list">

        {alerts.map((alert, index) => (

          <div
            className="alert-card"
            key={index}
          >

            <div className="alert-icon">
              {alert.icon}
            </div>

            <div className="alert-content">

              <h3>
                {alert.title}
              </h3>

              <p>
                {alert.text}
              </p>

              <small>
                {alert.time}
              </small>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage() {
  return (
    <div className="module-page">

      <div className="module-header">

        <div>
          <span className="page-badge">
            ⚙️ ACCOUNT
          </span>

          <h1>Settings</h1>

          <p>
            Manage your AgriNex preferences.
          </p>
        </div>

      </div>

      <div className="settings-card">

        <div className="setting-row">

          <div>
            <h3>
              Profile Information
            </h3>

            <p>
              Update your farmer profile and
              contact details.
            </p>
          </div>

          <button className="outline-button">
            Edit
          </button>

        </div>

        <div className="setting-row">

          <div>
            <h3>Notifications</h3>

            <p>
              Receive market and crop alerts.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>

        <div className="setting-row">

          <div>
            <h3>Market Alerts</h3>

            <p>
              Get notified when crop prices
              change significantly.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>

        <div className="setting-row">

          <div>
            <h3>Language</h3>

            <p>
              Select your preferred language.
            </p>
          </div>

          <select>
            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>
          </select>

        </div>

      </div>
    </div>
  );
}

export default App;