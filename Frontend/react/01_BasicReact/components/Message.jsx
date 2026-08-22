import React from 'react';

const Message = ({ userName = 'Tom', textColor, age = 0, details, voted }) => {
  const nameStyle = { color: textColor };
  const detailListItems =
    details &&
    Object.values(details).map((detail, index) => (
      <li key={index}>{detail}</li>
    )); //Since it is objected we convert into array using Object.values(details )
  const votedDetails =
    voted && voted.map((detail, idx) => <li key={idx}>{detail}</li>);
  return (
    <div>
      <h2 style={nameStyle}>Hello, {userName}!</h2>
      <h2>You are {age} years old!</h2>
      {age > 18 ? (
        <div>
          <p>You are eligible to vote now!</p>
          <h3>Your's Voter Details</h3>
          <ul>{detailListItems}</ul>
          <h3>Voting History</h3>
          <ol>{votedDetails}</ol>
        </div>
      ) : (
        <p>You are not eligible to vote now!</p>
      )}
    </div>
  );
};
export default Message;
