/**
 * Describes a Greengrass core endpoint that a device can connect to
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
export declare class ConnectivityInfo {
    /** Connectivity entry identifier */
    readonly id: string;
    /** Endpoint address */
    readonly host_address: string;
    /** Endpoint port */
    readonly port: number;
    /** Additional user-configurable metadata about the connectivity entry */
    readonly metadata?: any;
    private constructor();
    /** @internal */
    static from_json(json: any): ConnectivityInfo;
}
/**
 * Describes a Greengrass Core
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
export declare class GGCore {
    /** resource name of the IoT thing associated with a Greengrass core */
    readonly thing_arn: string;
    /** list of distinct ways to connect to the associated Greengrass core */
    readonly connectivity: ConnectivityInfo[];
    private constructor();
    /** @internal */
    static from_json(json: any): GGCore;
}
/**
 * Describes a Greengrass group
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
export declare class GGGroup {
    /** identifier for the Greengrass group */
    readonly gg_group_id: string;
    /** List of Greengrass cores associated with the group */
    readonly cores: GGCore[];
    /** List of certificate authorities (in PEM format) associated with the Greengrass group */
    readonly certificate_authorities: string[];
    private constructor();
    /** @internal */
    static from_json(json: any): GGGroup;
}
/**
 * Response returned from a {@link DiscoveryClient.discover} call
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
export declare class DiscoverResponse {
    /** List of discovered Greengrass groups */
    readonly gg_groups: GGGroup[];
    private constructor();
    /** @internal */
    static from_json(json: any): DiscoverResponse;
}
