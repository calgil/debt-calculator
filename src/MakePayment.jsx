import React from "react";
import DisplayPaymentHistory from "./DisplayPaymentHistory";


class MakePayment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            payment: '',
            payments: [],
            interestToBePaid: 0,
            principalToBePaid: 0,
            updatedMinPayment: 0,
            isMinPayment: true,
        }
    }

    newPayment = (e) => {
        const value = Number(e.target.value);
        this.setState({ payment : value}) 
    //     if (value <= this.state.minimumPayment){
    //         this.setState({isMinPayment: false})
    //     } else {
    //         this.setState({isMinPayment: true})
    //     }
    }

    submitPayment = (e) => {
        e.preventDefault();

        const { payment } = this.state;
        const {interestRate, minimumPayment, principal} = this.props.data;
        if(payment >= minimumPayment){
            const interest = (principal * (interestRate / 12)).toFixed(2);
            const principalPaid = (payment - interest);
            const updatedPrincipal = (principal - principalPaid);
            const principalToBePaid = (updatedPrincipal * .01).toFixed(2);
            const updatedMinPayment = (Number(principalToBePaid) + Number(interest)).toFixed(2);
            const newPayment = {
                id: Date.now(),
                interestPaid: interest,
                principalPaid: principalPaid.toFixed(2),
                amount: payment,
                updatedPrincipal: updatedPrincipal.toFixed(2),
            }
                this.setState((prevState) => ({
                    payments: [...prevState.payments, newPayment],
                    payment: '',
                    interestToBePaid: interest,
                    principalToBePaid: principalToBePaid,
                    updatedMinPayment: updatedMinPayment,
                    isMinPayment: true,
                }))
                this.props.sendPrincipalToParent(updatedPrincipal, updatedMinPayment);
        } else {
            this.setState({
                payment: '',
                isMinPayment: false,
            })
        }
    }

    render(){
        console.log(this.state.isMinPayment);
        const { principal, minimumPayment, interestAmount, principalAmount} = this.props.data;
        const { payment, payments, interestToBePaid, principalToBePaid, updatedMinPayment, isMinPayment } = this.state;
        return(
            <div className="payment-container">
               <form 
                    className="card"
                    onSubmit={this.submitPayment}>
               <h2>{`Minimum Payment ${ updatedMinPayment === 0 ? minimumPayment : updatedMinPayment}`}</h2>
                <p>{`Interest Amount ${interestToBePaid === 0 ? interestAmount : interestToBePaid}`}</p>
                <p>{`Principal Amount ${principalToBePaid === 0 ? principalAmount : principalToBePaid}`}</p>
                <label htmlFor="make-payment">Make a Payment</label>
                <br />
                <input
                    onChange={this.newPayment}
                    name="payment" 
                    type="number" 
                    value={payment}
                />
                <br />
                {!isMinPayment && <div className="error">Payment must equal minimum payment</div> }
                <input type="submit" />
               </form>
                    <DisplayPaymentHistory payments={payments} principal={principal} />
            </div>
            
        )
    }
}

export default MakePayment;