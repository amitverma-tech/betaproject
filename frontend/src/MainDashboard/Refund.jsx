// // Refund.jsx
// import React from "react";
// import "./Refund.css";

// function Refund() {
//   return (
//     <div className="refund-wrap">
//       <div className="refund-card">
//         <header className="refund-header">
//           <h1 className="refund-title">Refund Policy</h1>
//         </header>

//         <section className="refund-section">
//           <h2 className="refund-subtitle">Refunds Available When:</h2>
//           <ul className="refund-list">
//             <li>Product is damaged/defective (report within 48 hours)</li>
//             <li>Wrong product delivered</li>
//             <li>Order cannot be fulfilled due to stock issues</li>
//             <li>Booked service unavailable due to unforeseen issues (refund/reschedule)</li>
//           </ul>
//         </section>

//         <section className="refund-section">
//           <h2 className="refund-subtitle">Non-Refundable:</h2>
//           <ul className="refund-list">
//             <li>Used/opened products</li>
//             <li>Digital services already delivered</li>
//             <li>Custom or bulk processed orders</li>
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Refund;


// Refund.jsx
import React from "react";
import "./Refund.css";

function Refund() {
  return (
    <div className="refund-refund-wrap">
      <div className="refund-refund-card">
        <header className="refund-refund-header">
          <h1 className="refund-refund-title">Refund Policy</h1>
        </header>

        <section className="refund-refund-section">
          <h2 className="refund-refund-subtitle">Refunds Available When:</h2>
          <ul className="refund-refund-list">
            <li>Product is damaged/defective (report within 48 hours)</li>
            <li>Wrong product delivered</li>
            <li>Order cannot be fulfilled due to stock issues</li>
            <li>Booked service unavailable due to unforeseen issues (refund/reschedule)</li>
          </ul>
        </section>

        <section className="refund-refund-section">
          <h2 className="refund-refund-subtitle">Non-Refundable:</h2>
          <ul className="refund-refund-list">
            <li>Used/opened products</li>
            <li>Digital services already delivered</li>
            <li>Custom or bulk processed orders</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Refund;