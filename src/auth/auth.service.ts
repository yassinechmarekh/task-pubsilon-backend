import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { verifyTokenDto } from './dto/verifyToken.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel = mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async register(registerDto: RegisterDto): Promise<{ token: string }> {
    const { username, email, password } = registerDto;

    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new ConflictException(`${email} is already exist !`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await this.userModel.create({
      username,
      email,
      password: hashedpassword,
    });

    const payload = { username: user.username, id: user._id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password !');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password !');
    }

    const payload = { username: user.username, id: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async verifiyToken(verifyDto: verifyTokenDto): Promise<{isVerify: Boolean}> {
    try {
      const decoded = this.jwtService.verify(verifyDto.token);

      const user = await this.userModel.findById(decoded.id);

      if (!user) {
        return { isVerify: false};
      }

      return { isVerify: true}
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
