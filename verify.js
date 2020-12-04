const firstMessage = require('./first-message')

module.exports = (bot) => {
  const channelId = '724433408293601429'

  const getEmoji = (emojiName) =>
    bot.emojis.cache.find((emoji) => emoji.name === emojiName)
    var bean = message.guild.emojis.cache.find(emoji => emoji.name == 'bean');


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
    const { guild } = reaction.message
    const member = guild.members.cache.find((member) => member.id === user.id)
    if (add) {
      console.log("Adds role");
      member.roles.add( guild.roles.cache.get("706949672496922705") );
      member.roles.remove( guild.roles.cache.get("781565994128113694") );
    } else {
      console.log("removes role");
      member.roles.remove( guild.roles.cache.get("706949672496922705") );
      member.roles.add( guild.roles.cache.get("781565994128113694") );
    }
  }

  bot.on('messageReactionAdd', (reaction, user) => {
    if (guild.channel.id === channelId) {
      console.log("match! Adds role");
      handleReaction(reaction, user, true)
    }
    console.log("mismatch: does nothing");
  })

  bot.on('messageReactionRemove', (reaction, user) => {
    if (guild.channel.id === channelId) {
      console.log("match! removes role");
      handleReaction(reaction, user, false)
    }
    console.log("mismatch: does nothing");
  })
}