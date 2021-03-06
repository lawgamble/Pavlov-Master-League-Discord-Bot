const readAliasFile = require("./JSONParser");
const fs = require("fs");


function removeTeam(filePath, message, arguments) {
    const teamToBeRemoved = arguments.join(" ");

    readAliasFile(filePath, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            if (data.teams.hasOwnProperty(teamToBeRemoved)) {
                delete data.teams[teamToBeRemoved];
                fs.writeFile(filePath, JSON.stringify(data, null, 2), (error) => {
                    if (error) {
                        console.log(error);
                    }
                    message.reply(
                        `The team: **${teamToBeRemoved}** has been removed.`
                    );
                    return;
                });
            } else {
                if (arguments.length === 0) {
                    message.reply("Please enter a team to be removed. Example: **!removeteam <teamName>**")
                } else {
                    message.reply(`The team name **${teamToBeRemoved}** was not removed because it's currently not an active team. Check spelling and casing errors.`);
                }
            }
        }
    });
}


module.exports = removeTeam;