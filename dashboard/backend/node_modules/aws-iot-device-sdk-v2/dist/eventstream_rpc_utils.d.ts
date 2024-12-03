import { eventstream } from "aws-crt";
/**
 * Transforms an eventstream payload type (an opaque blob) to a base64-encoded string
 *
 * @param payload blob to transform
 * @return a base64-encoded string
 */
export declare function encodePayloadAsString(payload: eventstream.Payload): string;
/**
 * Transforms a base64-encoded string to an ArrayBuffer with the raw bytes
 *
 * @param value a base64-encoded string
 * @return an ArrayBuffer of decoded bytes
 */
export declare function transformStringAsPayload(value: string): eventstream.Payload;
/**
 * Transforms a Date to a fractional number: seconds elapsed since epoch
 * @param date Date to transform
 * @return seconds elapsed since epoch
 */
export declare function encodeDateAsNumber(date: Date): number;
/**
 * Transforms a value representing seconds elapsed since epoch into a Date
 * @param value seconds elapsed since epoch
 * @return an equivalent Date
 */
export declare function transformNumberAsDate(value: number): Date;
export type PropertyTransformer = (value: any) => any;
/**
 * Normalization/deserialization helper that replaces a value, if it exists, with a potentially transformed value
 *
 * @param object object to potentially set a property on
 * @param propertyName name of property to replace
 * @param value value to set the property to (or transform and set the property to)
 * @param transformer optional transformation function to apply to value first before setting
 */
export declare function setDefinedProperty(object: any, propertyName: string, value: any, transformer?: PropertyTransformer): void;
/**
 * Normalizes an array value
 *
 * @param value array to normalize
 * @param valueTransformer optional transformation to apply to all array values
 *
 * @return a normalized array
 */
export declare function normalizeArrayValue(value: any, transformer?: PropertyTransformer): any[];
/**
 * Normalization/deserialization helper that replaces an array value, if it exists, with a potentially transformed value
 *
 * @param object object to potentially set an array property on
 * @param propertyName name of property to replace
 * @param value array value to set the property to (or transform and set the property to)
 * @param transformer optional transformation function to apply to all array elements
 */
export declare function setDefinedArrayProperty(object: any, propertyName: string, value: any, transformer?: PropertyTransformer): void;
/**
 * Transforms a map value into a generic object with optional key and value transformation
 *
 * @param value map to transform
 * @param keyTransformer optional transformation to apply to all map keys
 * @param valueTransformer optional transformation to apply to all map values
 *
 * @return map transformed into an object
 */
export declare function normalizeMapValueAsObject(value: any, keyTransformer?: PropertyTransformer, valueTransformer?: PropertyTransformer): any;
/**
 * Normalization/deserialization helper that replaces a javascript Object, if it exists, with a map where the
 * values are potentially transformed
 *
 * @param object object to potentially set an object property on
 * @param propertyName name of property to replace
 * @param value object value to transform into a map
 * @param transformer optional transformation function to apply to all map values
 */
export declare function setDefinedMapPropertyAsObject(object: any, propertyName: string, value: any, keyTransformer?: PropertyTransformer, valueTransformer?: PropertyTransformer): void;
/**
 * Normalization/deserialization helper that replaces an string-keyed map value, if it exists, with a map where the
 * values are potentially transformed
 *
 * @param object object to potentially set a map property on
 * @param propertyName name of property to set
 * @param value map value to set the property to (or transform and set the property to)
 * @param transformer optional transformation function to apply to all map values
 */
export declare function setDefinedObjectPropertyAsMap(object: any, propertyName: string, value: any, keyTransformer?: PropertyTransformer, valueTransformer?: PropertyTransformer): void;
/**
 * Throws an error if a property value is not a string
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsString(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a string or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalString(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a number
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsNumber(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a number or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalNumber(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not an integer
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsInteger(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not an integer or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalInteger(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a boolean
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsBoolean(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a boolean or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalBoolean(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a Date
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsDate(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a Date or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalDate(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a valid eventstream payload (blob) type
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsBlob(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a valid eventstream payload type or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalBlob(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a valid defined object
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsAny(value: any, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a valid JS object or undefined (always succeeds)
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalAny(value: any, propertyName?: string, type?: string): void;
export type ElementValidator = (value: any) => void;
/**
 * Throws an error if a property value is not a valid array type
 *
 * @param value value to check
 * @param elementValidator validation function to apply to each array element
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsArray(value: any, elementValidator: ElementValidator, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a valid array type or undefined
 *
 * @param value value to check
 * @param elementValidator validation function to apply to each array element
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalArray(value: any, elementValidator: ElementValidator, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a valid map type
 *
 * @param value value to check
 * @param elementValidator validation function to apply to each map value
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsMap(value: any, keyValidator: ElementValidator, valueValidator: ElementValidator, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value is not a valid map type or undefined
 *
 * @param value value to check
 * @param elementValidator validation function to apply to each map value
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalMap(value: any, keyValidator: ElementValidator, valueValidator: ElementValidator, propertyName?: string, type?: string): void;
/**
 * Throws an error if a property value does not pass a validation check
 *
 * @param value value to check
 * @param elementValidator validation function to apply to the property value
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsObject(value: any, elementValidator: ElementValidator, propertyName: string, type: string): void;
/**
 * Throws an error if a property value does not pass a validation check and is defined
 *
 * @param value value to check
 * @param elementValidator validation function to apply to the property value
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
export declare function validateValueAsOptionalObject(value: any, elementValidator: ElementValidator, propertyName: string, type: string): void;
export type UnionTransformer = Map<string, PropertyTransformer | undefined>;
export type UnionValidator = Map<string, ElementValidator | undefined>;
/**
 * Throws a validation error if:
 *   (1) the value does not have exactly one modeled property set, or
 *   (2) the set property does not pass validation
 *
 * @param value union value to check
 * @param validators a map of validators, from (union) property name to validation function
 */
export declare function validateValueAsUnion(value: any, validators: UnionValidator): void;
