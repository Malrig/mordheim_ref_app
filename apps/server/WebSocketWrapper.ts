import { Data, WebSocket } from 'ws';
import { ConnectionInfo } from './WebSocketServerWrapper';

export class WebSocketWrapper extends WebSocket {
  public connectionInfo?: ConnectionInfo;

  constructor(
    address: string | URL | null,
    protocols?: string | string[],
    options?: any
  ) {
    super(address as string | URL, protocols, options);
  }

  on(event: string, listener: (...args: any[]) => void): this {
    if (event === 'message') {
      const originalListener = listener;
      listener = (data: Data) => {
        // Check permissions for the user
        // TODO: Should parse the data and determine what sort of action is being taken. Ideally this would be done
        //       using `src\synchronizers\common.ts` from tinybase. You could then apply permissions based on the
        //       action (disconnecting if there are no appropriate permissions).
        //       The users role and permissions are available in the `this.userClaims` object. The store name is
        //       available in `this.store`.

        // Call the original tinybase listener
        originalListener(data);
      };
    }
    return super.on(event, listener);
  }

  public hasPermission(permission: string): boolean {
    return this.connectionInfo?.permissions.includes(permission) ?? false;
  }

  public getRole(): string | undefined {
    return this.connectionInfo?.user_role;
  }
}
