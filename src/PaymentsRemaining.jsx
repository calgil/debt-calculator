import React from "react";

class PaymentsRemaining extends React.Component {
    render() {
        const { principal, minimumPayment} = this.props;
        const paymentsRemaining = (principal/minimumPayment).toFixed(2);
        return (
            <div className="card">
                <h3>Payments Remaining</h3>
                <p>{`Minimum Payment ${minimumPayment}`}</p>
                <p>{`Payments Remaining ${isNaN(paymentsRemaining) ? '' : paymentsRemaining}`}</p>
            </div>
        )
    }
}

export default PaymentsRemaining;