import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthService } from '../shared/services/google-auth.service';
import { UsersService } from '../users/users.service';
import { TokenService } from '../shared/services/token.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService, UsersService, TokenService],
})
export class AuthModule {}
