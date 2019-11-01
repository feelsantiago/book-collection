import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * This guards wraps native JWT guard for custom authetications methods
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        // custom authentication goes here

        return super.canActivate(context);
    }

    handleRequest(err, payload, info) {

        if (err || !payload) {
            throw err || new UnauthorizedException();
        }

        return payload;
    }
}