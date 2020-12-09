module.exports=(bot,db)=>{
  bot.guilds.cache.forEach((g) => {
    let clockID = null, 
        timezone = "",
        memCountID = null, 
        guildMemberCount = 1;
    db.collection('guilds').doc(g.id).get().then((q) => {
      clockID = q.data().clockID;
      timezone = q.data().timezone;
      memcountID = q.data().memCountID;
      guildMemberCount = q.data().guildMemberCount;
    });
    if ( clockID !== null ) {
      var id = g.id;
      require( '../../handlers/clock' )(bot,db,id,300000);
    }
    if ( memCountID !== null ) {
      members(memCountID, guildMemberCount);
    }
  });
}

async function members(memCountID, guildMemberCount) {
  const memChannelID = bot.channels.cache.get(memCountID);
  memChannelID.edit({ name: `${guildMemberCount}` }, 'Member update').catch(console.error);
}