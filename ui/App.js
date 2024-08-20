import '../client/main';
import React from 'react';
import { EventSelector } from '../components/EventSelector/index.jsx';
import { MembersList } from '../components/MembersList/index.jsx';
import { EventSummary } from '../components/EventSummary/index.jsx';
import { EventProvider, PeopleProvider } from '../providers/index.jsx';

export const App = () => (
  <main className="my-app">
    <EventProvider>
      <EventSelector />
      <PeopleProvider>
        <EventSummary />
        <MembersList />
      </PeopleProvider>
    </EventProvider>
  </main>
);
