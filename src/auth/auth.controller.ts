// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) { }

    @Post('register')
    register(@Body() dto: { email: string; password: string; name?: string }) {
        return this.auth.register(dto.email, dto.password, dto.name);
    }

    @Post('login')
    login(@Body() dto: { email: string; password: string }) {
        return this.auth.login(dto.email, dto.password);
    }
}
