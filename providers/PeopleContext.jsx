import React, { createContext, useContext, useEffect, useState } from 'react';
import { People } from '../people/people';
import { Tracker } from 'meteor/tracker';
import { EventContext } from './index';

export const PeopleContext = createContext({});

export const PeopleProvider = ({ children }) => {
  const { selectedCommunity } = useContext(EventContext);
  const [people, setPeople] = useState([]);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [companyCheckInCount, setCompanyCheckInCount] = useState({});
  const [notCheckedInCount, setNotCheckedInCount] = useState(0);

  useEffect(() => {
    const subscription = Meteor.subscribe('people', selectedCommunity);

    Tracker.autorun(() => {
      if (subscription.ready()) {
        const peopleData = People.find().fetch();

        setPeople(peopleData);

        const checkedInPeople = peopleData.filter(
          (person) => person.checkInDate && !person.checkOutDate
        );
        const notCheckedInPeople = peopleData.filter(
          (person) => !person.showCheckOutButton
        );

        setCheckedInCount(checkedInPeople.length);

        const newCompanyCheckInCount = checkedInPeople.reduce((acc, person) => {
          const company = person.companyName || 'Unknown';
          acc[company] = (acc[company] || 0) + 1;
          return acc;
        }, {});

        setCompanyCheckInCount(newCompanyCheckInCount);
        setNotCheckedInCount(notCheckedInPeople.length);
      }
    });

    return () => {
      subscription.stop();
    };
  }, [selectedCommunity]);

  return (
    <PeopleContext.Provider
      value={{
        people,
        checkedInCount,
        companyCheckInCount,
        notCheckedInCount,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
