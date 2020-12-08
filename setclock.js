const { MessageEmbed } = require( "discord.js" );
const moment = require('moment-timezone');
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
        const clockChannel = bot.channels.cache.get(clockID);

        clockChannel.edit({ name: `${timeNow}` }, 'Clock update').catch(console.error);
        setInterval( () => {
          const timeNowUpdate = moment().tz(timezone).format('hh:mm A (z)');
          clockChannel.edit({ name: `${timeNowUpdate}` }, 'Clock update')
            .catch(console.error);
        }, 60000);
      });
    });
  }
}