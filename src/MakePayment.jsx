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
        this.setState({ payment: value}) 
    }

    createNewPayment = () => {
        const { payment } = this.state;
        const {interestRate, principal} = this.props.data;
        const interest = (principal * (interestRate / 12)).toFixed(2);
        const principalPaid = (payment - interest);
        const updatedPrincipal = (principal - principalPaid);
        return  {
            id: Date.now(),
            interestPaid: interest,
            principalPaid: principalPaid.toFixed(2),
            amount: payment,
            updatedPrincipal: updatedPrincipal.toFixed(2),
        }
    }

    updateNewPaymentState = () => {
        const { payment } = this.state;
        const {interestRate, principal} = this.props.data;
        const { sendPrincipalToParent } = this.props;
        const interest = (principal * (interestRate / 12)).toFixed(2);
        const principalPaid = (payment - interest);
        const updatedPrincipal = (principal - principalPaid);
        const principalToBePaid = (updatedPrincipal * .01).toFixed(2);
        const updatedMinPayment = (Number(principalToBePaid) + Number(interest)).toFixed(2);
        if(updatedPrincipal < 0) {
            console.log('update state', (updatedPrincipal * -1));
            const ovrPayment = (updatedPrincipal * -1);
            this.setState((prevState) => ({
                payments: [...prevState.payments, this.createNewPayment()],
                payment: '',
                interestToBePaid: 0,
                principalToBePaid: 0,
                updatedMinPayment: 0,
                isMinPayment: true,
                overPayment: ovrPayment,

            }))
            sendPrincipalToParent(0, 0)
        } else {
            this.setState((prevState) => ({
                payments: [...prevState.payments, this.createNewPayment()],
                payment: '',
                interestToBePaid: interest,
                principalToBePaid: principalToBePaid,
                updatedMinPayment: updatedMinPayment,
                isMinPayment: true,
            }))
            sendPrincipalToParent(updatedPrincipal, updatedMinPayment)
        }
    }

    submitPayment = (e) => {
        e.preventDefault();

        const { payment } = this.state;
        const { minimumPayment } = this.props.data;
        if(payment >= minimumPayment){
            this.updateNewPaymentState();
        } else {
            this.setState({
                payment: '',
                isMinPayment: false,
            })
        }
    }

    render(){
        const { principal, 
            minimumPayment, 
            interestAmount, 
            principalAmount
        } = this.props.data;

        const { 
            payment, 
            payments, 
            interestToBePaid, 
            principalToBePaid, 
            updatedMinPayment, 
            isMinPayment, 
            overPayment
         } = this.state;

        return(
            <div className="payment-container">
               <form 
                    className="card"
                    onSubmit={this.submitPayment}>
               <h2>{`Minimum Payment 
                    ${ ( (updatedMinPayment === 0) ) 
                    ? ((minimumPayment === 0) ? '' : minimumPayment)
                    : updatedMinPayment
                    }`}</h2>
                <p>{`Interest Amount 
                    ${ (interestToBePaid === 0 )
                    ? ((interestAmount === 0) ? '' : interestAmount) 
                    : interestToBePaid
                    }`}</p>
                <p>{`Principal Amount 
                    ${ (principalToBePaid === 0) 
                    ? ((principalAmount === 0) ? '' : principalAmount) 
                    : principalToBePaid
                    }`}</p>
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
                {overPayment && <div className="overpaid">Your debt is paid and you will be credited {overPayment.toFixed(2)}</div>}
                <input type="submit" />
               </form>
                    <DisplayPaymentHistory payments={payments} principal={principal} />
            </div>
            
        )
    }
}

export default MakePayment;