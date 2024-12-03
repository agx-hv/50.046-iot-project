"use strict";
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 *
 * This file is generated
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobStatus = exports.RejectedErrorCode = void 0;
/**
 * A value indicating the kind of error encountered while processing an AWS IoT Jobs request
 *
 * @category IotJobs
 */
var RejectedErrorCode;
(function (RejectedErrorCode) {
    RejectedErrorCode["UNKNOWN_ENUM_VALUE"] = "UNKNOWN_ENUM_VALUE";
    /**
     * The request was sent to a topic in the AWS IoT Jobs namespace that does not map to any API.
     */
    RejectedErrorCode["INVALID_TOPIC"] = "InvalidTopic";
    /**
     * An update attempted to change the job execution to a state that is invalid because of the job execution's current state. In this case, the body of the error message also contains the executionState field.
     */
    RejectedErrorCode["INVALID_STATE_TRANSITION"] = "InvalidStateTransition";
    /**
     * The JobExecution specified by the request topic does not exist.
     */
    RejectedErrorCode["RESOURCE_NOT_FOUND"] = "ResourceNotFound";
    /**
     * The contents of the request were invalid. The message contains details about the error.
     */
    RejectedErrorCode["INVALID_REQUEST"] = "InvalidRequest";
    /**
     * The request was throttled.
     */
    RejectedErrorCode["REQUEST_THROTTLED"] = "RequestThrottled";
    /**
     * There was an internal error during the processing of the request.
     */
    RejectedErrorCode["INTERNAL_ERROR"] = "InternalError";
    /**
     * Occurs when a command to describe a job is performed on a job that is in a terminal state.
     */
    RejectedErrorCode["TERMINAL_STATE_REACHED"] = "TerminalStateReached";
    /**
     * The contents of the request could not be interpreted as valid UTF-8-encoded JSON.
     */
    RejectedErrorCode["INVALID_JSON"] = "InvalidJson";
    /**
     * The expected version specified in the request does not match the version of the job execution in the AWS IoT Jobs service. In this case, the body of the error message also contains the executionState field.
     */
    RejectedErrorCode["VERSION_MISMATCH"] = "VersionMismatch";
})(RejectedErrorCode = exports.RejectedErrorCode || (exports.RejectedErrorCode = {}));
/**
 * The status of the job execution.
 *
 * @category IotJobs
 */
var JobStatus;
(function (JobStatus) {
    JobStatus["UNKNOWN_ENUM_VALUE"] = "UNKNOWN_ENUM_VALUE";
    JobStatus["IN_PROGRESS"] = "IN_PROGRESS";
    JobStatus["FAILED"] = "FAILED";
    JobStatus["QUEUED"] = "QUEUED";
    JobStatus["TIMED_OUT"] = "TIMED_OUT";
    JobStatus["SUCCEEDED"] = "SUCCEEDED";
    JobStatus["CANCELED"] = "CANCELED";
    JobStatus["REJECTED"] = "REJECTED";
    JobStatus["REMOVED"] = "REMOVED";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
//# sourceMappingURL=model.js.map