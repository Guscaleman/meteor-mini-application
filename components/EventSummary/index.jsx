import React, { useContext } from 'react';
import { PeopleContext } from '../../providers';

export const EventSummary = () => {
  const { checkedInCount, notCheckedInCount, companyCheckInCount } =
    useContext(PeopleContext);

  const formattedCompanyCheckIn = Object.entries(companyCheckInCount)
    .map(([company, count]) => `${company} (${count})`)
    .join(', ');

  return (
    <div className="event-summary">
      <h3>Event Summary</h3>
      <p>People in the event right now: {checkedInCount}</p>
      <p>People by company in the event right now: {formattedCompanyCheckIn}</p>
      <p>People not checked in: {notCheckedInCount}</p>
    </div>
  );
};
