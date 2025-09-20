import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwt: JwtService,
    ) { }

    async register(email: string, password: string, name?: string, role: string = 'user') {
        const exists = await this.userModel.findOne({ email: email.toLowerCase() });        
        if (exists) throw new ConflictException('Email already registered');
        const hash = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({ email: email.toLowerCase() ,password: hash, name, role });
        return { id: user._id, email: user.email, role: user.role };
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email: email.toLowerCase() });
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new UnauthorizedException('Invalid credentials');
        const token = await this.jwt.signAsync({ sub: user._id, email: user.email });
        return { token, user: { id: user._id, email: user.email, role: user.role } };
    }
}
