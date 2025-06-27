import { Repository } from 'typeorm';
import { Usuarios } from './entitys/usuarios.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: Repository<Usuarios>, jwtService: JwtService);
    register(login: string, senha: string, nome: string): Promise<{
        message: string;
    }>;
    validateUser(login: string, senha: string): Promise<Usuarios | null>;
    login(login: string, senha: string): Promise<{
        access_token: string;
    }>;
}
