import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import * as path from 'path';

export interface EnvConfig {
	[key: string]: string;
}

export class ConfigService {
	private readonly envConfig: EnvConfig;
	private readonly environmentsPath: String = path.join(__dirname, '../../environments/');

	constructor (filePath: string) {
		const config = dotenv.parse(fs.readFileSync(this.environmentsPath + filePath));
		this.envConfig = this.validateInput(config);
	}

	/**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
	private validateInput (envConfig: EnvConfig): EnvConfig {
		const envVarsSchema: Joi.ObjectSchema = Joi.object({
			NODE_ENV: Joi.string().valid([ 'development', 'production', 'test', 'provision' ]).default('development'),
			DATABASE: Joi.string().required(),
			JWT_SECRET: Joi.string().required()
		});

		const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
		if (error) {
			throw new Error(`Config validation error: ${error.message}`);
		}

		return validatedEnvConfig;
	}

	get database () {
		return this.envConfig.DATABASE;
	}

	get jwtSecret () {
		return this.envConfig.JWT_SECRET;
	}
}
