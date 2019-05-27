 const Discord = require('discord.js');
    const client = new Discord.Client();
    var prefix = "$"
     
    client.on('message', message => {
        if(message.content.startsWith(prefix + 'new')) {
            let args = message.content.split(' ').slice(1).join(' ');
            let support = message.guild.roles.find("name","Support Team");
            let ticketsStation = message.guild.channels.find("name", "TICKETS.");
            if(!args) {
                return message.channel.send('**المرجو كتآبة موضوع للتذكرة**');
            };
                    if(!support) {
                        return message.channel.send('** من فضلك قم بإنشاء رتبة اسمها `Support Team` **');
                    };
                if(!ticketsStation) {
                    message.guild.createChannel("TICKET.", "category");
                };
                    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(ticket => {
                        message.delete()
                            message.channel.send(`Your ticket has been created. [ ${ticket} ]`);
                        ticket.setParent(ticketsStation);
                        ticketsStation.setPosition(1);
                            ticket.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: false,
                                READ_MESSAGES: false
                            });
                                ticket.overwritePermissions(support.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                });
                                    ticket.overwritePermissions(message.author.id, {
                                        SEND_MESSAGES: true,
                                        READ_MESSAGES: true
                                    });
                        let embed = new Discord.RichEmbed()
                                    .setTitle('**New Ticket.**')
                                    .setColor("RANDOM")
                                    .setThumbnail(`${message.author.avatarURL}`)
                                    .addField('Subject', args)
                                    .addField('Author', message.author)
                                    .addField('Channel', `<#${message.channel.id}>`);
     
                                    ticket.sendEmbed(embed);
                    }) .catch();
        }
        if(message.content.startsWith(prefix + 'close')) {
                if(!message.member.hasPermission("ADMINISTRATOR")) return;
            if(!message.channel.name.startsWith("ticket")) {
                return;
            };  
                    let embed = new Discord.RichEmbed()
                        .setAuthor("أعد الامر ، لديك 20 ثآنية")
                        .setColor("RANDOM");
                        message.channel.sendEmbed(embed) .then(codes => {
     
                       
                            const filter = msg => msg.content.startsWith(prefix + 'close');
                            message.channel.awaitMessages(response => response.content === prefix + 'close', {
                                max: 1,
                                time: 20000,
                                errors: ['time']
                            })
                            .then((collect) => {
                                message.channel.delete();
                            }) .catch(() => {
                                codes.delete()
                                    .then(message.channel.send('**تم إلغاء العملية**')) .then((c) => {
                                        c.delete(4000);
                                    })
                                       
                               
                            })
     
     
                        })
     
     
               
        }
    });
     
    client.login('NTgyNDk3NDczNjgwMTEzNjc2.XOusfA.0YUSLRQbGK9wJKwKDDDsz82lSL8');

