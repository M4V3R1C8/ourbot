const addReactions = (message, reactions) => {
  var reaction = reactions[0].toString();
  message.react(reaction)
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