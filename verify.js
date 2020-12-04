const firstMessage = require('./first-message')

module.exports = (bot) => {
  const channelId = '724433408293601429'

  const getEmoji = (emojiName) => message.guild.emojis.cache.find(emoji => emoji.name === emojiName);

  const emojis = {
    '✅': 'Abnormalities'
  }

  const reactions = []

  let emojiText = '**Please react with :white_check_mark: to agree to the rules above and to gain access to the rest of this server:**\n\n'
  for (const key in emojis) {
    reactions.push(key)

    emojiText += `✅ = required to join voice channels`
  }

  firstMessage(bot, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if(user.id === '704022988722274304') return
    console.log("user is not a bot");
    const emoji = reaction._emoji.name
    console.log(emoji);
    const { guild } = reaction.message
    const roleName = emojis[emoji]
    console.log(roleName);
    if (!roleName) {
      return
    }
    const role = guild.roles.find((role) => `:${role.name}:` === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)
    if (add) {
      console.log(`Adding role: ${role}`);
      member.roles.add(role)
      member.roles.remove( guild.roles.cache.get("781565994128113694") );
    } else {
      console.log(`Removing role: ${role}`);
      member.roles.remove(role)
      member.roles.add( guild.roles.cache.get("781565994128113694") );
    }
  }

  bot.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      console.log("match! Adds role");
      handleReaction(reaction, user, true)
    } else {
      console.log("mismatch: does nothing");
    }
  })

  bot.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      console.log("match! removes role");
      handleReaction(reaction, user, false)
    } else {
      console.log("mismatch: does nothing");
    }
  })
}