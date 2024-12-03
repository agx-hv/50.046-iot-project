/**
 * @packageDocumentation
 * @module greengrasscoreipc
 * @mergeTarget
 */
import * as greengrasscoreipc from "./greengrasscoreipc/client";
import * as eventstream_rpc from "./eventstream_rpc";
export * from "./greengrasscoreipc/client";
/**
 * @return a default client configuration that can be used to connect to the Greengrass RPC service over
 *  domain sockets.
 */
export declare function createDefaultClientConfig(): eventstream_rpc.RpcClientConfig;
/**
 * Creates a new greengrass RPC client, using environment variables to guide configuration as needed
 *
 * @param config optional RPC configuration.  If not provided, a default configuration will be created.
 */
export declare function createClient(config?: eventstream_rpc.RpcClientConfig): greengrasscoreipc.Client;
