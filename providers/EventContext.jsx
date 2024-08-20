import React, { createContext, useEffect, useState } from 'react';
import { Communities } from '../communities/communities';
import { Tracker } from 'meteor/tracker';

export const EventContext = createContext({});

export const EventProvider = ({ children }) => {
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedInPeople, setCheckedInPeople] = useState({});

  useEffect(() => {
    const subscription = Meteor.subscribe('communities');

    Tracker.autorun(() => {
      if (subscription.ready()) {
        const communitiesData = Communities.find().fetch();
        setCommunities(communitiesData);
        setIsLoading(false);
      }
    });
  }, []);

  const handleSelector = (e) => {
    const eventId = e.target.value;
    setSelectedCommunity(eventId);
  };

  const handleCheckIn = (personId) => {
    Meteor.call('people.checkIn', personId, (error) => {
      if (error) {
        console.error('Check-in failed', error);
      } else {
        const checkInTime = new Date().getTime();
        setCheckedInPeople((prevState) => ({
          ...prevState,
          [personId]: {
            isCheckedIn: true,
            showCheckOutButton: false,
            checkInTime,
          },
        }));
      }
    });
  };

  const handleCheckOut = (personId) => {
    Meteor.call('people.checkOut', personId, (error) => {
      if (error) {
        console.error('Check-out failed', error);
      } else {
        setCheckedInPeople((prevState) => ({
          ...prevState,
          [personId]: {
            isCheckedIn: false,
            showCheckOutButton: false,
          },
        }));
      }
    });
  };

  return (
    <EventContext.Provider
      value={{
        selectedCommunity,
        communities,
        isLoading,
        handleSelector,
        handleCheckIn,
        handleCheckOut,
        checkedInPeople,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
