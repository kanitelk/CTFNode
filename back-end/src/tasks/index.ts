import cron from "node-cron";

const testTask = () => {
  console.log(Date.now(), ' ***');
  
}

const tasks = () => {
  // every 5 seconds
  // const test = cron.schedule('*/5 * * * * *', testTask)
  // test.start()
  
  // updateStorageTask.start();
};

export default tasks