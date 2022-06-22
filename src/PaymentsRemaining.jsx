import React from "react";


const PaymentsRemaining = ({ principal, minPayment }) => {
    const paymentsRemaining = (principal/minPayment).toFixed(2);
    return (
        <div className="card">
            <h3>Payments Remaining</h3>
            <p>{`Minimum Payment ${minPayment}`}</p>
            {(isFinite(paymentsRemaining)) &&
               <div>Payments Remaining: {Math.ceil(paymentsRemaining)}</div>
            }
        </div>
    )
}


export default PaymentsRemaining;