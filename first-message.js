const addReactions = (message, reactions) => {
  reaction = reactions[0]
  if (reaction.toString().includes(':')) {
    const split = reaction.toString().split(':')
    const emojiName = split[1]
    reaction = message.emojis.cache.find((emoji) => {
      return emojiName === emoji.name
    });
  }
  message.react(reaction)
  console.log(reaction)
  reactions.shift()
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750)
  }
}

module.exports = async (bot, id, text, reactions = []) => {
  const channel = await bot.channels.fetch(id)

  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      // Send a new message
      channel.send(text).then((message) => {
        addReactions(message, reactions)
      })
    } else {
      // Edit the existing message
      for (const message of messages) {
        message[1].edit(text)
        addReactions(message[1], reactions)
      }
    }
  })
}