export const safeGetConfig = (configKey: string): string => {
	const val = process.env[configKey];
	if (val === undefined || !val) {
		throw new Error(configKey + ' is required in the environment variables');
	}
	return val;
};
