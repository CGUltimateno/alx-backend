/**
 * sends the notification message
 *  to the user
 */
const sendNotification = (phoneNumber, message, job, done) => {
    job.progress(0, 100);
    if(blacklist.includes(phoneNumber))
        return (done(new Error(`Phone number ${phoneNumber} is blacklisted`)))

    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber} with message: ${message}`);
    job.progress(100, 100);
    done();
}

queue.process('push_notifications_code_2', 2, (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
