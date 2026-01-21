export async function openChatApi(prompt){
    const response = await fetch("https://api.openai.com/v1/responses", {
        header : {
            'Content-Type': 'application/json',
            'Authorization': Bearer `${process.env.OPENAI_API_KEY}`,
        },
        method : "POST",
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        })
    })

    return response.json()
}