import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { verifyTokenDto } from './dto/verifyToken.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    async getAllUser(): Promise<User[]> {
        return this.authService.getAll();
    }

    @Post('/register')
    async register(@Body() registerDto: RegisterDto): Promise<{ token: string }> {
        return this.authService.register(registerDto)
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Post('/verify-token')
    async verifyToken(@Body() token: verifyTokenDto): Promise<{isVerify: Boolean}> {
        return this.authService.verifiyToken(token);
    }
}
