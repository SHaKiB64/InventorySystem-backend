import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/Administration/admin.service';
import { AdminDTO, loginDTO } from 'src/Administration/admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private blacklistTokens: Set<string> = new Set<string>();

  constructor(
    private adminService: AdminService, 
    private jwtService: JwtService
  ) {}

  async signUp(myobj: AdminDTO): Promise<AdminDTO> {
    return await this.adminService.createAdmin(myobj);
  }

  async signIn( logindata:loginDTO): Promise<{ access_token: string }> {
    const user = await this.adminService.findOneBy(logindata);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials. Please check your email and password.');
    }
    const isMatch = await bcrypt.compare(logindata.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = logindata;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logout(token: string): Promise<{ access_token: string }> {
    this.blacklistTokens.add(token);
      const newToken = await this.jwtService.signAsync({});
  
    return { access_token: newToken };
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistTokens.has(token);
  }
}
