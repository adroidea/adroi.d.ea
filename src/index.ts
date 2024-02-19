export interface IGuild {
	id: string;
	locale: string;
	modules: {
		auditLogs: IAuditLogsModule;
		qotd: IQOTDModule;
		tempVoice: ITempVoiceModule;
		twitch: ITwitchModule;
	};
}

//#region Logs Module
export interface IAuditLogsModule {
	enabled: boolean;
	publicLogsChannel: string;
	privateLogsChannel: string;

	//////////////////////////
	// Guild Members Events
	//////////////////////////
	guildMemberAdd: {
		enabled: boolean;
		channelId: string;
		ignoreBots: boolean;
	};
	guildMemberUpdate: {
		enabled: boolean;
		channelId: string;
		ignoreBots: boolean;
		ignoredUsers: string[];
	};
	guildMemberRemove: {
		enabled: boolean;
		channelId: string;
		ignoreBots: boolean;
	};

	//////////////////////////
	// Guild Messages Events
	//////////////////////////
	messageBulkDelete: {
		enabled: boolean;
		channelId: string;
		ignoredChannels: string[];
	};
	messageDelete: {
		enabled: boolean;
		channelId: string;
		ignoreBots: boolean;
		ignoredChannels: string[];
		ignoredUsers: string[];
	};
	messageUpdate: {
		enabled: boolean;
		channelId: string;
		ignoreBots: boolean;
		ignoredChannels: string[];
		ignoredUsers: string[];
	};

	//////////////////////////
	// Guild Events
	//////////////////////////
	guildBanAdd: {
		enabled: boolean;
		channelId: string;
	};
	guildBanRemove: {
		enabled: boolean;
		channelId: string;
	};
	guildRoleCreate: {
		enabled: boolean;
		channelId: string;
	};
	guildRoleDelete: {
		enabled: boolean;
		channelId: string;
	};
	guildRoleUpdate: {
		enabled: boolean;
		channelId: string;
		ignoredRoles: string[];
	};
	guildUpdate: {
		enabled: boolean;
		channelId: string;
	};
	botChangeLogs: {
		enabled: boolean;
		channelId: string;
	};
}
//#endregion

//#region Question Of The Day Module
export interface IQOTDModule {
	enabled: boolean;
	channelId: string; // The channel where the bot will send the question of the day
	proposedChannelId: string; // The channel where the bot will send the users questions proposals
	pingedRoleId: string; // The role that will be pinged when the question of the day is sent
	blacklist: string[]; // The list of users that can't propose questions
	whitelist: string[]; // The list of users that can propose questions without the need of approval
	questionsThreshold: number; // The number of questions left before the bot will send a message to the staff
	bannedWords: string[]; // The list of words that are not allowed in the questions
}
//#endregion

//#region Temp Voice Module
export interface ITempVoiceModule {
	enabled: boolean;
	hostChannels: string[]; // The list of channels the bot will watch for the creation of a new channel
	nameModel: {
		unlocked: string; // The name of the channel when it is unlocked
		locked: string; // The name of the channel when it is locked
	};
	userSettings: Record<string, ITVMUserSettings>; // The list of users settings
}

export interface ITVMUserSettings {
	trustedUsers: string[]; // The list of users that can join the channel even if it is locked
	blockedUsers: string[]; // The list of users that can't join the channel at all (besides the admins)
	isPrivate: boolean; // If the channel is private, only the owner and the trusted users can join it (and admins obvy)
}
//#endregion

//#region Twitch Module
export interface ITwitchModule {
	enabled: boolean;
	alerts: ITMAlerts;
	autoRoles: ITMAutoRoles;
}

export interface ITMAlerts {
	enabled: boolean;
	defaultProfilePicture: string; // Set this profile picture if the streamer is not streaming
	liveProfilePicture: string; // Set this profile picture if the streamer is streaming
	streamerName: string; // The name of the streamer
	infoLiveChannel: string; // The channel where the bot will send the message when the streamer is live
	pingedRole: string; // The role that will be pinged when the streamer is live
	notifyChange: boolean; // If the bot should notify when the streamer change their game
	ignoredCategories: string[]; // The list of categories that the bot should ignore
	message: {
		// The messages that the bot will send
		streamStart: string[];
		gameChange: string[];
	};
}

export interface ITMAutoRoles {
	enabled: boolean;
	streamingRoleId: string; // The role that will be given to the streamer when they are streaming
	streamers: ITMStreamersData[]; // The list of streamers
}

export interface ITMStreamersData {
	streamer: string; // The twitch name of the streamer
	memberId: string; // The discord id of the member
}
//#endregion

export function createGuildObject(guild: any): IGuild {
	return {
		id: guild.id,
		locale: 'en',
		modules: {
			auditLogs: {
				enabled: false,
				publicLogsChannel: '',
				privateLogsChannel: '',
				guildMemberAdd: {
					enabled: false,
					channelId: '',
					ignoreBots: false
				},
				guildMemberUpdate: {
					enabled: false,
					channelId: '',
					ignoreBots: false,
					ignoredUsers: []
				},
				guildMemberRemove: {
					enabled: false,
					channelId: '',
					ignoreBots: false
				},
				messageBulkDelete: {
					enabled: false,
					channelId: '',
					ignoredChannels: []
				},
				messageDelete: {
					enabled: false,
					channelId: '',
					ignoreBots: false,
					ignoredChannels: [],
					ignoredUsers: []
				},
				messageUpdate: {
					enabled: false,
					channelId: '',
					ignoreBots: false,
					ignoredChannels: [],
					ignoredUsers: []
				},
				guildBanAdd: {
					enabled: false,
					channelId: ''
				},
				guildBanRemove: {
					enabled: false,
					channelId: ''
				},
				guildRoleCreate: {
					enabled: false,
					channelId: ''
				},
				guildRoleDelete: {
					enabled: false,
					channelId: ''
				},
				guildRoleUpdate: {
					enabled: false,
					channelId: '',
					ignoredRoles: []
				},
				guildUpdate: {
					enabled: false,
					channelId: ''
				},
				botChangeLogs: {
					enabled: true,
					channelId: 'privateLogsChannel'
				}
			},
			qotd: {
				enabled: false,
				channelId: '',
				proposedChannelId: '',
				pingedRoleId: '',
				blacklist: [],
				whitelist: [],
				questionsThreshold: 7,
				bannedWords: []
			},
			tempVoice: {
				enabled: false,
				hostChannels: [],
				nameModel: {
					unlocked: '🔊 Voice {USERNAME}',
					locked: '🔒 Voice {USERNAME}'
				},
				userSettings: {}
			},
			twitch: {
				enabled: false,
				alerts: {
					enabled: false,
					defaultProfilePicture: guild.iconURL() ?? '',
					liveProfilePicture: '',
					streamerName: 'adan_ea',
					infoLiveChannel: '',
					pingedRole: '',
					notifyChange: false,
					ignoredCategories: [],
					message: {
						streamStart: [
							"{role}, **{streamer.name}** est en live ! C'est l'heure de laisser la réalité derrière toi et de plonger dans le monde de {game.name} !"
						],
						gameChange: [
							'Après avoir dit au revoir à {oldGame.name}. Le moment est venu de jouer à {newGame.name} ! Quelles aventures nous attendent cette fois-ci ?'
						]
					}
				},
				autoRoles: {
					enabled: false,
					streamingRoleId: '',
					streamers: []
				}
			}
		}
	};
}
