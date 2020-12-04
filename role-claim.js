const firstMessage = require('./first-message')

module.exports = (bot) => {
  const channelId = '781282193396989994'

  const emojis = {
    '1️⃣': 'raiders',
    '2️⃣': 'dscfarm',
    '3️⃣': 'gosfarm',
    '4️⃣': 'lwfarm',
    '5️⃣': 'strikes',
    '6️⃣': 'crucible',
    '7️⃣': 'gambit',
    '8️⃣': 'dungeons',
    '9️⃣': 'seasonal'
  }

  const reactions = []

  let emojiText = '**React below to claim your roles:**\n\n'
  for (const key in emojis) {
    reactions.push(key)

    const role = emojis[key]
    emojiText += `${key} = ${role}\n`
  }

  firstMessage(bot, channelId, emojiText, reactions)
}