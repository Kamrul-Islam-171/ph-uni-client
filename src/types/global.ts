import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TError = {
    data: {
        message: string;
        stack:string;
        success:string;
    },
    status: number;
}

export type TMeta = {
    limit:number; 
    page:number; 
    total:number; 
    totalPage:number; 
}

export type TResponse <T> = {
    data?: T;
    error?: TError;
    meta?:TMeta;
    success?:boolean;
    messate?:string
}

export type TQueryParams = {
    name:string;
    value: boolean | React.Key
}

export type TresponseData = {
    _id:string;
    name:string;
    createdAt:string;
    updatedAt: string;
    __v:number;
}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;