const Discord = require( 'discord.js' );
module.exports = {
  name: "getcommand",
  aliases: [ "getcoms" ],
  description: "Obtain all custom text replies for your server.",
  usage: "",
  run: async ( bot, message, args, db ) => {
    db.collection('guilds').doc(message.guild.id).collection('custom').doc('commands').get().then((q) => {
      if(q.exists) {
        var qResult0 = JSON.stringify(q.data());
        var qResult1 = qResult0.split('":"').join(': ');
        var qResult2 = qResult1.split('","').join('\n');
        var qResult = qResult2.replace('{"','').replace('"}');
        console.log(qResult);
        const Embed = new Discord.MessageEmbed()
          .setTitle( `Custom Commands:` )
          .setThumbnail( 'https://i.imgur.com/7T91kCB.png' )
          .setColor( `0x46789d` )
          .addField( `\u200b`, `${qResult}`);
        message.channel.send( Embed );
      }
    });
  }
}