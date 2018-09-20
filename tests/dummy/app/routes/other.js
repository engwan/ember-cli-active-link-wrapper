import { later } from '@ember/runloop';
import { Promise } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({

  // add a very slight delay so that we can test the
  // transitioningIn/Out classes.
  model() {
    return new Promise((resolve) => {
      later(() => {
        resolve();
      }, 10);
    });
  }

});
