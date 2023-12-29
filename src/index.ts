export interface IGuild {
	id: string;
	modules: {
		logs: ILogsModule;
		qotd: IQOTDModule;
		tempVoice: ITempVoiceModule;
		twitch: ITwitchModule;
	};
}

//#region Logs Module
export interface ILogsModule {
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
	MessageBulkDelete: {
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
	};
	guildUpdate: {
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
}

export interface ITMAutoRoles {
	enabled: boolean;
	streamingRoleId: string; // The role that will be given to the streamer when he is streaming
	streamers: ITMStreamersData[]; // The list of streamers
}

export interface ITMStreamersData {
	streamer: string; // The twitch name of the streamer
	memberId: string; // The discord id of the member
}
//#endregion

const createGuildObject = (guild: any): IGuild => {
	return {
		id: guild.id,
		modules: {
			logs: {
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
				MessageBulkDelete: {
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
					channelId: ''
				},
				guildUpdate: {
					enabled: false,
					channelId: ''
				}
			},
			qotd: {
				enabled: false,
				channelId: '',
				proposedChannelId: '',
				pingedRoleId: '',
				blacklist: [],
				whitelist: [],
				questionsThreshold: 7
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
					pingedRole: ''
				},
				autoRoles: {
					enabled: false,
					streamingRoleId: '',
					streamers: []
				}
			}
		}
	};
};

module.exports.createGuildObject = {
	createGuildObject
};
