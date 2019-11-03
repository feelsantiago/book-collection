import { Schema } from 'mongoose';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt-nodejs';

export const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		role: { type: String, required: true },
		active: { type: String, default: false }
	},
	{ timestamps: true }
);

// Execute before each account.save() call
UserSchema.pre<User>('save', function (callback) {
	let user = this;

	// Break out if the password hasn't changed
	if (!user.isModified('password')) return callback();

	// Password changed so we need to hash it
	bcrypt.genSalt(5, (err, salt) => {
		if (err) return callback(err);

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return callback(err);
			user.password = hash;
			callback();
		});
	});
});

UserSchema.methods.verifyPassword = (password, hash) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hash, (err, isMatch) => {
			if (err) reject(new Error(err));

			resolve(isMatch);
		});
	});
};
