const kue = require('kue');

const queue = kue.createQueue();

const sendNotication = (phoneNumber, message) => {
  console.log(`Sending notification to ${phoneNumber} with message: ${message}`);
};

queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotication(phoneNumber, message);
  done();
});