import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './Collapsible.css';

const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
};

const alchemy = new Alchemy(config);

function LastBlockDetails() {
  const [blockInfo, setBlockInfo] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getBlockInfo() {
      const block = await alchemy.core.getBlock("latest");
      const blockObject = {
          blockNumber: block.number,
          blockHash: block.hash,
          blockTimestamp: block.timestamp,
          blockTransactions: block.transactions
      }
      setBlockInfo(blockObject)
    }
    getBlockInfo();
  }, []);

  if (!blockInfo) {
    return <div>Loading...</div>;
  }

  return (
   <Collapsible
      title="Ethereum Blockchain 'Last' Info"
      isOpen={isOpen}
      toggleOpen={() => setIsOpen(!isOpen)}>
      <div><strong>Last Block: </strong>{blockInfo.blockNumber}</div>
      <div><strong>Block Hash: </strong>{blockInfo.blockHash}</div>
      <div><strong>Block Timestamp: </strong>{blockInfo.blockTimestamp}</div>
      <ul>
        <div><strong>Block Transactions:</strong></div>
        {blockInfo.blockTransactions.map(tx => (
          <ul key={tx}>{tx}</ul>
        ))}
      </ul>
    </Collapsible>
  );
}

function Collapsible({ title, children, isOpen, toggleOpen }) {
  return (
    <div className="Collapsible">
      <div className="Collapsible-header" onClick={toggleOpen}>
        <h2>{title}</h2>
        <div>{isOpen ? '-' : '+'}</div>
      </div>
      {isOpen && (
        <div className="Collapsible-content">{children}</div>
      )}
    </div>
  );
}

export default LastBlockDetails;