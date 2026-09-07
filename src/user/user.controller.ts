import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { GetUsersQueryDto } from './dto/get-users-query.dto.js';
import { RoleGuard } from '../guards/role.guard.js';
import { Roles } from '../guards/roles.decorator.js';

@Controller('user')
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 1. GET ALL USERS (with optional Query Parameters)
   * Allowed: Any authenticated user
   * Example: GET /user
   */
  @Get()
  findAll(@Query() query: GetUsersQueryDto) {
    return this.userService.findAll(query);
  }

  /**
   * 2. GET SINGLE USER BY ID (Path Parameter)
   * Allowed: Any authenticated user
   * Example: GET /user/1
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * 3. CREATE A NEW USER (POST Request Body)
   * Allowed: ADMIN only
   * Example: POST /user with headers { "x-api-key": "nest-secret-api-key", "x-user-role": "ADMIN" }
   */
  @Post()
  @Roles('ADMIN')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 4. UPDATE A USER (PUT Request Body with ID Param)
   * Allowed: ADMIN or USER
   * Example: PUT /user/1 with headers { "x-api-key": "nest-secret-api-key", "x-user-role": "ADMIN" }
   */
  @Put(':id')
  @Roles('ADMIN', 'USER')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * 5. DELETE A USER BY ID (Path Parameter)
   * Allowed: ADMIN only
   * Example: DELETE /user/1 with headers { "x-api-key": "nest-secret-api-key", "x-user-role": "ADMIN" }
   */
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

