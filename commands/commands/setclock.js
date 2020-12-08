const moment = require('moment');
const tz = require('moment-timezone');
module.exports = {
  name: "setclock",
  aliases: [ "" ],
  description: "Setup a server clock for your discord.",
  usage: "<# tz database name>",
  run: async ( bot, message, args, db ) => {
    db.collection('guilds').doc(message.guild.id).get().then((q) => {
      if(q.exists) {
        prefix = q.data().prefix;
      }
    }).then( async () => {
      let clockID = args[0];
      let timezone = args[1];
      db.collection('guilds').doc(message.guild.id).update({
        'clockID' : clockID,
        'timezone' : timezone
      }).then( async () => {
        const timeNow = moment().tz(timezone).format('hh:mm A (z)');
        const clockChannel = bot.channels.cache.get(`${clockID}`);
        clockChannel.setName(`${timeNow}`).catch(console.error);
        interval(clockChannel);
        async function interval (clockChannel) {
          const timeNowUpdate = moment().tz(timezone).format('hh:mm A (z)');
          clockChannel.setName(`${timeNowUpdate}`).catch(console.error);
          setInterval( interval(clockChannel), 60000);
        }
      });
    });
  }
}