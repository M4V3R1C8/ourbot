module.exports = {
  name: "setclock",
  aliases: [ "" ],
  description: "Setup a server clock for your discord.",
  usage: "TZ database name from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",
  run: async ( bot, message, args, db ) => {
    if(args[0]){
      var timezone = args[0];
      db.collection('guilds').doc(message.guild.id).update({
        'timezone' : timezone,
      });
    }
    var id = message.guild.id;
    require( '../../handlers/clock' )(bot,db,id,600000);
  }
}