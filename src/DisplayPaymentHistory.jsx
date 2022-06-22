import React from "react";

const DisplayPaymentHistory = ({ payments }) => {
    return (
        <div className="card">
            <h2>Payment History</h2>
             <ul>
                 <li>
                     <span>Payment Amount</span>
                     <span>Interest</span>
                     <span>Principal Paid</span>
                     <span>Remaining Principal</span>
                 </li>
             {payments.map((payment) => (
                 <li className="payment" key={payment.id}>
                     <span>${payment.amount}</span>
                     <span>${payment.interestPaid}</span>
                     <span>${payment.principalPaid}</span>
                     <span>${payment.updatedPrincipal}</span>
                 </li>
                  ))}
             </ul>
        </div>
     )
}

export default DisplayPaymentHistory;