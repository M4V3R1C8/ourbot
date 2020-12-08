const moment = require('moment-timezone');
module.exports=(bot,db)=>{
  bot.guilds.cache.forEach((g) => {
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
      clock(clockID, timezone);
    }
    if ( memCountID !== null ) {
      members(memCountID, guildMemberCount);
    }
  });
}

async function clock (clockID, timezone) {
  const timeNow = moment(new Date().getTime()).tz(timezone).format('hh:mm A (z)');
  const clockChannel = bot.channels.cache.get(clockID);

  clockChannel.edit({ name: `${timeNow}` }, 'Clock update').catch(console.error);
  setInterval( () => {
    const timeNowUpdate = moment(new Date().getTime()).tz(timezone).format('hh:mm A (z)');
    console.log(timeNowUpdate);
    clockChannel.edit({ name: `${timeNowUpdate}` }, 'Clock update')
      .catch(console.error);
  }, 60000);
}
async function members(memCountID, guildMemberCount) {
  const memChannelID = bot.channels.cache.get(memCountID);
  memChannelID.edit({ name: `${guildMemberCount}` }, 'Member update').catch(console.error);
}