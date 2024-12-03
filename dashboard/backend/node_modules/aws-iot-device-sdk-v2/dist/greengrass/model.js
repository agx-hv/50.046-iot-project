"use strict";
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoverResponse = exports.GGGroup = exports.GGCore = exports.ConnectivityInfo = void 0;
/**
 * @packageDocumentation
 * @module greengrass
 */
const util_1 = require("util");
/**
 * Describes a Greengrass core endpoint that a device can connect to
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
class ConnectivityInfo {
    constructor(
    /** Connectivity entry identifier */
    id, 
    /** Endpoint address */
    host_address, 
    /** Endpoint port */
    port, 
    /** Additional user-configurable metadata about the connectivity entry */
    metadata) {
        this.id = id;
        this.host_address = host_address;
        this.port = port;
        this.metadata = metadata;
    }
    /** @internal */
    static from_json(json) {
        return new ConnectivityInfo(json.Id, json.HostAddress, json.PortNumber, json.Metadata);
    }
}
exports.ConnectivityInfo = ConnectivityInfo;
/**
 * Describes a Greengrass Core
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
class GGCore {
    constructor(
    /** resource name of the IoT thing associated with a Greengrass core */
    thing_arn, 
    /** list of distinct ways to connect to the associated Greengrass core */
    connectivity) {
        this.thing_arn = thing_arn;
        this.connectivity = connectivity;
    }
    /** @internal */
    static from_json(json) {
        const connectivity = [];
        if (json.Connectivity && (0, util_1.isArray)(json.Connectivity)) {
            json.Connectivity.forEach((payload) => {
                connectivity.push(ConnectivityInfo.from_json(payload));
            });
        }
        return new GGCore(json.thingArn, connectivity);
    }
}
exports.GGCore = GGCore;
/**
 * Describes a Greengrass group
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
class GGGroup {
    constructor(
    /** identifier for the Greengrass group */
    gg_group_id, 
    /** List of Greengrass cores associated with the group */
    cores = [], 
    /** List of certificate authorities (in PEM format) associated with the Greengrass group */
    certificate_authorities = []) {
        this.gg_group_id = gg_group_id;
        this.cores = cores;
        this.certificate_authorities = certificate_authorities;
    }
    /** @internal */
    static from_json(json) {
        const cores = [];
        if (json.Cores && (0, util_1.isArray)(json.Cores)) {
            json.Cores.forEach((payload) => {
                cores.push(GGCore.from_json(payload));
            });
        }
        return new GGGroup(json.GGGroupId, cores, json.CAs);
    }
}
exports.GGGroup = GGGroup;
/**
 * Response returned from a {@link DiscoveryClient.discover} call
 *
 * API Documentation: https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html
 *
 * @category Greengrass
 */
class DiscoverResponse {
    constructor(
    /** List of discovered Greengrass groups */
    gg_groups = []) {
        this.gg_groups = gg_groups;
    }
    /** @internal */
    static from_json(json) {
        const groups = [];
        if (json.GGGroups && (0, util_1.isArray)(json.GGGroups)) {
            json.GGGroups.forEach((payload) => {
                groups.push(GGGroup.from_json(payload));
            });
        }
        return new DiscoverResponse(groups);
    }
}
exports.DiscoverResponse = DiscoverResponse;
//# sourceMappingURL=model.js.map