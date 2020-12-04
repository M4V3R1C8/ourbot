const firstMessage = require('./first-message')

module.exports = (bot) => {
  const channelId = '724433408293601429'

  const getEmoji = (emojiName) => message.guild.emojis.cache.find(emoji => emoji.name === emojiName);

  const emojis = {
    '✅': 'Abnormalities'
  }

  const reactions = []

  let emojiText = '**Please click the :white_check_mark: below to agree to the rules above and to gain access to the rest of this server:**\n\n'
  for (const key in emojis) {
    reactions.push(key)
    emojiText += ``
  }

  firstMessage(bot, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    console.log(reaction);
    console.log(reaction._emoji);
    console.log(reaction._emoji.name);
    console.log(reaction.message.channel.id);
    if(reaction.message.channel.id !== channelId) return
    if(user.id === '704022988722274304') return
    const emoji = reaction._emoji.name
    const { guild } = reaction.message
    const roleName = emojis[emoji]
    console.log(roleName);
    if (!roleName) {
      return
    }
    const role = guild.roles.find((role) => `${role.name}` === roleName)
    const role2 = guild.roles.find((role) => `Stardust` === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)
    if (add) {
      console.log(`Adding role: ${role}`);
      member.roles.cache.add(role)
      member.roles.cache.remove(role2);
    } else {
      console.log(`Removing role: ${role}`);
      member.roles.cache.remove(role)
      member.roles.cache.add(role2);
    }
  }

  bot.on('messageReactionAdd', (reaction, user) => { handleReaction(reaction, user, true) })
  bot.on('messageReactionRemove', (reaction, user) => { handleReaction(reaction, user, false) })
}