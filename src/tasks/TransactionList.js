import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './Collapsible.css';

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Replace with your API key
  network: Network.ETH_MAINNET, // Replace with your network
};

const alchemy = new Alchemy(config);

function TransactionList() {
    const [transactionsList, setTransactionsList] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [blHash, setBlHash] = useState('');
  
    useEffect(() => {
      async function getTransactionList() {
        if (blHash) {
          const block = await alchemy.core.getBlockWithTransactions(blHash);
          setTransactionsList(block.transactions);
        } else {
          setTransactionsList(undefined);
        }
      }
      getTransactionList();
    }, [blHash]);
  
    const renderTransaction = (transaction) => {
      return (
        <div key={transaction.transactionHash}>
          <h3>Transaction {transaction.transactionIndex}</h3>
          <p>Block Hash: {transaction.blockHash}</p>
          <p>Gas used: {transaction.gasPrice._hex}</p>
          <p>From: {transaction.from}</p>
          <p>To: {transaction.to}</p>
        </div>
      )
    }
  
    return (
      <Collapsible
        title="Search a Transactions Info for a Block"
        isOpen={isOpen}
        toggleOpen={() => setIsOpen(!isOpen)}
      >
        <div className="input-container">
          <label htmlFor="blHash">Enter the Block Hash: </label>
          <input
            type="text"
            id="blHash"
            name="blHash"
            value={blHash}
            onChange={(e) => setBlHash(e.target.value)}
          />
        </div>
        {isOpen && !transactionsList && <div>Loading...</div>}
        {isOpen && transactionsList && (
          <div className="Collapsible-content">
            { transactionsList.map(transaction => renderTransaction(transaction)) }
          </div>
        )}
      </Collapsible>
    );
  }

function Collapsible({ title, children, isOpen, toggleOpen }) {
  return (
    <div className="Collapsible">
      <div className="Collapsible-header" onClick={toggleOpen}>
        <h2>{title}</h2>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && children}
    </div>
  );
}

export default TransactionList;