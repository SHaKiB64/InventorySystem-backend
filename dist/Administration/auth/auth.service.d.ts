import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/Administration/admin.service';
import { AdminDTO, loginDTO } from 'src/Administration/admin.dto';
export declare class AuthService {
    private adminService;
    private jwtService;
    private blacklistTokens;
    constructor(adminService: AdminService, jwtService: JwtService);
    signUp(myobj: AdminDTO): Promise<AdminDTO>;
    signIn(logindata: loginDTO): Promise<{
        access_token: string;
    }>;
    logout(token: string): Promise<{
        access_token: string;
    }>;
    isTokenBlacklisted(token: string): boolean;
}
