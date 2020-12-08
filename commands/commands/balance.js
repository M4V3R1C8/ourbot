const Discord = require( 'discord.js' );
const ms = require('ms');
module.exports = {
  name: "balance",
  aliases: [ "bal" ],
  description: "Returns the balance for the mentioned user.",
  usage: "(user)",
  run: async ( bot, message, args, db ) => {
    let currency = "shiny"
    let uID = null;
    let uTag = '';
    db.collection('guilds').doc(message.guild.id).get().then((q) => {
      currency = q.data().currency;
    }).then( async () => {
      if ( args[0] ) {
        uID = getUserFromMention(args[0]);
        uTag = getUserFromMention(args[0]);
      } else {
        uID = message.author.id;
        uTag = message.author.username;
      }
      db.collection('users').doc(message.guild.id).collection(uID).doc(uID).get().then((c) => {
        if(c.exists) {
          let bal = c.data().amount || 0;
          const Embed = new Discord.MessageEmbed()
            .setTitle( `Balance Inquiry:` )
            .setThumbnail( 'https://icon-library.com/images/img_458193.png' )
            .addField( `${uTag} has ${bal} ${currency}!`, `${currency} is updated when you change/leave voice channels`)
            .setColor( `0x46789d` )
            .setFooter( `You earn ${currency} while being active in voice channels` );
          message.channel.send({embed: Embed});
          db.collection('users').doc(message.guild.id).collection(uID).doc(uID).update({
            amount: bal,
            timeStamp: Date.now()
          });
        } else {
          const Embed = new Discord.MessageEmbed()
            .setTitle( `Balance Inquiry:` )
            .setThumbnail( 'https://icon-library.com/images/img_458193.png' )
            .addField( `<@${uID}> has 0 ${currency}!`, `${currency} is updated when you change/leave voice channels`)
            .setColor( `0x46789d` )
            .setFooter( `You earn ${currency} while being active in voice channels` );
          message.channel.send({embed: Embed});
        }
      });
    });
  }
} 

function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}