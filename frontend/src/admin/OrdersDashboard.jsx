


// // OrdersDashboard.jsx - WITH DELETE FUNCTIONALITY
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./OrdersDashboard.css";

// const OrdersDashboard = () => {
//   const navigate = useNavigate();

//   const [dealer, setDealer] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [deletingOrder, setDeletingOrder] = useState(null);

//   useEffect(() => {
//     fetchDealerOrders();
//   }, [navigate]);

//   const fetchDealerOrders = async () => {
//     setLoading(true);
//     try {
//       const dealerName = localStorage.getItem("selectedDealerName");
//       const dealerAddress = localStorage.getItem("selectedDealerAddress");

//       if (!dealerName || !dealerAddress) {
//         alert("❌ Dealer information not found. Please select a dealer first.");
//         setLoading(false);
//         navigate("/dealers");
//         return;
//       }

//       const res = await axios.get(
//         `http://localhost:2008/api/orders/by-info?name=${encodeURIComponent(dealerName)}&shopAddress=${encodeURIComponent(dealerAddress)}`
//       );
      
//       if (res.data && res.data.dealer) {
//         setDealer(res.data.dealer);
//         // Sort orders by createdAt descending (newest first)
//         const sortedOrders = (res.data.orders || []).sort((a, b) => 
//           new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setOrders(sortedOrders);
//       } else {
//         setOrders([]);
//       }
      
//     } catch (err) {
//       console.error("Error fetching dealer orders:", err);
      
//       if (err.response?.status === 404) {
//         alert("Dealer not found. Please check the name and address.");
//       }
      
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle order deletion
//  // OrdersDashboard.jsx - handleDeleteOrder function update करें
// const handleDeleteOrder = async (orderId) => {
//   if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
//     return;
//   }

//   setDeletingOrder(orderId);
//   try {
//     // Correct API endpoint
//     await axios.delete(`http://localhost:2008/api/orders/${orderId}`);
    
//     // Remove the order from state
//     setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    
//     // Close expanded view if deleting expanded order
//     if (expandedOrder === orderId) {
//       setExpandedOrder(null);
//     }
    
//     alert("✅ Order deleted successfully!");
//   } catch (err) {
//     console.error("Error deleting order:", err);
    
//     // Better error message
//     if (err.response) {
//       console.log("Response data:", err.response.data);
//       console.log("Response status:", err.response.status);
//       alert(`❌ Failed to delete order: ${err.response.data.message || 'Server error'}`);
//     } else if (err.request) {
//       console.log("Request error:", err.request);
//       alert("❌ Network error. Please check your connection.");
//     } else {
//       alert("❌ Failed to delete order. Please try again.");
//     }
//   } finally {
//     setDeletingOrder(null);
//   }
// };

//   // Filter orders based on search
//   const filteredOrders = orders
//     .map(order => ({
//       ...order,
//       items: order.items.filter(item => 
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     }))
//     .filter(order => order.items.length > 0);

//   // Calculate statistics
//   const totalOrders = orders.length;
//   const totalItems = orders.reduce((sum, order) => sum + order.items.length, 0);
//   const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

//   // Toggle order details
//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   if (loading) {
//     return (
//       <div className="order-loading-container">
//         <div className="order-loading-spinner"></div>
//         <h3>Loading Orders...</h3>
//         <p>Please wait while we fetch the dealer's orders</p>
//       </div>
//     );
//   }

//   return (
//     <div className="order-orders-dashboard">
//       {/* Header Section */}
//       <header className="order-dashboard-header">
//         <div className="order-header-content">
//           <div className="order-header-left">
//             <h1 className="order-dashboard-title">
//               <i className="order-icon-orders"></i> Orders Dashboard
//             </h1>
//             <p className="order-dashboard-subtitle">Manage and track dealer orders</p>
//           </div>
//           <div className="order-header-actions">
//             <button 
//               className="order-btn-back"
//               onClick={() => navigate("/admindashboard")}
//             >
//               <i className="order-icon-back"></i> Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="order-dashboard-container">
//         {/* Sidebar */}
//         <aside className="order-dashboard-sidebar">
//           <div className="order-sidebar-card">
//             <h3 className="order-sidebar-title">
//               <i className="order-icon-dealer"></i> Dealer Information
//             </h3>
//             {dealer ? (
//               <div className="order-dealer-info">
//                 <div className="order-dealer-header">
//                   <h4 className="order-dealer-name">{dealer.name}</h4>
//                   <span className="order-dealer-badge">Active</span>
//                 </div>
//                 <div className="order-dealer-details">
//                   <div className="order-detail-item">
//                     <i className="order-icon-location"></i>
//                     <div>
//                       <span className="order-detail-label">Address</span>
//                       <p className="order-detail-value">{dealer.shopAddress || "N/A"}</p>
//                     </div>
//                   </div>
//                   <div className="order-detail-item">
//                     <i className="order-icon-phone"></i>
//                     <div>
//                       <span className="order-detail-label">Mobile</span>
//                       <p className="order-detail-value">{dealer.contact || "N/A"}</p>
//                     </div>
//                   </div>
//                   <div className="order-detail-item">
//                     <i className="order-icon-document"></i>
//                     <div>
//                       <span className="order-detail-label">GST Number</span>
//                       <p className="order-detail-value">{dealer.gstNumber || "N/A"}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <p className="order-no-data">No dealer information available</p>
//             )}
//           </div>

//           {/* Stats Card */}
//           <div className="order-stats-card">
//             <h3 className="order-sidebar-title">
//               <i className="order-icon-stats"></i> Order Statistics
//             </h3>
//             <div className="order-stats-grid">
//               <div className="order-stat-item">
//                 <div className="order-stat-value">{totalOrders}</div>
//                 <div className="order-stat-label">Total Orders</div>
//               </div>
//               <div className="order-stat-item">
//                 <div className="order-stat-value">{totalItems}</div>
//                 <div className="order-stat-label">Items Sold</div>
//               </div>
//               <div className="order-stat-item">
//                 <div className="order-stat-value">₹{totalRevenue.toFixed(2)}</div>
//                 <div className="order-stat-label">Revenue</div>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="order-dashboard-main">
//           {/* Search and Filters */}
//           <div className="order-search-section">
//             <div className="order-search-box">
//               <i className="order-icon-search"></i>
//               <input
//                 type="text"
//                 placeholder="Search products by name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="order-search-input"
//               />
//               {searchQuery && (
//                 <button 
//                   className="order-clear-search"
//                   onClick={() => setSearchQuery("")}
//                 >
//                   <i className="order-icon-close"></i>
//                 </button>
//               )}
//             </div>
            
//             <div className="order-search-stats">
//               <span className="order-stat-badge">
//                 <i className="order-icon-filter"></i>
//                 Showing {filteredOrders.length} of {totalOrders} orders
//               </span>
//               {searchQuery && (
//                 <span className="order-search-term">
//                   Search: "{searchQuery}"
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Orders List */}
//           <div className="order-orders-section">
//             {filteredOrders.length === 0 ? (
//               <div className="order-empty-state">
//                 <div className="order-empty-icon">
//                   <i className="order-icon-empty"></i>
//                 </div>
//                 <h3>No Orders Found</h3>
//                 <p>
//                   {searchQuery 
//                     ? `No items matching "${searchQuery}"`
//                     : "This dealer hasn't placed any orders yet."
//                   }
//                 </p>
//                 {searchQuery && (
//                   <button 
//                     className="order-btn-clear-search"
//                     onClick={() => setSearchQuery("")}
//                   >
//                     Clear Search
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <div className="order-orders-grid">
//                 {filteredOrders.map((order) => (
//                   <div 
//                     key={order._id} 
//                     className={`order-order-card ${expandedOrder === order._id ? 'expanded' : ''}`}
//                   >
//                     <div 
//                       className="order-order-header"
//                       onClick={() => toggleOrderDetails(order._id)}
//                     >
//                       <div className="order-order-info">
//                         <div className="order-order-id">
//                           <i className="order-icon-order"></i>
//                           <span>Order #{order._id?.substring(0, 8)}...</span>
//                         </div>
//                         <div className="order-order-date">
//                           <i className="order-icon-calendar"></i>
//                           {new Date(order.createdAt).toLocaleDateString('en-IN', {
//                             day: 'numeric',
//                             month: 'short',
//                             year: 'numeric'
//                           })}
//                         </div>
//                       </div>
//                       <div className="order-order-summary">
//                         <div className="order-summary-item">
//                           <span className="order-summary-label">Items</span>
//                           <span className="order-summary-value">{order.items.length}</span>
//                         </div>
//                         <div className="order-summary-item">
//                           <span className="order-summary-label">Total</span>
//                           <span className="order-summary-value order-amount">
//                             ₹{order.totalAmount?.toFixed(2) || "0.00"}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="order-order-toggle">
//                         <i className={`order-icon-chevron ${expandedOrder === order._id ? 'up' : 'down'}`}></i>
//                       </div>
//                     </div>

//                     {/* Expanded Order Details */}
//                     {expandedOrder === order._id && (
//                       <div className="order-order-details">
//                         <div className="order-details-header">
//                           <h4>Order Details</h4>
//                           <div className="order-order-time">
//                             <i className="order-icon-time"></i>
//                             Placed: {new Date(order.createdAt).toLocaleTimeString()}
//                           </div>
//                         </div>

//                         {/* Items Table */}
//                         <div className="order-items-table-container">
//                           <table className="order-items-table">
//                             <thead>
//                               <tr>
//                                 <th>Product</th>
//                                 <th className="order-text-center">Quantity</th>
//                                 <th className="order-text-right">Unit Price</th>
//                                 <th className="order-text-right">Total</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {order.items.map((item, index) => (
//                                 <tr key={index}>
//                                   <td>
//                                     <div className="order-product-cell">
//                                       <span className="order-product-name">{item.name}</span>
//                                     </div>
//                                   </td>
//                                   <td className="order-text-center">
//                                     <span className="order-quantity-badge">{item.qty}</span>
//                                   </td>
//                                   <td className="order-text-right">
//                                     ₹{item.price.toFixed(2)}
//                                   </td>
//                                   <td className="order-text-right order-amount">
//                                     ₹{(item.qty * item.price).toFixed(2)}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                             <tfoot>
//                               <tr>
//                                 <td colSpan="3" className="order-text-right order-total-label">
//                                   Grand Total
//                                 </td>
//                                 <td className="order-text-right order-total-amount">
//                                   ₹{order.items.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2)}
//                                 </td>
//                               </tr>
//                             </tfoot>
//                           </table>
//                         </div>

//                         {/* Order Footer with Actions */}
//                         <div className="order-order-footer">
//                           <div className="order-footer-actions">
//                             <button className="order-btn-action">
//                               <i className="order-icon-print"></i> Print Invoice
//                             </button>
//                             <button className="order-btn-action">
//                               <i className="order-icon-download"></i> Download
//                             </button>
//                             <button className="order-btn-action">
//                               <i className="order-icon-share"></i> Share
//                             </button>
//                             <button 
//                               className="order-btn-delete"
//                               onClick={(e) => {
//                                 e.stopPropagation(); // Prevent card toggle
//                                 handleDeleteOrder(order._id);
//                               }}
//                               disabled={deletingOrder === order._id}
//                             >
//                               {deletingOrder === order._id ? (
//                                 <>
//                                   <i className="order-icon-spinner"></i> Deleting...
//                                 </>
//                               ) : (
//                                 <>
//                                   <i className="order-icon-delete"></i> Delete Order
//                                 </>
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className="order-mobile-nav">
//         <button className="order-mobile-nav-btn">
//           <i className="order-icon-home"></i>
//           <span>Home</span>
//         </button>
//         <button className="order-mobile-nav-btn active">
//           <i className="order-icon-orders"></i>
//           <span>Orders</span>
//         </button>
//         <button className="order-mobile-nav-btn">
//           <i className="order-icon-dealer"></i>
//           <span>Dealers</span>
//         </button>
//         <button className="order-mobile-nav-btn">
//           <i className="order-icon-profile"></i>
//           <span>Profile</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrdersDashboard;



// OrdersDashboard.jsx - ALL ORDERS VERSION
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { getImageUrl } from "../utils/api";
import "./OrdersDashboard.css";

const OrdersDashboard = () => {
  const navigate = useNavigate();

  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [dealersList, setDealersList] = useState([]);
  const [viewMode, setViewMode] = useState("all"); // "all" or "dealer"

  useEffect(() => {
    fetchAllOrders();
    fetchAllDealers();
  }, [navigate]);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/orders");
      
      if (res.data) {
        // Sort orders by createdAt descending (newest first)
        const sortedOrders = res.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllOrders(sortedOrders);
      } else {
        setAllOrders([]);
      }
      
    } catch (err) {
      console.error("Error fetching all orders:", err);
      setAllOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDealers = async () => {
    try {
      const res = await api.get("/api/dealers");
      setDealersList(res.data || []);
    } catch (err) {
      console.error("Error fetching dealers:", err);
    }
  };

  const fetchDealerOrders = async (dealerId) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/orders/dealer/${dealerId}`);
      
      if (res.data) {
        const sortedOrders = res.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllOrders(sortedOrders);
      } else {
        setAllOrders([]);
      }
      
    } catch (err) {
      console.error("Error fetching dealer orders:", err);
      setAllOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDealerSelect = (dealer) => {
    if (!dealer) {
      setViewMode("all");
      setSelectedDealer(null);
      fetchAllOrders();
      return;
    }
    
    setSelectedDealer(dealer);
    setViewMode("dealer");
    fetchDealerOrders(dealer._id);
  };

  // Handle order deletion
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }

    setDeletingOrder(orderId);
    try {
      await api.delete(`/api/orders/${orderId}`);
      
      // Remove the order from state
      setAllOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      
      // Close expanded view if deleting expanded order
      if (expandedOrder === orderId) {
        setExpandedOrder(null);
      }
      
      alert("✅ Order deleted successfully!");
    } catch (err) {
      console.error("Error deleting order:", err);
      
      if (err.response) {
        alert(`❌ Failed to delete order: ${err.response.data.message || 'Server error'}`);
      } else if (err.request) {
        alert("❌ Network error. Please check your connection.");
      } else {
        alert("❌ Failed to delete order. Please try again.");
      }
    } finally {
      setDeletingOrder(null);
    }
  };

  // Filter orders based on search
  const filteredOrders = allOrders
    .map(order => ({
      ...order,
      items: order.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(order => order.items.length > 0);

  // Calculate statistics
  const totalOrders = allOrders.length;
  const totalItems = allOrders.reduce((sum, order) => sum + order.items.length, 0);
  const totalRevenue = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="order-loading-container">
        <div className="order-loading-spinner"></div>
        <h3>Loading Orders...</h3>
        <p>Please wait while we fetch all orders</p>
      </div>
    );
  }

  return (
    <div className="order-orders-dashboard">
      {/* Header Section */}
      <header className="order-dashboard-header">
        <div className="order-header-content">
          <div className="order-header-left">
            <h1 className="order-dashboard-title">
              <i className="order-icon-orders"></i> Orders Dashboard
            </h1>
            <p className="order-dashboard-subtitle">
              {viewMode === "all" ? "All Dealers Orders" : `Orders for: ${selectedDealer?.name}`}
            </p>
          </div>
          <div className="order-header-actions">
            <button 
              className="order-btn-refresh"
              onClick={viewMode === "all" ? fetchAllOrders : () => fetchDealerOrders(selectedDealer?._id)}
              disabled={loading}
            >
              <i className="order-icon-refresh"></i> Refresh
            </button>
            <button 
              className="order-btn-back"
              onClick={() => navigate("/admindashboard")}
            >
              <i className="order-icon-back"></i> Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="order-dashboard-container">
        {/* Sidebar */}
        <aside className="order-dashboard-sidebar">
          {/* Dealer Selector */}
          <div className="order-sidebar-card">
            <h3 className="order-sidebar-title">
              <i className="order-icon-filter"></i> Filter Orders
            </h3>
            <div className="order-dealer-selector">
              <button 
                className={`order-dealer-filter-btn ${viewMode === "all" ? "active" : ""}`}
                onClick={() => handleDealerSelect(null)}
              >
                <i className="order-icon-all"></i> All Orders
              </button>
              
              <div className="order-dealer-list">
                <h4 className="order-dealer-list-title">Select Dealer:</h4>
                {dealersList.map(dealer => (
                  <button
                    key={dealer._id}
                    className={`order-dealer-item ${selectedDealer?._id === dealer._id ? "active" : ""}`}
                    onClick={() => handleDealerSelect(dealer)}
                  >
                    <i className="order-icon-dealer-small"></i>
                    <span className="order-dealer-item-name">{dealer.name}</span>
                    <span className="order-dealer-item-address">{dealer.shopAddress}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="order-stats-card">
            <h3 className="order-sidebar-title">
              <i className="order-icon-stats"></i> Order Statistics
            </h3>
            <div className="order-stats-grid">
              <div className="order-stat-item">
                <div className="order-stat-value">{totalOrders}</div>
                <div className="order-stat-label">Total Orders</div>
              </div>
              <div className="order-stat-item">
                <div className="order-stat-value">{totalItems}</div>
                <div className="order-stat-label">Items Sold</div>
              </div>
              <div className="order-stat-item">
                <div className="order-stat-value">₹{totalRevenue.toFixed(2)}</div>
                <div className="order-stat-label">Revenue</div>
              </div>
            </div>
            {selectedDealer && (
              <div className="order-current-dealer">
                <h4>Current Dealer:</h4>
                <p className="order-current-dealer-name">{selectedDealer.name}</p>
                <p className="order-current-dealer-address">{selectedDealer.shopAddress}</p>
                <p className="order-current-dealer-contact">{selectedDealer.contact}</p>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="order-dashboard-main">
          {/* Search and Filters */}
          <div className="order-search-section">
            <div className="order-search-box">
              <i className="order-icon-search"></i>
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="order-search-input"
              />
              {searchQuery && (
                <button 
                  className="order-clear-search"
                  onClick={() => setSearchQuery("")}
                >
                  <i className="order-icon-close"></i>
                </button>
              )}
            </div>
            
            <div className="order-search-stats">
              <span className="order-stat-badge">
                <i className="order-icon-filter"></i>
                Showing {filteredOrders.length} of {totalOrders} orders
                {selectedDealer && ` (${selectedDealer.name})`}
              </span>
              {searchQuery && (
                <span className="order-search-term">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>
          </div>

          {/* Orders List */}
          <div className="order-orders-section">
            {filteredOrders.length === 0 ? (
              <div className="order-empty-state">
                <div className="order-empty-icon">
                  <i className="order-icon-empty"></i>
                </div>
                <h3>No Orders Found</h3>
                <p>
                  {searchQuery 
                    ? `No items matching "${searchQuery}"`
                    : viewMode === "all" 
                      ? "No orders placed yet." 
                      : `No orders found for ${selectedDealer?.name}`
                  }
                </p>
                {searchQuery && (
                  <button 
                    className="order-btn-clear-search"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="order-orders-grid">
                {filteredOrders.map((order) => (
                  <div 
                    key={order._id} 
                    className={`order-order-card ${expandedOrder === order._id ? 'expanded' : ''}`}
                  >
                    <div 
                      className="order-order-header"
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <div className="order-order-info">
                        <div className="order-order-id">
                          <i className="order-icon-order"></i>
                          <span>Order #{order._id?.substring(0, 8)}...</span>
                          {viewMode === "all" && order.dealerId && (
                            <span className="order-dealer-badge-mini">
                              <i className="order-icon-dealer-small"></i>
                              {order.dealerId.name || "Dealer"}
                            </span>
                          )}
                        </div>
                        <div className="order-order-date">
                          <i className="order-icon-calendar"></i>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="order-order-summary">
                        <div className="order-summary-item">
                          <span className="order-summary-label">Items</span>
                          <span className="order-summary-value">{order.items.length}</span>
                        </div>
                        <div className="order-summary-item">
                          <span className="order-summary-label">Total</span>
                          <span className="order-summary-value order-amount">
                            ₹{order.totalAmount?.toFixed(2) || "0.00"}
                          </span>
                        </div>
                      </div>
                      <div className="order-order-toggle">
                        <i className={`order-icon-chevron ${expandedOrder === order._id ? 'up' : 'down'}`}></i>
                      </div>
                    </div>

                    {/* Expanded Order Details */}
                    {expandedOrder === order._id && (
                      <div className="order-order-details">
                        <div className="order-details-header">
                          <h4>Order Details</h4>
                          <div className="order-order-time">
                            <i className="order-icon-time"></i>
                            Placed: {new Date(order.createdAt).toLocaleTimeString()}
                            {viewMode === "all" && order.dealerId && (
                              <span className="order-dealer-info-mini">
                                | Dealer: {order.dealerId.name}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Items Table */}
                        <div className="order-items-table-container">
                          <table className="order-items-table">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th className="order-text-center">Quantity</th>
                                <th className="order-text-right">Unit Price</th>
                                <th className="order-text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="order-product-cell">
                                      <span className="order-product-name">{item.name}</span>
                                    </div>
                                  </td>
                                  <td className="order-text-center">
                                    <span className="order-quantity-badge">{item.qty}</span>
                                  </td>
                                  <td className="order-text-right">
                                    ₹{item.price.toFixed(2)}
                                  </td>
                                  <td className="order-text-right order-amount">
                                    ₹{(item.qty * item.price).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="3" className="order-text-right order-total-label">
                                  Grand Total
                                </td>
                                <td className="order-text-right order-total-amount">
                                  ₹{order.items.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2)}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        {/* Order Footer with Actions */}
                        <div className="order-order-footer">
                          <div className="order-footer-actions">
                            {/* <button className="order-btn-action">
                              <i className="order-icon-print"></i> Print Invoice
                            </button> */}
                            {/* <button className="order-btn-action">
                              <i className="order-icon-download"></i> Download
                            </button> */}
                            {/* <button className="order-btn-action">
                              <i className="order-icon-share"></i> Share
                            </button> */}
                            <button 
                              className="order-btn-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteOrder(order._id);
                              }}
                              disabled={deletingOrder === order._id}
                            >
                              {deletingOrder === order._id ? (
                                <>
                                  <i className="order-icon-spinner"></i> Deleting...
                                </>
                              ) : (
                                <>
                                  <i className="order-icon-delete"></i> Delete Order
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrdersDashboard;