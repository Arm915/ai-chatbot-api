import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private roles: string[]) { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user || !this.roles.includes(user.role)) {
            throw new ForbiddenException('คุณไม่มีสิทธิ์เข้าถึง');
        }
        return true;
    }
}
