const firstMessage = require('./first-message')

module.exports = (bot) => {
  const channelId = '724433408293601429'

  const getEmoji = (emojiName) =>
    bot.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    ':white_check_mark:': 'Abnormalities'
  }

  const reactions = []

  let emojiText = '**Please react with :white_check_mark: to agree to the rules above and to gain access to the rest of this server:**\n\n'
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    emojiText += `${emoji} = required to join voice channels\n`
  }

  firstMessage(bot, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if(user.id === '704022988722274304') return
    const { guild } = reaction.message
    const member = guild.members.cache.find((member) => member.id === user.id)
    if (add) {
      member.roles.add( guildMember.guild.roles.cache.find( role => role.name === "Abnormalities" ) );
      member.roles.remove( guildMember.guild.roles.cache.find( role => role.name === "Stardust" ) );
    } else {
      member.roles.remove( guildMember.guild.roles.cache.find( role => role.name === "Abnormalities" ) );
      member.roles.add( guildMember.guild.roles.cache.find( role => role.name === "Stardust" ) );
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