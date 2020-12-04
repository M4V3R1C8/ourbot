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
  bot.channel.messages.cache.get(channelId);

  const handleReaction = (reaction, user, add) => {
    if(reaction.message.channel.id === channelId) {
      if(user.id !== '704022988722274304') {
        const emoji = reaction._emoji.name
        const roleName = emojis[emoji]
        if (!roleName) return
        const member = reaction.message.members.cache.find((member) => member.id === user.id)
        const role = reaction.message.roles.find((role) => `${role.name}` === roleName)
        console.log(`Role ID: ${role}, is being edited on Member ID: ${member}`); 
        if (add) {
          member.addRole(role)
          member.roles.add(role)
          member.roles.cache.add(role)
        } else {
          member.removeRole(role)
          member.roles.remove(role)
          member.roles.cache.remove(role)
        }
      }
    }
  }

  bot.on('messageReactionAdd', (reaction, user) => {
    console.log(`${user.tag} added ${reaction.emoji.name} to message ${reaction.message.id} in channel ${reaction.message.channel.id}.`);
    //handleReaction(reaction, user, true) 
  })
  bot.on('messageReactionRemove', (reaction, user) => { 
    console.log(`${user.tag} removed ${reaction.emoji.name} on message ${reaction.message.id} in channel ${reaction.message.channel.id}.`);
    //handleReaction(reaction, user, false) 
  })
}