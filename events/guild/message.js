const Timeout = new Set();
const ms = require('ms');
module.exports=async(bot,message,db)=>{
  if(message.author.bot) return;
  if(!message.guild) return;
  db.collection('guilds').doc(message.guild.id).get().then((q) => {
    if(q.exists) {
      prefix = q.data().prefix;
      console.log(`${message.guild.id} Prefix is '${prefix}'`);
      if(!message.content.toLowerCase().startsWith(prefix)) return;
      commandHandler( bot, message, db );
    } else {
      message.channel.send("Unsupported Server Error: kick and reconnect at https://discord.com/oauth2/authorize?client_id=376906607163867146&permissions=8&scope=bot")
    }
  });
}

async function commandHandler ( bot, message, db ) {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  
  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  
  if (command) {
    if(command.timeout){
      if(Timeout.has(`${message.author.id}${command.name}`)) {
          return message.reply(`You can only use this command every ${ms(command.timeout)}!`)
      }else{
        command.run(bot, message, args, db);
        Timeout.add(`${message.author.id}${command.name}`)
        setTimeout(() => {
            Timeout.delete(`${message.author.id}${command.name}`)
        }, command.timeout);
      }
    }else{
      command.run(bot,message,args,db);
    }
    message.delete();
  } else {
    db.collection('guilds').doc(message.guild.id).collection('custom').doc('commands').get().then((q) => {
      if(q.exists) {
        value = q.data()[cmd];
        if (value) {
          message.channel.send(value);
        }
      }
    });
  }
}


