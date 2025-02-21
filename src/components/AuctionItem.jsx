import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AuctionItem() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const auctions = JSON.parse(localStorage.getItem('auctions')) || [];
    const auctionItem = auctions.find((auction) => auction.id.toString() === id);
    setItem(auctionItem || {});
  }, [id]);

  const handleBid = () => {
    if (!item || !item.itemName) {
      setMessage('Auction item not found.');
      return;
    }

    if (bid === '' || isNaN(bid) || bid <= Number(item.currentBid)) {
      setMessage('Bid must be higher than the current bid.');
      return;
    }

    const username = prompt('Enter your username to place a bid:');
    if (!username) return;

    const updatedItem = { ...item, currentBid: bid, highestBidder: username };
    const auctions = JSON.parse(localStorage.getItem('auctions')) || [];
    const updatedAuctions = auctions.map((auction) =>
      auction.id.toString() === id ? updatedItem : auction
    );
    localStorage.setItem('auctions', JSON.stringify(updatedAuctions));

    setItem(updatedItem);
    setMessage(`Bid placed successfully! New highest bid: $${bid}`);
  };

  return (
    <div>
      {item.itemName ? (
        <>
          <h2>{item.itemName}</h2>
          <p>{item.description}</p>
          <p>Current Bid: ${item.currentBid}</p>
          <p>Highest Bidder: {item.highestBidder || 'No bids yet'}</p>
          <input type="number" value={bid} onChange={(e) => setBid(e.target.value)} placeholder="Enter your bid" />
          <button onClick={handleBid}>Place Bid</button>
          {message && <p className="message">{message}</p>}
        </>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default AuctionItem;

