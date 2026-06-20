'use server'

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json()
}

export const serverMutation = async (path, data, method = "POST") => {
    console.log("Sending Request to:", path, "Method:", method);
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data),
    })
    return res.json()
}