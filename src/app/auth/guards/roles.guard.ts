import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

/**
 * This guard is a generic roles authenticate, when a controller has action with differs roles
 * Use with @Roles(...roles) decorator
 */
@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {
    }

    /**
     * This guard priorize roles seted for actions, if no, than use roles for controller
     * @param context 
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        // get actions roles
        let roles = this.reflector.get<string[]>('roles', context.getHandler());

        // action dont has roles
        if (!roles) {

            // get roles for controller
            roles = this.reflector.get<string[]>('roles', context.getClass());

            // no roles based, authorize
            if (!roles)
                return true;
        }

        // search for a role match
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = () => roles.includes(user.role);

        return user && user.role && hasRole();
    }
}