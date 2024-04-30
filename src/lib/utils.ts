import { twMerge } from "tailwind-merge";
import { clsx,ClassValue } from "clsx";
import { IURLParams } from "./types";

export function cn(...inputs:ClassValue[]){
    return twMerge(clsx(inputs));
}

// Function to update URL parameters
export function updateURLParameter(allParams:IURLParams) {

    var urlString = window.location.href.split('?')[0];
    // Parse the URL query parameters
    var urlParams = new URLSearchParams();

    Object.keys(allParams).forEach((key)=>{
        urlParams.set(key,allParams[key]);
    })
    
    // Construct the new URL with updated parameters
    var newURL = urlString + '?' + urlParams.toString();
    // Replace the current URL with the new one
    window.history.replaceState({}, '', newURL);

}

// Function to read URL parameters
export function readURLParameters(paramName:string) {
    // Parse the URL query parameters
    var urlParams = new URLSearchParams(window.location.search);
    
    // Get the value of a specific parameter
    var paramValue = urlParams.get(paramName)||"";
    
    return paramValue;
}

