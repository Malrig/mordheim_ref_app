import { Server } from 'ws';
import type { ServerOptions, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { WebSocketWrapper } from './WebSocketWrapper';
import { createClient } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import { ALL_STORES } from 'mordheim-common';

interface JWTClaims {
  user_role?: string;
  permissions?: string[];
}

// List of supported stores
// const ALL_STORES = ['/datastore', '/settings', '/ui'];

export class WebSocketServerWrapper extends Server {
  private supabase;
  private userClaims: Map<string, JWTClaims> = new Map();

  constructor(options: ServerOptions) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
    }

    const verifyClient = async (info: { req: IncomingMessage }, callback: (res: boolean, code?: number, message?: string) => void) => {
      console.log(`Verifying client connection from ${info.req.socket.remoteAddress}`);
      const { isAuthenticated, claims } = await this.checkAuth(info.req);
      
      if (isAuthenticated) {
        console.log(`Client ${info.req.socket.remoteAddress} verified successfully`);
        if (claims) {
          this.userClaims.set(info.req.socket.remoteAddress!, claims);
        }
        callback(true);
      } else {
        console.log(`Client ${info.req.socket.remoteAddress} verification failed`);
        callback(false, 401, 'Unauthorized');
      }
    };

    super({
      ...options,
      WebSocket: WebSocketWrapper as unknown as typeof WebSocket,
      verifyClient
    });

    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  private async checkAuth(request: IncomingMessage): Promise<{ isAuthenticated: boolean; claims?: JWTClaims }> {
    const url = new URL(request.url || '', `http://${request.headers.host}`);
    const token = url.searchParams.get('token');
    console.log(`Auth attempt from ${request.socket.remoteAddress} with token: ${token ? 'present' : 'missing'}`);

    if (!token) {
      console.log('Auth failed: No token provided');
      return { isAuthenticated: false };
    }

    try {
      const { data: { user }, error: supabase_error } = await this.supabase.auth.getUser(token);
      
      if (supabase_error) {
        console.log(`Auth failed: ${supabase_error.message}, ${supabase_error.toString()}`);
        return { isAuthenticated: false };
      }

      if (!user) {
        console.log('Auth failed: No user found for token');
        return { isAuthenticated: false };
      }

      // Decode the JWT to get role and permissions
      const claims = jwtDecode<JWTClaims>(token);
      console.log(`Auth succeeded for user: ${user.email} with role: ${claims.user_role} and permissions: ${claims.permissions?.join(', ')}`);

      // Validate store path
      const { isValid, path, error: path_error } = this.validateAndExtractStorePath(request);

      if (!isValid) {
        console.log(`Auth failed for user ${user.email} to path ${path}: ${path_error}`);
        return { isAuthenticated: false };
      }

      return { 
        isAuthenticated: true,
        claims: {
          user_role: claims.user_role,
          permissions: claims.permissions
        }
      };
    } catch (error) {
      console.log('Auth failed: Error validating token', error);
      return { isAuthenticated: false };
    }
  }

  private validateAndExtractStorePath(request: IncomingMessage): { isValid: boolean; path?: string; error?: string } {
    if (!request.url) {
      return { isValid: false, error: 'No URL provided' };
    }

    try {
      const parsedUrl = new URL(request.url, `ws://${request.headers.host}`);
      const path = parsedUrl.pathname.replace(/^\//, '');
      
      if (!ALL_STORES.includes(path)) {
        return { 
          isValid: false, 
          path: path,
          error: `Invalid store path. Supported stores: ${ALL_STORES.join(', ')}` 
        };
      }

      return { isValid: true, path };
    } catch (error) {
      return { isValid: false, error: 'Invalid URL format' };
    }
  }

  public getUserClaims(remoteAddress: string): JWTClaims | undefined {
    return this.userClaims.get(remoteAddress);
  }

  on(event: string, listener: (...args: any[]) => void): this {
    if (event === 'connection') {
      const originalListener = listener;
      listener = (ws: WebSocketWrapper, req: IncomingMessage) => {        
        // Get the user claims and pass them to the WebSocketWrapper
        const claims = this.getUserClaims(req.socket.remoteAddress!);
        if (claims) {
          ws.userClaims = claims;
        }

        // Validate store path, this shouldn't fail as it's been checked in the checkAuth method
        const { isValid, path, error } = this.validateAndExtractStorePath(req);
        if (!isValid) {
          console.log(`Connection rejected: ${error}`);
          ws.close(1008, error);
          return;
        }

        // Set the store parameter
        ws.store = path;
        console.log(`WebSocket connected to store: ${ws.store}`);        
        
        // Call the original listener
        originalListener(ws, req);
      };
    }
    
    return super.on(event, listener);
  }
} 