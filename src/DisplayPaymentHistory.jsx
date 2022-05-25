import React from "react";


// I want to take the array from MakePayment show the payment #, amount, interestPaid, principalPaid, and remaining balance

class DisplayPaymentHistory extends React.Component{
    render(){
        const { payments } = this.props;
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
}

export default DisplayPaymentHistory;