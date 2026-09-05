import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { GetUsersQueryDto } from './dto/get-users-query.dto.js';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
}

@Injectable()
export class UserService {
  // In-memory user list for demonstration
  private users: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'ADMIN' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'USER' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'GUEST' },
  ];

  // GET ALL / GET WITH QUERY PARAMETERS (e.g. ?role=ADMIN or ?search=Alice)
  findAll(query?: GetUsersQueryDto): User[] {
    let result = [...this.users];

    if (query?.role) {
      result = result.filter((u) => u.role.toLowerCase() === query.role?.toLowerCase());
    }

    if (query?.search) {
      const keyword = query.search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(keyword) ||
          u.email.toLowerCase().includes(keyword),
      );
    }

    return result;
  }

  // GET SINGLE USER BY ID
  findOne(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  // CREATE NEW USER (POST)
  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: String(Date.now()), // Generate simple unique ID
      name: createUserDto.name,
      email: createUserDto.email,
      role: createUserDto.role || 'USER',
    };
    this.users.push(newUser);
    return newUser;
  }

  // UPDATE USER BY ID (PUT / PATCH)
  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const existingUser = this.users[userIndex];
    const updatedUser: User = {
      ...existingUser,
      ...updateUserDto,
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  // DELETE USER BY ID (DELETE)
  remove(id: string): { message: string; deletedUser: User } {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const [deletedUser] = this.users.splice(userIndex, 1);
    return {
      message: `User with ID "${id}" deleted successfully`,
      deletedUser,
    };
  }
}
