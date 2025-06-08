import { Queue } from 'bullmq';

const connection = {
    host: 'paybank-redis',
    port: 6379
    //password (optional)
}
const queueName = 'twoFactorQueue';

const queue = new Queue(queueName, connection);

export const getJob = async () => {
    const jobs = await queue.getJobs(); //Search all jobs
    return jobs[0].data.code;
}

export const cleanJobs = async () => {
    await  queue.obliterate()
}