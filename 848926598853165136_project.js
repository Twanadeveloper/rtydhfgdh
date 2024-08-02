const { Client, Permissions, PermissionsBitField, Colors, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Partials, GatewayIntentBits } = require("discord.js");
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents
  ],
  shards: "auto",
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent
  ]
});

const prefix = "!";

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'embed') {
    const content = args.join(' ');
    if (!content) return message.reply('Please provide a message to send!');
    message.delete();

    const embed = new EmbedBuilder()
      .setColor('RANDOM')
      .setDescription(content);

    message.channel.send({ embeds: [embed] });
  }
});
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'tax') {
    const amount = parseInt(args[0]);
    if (isNaN(amount)) return message.reply('Please provide a valid amount!');

    const taxedAmount = Math.floor(amount * 20 / 19) + 1;
    const embed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setTitle('TAX')
      .setDescription(`The tax amount is ${taxedAmount}`);

    const button = new ButtonBuilder()
      .setLabel(message.client.user.tag)
      .setStyle(ButtonStyle.Success)
      .setDisabled(true)
      .setCustomId('tax');

    const actionRow = new ActionRowBuilder().addComponents(button);
    message.reply({ embeds: [embed], components: [actionRow] });
  }
});
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'come') {
    const roleId = '1263205187980623873'; // Replace with actual role ID

    if (!message.member.roles.cache.has(roleId)) {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Permission Denied')
        .setDescription('You do not have permission to use this command.');

      const button = new ButtonBuilder()
        .setLabel(message.client.user.tag)
        .setStyle(ButtonStyle.Success)
        .setDisabled(true)
        .setCustomId('comen');

      const actionRow = new ActionRowBuilder().addComponents(button);
      return message.channel.send({ embeds: [embed], components: [actionRow] });
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply('Please mention a member to send the message to.');

    try {
      await member.send(`**تم طلبك هنا ${message.channel}, برجاء منك عدم التأخر ⚠**`);
      
      const replyEmbed = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription(`تم إرسال رسالة إلى ${member} في الخاص.`);

      const button = new ButtonBuilder()
        .setLabel(message.client.user.tag)
        .setStyle(ButtonStyle.Success)
        .setDisabled(true)
        .setCustomId('comfen');

      const actionRow = new ActionRowBuilder().addComponents(button);

      message.reply({ embeds: [replyEmbed], components: [actionRow] });
    } catch (error) {
      console.error('Failed to send message:', error);
      message.reply('Failed to send message. Please try again later.');
    }
  }
});
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'show') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('You do not have permission to use this command.');
    }

    const reason = args.join(' ') || 'Not specified';

    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: true }, reason);
      message.reply(`This channel has been shown. Reason: ${reason}`);
    } catch (error) {
      console.error('Error executing the show command:', error);
      message.reply('There was an error trying to show the channel.');
    }
  }
});

client.on('messageCreate', async (message) => {
    if (!message.guild) return;

    if (message.content.startsWith('!ban')) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                try {
                    await member.ban({ reason: 'They were bad!' });
                    message.reply(`${user.tag} has been banned`);
                } catch (error) {
                    message.reply('I was unable to ban the member');
                    console.error(error);
                }
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to ban!");
        }
    }
});
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'hide') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('You do not have permission to use this command.');
    }

    const reason = args.join(' ') || 'Not specified';

    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: false }, reason);
      message.reply(`This channel has been hidden. Reason: ${reason}`);
    } catch (error) {
      console.error('Error executing the hide command:', error);
      message.reply('There was an error trying to hide the channel.');
    }
  }
});
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'kick') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.reply('You do not have permission to use this command.');
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply('Please mention the member you want to kick.');

    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      await member.kick({ reason: `${reason}, By: ${message.author.tag}` });
      message.reply(`Member ${member.user.tag} has been kicked successfully.`);
    } catch (error) {
      console.error('Error while kicking member:', error);
      message.reply('Failed to kick the member. Please check my permissions and try again.');
    }
  }
});
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'unban') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Add your unban logic here
  }
});
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command !== 'lock') return;

     if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }

        const reason = args.join(' ') || 'Not specified';

        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false }, reason);
            await message.reply(`This channel has been locked. Reason: ${reason}`);
        } catch (error) {
            console.error('Error executing the lock command:', error);
            message.reply('There was an error trying to lock the channel.');
    }
  }
});

    client.on('messageCreate', async (message) => {
        if (message.content === "خط") {
            // Attempt to delete the message that triggered this command
            const line = "" //
             message.delete();
            message.channel.send(`${line}`); // Send the retrieved line
        }
    });
client.on('messageCreate', async (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return; // تجاهل الرسائل التي لا تبدأ بالبرفكس أو المرسلة من البوتات

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command !== 'role') return; // التأكد من أن الأمر المدخل هو 'role'
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }

        const user = message.mentions.users.first();
        const roleMention = message.mentions.roles.first(); // استخراج منشن الرتبة

        if (!user) {
            return message.reply('Please mention a valid user.');
        }
        if (!roleMention) {
            return message.reply('Please mention a valid role.');
        }

        const role = message.guild.roles.cache.get(roleMention.id); // الحصول على كائن الرتبة من خلال الـ ID

        if (!role) {
            return message.reply('Role not found.');
        }

        message.guild.members.fetch(user.id)
            .then(async member => {
                await member.roles.add(role);
                message.reply(`${user.username} has been assigned the role ${role.name}.`);
            })
            .catch(error => {
                console.error('Error assigning role:', error);
                message.reply('There was an error trying to assign the role to the user.');
            });
    });
};
client.on('messageCreate', async (message) => {
        if (message.content === '!ticket') {
            const embed = new EmbedBuilder()
                .setColor('#39ff14')
                .setTitle('Create a Ticket')
                .setDescription('Click the button below to create a ticket.');

            const button = new ButtonBuilder()
                .setCustomId('create_ticket')
                .setLabel('Create Ticket')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            await message.channel.send({ embeds: [embed], components: [row] });
        }
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'create_ticket') {
            const channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: 0, // Specify channel type as GUILD_TEXT
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel'],
                    },
                ],
            });

            const embed = new EmbedBuilder()
                .setColor('#39ff14')
                .setTitle('Ticket Created')
                .setDescription('Your ticket has been created. A staff member will be with you shortly.');

            const closeBtn = new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder().addComponents(closeBtn);

            await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [row] });
            await interaction.reply({ content: 'Ticket created!', ephemeral: true });
        }

        if (interaction.customId === 'close_ticket') {
            const channel = interaction.channel;

            const embed = new EmbedBuilder()
                .setColor('#39ff14')
                .setTitle('Ticket Closed')
                .setDescription('This ticket has been closed.');

            await channel.send({ embeds: [embed] });
            await channel.delete();
        }
    });
};
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command !== 'unlock') return;

     if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }

        const reason = args.join(' ') || 'Not specified';

        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true }, reason);
            await message.reply(`This channel has been locked. Reason: ${reason}`);
        } catch (error) {
            console.error('Error executing the lock command:', error);
            message.reply('There was an error trying to lock the channel.');
    }
  }
});

client.on("messageCreate" , async(message) => {
if(message.content.startsWith(prefix + "set-avatar")){
  if(message.author.id !== "الايدي تبعك") return;
  let args = message.content.split(" ")
  if(!args[1])return message.reply("Avatar Link required")
  let gg = client.user.setAvatar(args[1]).then(() =>{
      message.reply({embeds : [
        new EmbedBuilder()
                .setTitle('تم تغيير صورة البوت')
                .setImage(`${args[1]}`)
                .setColor('Green')
      ]})
  })
  gg.catch(err => message.reply({content:"** تم تغيير صورة البوت**"}))
}
})
client.on("messageCreate" , async(message) => {

if(message.content == "!uptime"){
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 25;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        const embed = new MessageEmbed()
          .setColor("#d5d5d5")
          .setTitle("**Bot uptimer** 🕒")
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.avatarURL({ dynamic: true }),
          })
          .setThumbnail(client.user.avatarURL())
          .addFields(
            { name: "days", value: `${days}`, inline: false },
            { name: "hours", value: `${hours}`, inline: false },
            { name: "minutes", value: `${minutes}`, inline: false },
            { name: "seconds", value: `${seconds}`, inline: false }
          );
    
        message.reply({ embeds: [embed] });
}
})
client.on("messageCreate", async saleh => {
  if (saleh.content.startsWith(prefix + "timeout")) {
    if (saleh.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      let args = saleh.content.split(" ");
      let member = saleh.mentions.members.first();
      if (!member) return saleh.reply("**Mention the user or him ID to shut him up !**");
      if (member.user.bot) return saleh.reply("**You can't mute a bot 🙄**");
      if (member.user.id === saleh.author.id) return saleh.reply("**You can't mute yourself 🙄**");
      if (!args[2]) return saleh.reply("**Please Specify the timer ❌**");
      if (!["s", "m", "h", "d", "w"].includes(args[2].slice(-1))) {
        return saleh.reply(`**Please Provide me a valid timer \`s / m / h / d / w\` ❌**`);
      }
      if (isNaN(args[2][0])) return saleh.reply("**That is not a number ❌ !**");

      let duration = ms(args[2]);
      let endTime = moment().add(duration, 'milliseconds').format("M/D/YYYY");

      let embed = new EmbedBuilder()
        .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`> **You are muted in** \`${saleh.guild.name}\` **for a ${args[2]}**\n> **End At : ${endTime}**\n> **Muted By : **${saleh.author}`)
        .setThumbnail(saleh.guild.iconURL())
        .setFooter({ text: saleh.author.tag, iconURL: saleh.author.displayAvatarURL({ dynamic: true }) });

      await member.timeout(duration, "تم الإشارة إلى الشخص").catch(err => { console.error(err); });
      await saleh.reply(`**Done muted** \`${member.user.username}\` **for a ${args[2]}**`);
      await member.send({ embeds: [embed] }).catch(err => { console.error(err); });
    }
  }
});
client.login('YOUR_BOT_TOKEN');