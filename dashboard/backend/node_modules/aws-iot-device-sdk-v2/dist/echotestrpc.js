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
exports.createClient = void 0;
/**
 * @packageDocumentation
 * @module echotestrpc
 * @mergeTarget
 */
const echotestrpc = __importStar(require("./echotestrpc/client"));
const eventstream_rpc = __importStar(require("./eventstream_rpc"));
const aws_crt_1 = require("aws-crt");
__exportStar(require("./echotestrpc/client"), exports);
/**
 * Creates a new EchoTest RPC client
 *
 * @param config RPC client configuration
 */
function createClient(config) {
    eventstream_rpc.validateRpcClientConfig(config);
    let echoConfig = {
        hostName: config.hostName,
        port: config.port,
        connectTransform: (options) => __awaiter(this, void 0, void 0, function* () {
            let connectMessage = options.message;
            if (!connectMessage.headers) {
                connectMessage.headers = [];
            }
            connectMessage.headers.push(aws_crt_1.eventstream.Header.newString('client-name', 'accepted.testy_mc_testerson'));
            return connectMessage;
        })
    };
    return new echotestrpc.Client(echoConfig);
}
exports.createClient = createClient;
//# sourceMappingURL=echotestrpc.js.map