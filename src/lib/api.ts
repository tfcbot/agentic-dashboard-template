import { GetRemainingCreditsBody } from "@/types";

const API_CONFIG = {
    baseUrl: process.env.API_BASE_URL,
    version: '/v1',
    defaultHeaders: {
        'Content-Type': 'application/json'
    }
};

const getAbsoluteUrl = (path: string): string => {
    if (!API_CONFIG.baseUrl) {
        throw new Error('API_BASE_URL is not defined');
    }
    return new URL(API_CONFIG.version + path, API_CONFIG.baseUrl).toString();
};

const getHeaders = (token: string): HeadersInit => {
    return {
        ...API_CONFIG.defaultHeaders,
        'Authorization': `Bearer ${token}`
    };
};






// Typed endpoints that take token as first parameter
export async function getCheckoutSessionId(token: string): Promise<string> {

    const absoluteUrl = getAbsoluteUrl('/checkout');
    const response = await fetch(absoluteUrl, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({
            quantity: 1,
            amount: 100
        }),
    });
    const data = await response.json();
    return data.id
}


export async function getUserCreditsRemaining(token: string): Promise<number> {
    try {
        const absoluteUrl = getAbsoluteUrl('/user/credits');
        const response = await fetch(absoluteUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        const parsedResponse = await response.json() as GetRemainingCreditsBody;
        return parsedResponse.credits; // Return the responses value or 0 if undefined
    } catch (error) {
        console.error('Error fetching responses:', error);
        return 0; // Return 0 if there's an error
    }
}

