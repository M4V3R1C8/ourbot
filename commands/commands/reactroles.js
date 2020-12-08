const Discord = require( 'discord.js' );
const FieldValue = require( 'firebase-admin' ).firestore.FieldValue;
module.exports = {
  name: "reactroles",
  aliases: [ "" ],
  description: "Obtain all reaction roles for the channel.",
  run: async ( bot, message, args, db ) => {
    db.collection('roles').doc(message.guild.id).get().then((q) => {
      if(q.exists) {
        const Embed = new Discord.MessageEmbed()
          .setTitle( `Reaction roles:` )
          .setThumbnail( 'https://i.imgur.com/7T91kCB.png' )
          .addField(`\u200b`,`Channel: <#${message.channel.id}>, ID: ${message.channel.id}`)
          .setColor( `0x46789d` );
        var count = 0;
        for(var i = 0; i < q.data().role_id.length; i++){
          var roleInfo = q.data().role_id[i].split(" - "),
              channelID = roleInfo[0],
              emoji = roleInfo[1],
              role = roleInfo[2];            
          if(channelID === message.channel.id) {
            count++;
            Embed.addField( `\u200b`, `${count}: ${emoji} = ${role}`);
          }
        }
        message.channel.send( Embed );
      }
    });
  }
};