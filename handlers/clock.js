const moment = require('moment');
const tz = require('moment-timezone');
module.exports = (bot,db,id,i) => {
  let clockInterval = setInterval(() => {
    db.collection('guilds').doc(id).get().then((q) => {
      if(q.exists) {
        clockID = q.data().clockID;
        timezone = q.data().timezone;
      }
    }).then( async () => {
      if(clockID === null || clockID === undefined || clockID === '') {
        bot.guilds.cache.get(id).channels.create('Server Clock (DO NOT TOUCH)', {
          type: 'voice',
        }).then((channel) => {
          clockID = channel.id;
        });
      }
      if(timezone === undefined || timezone === '') {
        timezone = 'America/New_York';
      }
      const timeNow = moment().tz(timezone).format('hh:mm A (z)');
      const oldchannel = bot.channels.cache.get(clockID);
      const server = oldchannel.guild;

      server.channels.create(timeNow, {
        type: 'voice',
      }).then((channel) => {
        db.collection('guilds').doc(server.id).update({
          'clockID': channel.id,
        });
        oldchannel.delete();
      });
    });
  }, i);
}