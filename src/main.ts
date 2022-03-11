import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function start() {
	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(PORT);
	console.log(`Server listen on port ${PORT}`);
}
start();
