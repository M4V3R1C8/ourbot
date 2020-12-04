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
}