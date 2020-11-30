const reaction = require( './commands/commands/reaction' );

const addReactions = (message, reactions) => {
  console.log(reactions[0])
  var reacting = reactions[0]
  console.log(reacting)
  if (reacting.toString().includes(">")) {
    reacting = reacting.substring(0, -1);
    console.log(reacting)
  }
  if (reacting.toString().includes(':')) {
    const split0 = reacting.toString().replace(':', '')
    const split1 = split0.replace(':', '')
    const emojiName = split1
    console.log(emojiName)
    reacting = message.guild.emojis.find((emoji) => {
      return emojiName === emoji.name
    });
    console.log(reacting)
  }
  console.log(reacting)
  message.react(reacting)
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