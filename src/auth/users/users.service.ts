import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './users.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;

    const salt = await genSalt();
    const encryptedPassword = await hash(password, salt);

    const user = this.userRepository.create({ username, encryptedPassword });

    try {
      await this.userRepository.save(user);
      const accessToken = this.generatedAccessToken(user);
      return { accessToken };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await compare(password, user.encryptedPassword))) {
      const accessToken = this.generatedAccessToken(user);
      return { accessToken };
    } else {
      throw new UnauthorizedException(`login failed`);
    }
  }

  generatedAccessToken(user: User): string {
    const { username } = user;
    return this.jwtService.sign({ username });
  }
}
