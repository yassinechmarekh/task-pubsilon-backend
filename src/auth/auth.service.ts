import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel = mongoose.Model<User>, private jwtService: JwtService){}

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async register(registerDto: RegisterDto): Promise<{ token: string }> {
        const { username, email, password } = registerDto;

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const user = await this.userModel.create({
            username,
            email,
            password: hashedpassword
        });

        const payload = { username: user.username, id: user.userId };
        const token = this.jwtService.sign(payload);

        return { token };
    }
}
