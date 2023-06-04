import LastBlockDetails from './tasks/LastBlockDetails';
import TransactionList from './tasks/TransactionList';
import TransactionDetails from './tasks/TransactionDetails';
import AddressBalance from './tasks/AddressBalance';

import './App.css';

function App() {

  return ( 
  <div className="App">
    <LastBlockDetails />
    <TransactionList />
    <TransactionDetails />
    <AddressBalance />

    <h1>Task by Jeanmi to Alchemy University</h1>
    <h4>Github: CapJeanmi</h4>
  </div> 
  );
}

export default App;
