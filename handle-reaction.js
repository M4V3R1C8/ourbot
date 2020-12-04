module.exports = (bot, reaction, user, add) => {
  if(user.id === '704022988722274304') return
  const channelId = '781282193396989994'
  const verifyId = '724433408293601429'
  const emojis = {
    '1️⃣': 'raiders',
    '2️⃣': 'dscfarm',
    '3️⃣': 'gosfarm',
    '4️⃣': 'lwfarm',
    '5️⃣': 'strikes',
    '6️⃣': 'crucible',
    '7️⃣': 'gambit',
    '8️⃣': 'dungeons',
    '9️⃣': 'seasonal',
    '✅': 'Abnormalities'
  }
  const emoji = reaction._emoji.name
  const roleName = emojis[emoji]
  const role = reaction.message.roles.find((role) => `${role.name}` === roleName)
  const member = reaction.message.members.cache.find((member) => member.id === user.id)
  if (!roleName) return
  
  if(reaction.message.channel.id === channelId) {
    if (add) {
      console.log(`Adding ${emoji} to ${user}`)
      member.roles.add(role)
    } else {
      console.log(`Removing ${emoji} from ${user}`)
      member.roles.remove(role)
    }
  } else if(reaction.message.channel.id === verifyId) {
    if (add) {
      console.log(`Adding ✅ to ${user}`)
      member.roles.add('706949672496922705') // Abnormalities
      member.roles.remove('781565994128113694') // Stardust
    } else {
      console.log(`Removing ✅ from ${user}`)
      member.roles.remove('706949672496922705') // Abnormalities
      member.roles.add('781565994128113694') // Stardust
    }
  }
}