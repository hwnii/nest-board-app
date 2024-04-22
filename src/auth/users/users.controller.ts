import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from './users.dto';
import { AuthGuard } from '@nestjs/passport';
import { DUser } from 'src/decorators/user.decorator';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signUp(authCredentialsDto);
  }

  @Post('sign-in')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(authCredentialsDto);
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  test(@DUser() user: User) {
    console.log('user', user);
  }
}
