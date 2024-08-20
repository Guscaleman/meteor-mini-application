import { Meteor } from 'meteor/meteor';
import { People } from '../people/people';

Meteor.methods({
  async 'people.checkIn'(personId) {
    try {
      await People.updateAsync(personId, {
        $set: {
          checkInDate: new Date(),
          checkOutDate: null,
          showCheckOutButton: false,
        },
      });

      setTimeout(async () => {
        await People.updateAsync(personId, {
          $set: {
            showCheckOutButton: true,
          },
        });
      }, 5000);
    } catch (error) {
      throw new Meteor.Error(
        '500',
        `Error checking in person: ${error.message}`
      );
    }
  },

  async 'people.checkOut'(personId) {
    try {
      await People.updateAsync(personId, {
        $set: {
          checkOutDate: new Date(),
          showCheckOutButton: false,
        },
      });
    } catch (error) {
      throw new Meteor.Error(
        '500',
        `Error checking out person: ${error.message}`
      );
    }
  },
});
