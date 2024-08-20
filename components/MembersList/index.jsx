import React, { useContext } from 'react';
import { EventContext, PeopleContext } from '../../providers';

export const MembersList = () => {
  const { selectedCommunity, communities, handleCheckIn, handleCheckOut } =
    useContext(EventContext);
  const { people } = useContext(PeopleContext);

  const selectedCommunityName = communities.find(
    (community) => community._id === selectedCommunity
  )?.name;

  return selectedCommunity ? (
    <div className="members-list">
      {selectedCommunityName && (
        <h1 style={{ marginBottom: '15px' }}>{selectedCommunityName}</h1>
      )}

      {people.map((person) => (
        <div key={person._id} style={{ marginBottom: '15px' }}>
          <p>
            Name: {person.firstName} {person.lastName}
          </p>
          <p>Company: {person.companyName}</p>
          <p>Title: {person.title}</p>
          <p>
            Check-in Date:{' '}
            {person.checkInDate
              ? person.checkInDate.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'N/A'}
          </p>
          <p>
            Check-out Date:{' '}
            {person.checkOutDate
              ? person.checkOutDate.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'N/A'}
          </p>

          <button
            className="checkin-button"
            onClick={() => handleCheckIn(person._id)}
            disabled={!!person.checkInDate && !person.checkOutDate}
          >
            {`Check-in ${person.firstName} ${person.lastName}`}
          </button>

          {person.showCheckOutButton && (
            <button
              className="checkout-button"
              onClick={() => handleCheckOut(person._id)}
            >
              {`Check-out ${person.firstName} ${person.lastName}`}
            </button>
          )}
        </div>
      ))}
    </div>
  ) : (
    <h1>Please select an event above...</h1>
  );
};
