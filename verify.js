const firstMessage = require('./first-message')

module.exports = (bot) => {
  const channelId = '724433408293601429'

  const emojis = {
    '✅': 'Abnormalities'
  }

  const reactions = []

  let emojiText = '\n**Click the :white_check_mark: below to gain access to the rest of this server:**\n\n'
  for (const key in emojis) {
    reactions.push(key)
    emojiText += ``
  }

  firstMessage(bot, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if(reaction.message.channel.id === channelId) {
      if(user.id !== '704022988722274304') {
        const { guild } = reaction.message
        const emoji = reaction._emoji.name
        const roleName = emojis[emoji]
        if (!roleName) {
          return
        }
        const role = guild.roles.find((role) => `${role.name}` === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)
        console.log(`Role ID: ${role}, is being edited on Member ID: ${member}`); 
        if (add) {
          console.log(`Adding role: ${role}, removing role:`);
          member.roles.add(role)
          member.roles.cache.add(role)
        } else {
          console.log(`Removing role: ${role}`);
          member.roles.remove(role)
          member.roles.cache.remove(role)
        }
      }
    }
  }

  bot.on('messageReactionAdd', (reaction, user) => {
    console.log(`messageReactionAdded`); 
    //handleReaction(reaction, user, true) 
  })
  bot.on('messageReactionRemove', (reaction, user) => { 
    console.log(`messageReactionRemoved`);
    //handleReaction(reaction, user, false) 
  })
}