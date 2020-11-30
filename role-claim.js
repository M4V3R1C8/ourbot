const firstMessage = require('./first-message')

module.exports = (bot) => {
  const channelId = '781282193396989994'

  const getEmoji = emojiName => bot.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    100: 'raiders',
    eyes: 'dscfarm',
    weary: 'gosfarm',
    'four': 'lwfarm',
    five: 'strikes',
    six: 'crucible',
    seven: 'gambit',
    eight: 'dungeons',
    nine: 'seasonal',
    white_check_mark: 'Abnormalities',
  }

  const reactions = []

  let emojiText = '**React below to claim your roles:**\n\n'
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} = ${role}\n`
  }

  firstMessage(bot, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if(user.id === '704022988722274304') return
    const emoji = reaction._emoji.name
    const { guild } = reaction.message
    const roleName = emojis[emoji]
    if (!roleName) {
      return
    }
    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)
    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
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