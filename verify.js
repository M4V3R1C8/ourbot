const firstMessage = require( './firstMessage.js' );

module.exports = (bot) => {
  const channelId = '724433408293601429'

  const getEmoji = (emojiName) =>
    bot.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    white_check_mark: 'Abnormalities'
  }

  const reactions = []

  let emojiText = '**Please react with :white_check_mark: to agree to the rules above and to gain access to the rest of this server:**\n\n'
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} = required to join voice channels\n`
  }

  firstMessage(bot, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    const emoji = reaction._emoji.name
    const { guild } = reaction.message

    const member = guild.members.cache.find((member) => member.id === user.id)
    if (add) {
      member.roles.add('Abnormalities')
      member.roles.remove('Stardust')
    } else {
      member.roles.add('Stardust')
      member.roles.remove('Abnormalities')
    }
  }

  bot.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  bot.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}