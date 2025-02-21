import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostAuction() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const navigate = useNavigate();

  const handlePostAuction = (e) => {
    e.preventDefault();

    const newAuction = {
      id: Date.now(),
      itemName,
      description,
      startingBid: parseFloat(startingBid),
      currentBid: parseFloat(startingBid),
    };

    const auctions = JSON.parse(localStorage.getItem('auctions')) || [];
    auctions.push(newAuction);
    localStorage.setItem('auctions', JSON.stringify(auctions));

    alert('Auction posted successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <h2>Post New Auction</h2>
      <form onSubmit={handlePostAuction}>
        <input 
          type="text" 
          placeholder="Item Name" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          required 
        />
        
        <textarea 
          placeholder="Item Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        <input 
          type="number" 
          placeholder="Starting Bid" 
          value={startingBid} 
          onChange={(e) => setStartingBid(e.target.value)} 
          required 
        />

        <button type="submit">Post Auction</button>
      </form>
    </div>
  );
}

export default PostAuction;
