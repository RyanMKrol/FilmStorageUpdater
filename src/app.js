// app.js
import schedule from 'node-schedule'

schedule.scheduleJob('* * * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
