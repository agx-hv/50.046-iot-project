/**
 * @packageDocumentation
 * @module echotestrpc
 * @mergeTarget
 */
import * as echotestrpc from "./echotestrpc/client";
import * as eventstream_rpc from "./eventstream_rpc";
export * from "./echotestrpc/client";
/**
 * Creates a new EchoTest RPC client
 *
 * @param config RPC client configuration
 */
export declare function createClient(config: eventstream_rpc.RpcClientConfig): echotestrpc.Client;
