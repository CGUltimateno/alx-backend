import kue from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  before(() => {
    kue.app.listen(4000);
    kue.app.set('title', 'Kue');
  });

  after(() => {
    kue.app.close();
  });

  it('createPushNotificationsJobs', (done) => {
    const queue = kue.createQueue();
    createPushNotificationsJobs(2, queue);
    queue.inactiveCount((err, total) => {
      expect(total).to.equal(2);
      done();
    });
  });
});
