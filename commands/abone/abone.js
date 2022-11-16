const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const client = global.client
const { CHANNELS, ROLES } = require("../../src/Settings/Config")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("abone")
    .setDescription("Abone Komutu.")
    .addUserOption(option => option.setName('user').setDescription('İşlem Yapılacak Kullanıcı.').setRequired(true)),
  async execute(interaction) {
     const user  = interaction.options.getUser("user")
     
     const embed = new EmbedBuilder()
     .setDescription(`Yapılacak İşlem`)

     const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('abone-degil')
					.setLabel('Abone Değil')
					.setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
					.setCustomId('like-degil')
					.setLabel('Like Atmamış')
					.setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
					.setCustomId('yorum-degil')
					.setLabel('Yorum Atmamış')
					.setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
					.setCustomId('abone-onay')
					.setLabel('Onay')
					.setStyle(ButtonStyle.Success),      
			);
      await interaction.reply({ embeds: [embed], components: [row] });


     client.on("interactionCreate", async (interaction) => {
      if (!interaction.member.roles.cache.has(ROLES.aboneYetkilisi)) return interaction.reply({ content: `Bunu Yapabilmeniz İçin Gerekli Yetkiniz Yok.`, ephemeral: true })
        if (interaction.isButton()) {
          var interactionCustomID = interaction.customId;
          const logChannel = client.channels.cache.get(CHANNELS.aboneLog);
          var sebep = "";
          switch (interactionCustomID) {
            case "abone-degil":
              sebep = "Abone Değil.";
              await logChannel.send({
                content: `${user} Kullanıcısı ${interaction.user}  Tarafından Red Yedi: Sebep: ${sebep}`,
              });
              await interaction.reply({ content: "Başarılı.", ephemeral: true })
              break;
            case "like-degil":
              sebep = "Like Atmamış.";
              await logChannel.send({
                content: `${user} Kullanıcısı  ${interaction.user}  Tarafından Red Yedi: Sebep: ${sebep}`,
              });
               await interaction.reply({ content: "Başarılı.", ephemeral: true })
              break;
            case "yorum-degil":
              sebep = "Yorum Atmamış.";
              await logChannel.send({
                content: `${user} Kullanıcısı ${interaction.user}  Tarafından Red Yedi: Sebep: ${sebep}`,
              });
               await interaction.reply({ content: "Başarılı.", ephemeral: true })
              break;
            case "abone-onay":
              const onayModal = new ModalBuilder()
                .setCustomId("onay-modal")
                .setTitle("Yetkili Paneli");

              const roleInput = new TextInputBuilder()
                .setCustomId("role")
                .setLabel("Towny/Survival/Skyblock/GifPack/BuildBattle")
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

              const roleActionRow = new ActionRowBuilder().addComponents(
                roleInput
              );

              onayModal.addComponents(roleActionRow);

              await interaction.showModal(onayModal);
              break;
          }
        }
       if(interaction.isModalSubmit()) {
        if (interaction.customId === "onay-modal") {
          const givenRole = interaction.fields.getTextInputValue("role");
          const member = interaction.guild.members.cache.get(user.id)
          const logChannel = client.channels.cache.get(CHANNELS.aboneLog);

          switch (givenRole) {
            case "Towny":
             await member.roles.add(ROLES.aboneRoles.townyRole);
             await logChannel.send({ content: `${user} Kullanıcısına ${interaction.user} Tarafından ${givenRole} Rolü Verildi.` })
              await interaction.reply({ content: "Kullanıya Başarıyla Rol Verildi.", ephemeral: true })
              break;
            case "Survival":
             await member.roles.add(ROLES.aboneRoles.survivalRole);
             await logChannel.send({ content: `${user} Kullanıcısına ${interaction.user} Tarafından ${givenRole} Rolü Verildi.` })
              await interaction.reply({ content: "Kullanıya Başarıyla Rol Verildi.", ephemeral: true })
              break;
            case "Skyblock":
             await member.roles.add(ROLES.aboneRoles.skyblockRole);
             await logChannel.send({ content: `${user} Kullanıcısına ${interaction.user} Tarafından ${givenRole} Rolü Verildi.` })
              await interaction.reply({ content: "Kullanıya Başarıyla Rol Verildi.", ephemeral: true })
              break;
            case "GifPack":
             await member.roles.add(ROLES.aboneRoles.discordgifPackRole);
             await logChannel.send({ content: `${user} Kullanıcısına ${interaction.user} Tarafından ${givenRole} Rolü Verildi.` })
              await interaction.reply({ content: "Kullanıya Başarıyla Rol Verildi.", ephemeral: true })
              break;
            case "BuildBattle":
             await member.roles.add(ROLES.aboneRoles.buildBattleRole);
             await logChannel.send({ content: `${user} Kullanıcısına ${interaction.user} Tarafından ${givenRole} Rolü Verildi.` })
              await interaction.reply({ content: "Kullanıya Başarıyla Rol Verildi.", ephemeral: true })
              break;
          }
        }
       }
     });
  },
};
