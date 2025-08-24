
import { GoogleGenAI, Type } from "@google/genai";
import { Address } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const routeSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING, description: 'The original ID of the address.' },
            name: { type: Type.STRING, description: 'The name of the location.' },
            address: { type: Type.STRING, description: 'The full street address.' },
            lat: { type: Type.NUMBER, description: 'The latitude of the address.' },
            lon: { type: Type.NUMBER, description: 'The longitude of the address.' },
            travelTimeFromPrevious: { type: Type.NUMBER, description: 'Estimated travel time in minutes from the previous stop in the optimized route. The first stop should be 0.' },
            distanceFromPrevious: { type: Type.NUMBER, description: 'Estimated travel distance in miles from the previous stop. The first stop should be 0.' },
        },
        required: ["id", "name", "address", "lat", "lon", "travelTimeFromPrevious", "distanceFromPrevious"]
    }
};

export async function getOptimizedRoute(addresses: Address[]): Promise<Address[]> {
    const addressesString = addresses.map(a => `- ${a.name}: ${a.address} (ID: ${a.id}, Lat: ${a.lat}, Lon: ${a.lon})`).join('\n');

    const prompt = `
You are a route optimization expert for a field service company in Tampa, FL.
Given the following list of service addresses, your task is to determine the most efficient route to visit all of them, starting from the first location that makes the most logical sense.
Minimize total travel time and distance.

Here is the list of addresses for today:
${addressesString}

Please return a JSON array of these locations, reordered in the most efficient sequence.
Each object in the array must include the original 'id', 'name', 'address', 'lat', and 'lon'.
Crucially, you must also calculate and include 'travelTimeFromPrevious' (in minutes) and 'distanceFromPrevious' (in miles) for each stop.
The very first stop in your optimized route should have 'travelTimeFromPrevious' and 'distanceFromPrevious' set to 0.
Base your calculations on typical driving conditions in Tampa.
The output MUST be a valid JSON array matching the provided schema. Do not include any other text or explanations.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: routeSchema,
            temperature: 0.1, // Low temperature for deterministic routing
        }
    });

    try {
        const jsonText = response.text.trim();
        const optimizedRoute = JSON.parse(jsonText);
        return optimizedRoute;
    } catch (error) {
        console.error("Failed to parse Gemini response:", response.text);
        throw new Error("The AI returned an invalid response format.");
    }
}
