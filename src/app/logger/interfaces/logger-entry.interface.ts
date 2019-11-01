export interface ILoggerEntry {
	message: string;
	stack?: string;
	service_name: string;
	error_id: string;
}
