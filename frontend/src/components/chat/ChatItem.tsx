import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Extract code blocks and languages from the message
function extractCodeFromString(message: string) {
    const blocks = [];
    const regex = /```(\w+)?\s*([\s\S]*?)```/g;
    let match;

    while ((match = regex.exec(message)) !== null) {
        blocks.push({ language: match[1] || "text", code: match[2] });
    }

    if (blocks.length === 0) {
        blocks.push({ code: message });
    }

    return blocks;
}

// Check if a block is code or not
function isCodeBlock(block: { code: string }) {
    const { code } = block;
    return (
        code.includes("=") || code.includes(";") || code.includes("[") ||
        code.includes("]") || code.includes("{") || code.includes("}") ||
        code.includes("#") || code.includes("//")
    );
}

const ChatItem = ({ content, role }: { content: string, role: "user" | "assistant" }) => {
    const auth = useAuth();
    const [messageBlocks, setMessageBlocks] = useState<{ language?: string, code: string }[]>([]);

    useEffect(() => {
        setMessageBlocks(extractCodeFromString(content));
    }, [content]);

    return (
        <Box
            sx={{
                display: "flex",
                p: 2,
                bgcolor: role === "assistant" ? "#004d5612" : "#004d56",
                my: 2,
                gap: 2,
            }}
        >
            <Avatar sx={{ ml: "0", bgcolor: role === "assistant" ? "transparent" : "black", color: "white" }}>
                {role === "assistant" ? (
                    <img src="openai.png" alt="openai" width={"30px"} />
                ) : (
                    `${auth?.user?.name[0]}${auth?.user?.name.split(" ")[1]?.[0] || ""}`
                )}
            </Avatar>
            <Box sx={{width: {md: "700px", sm:"300px", width: "800px" }}}>
                {messageBlocks.map((block, index) =>
                    isCodeBlock(block) ? (
                        <SyntaxHighlighter key={index} style={coldarkDark} language={block.language}>
                            {block.code}
                        </SyntaxHighlighter>
                    ) : (
                        <Typography key={index} sx={{ fontSize: "20px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                        {block.code}
                    </Typography>

                    )
                )}
            </Box>
        </Box>
    );
};

export default ChatItem;
