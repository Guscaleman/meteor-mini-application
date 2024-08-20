import React, { useContext } from 'react';
import { EventContext } from '../../providers';

export const EventSelector = () => {
  const { selectedCommunity, communities, isLoading, handleSelector } =
    useContext(EventContext);

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="events">
      <select
        className="events-selector"
        value={selectedCommunity}
        onChange={handleSelector}
      >
        <option value={selectedCommunity}>Select an event:</option>
        {communities.map((community) => (
          <option key={community._id} value={community._id}>
            {community.name}
          </option>
        ))}
      </select>
    </div>
  );
};
