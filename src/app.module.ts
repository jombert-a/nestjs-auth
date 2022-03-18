import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guards/roles.guards';
import { JwtModule } from '@nestjs/jwt';
import { Role, RoleSchema } from './modules/roles/schems/role.schemas';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
			isGlobal: true,
		}),
		MongooseModule.forRoot(process.env.MONGO_URL),
		MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
		UsersModule,
		AuthModule,
		RolesModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get('JWT_SECRET'),
			}),
		}),
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
