const Discord = require('discord.js');
module.exports = {
  name: 'coinflip',
  description: 'Flip a coin, guess correctly to double your bets',
  usage: '<result> <bet>', 
  run: async ( bot, message, args, db ) => {
    db.collection('guilds').doc(message.guild.id).get().then((q) => {
      prefix = q.data().prefix;
      currency = q.data().currency;
    }).then( async () => {
      if(args.length < 2) return message.channel.send(`What's the point of playing if you're not going to bet?`)
      var wager = args[1];
      var bet0 = args[0];
      var bet1 = bet0.charAt(0).toLowerCase();
      if (bet1 !== 'h' && bet1 !== 't') return message.channel.send(`${prefix}coinflip <result> <bet>`)
      if (bet1 === 'h') {
        bet = 'heads';
      } else {
        bet = 'tails';
      }
      var uID = message.author.id;
      var uTag = message.author.username;
      db.collection('users').doc(message.guild.id).collection(uID).doc(uID).get().then((c) => {
        let bal = c.data().amount || 0;
        if (wager > bal) return message.channel.send(`Whoa there! You only have ${bal} ${currency}.`);
        const Embed = new Discord.MessageEmbed()
          .setTitle( `Here comes the coin toss!` )
          .setThumbnail( 'https://icon-library.com/images/img_458193.png' )
          .setDescription(`${uTag} bet ${wager} / ${bal} ${currency}! \nLet's see how this turns out...`)
          .setColor( `0x46789d` )
          .setFooter( `You earn ${currency} while being active in voice channels` );
        var coinflip = ['heads', 'tails'];
        var result = coinflip[Math.floor(Math.random() * coinflip.length)];
        if (bet === result) {
          var earnings = bal + (wager * 2);
          db.collection('users').doc(message.guild.id).collection(uID).doc(uID).update({
            'amount': earnings,
          });
          Embed.setTitle('CONGRATULATIONS!!!');
          Embed.setColor('0x46789d');
          Embed.setDescription(`${uTag} won the coin toss and earned ${wager*2} ${currency}!`);
          Embed.setFooter(`Total: ${earnings} ${currency}!`);
        } else {
          var earnings = bal - (wager);
          db.collection('users').doc(message.guild.id).collection(uID).doc(uID).update({
            'amount': earnings,
          });
          Embed.setTitle('WOMP WOMP WOMP WOOOOMP :(');
          Embed.setColor('0x46789d');
          Embed.setDescription(`${uTag} loss the coin toss, ${wager*2} ${currency}, and their pride!`);
          Embed.setFooter(`Total: ${earnings} ${currency}`);
        }
        message.channel.send(Embed);
      });
    });
  },
};