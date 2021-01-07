const Discord = require( "discord.js" );
const fs = require( "fs" );

//initialize bot
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//import settings
const owner = process.env.OWNER;
const token = process.env.TOKEN;

//initialize database (firebase)
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAcount = require('./serviceAcount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAcount)
});

const db = admin.firestore();

bot.categories = fs.readdirSync( "./commands/" );
[ "command", "server" ].forEach( handler => {
  require( `./handlers/${ handler }` )( bot );
} );

bot.on( 'ready', () => {
  require( './events/client/ready' )( bot,db );
} );

bot.on( 'guildMemberAdd', ( guildMember, db ) => {
  db.collection('guilds').doc(guildMember.guild.id).update({
    'guildMemberCount': guildMember.guild.memberCount,
  });
  db.collection('guilds').doc(guildMember.guild.id).get().then((q) => {
    memcountID = q.data().memcountID;
    guildMemberCount = q.data().guildMemberCount;
  });
  const memChannelID = bot.channels.cache.get(memCountID);
  memChannelID.edit({ name: `Total Users: ${guildMemberCount}` }, 'Member update').catch(console.error);
  var role= member.guild.roles.cache.find(role => role.name === "Abnormalities");
  member.roles.add(role).catch(console.error);
} );

bot.on( 'message', ( message ) => {
  require( './events/guild/message' )( bot, message, db );
} );

bot.on( 'messageReactionAdd', ( reaction, user ) => {
  if(reaction.partial) {
    reaction.fetch().then(fullReaction => {
      require( './events/guild/reaction' )( bot, fullReaction, user, true, db );
    }).catch(error => {
      console.log("Partial Error: " + error);
    });
  } else {
    require( './events/guild/reaction' )( bot, reaction, user, true, db );
  }
} );

bot.on( 'messageReactionRemove', ( reaction, user ) => {
  if(reaction.partial) {
    reaction.fetch().then(fullReaction => {
      require( './events/guild/reaction' )( bot, fullReaction, user, false, db );
    }).catch(error => {
      console.log("Partial Error: " + error);
    });
  } else {
    require( './events/guild/reaction' )( bot, reaction, user, false, db );
  }
} );

bot.on('guildCreate', async gData => {
  servOwner = gData.owner.id;
  db.collection('guilds').doc(gData.id).set({
    'guildID': gData.id,
    'guildName': gData.name,
    'guildOwner': servOwner,
    'guildMemberCount': gData.memberCount,
    'prefix': '.',
    'currency': 'shiny',
    'clockID': null,
    'timezone': '',
    'memcountID': null,
  } );
  db.collection('roles').doc(gData.id).set({
    role_id: []
  } );
} );

bot.on('voiceStateUpdate', (oldState, newState) => {
  let bal = 0,
      tim = Date.now(),
      gain = Date.now(),
      oID = oldState.channelID,
      cID = newState.channelID,
      uID = newState.id;
  db.collection('users').doc(newState.guild.id).collection(uID).doc(uID).get().then((c) => {
    if(c.exists && c !== undefined) {
      bal = c.data().amount;
      tim = c.data().timeStamp;
    } else {
      db.collection('users').doc(newState.guild.id).collection(uID).doc(uID).set({
        'amount': bal,
        'timeStamp': gain
      } );
    }
    if(newState.voiceChannelID !== null) {
      if (oldState.serverMute) {
        bal = Math.round(bal);
      } else if (oldState.channelID === null) {
        bal = Math.round(bal);
      } else {
        const boost = newState.guild.roles.cache.find(r => r.name === 'Server Booster');
        if (newState.member.roles.cache.has(boost)) {
          bal = Math.round(bal + (2 * (gain - tim) / 1000));
        } else {
          bal = Math.round(bal + ((gain - tim) / 1000));
        }
      }
      db.collection('users').doc(newState.guild.id).collection(uID).doc(uID).update({
        'amount': bal,
        'timeStamp': gain
      } );
    } else if (newState.voiceChannelID === null){
      if (oldState.serverMute) {
        bal = Math.round(bal);
      } else if (oldState.channelID === null) {
        bal = Math.round(bal);
      } else {
        const boost = newState.guild.roles.cache.find(r => r.name === 'Server Booster');
        if (newState.member.roles.cache.has(boost)) {
          bal = Math.round(bal + (2 * (gain - tim) / 1000));
        } else {
          bal = Math.round(bal + ((gain - tim) / 1000));
        }
      }
      db.collection('users').doc(newState.guild.id).collection(uID).doc(uID).update({
        'amount': bal,
        'timeStamp': gain
      } );
    }
  });
});

bot.login( process.env.token );

// https://discordapp.com/api/oauth2/authorize?client_id=704022988722274304&permissions=8&scope=bot