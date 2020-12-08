const moment = require('moment');
const tz = require('moment-timezone');
module.exports=(bot,db)=>{
  bot.guilds.forEach((g) => {
    let clockID = null, 
        timezone = "",
        memCountID = null, 
        memberCount = 1;
    db.collection('guilds').doc(g.id).get().then((q) => {
      clockID = q.data().clockID;
      timezone = q.data().timezone;
      memcountID = q.data().memCountID;
      guildMemberCount = q.data().guildMemberCount;
    });
    if ( clockID !== null ) {
      let interval = setInterval( clock(bot, clockID, timezone), 60000);
    }
    if ( memCountID !== null ) {
      members(memCountID, guildMemberCount);
    }
  });
}

async function clock (bot, clockID, timezone) {
  const timeNow = moment().tz(timezone).format('hh:mm A (z)');
  const clockChannel = bot.channels.cache.get(clockID);
  clockChannel.edit({ name: `${timeNow}` }, 'Clock update').catch(console.error);
}

async function members(memCountID, guildMemberCount) {
  const memChannelID = bot.channels.cache.get(memCountID);
  memChannelID.edit({ name: `${guildMemberCount}` }, 'Member update').catch(console.error);
}