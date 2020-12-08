module.exports = async (bot, reaction, user, add, db) => {
  db.collection('roles').doc(reaction.message.guild.id).get().then((q) => {
    if(q.exists) {
      const member = reaction.message.guild.members.cache.find((member) => member.id === user.id);
      const react = reaction._emoji.name;
      const channel = reaction.message.channel.id;

      for(var i = 0; i < q.data().role_id.length; i++){
        var roleInfo = q.data().role_id[i].split(" - "),
            channelID = roleInfo[0],
            emoji = roleInfo[1],
            rol0 = roleInfo[2].toString(),
            role = rol0.substring(3,rol0.length - 1);            
        if(channelID === channel) {
          if(emoji === react) {
            if (add) {
              member.roles.add(role)
            } else {
              member.roles.remove(role)
            }
          }
        }
      }
    } else {
      message.channel.send("Unsupported Server Error: kick and reconnect at https://discord.com/oauth2/authorize?client_id=376906607163867146&permissions=8&scope=bot")
    }
  });
}