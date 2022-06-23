import './App.css';
import DebtFreeCalculator from './DebtFreeCalculator';
import money from './assets/money-mountain.jpeg';

function App() {
  return (
    <div className="App">
      <h1>Debt Free Calculator</h1>
        <DebtFreeCalculator />
        <div className='money-container'>
          <img className='money' src={money} alt={'moneyMountain'} />
      </div>
    </div>
  );
}

export default App;
