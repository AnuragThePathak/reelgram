"use server"

import mongoose from "mongoose"

let cache = global.mongoose
if (!cache) {
	cache = global.mongoose = { conn: null, promise: null }
}

export async function connectToDb() {
	if (cache.conn) {
		return cache.conn
	}

	if (!cache.promise) {
		cache.promise = mongoose.connect(`${process.env.MONGO_URI!}/image-kit`, {
			maxPoolSize: 10,
		})
		.then(() => mongoose.connection)
	}

	cache.conn = await cache.promise
	return cache.conn
}