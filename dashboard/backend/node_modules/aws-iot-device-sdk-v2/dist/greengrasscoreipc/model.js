"use strict";
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QOS = exports.ReceiveMode = exports.ReportedLifecycleState = exports.RequestStatus = exports.FailureHandlingPolicy = exports.CertificateType = exports.ConfigurationValidityStatus = exports.PayloadFormat = exports.MetricUnitType = exports.LifecycleState = exports.DeploymentStatus = exports.DetailedDeploymentStatus = void 0;
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var DetailedDeploymentStatus;
(function (DetailedDeploymentStatus) {
    DetailedDeploymentStatus["SUCCESSFUL"] = "SUCCESSFUL";
    DetailedDeploymentStatus["FAILED_NO_STATE_CHANGE"] = "FAILED_NO_STATE_CHANGE";
    DetailedDeploymentStatus["FAILED_ROLLBACK_NOT_REQUESTED"] = "FAILED_ROLLBACK_NOT_REQUESTED";
    DetailedDeploymentStatus["FAILED_ROLLBACK_COMPLETE"] = "FAILED_ROLLBACK_COMPLETE";
    DetailedDeploymentStatus["REJECTED"] = "REJECTED";
})(DetailedDeploymentStatus = exports.DetailedDeploymentStatus || (exports.DetailedDeploymentStatus = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var DeploymentStatus;
(function (DeploymentStatus) {
    DeploymentStatus["QUEUED"] = "QUEUED";
    DeploymentStatus["IN_PROGRESS"] = "IN_PROGRESS";
    DeploymentStatus["SUCCEEDED"] = "SUCCEEDED";
    DeploymentStatus["FAILED"] = "FAILED";
    DeploymentStatus["CANCELED"] = "CANCELED";
})(DeploymentStatus = exports.DeploymentStatus || (exports.DeploymentStatus = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var LifecycleState;
(function (LifecycleState) {
    LifecycleState["RUNNING"] = "RUNNING";
    LifecycleState["ERRORED"] = "ERRORED";
    LifecycleState["NEW"] = "NEW";
    LifecycleState["FINISHED"] = "FINISHED";
    LifecycleState["INSTALLED"] = "INSTALLED";
    LifecycleState["BROKEN"] = "BROKEN";
    LifecycleState["STARTING"] = "STARTING";
    LifecycleState["STOPPING"] = "STOPPING";
})(LifecycleState = exports.LifecycleState || (exports.LifecycleState = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var MetricUnitType;
(function (MetricUnitType) {
    MetricUnitType["BYTES"] = "BYTES";
    MetricUnitType["BYTES_PER_SECOND"] = "BYTES_PER_SECOND";
    MetricUnitType["COUNT"] = "COUNT";
    MetricUnitType["COUNT_PER_SECOND"] = "COUNT_PER_SECOND";
    MetricUnitType["MEGABYTES"] = "MEGABYTES";
    MetricUnitType["SECONDS"] = "SECONDS";
})(MetricUnitType = exports.MetricUnitType || (exports.MetricUnitType = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var PayloadFormat;
(function (PayloadFormat) {
    PayloadFormat["BYTES"] = "0";
    PayloadFormat["UTF8"] = "1";
})(PayloadFormat = exports.PayloadFormat || (exports.PayloadFormat = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var ConfigurationValidityStatus;
(function (ConfigurationValidityStatus) {
    ConfigurationValidityStatus["ACCEPTED"] = "ACCEPTED";
    ConfigurationValidityStatus["REJECTED"] = "REJECTED";
})(ConfigurationValidityStatus = exports.ConfigurationValidityStatus || (exports.ConfigurationValidityStatus = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var CertificateType;
(function (CertificateType) {
    CertificateType["SERVER"] = "SERVER";
})(CertificateType = exports.CertificateType || (exports.CertificateType = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var FailureHandlingPolicy;
(function (FailureHandlingPolicy) {
    FailureHandlingPolicy["ROLLBACK"] = "ROLLBACK";
    FailureHandlingPolicy["DO_NOTHING"] = "DO_NOTHING";
})(FailureHandlingPolicy = exports.FailureHandlingPolicy || (exports.FailureHandlingPolicy = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["SUCCEEDED"] = "SUCCEEDED";
    RequestStatus["FAILED"] = "FAILED";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var ReportedLifecycleState;
(function (ReportedLifecycleState) {
    ReportedLifecycleState["RUNNING"] = "RUNNING";
    ReportedLifecycleState["ERRORED"] = "ERRORED";
})(ReportedLifecycleState = exports.ReportedLifecycleState || (exports.ReportedLifecycleState = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var ReceiveMode;
(function (ReceiveMode) {
    ReceiveMode["RECEIVE_ALL_MESSAGES"] = "RECEIVE_ALL_MESSAGES";
    ReceiveMode["RECEIVE_MESSAGES_FROM_OTHERS"] = "RECEIVE_MESSAGES_FROM_OTHERS";
})(ReceiveMode = exports.ReceiveMode || (exports.ReceiveMode = {}));
/**
 * To preserve backwards compatibility, no validation is performed on enum-valued fields.
 */
var QOS;
(function (QOS) {
    QOS["AT_MOST_ONCE"] = "0";
    QOS["AT_LEAST_ONCE"] = "1";
})(QOS = exports.QOS || (exports.QOS = {}));
//# sourceMappingURL=model.js.map