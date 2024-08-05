import { Configuration } from "openai";

export function configureOpenAi() {
    const config = new Configuration({
        apiKey : process.env.OPEN_AI_SECRET,
        organization: "org-BT4QcJEr5Lk6Fz2lNYUPQAIr"
    })
    return config
}