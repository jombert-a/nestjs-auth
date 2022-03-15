import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '@/users/users.module';

console.log(process.env.JWT_SECRET);

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get('JWT_SECRET'),
			}),
		}),
		UsersModule
	],
})
export class AuthModule {}
