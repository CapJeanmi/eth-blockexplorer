import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './Collapsible.css';

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Replace with your API key
  network: Network.ETH_MAINNET, // Replace with your network
};

const alchemy = new Alchemy(config);

function TransactionDetails() {
    const [transactionDetails, setTransactionDetails] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [txHash, setTxHash] = useState('');
  
    useEffect(() => {
      async function getTransactionDetail() {
        if (txHash) {
          const transaction = await alchemy.core.getTransactionReceipt(txHash);
          console.log(transaction);
          setTransactionDetails(transaction);
        } else {
          setTransactionDetails(undefined);
        }
      }
      getTransactionDetail();
    }, [txHash]);
  
    return (
      <Collapsible
        title="Search Full Transaction Details"
        isOpen={isOpen}
        toggleOpen={() => setIsOpen(!isOpen)}
      >
        <div className="input-container">
          <label htmlFor="txHash">Enter the Transaction Hash: </label>
          <input
            type="text"
            id="txHash"
            name="txHash"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
          />
        </div>
        {isOpen && !transactionDetails && <div>Loading...</div>}
        {isOpen && transactionDetails && (
          <div className="Collapsible-content">
             <div>
                <h3>Transaction Details</h3>
                <p>Transaction Hash: {transactionDetails.transactionHash}</p>
                <p>Block Number: {transactionDetails.blockNumber}</p>
                <p>Confirmations: {transactionDetails.confirmations}</p>
                <p>Gas used: {transactionDetails.gasUsed._hex}</p>
                <p>From: {transactionDetails.from}</p>
                <p>To: {transactionDetails.to}</p>
            </div>
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

export default TransactionDetails;