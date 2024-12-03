/**
 * @packageDocumentation
 * @module greengrass
 * @mergeTarget
 */
import { io } from 'aws-crt';
import * as model from './model';
export { model };
/**
 * @category Greengrass
 */
export declare class DiscoveryError extends Error {
    readonly response_code?: number | undefined;
    constructor(message: string, response_code?: number | undefined);
}
/**
 * Greengrass Discovery Client
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
export declare class DiscoveryClient {
    readonly bootstrap: io.ClientBootstrap;
    private socket_options;
    private tls_ctx;
    readonly region: string;
    readonly gg_server_name: string;
    private connection_manager;
    private endpoint;
    /**
     *
     * @param bootstrap The `ClientBootstrap` to use to make an HTTP connection to the Greengrass service
     * @param socket_options `SocketOptions` for HTTP connection to the Greengrass service
     * @param tls_ctx TLS Options for the HTTP connection to Greengrass service
     * @param region Region to send Greengrass discovery requests to (ignored if gg_server_name is set)
     * @param gg_server_name Optional name of greengrass endpoint
     */
    constructor(bootstrap: io.ClientBootstrap, socket_options: io.SocketOptions, tls_ctx: io.ClientTlsContext, region: string, gg_server_name?: string);
    /**
     * Performs the discover API call for the supplied Thing, and returns any associated Greengrass
     * groups/cores/connection info.
     *
     * @param thing_name The name of your IoT Thing, as configured in the console for Greengrass
     */
    discover(thing_name: string): Promise<model.DiscoverResponse>;
}
