import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        login: string;
        senha: string;
        nome: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        login: string;
        senha: string;
    }): Promise<{
        access_token: string;
    }>;
}
