import { IncomingHttpHeaders } from 'http';
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('signin')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  /**
   *
   * Prueba 1 de decoradores, ejemplos -----------
   * En este ejemplo a modo de documentación usamos custom decorators para obtener:
   * - el usuario de la request
   * - los headers (para este caso en particular es mejor usar el Headers() en vez de nuestro custom decorator)
   *
   */
  @Get('test/private-1')
  @UseGuards(AuthGuard())
  testingPrivateRoute1(
    @GetUser() user: User,
    @GetUser('email') userEmail: User,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Prueba de ruta privada',
      user: user,
      email: userEmail,
      rawHeaders,
      headers,
    };
  }

  /**
   *
   * Prueba 2 de decoradores y guards, ejemplos -----------
   * Creamos el custom guard UserRoleGuard para validar el rol del usuario,
   * Con el RoleProtected, enviamos los roles permitidos
   *
   */
  @Get('test/private-2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user: user,
    };
  }

  /**
   *
   * Prueba 3 de decoradores y guards, ejemplos -----------
   * En este ejemplo simplificamos el ej-2, creamos un decorador solo Auth para que autentique y valide el usuario
   * Auth le podemos enviar los roles permitidos para ingresar a la ruta, si no le enviamos es una ruta publica
   *
   * Esta es la mejor opción de implementar
   *
   */
  @Get('test/private-3')
  @Auth(ValidRoles.superUser)
  testingPrivateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user: user,
    };
  }
}
