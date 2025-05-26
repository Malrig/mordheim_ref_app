import { Server } from 'ws';
import type { ServerOptions, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { WebSocketWrapper } from './WebSocketWrapper';
import { createClient } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import {
  ALL_STORES,
  USER_SPECIFIC_STORES,
  userSpecificStoreName,
} from 'mordheim-common';

interface JWTClaims {
  user_role?: string;
  permissions?: string[];
}
export interface ConnectionInfo {
  user_id: string;
  user_role: string;
  permissions: string[];
  path: string;
}

export class WebSocketServerWrapper extends Server {
  private supabase;
  private connectionInfo: Map<string, ConnectionInfo> = new Map();

  constructor(options: ServerOptions) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        'Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.'
      );
    }

    const verifyClient = async (
      info: { req: IncomingMessage },
      callback: (res: boolean, code?: number, message?: string) => void
    ): Promise<void> => {
      console.log(
        `Verifying client connection from ${info.req.socket.remoteAddress}`
      );
      const { isAuthenticated, connectionInfo } = await this.checkAuth(
        info.req
      );

      if (isAuthenticated) {
        console.log(
          `Client ${info.req.socket.remoteAddress} verified successfully`
        );
        if (connectionInfo) {
          this.connectionInfo.set(
            info.req.socket.remoteAddress!,
            connectionInfo
          );
        }
        callback(true);
      } else {
        console.log(
          `Client ${info.req.socket.remoteAddress} verification failed`
        );
        callback(false, 401, 'Unauthorized');
      }
    };

    super({
      ...options,
      WebSocket: WebSocketWrapper as unknown as typeof WebSocket,
      verifyClient,
    });

    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  private async checkAuth(
    request: IncomingMessage
  ): Promise<{ isAuthenticated: boolean; connectionInfo?: ConnectionInfo }> {
    const url = new URL(request.url || '', `http://${request.headers.host}`);
    const token = url.searchParams.get('token');
    console.log(
      `Auth attempt from ${request.socket.remoteAddress} with token: ${token ? 'present' : 'missing'}`
    );

    if (!token) {
      console.log('Auth failed: No token provided');
      return { isAuthenticated: false };
    }

    try {
      const {
        data: { user },
        error: supabase_error,
      } = await this.supabase.auth.getUser(token);

      if (supabase_error) {
        console.log(
          `Auth failed: ${supabase_error.message}, ${supabase_error.toString()}`
        );
        return { isAuthenticated: false };
      }

      if (!user) {
        console.log('Auth failed: No user found for token');
        return { isAuthenticated: false };
      }

      // Decode the JWT to get role and permissions
      const claims = jwtDecode<JWTClaims>(token);
      console.log(
        `Auth succeeded for user: ${user.email} with role: ${claims.user_role} and permissions: ${claims.permissions?.join(', ')}`
      );

      // Validate store path
      const {
        isValid,
        path,
        error: path_error,
      } = this.validateAndExtractStorePath(request, user.id);

      if (!isValid) {
        console.log(
          `Auth failed for user ${user.email} to path ${path}: ${path_error}`
        );
        return { isAuthenticated: false };
      }

      console.log(
        `User ${user.email} authenticated successfully to path ${path}`
      );
      return {
        isAuthenticated: true,
        connectionInfo: {
          user_id: user.id,
          path: path || '',
          user_role: claims.user_role || '',
          permissions: claims.permissions || [],
        },
      };
    } catch (error) {
      console.log('Auth failed: Error validating token', error);
      return { isAuthenticated: false };
    }
  }

  private validateAndExtractStorePath(
    request: IncomingMessage,
    user_id: string
  ): { isValid: boolean; path?: string; error?: string } {
    if (!request.url) {
      return { isValid: false, error: 'No URL provided' };
    }
    let path;

    try {
      const parsedUrl = new URL(request.url, `ws://${request.headers.host}`);
      path = parsedUrl.pathname.replace(/^\//, '');
    } catch (error) {
      return { isValid: false, error: `Invalid URL format: ${error}` };
    }

    // Is it a shared store
    if (ALL_STORES.includes(path)) {
      return { isValid: true, path };
    }

    const valid_user_specific_store = USER_SPECIFIC_STORES.some(
      (store) => path == userSpecificStoreName(store, user_id)
    );

    if (valid_user_specific_store) {
      return { isValid: true, path };
    }

    return {
      isValid: false,
      path: path,
      error: `Invalid store path. Supported stores: ${ALL_STORES.join(', ')}, or user specific stores: ${USER_SPECIFIC_STORES.join(', ')}`,
    };
  }

  public getConnectionInfo(remoteAddress: string): ConnectionInfo | undefined {
    return this.connectionInfo.get(remoteAddress);
  }

  on(event: string, listener: (...args: any[]) => void): this {
    if (event === 'connection') {
      const originalListener = listener;
      listener = (ws: WebSocketWrapper, req: IncomingMessage) => {
        // Get the user claims and pass them to the WebSocketWrapper
        const info = this.getConnectionInfo(req.socket.remoteAddress!);
        if (info) {
          ws.connectionInfo = info;
        }

        // Call the original listener
        originalListener(ws, req);
      };
    }

    return super.on(event, listener);
  }
}
