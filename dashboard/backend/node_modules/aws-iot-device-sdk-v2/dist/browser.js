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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrtError = exports.mqtt5 = exports.mqtt = exports.iotshadow = exports.iotjobs = exports.iotidentity = exports.iot = exports.io = exports.http = exports.greengrass = exports.auth = void 0;
/**
 * Browser entry point for AWS IoT SDK.
 * @packageDocumentation
 * @module aws-iot-device-sdk
 * @mergeTarget
 */
const iotidentity = __importStar(require("./iotidentity/iotidentityclient"));
exports.iotidentity = iotidentity;
const greengrass = __importStar(require("./greengrass/discoveryclient"));
exports.greengrass = greengrass;
const iotjobs = __importStar(require("./iotjobs/iotjobsclient"));
exports.iotjobs = iotjobs;
const iotshadow = __importStar(require("./iotshadow/iotshadowclient"));
exports.iotshadow = iotshadow;
const browser_1 = require("aws-crt/dist.browser/browser");
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return browser_1.auth; } });
Object.defineProperty(exports, "http", { enumerable: true, get: function () { return browser_1.http; } });
Object.defineProperty(exports, "io", { enumerable: true, get: function () { return browser_1.io; } });
Object.defineProperty(exports, "iot", { enumerable: true, get: function () { return browser_1.iot; } });
Object.defineProperty(exports, "mqtt", { enumerable: true, get: function () { return browser_1.mqtt; } });
Object.defineProperty(exports, "mqtt5", { enumerable: true, get: function () { return browser_1.mqtt5; } });
Object.defineProperty(exports, "CrtError", { enumerable: true, get: function () { return browser_1.CrtError; } });
//# sourceMappingURL=browser.js.map