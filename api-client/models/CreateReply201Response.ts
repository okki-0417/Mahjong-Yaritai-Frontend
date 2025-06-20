/* tslint:disable */
/* eslint-disable */
/**
 * API V1
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Comment } from './Comment';
import {
    CommentFromJSON,
    CommentFromJSONTyped,
    CommentToJSON,
    CommentToJSONTyped,
} from './Comment';

/**
 * 
 * @export
 * @interface CreateReply201Response
 */
export interface CreateReply201Response {
    /**
     * 
     * @type {Comment}
     * @memberof CreateReply201Response
     */
    whatToDiscardProblemCommentReply: Comment;
}

/**
 * Check if a given object implements the CreateReply201Response interface.
 */
export function instanceOfCreateReply201Response(value: object): value is CreateReply201Response {
    if (!('whatToDiscardProblemCommentReply' in value) || value['whatToDiscardProblemCommentReply'] === undefined) return false;
    return true;
}

export function CreateReply201ResponseFromJSON(json: any): CreateReply201Response {
    return CreateReply201ResponseFromJSONTyped(json, false);
}

export function CreateReply201ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateReply201Response {
    if (json == null) {
        return json;
    }
    return {
        
        'whatToDiscardProblemCommentReply': CommentFromJSON(json['what_to_discard_problem_comment_reply']),
    };
}

export function CreateReply201ResponseToJSON(json: any): CreateReply201Response {
    return CreateReply201ResponseToJSONTyped(json, false);
}

export function CreateReply201ResponseToJSONTyped(value?: CreateReply201Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'what_to_discard_problem_comment_reply': CommentToJSON(value['whatToDiscardProblemCommentReply']),
    };
}

