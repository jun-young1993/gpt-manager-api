export const CHAT_ROLE_TYPE = {
	USER : "user",
	ASSISTANT : "assistant",
	SYSTEM : "system"
}

export type ChatRoleType = typeof CHAT_ROLE_TYPE[keyof typeof CHAT_ROLE_TYPE];