const Discord = require('discord.js');
module.exports = {
  name: 'editcurrency',
  aliases: [ 'editshiny', 'editglimmer', 'editmunny', 'addshiny', 'removeshiny' ],
  description: 'Edit currency for the mentioned user',
  usage: '(@user) <+/-amount>', 
  run: async ( bot, message, args, db ) => {
    if ( !message.member.hasPermission( "ADMINISTRATOR" ) ) return message.reply( "You can't do that..." ).then( m => m.delete( 5000 ) );
    db.collection('guilds').doc(message.guild.id).get().then((q) => {
      prefix = q.data().prefix;
      currency = q.data().currency.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,function(c){return c.toUpperCase()});;
    }).then( async () => {
      var uTag = message.author.username;
      var mID = message.mentions.users.first().id;
      var value = parseInt(args[1]);
      db.collection('users').doc(message.guild.id).collection(mID).doc(mID).get().then((c) => {
        if (c.exists) {
          let bal = c.data().amount || 0;
          let earnings = bal + value;
          const Embed = new Discord.MessageEmbed()
            .setTitle( `${currency} Update:` )
            .setThumbnail( 'https://icon-library.com/images/img_458193.png' )
            .setColor( `0x46789d` );
          if ((bal + value) < 0) {
            earnings = 0;
            Embed.setDescription(`${uTag} removed <@${mID}>'s ${currency} \nI hope it was worth it...`)
            Embed.setFooter( `Total: ${earnings} ${currency}` );
          }
          if (earnings < bal) {
            Embed.setDescription(`${uTag} took ${value} away from <@${mID}>'s total ${currency}`)
            Embed.setFooter( `Total: ${earnings} ${currency}` );
          } else {
            Embed.setDescription(`${uTag} added ${value} to <@${mID}>'s total ${currency}`)
            Embed.setFooter( `Total: ${earnings} ${currency}` );
          }
          db.collection('users').doc(message.guild.id).collection(mID).doc(mID).update({
            'amount': earnings,
          });
          message.channel.send(Embed)
        } else {
          message.channel.send(`This user must be active in a voice channel before you can add ${currency}`)
        }
      });
    });
  }
}