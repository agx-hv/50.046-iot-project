"use strict";
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = exports.createDefaultClientConfig = void 0;
/**
 * @packageDocumentation
 * @module greengrasscoreipc
 * @mergeTarget
 */
const greengrasscoreipc = __importStar(require("./greengrasscoreipc/client"));
const eventstream_rpc = __importStar(require("./eventstream_rpc"));
const aws_crt_1 = require("aws-crt");
__exportStar(require("./greengrasscoreipc/client"), exports);
/**
 * @return a default client configuration that can be used to connect to the Greengrass RPC service over
 *  domain sockets.
 */
function createDefaultClientConfig() {
    let envHostName = process.env.AWS_GG_NUCLEUS_DOMAIN_SOCKET_FILEPATH_FOR_COMPONENT;
    let envAuthToken = process.env.SVCUID;
    return {
        hostName: (envHostName) ? envHostName : "",
        port: 0,
        socketOptions: new aws_crt_1.io.SocketOptions(aws_crt_1.io.SocketType.STREAM, aws_crt_1.io.SocketDomain.LOCAL),
        connectTransform: (options) => __awaiter(this, void 0, void 0, function* () {
            let connectMessage = options.message;
            if (envAuthToken) {
                connectMessage.payload = JSON.stringify({
                    authToken: envAuthToken
                });
            }
            return connectMessage;
        })
    };
}
exports.createDefaultClientConfig = createDefaultClientConfig;
/**
 * Creates a new greengrass RPC client, using environment variables to guide configuration as needed
 *
 * @param config optional RPC configuration.  If not provided, a default configuration will be created.
 */
function createClient(config) {
    if (!config) {
        config = createDefaultClientConfig();
    }
    eventstream_rpc.validateRpcClientConfig(config);
    return new greengrasscoreipc.Client(config);
}
exports.createClient = createClient;
//# sourceMappingURL=greengrasscoreipc.js.map