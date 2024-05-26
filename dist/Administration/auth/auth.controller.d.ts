/// <reference types="multer" />
import { AuthService } from './auth.service';
import { AdminDTO, loginDTO } from 'src/Administration/admin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createAdmin(adminDTO: AdminDTO, myfile: Express.Multer.File): Promise<AdminDTO>;
    signIn(logindata: loginDTO): Promise<{
        access_token: string;
    }>;
}
