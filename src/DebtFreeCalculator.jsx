import React from "react";
import PaymentsRemaining from "./PaymentsRemaining";
import MakePayment from "./MakePayment";

class DebtFreeCalculator extends React.Component {
    constructor(){
        super();
        this.state = {
            principal: '',
            interest: '',
            interestRate: 0,
            interestAmount: 0,
            principalAmount: 0,
            minimumPayment: 0,
         }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const interestDecimal = Number(this.state.interest)/100;
        const interestDue = ((interestDecimal/12) * this.state.principal).toFixed(2);

        this.setState({
            interestRate : interestDecimal,
            interestAmount : Number(interestDue),
            principalAmount : (this.state.principal) * .01,
            principal : Number(this.state.principal)
            
        }, () => {
            const payment = (this.state.interestAmount + this.state.principalAmount);
            this.setState({
                minimumPayment : Number(payment.toFixed(2)),
            })
        });
    }

    handleChange = (e) => {
        const value = e.target.value;
        const name  = e.target.name;
        this.setState( { [name]: value });
    }


    handleDataFromChild = (newPrincipal, updatedMinPayment) => {
        this.setState({
            principal: newPrincipal.toFixed(2),
            minimumPayment: updatedMinPayment,
        })
    }

    render(){
        const {principal, interest, minimumPayment} = this.state;
        return(
            <div className="calc-body">
                <div className="top-container">
                    <form className="card" onSubmit={this.handleSubmit}>
                        <label htmlFor="principal"> Total Debt</label>
                        <br />
                        <input
                            name="principal"
                            onChange={this.handleChange} 
                            type="number"
                            value={principal}
                        />
                        <br />
                        <label htmlFor="interest">Interest Rate</label>
                        <br />
                        <input 
                            name="interest"
                            onChange={this.handleChange}
                            type="number"
                            value={interest}
                        />
                        <br />
                        <input type="submit" />
                    </form>
                    <PaymentsRemaining principal={principal} minimumPayment={minimumPayment} />
                </div>
                    <MakePayment data={this.state} sendPrincipalToParent={this.handleDataFromChild} />
            </div>
        )
    }
}

export default DebtFreeCalculator;