import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { GetUsersQueryDto } from './dto/get-users-query.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 1. GET ALL USERS (with optional Query Parameters)
   * Example: GET /user
   * Example with query: GET /user?role=ADMIN or GET /user?search=alice
   */
  @Get()
  findAll(@Query() query: GetUsersQueryDto) {
    return this.userService.findAll(query);
  }

  /**
   * 2. GET SINGLE USER BY ID (Path Parameter)
   * Example: GET /user/1
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * 3. CREATE A NEW USER (POST Request Body)
   * Example: POST /user with JSON body { "name": "John Doe", "email": "john@example.com", "role": "USER" }
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 4. UPDATE A USER (PUT Request Body with ID Param)
   * Example: PUT /user/1 with JSON body { "name": "Alice Updated" }
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * 5. DELETE A USER BY ID (Path Parameter)
   * Example: DELETE /user/1
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
