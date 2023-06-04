import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './Collapsible.css';

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Replace with your API key
  network: Network.ETH_MAINNET, // Replace with your network
};

const alchemy = new Alchemy(config);

function AddressBalance() {
    const [balance, setBalance] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [addr, setAddr] = useState('');
  
    useEffect(() => {
      async function getBalance() {
        if (addr) {
          const balanceAddr = await alchemy.core.getBalance(addr);
          console.log(balanceAddr);
          setBalance(balanceAddr);
        } else {
          setBalance(undefined);
        }
      }
      getBalance();
    }, [addr]);
  
    return (
      <Collapsible
        title="Search Balance of an Address"
        isOpen={isOpen}
        toggleOpen={() => setIsOpen(!isOpen)}
      >
        <div className="input-container">
          <label htmlFor="addr">Enter the Address: </label>
          <input
            type="text"
            id="addr"
            name="addr"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
          />
        </div>
        {isOpen && !balance && <div>Loading...</div>}
        {isOpen && balance && (
          <div className="Collapsible-content">
             <div>
                <h3>Balance of the Wallet</h3>
                <p>Amount: {Utils.formatEther(balance._hex)} ETH</p>
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

export default AddressBalance;