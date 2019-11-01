import { Schema } from 'mongoose';

export const BookSchema = new Schema(
	{
		name: { type: String, required: true },
		authors: [ { type: String, required: true } ],
		year: { type: String, required: true },
		publish: { type: String, required: true }, // editora
		subjects: [ { type: String, required: true } ],
		type: { type: String, required: true },
		edition: { type: Number, default: 1 },
		link: { type: String },
		library: { type: String, required: true }
	},
	{ timestamps: true }
);
