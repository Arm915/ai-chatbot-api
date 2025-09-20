// src/chat/chat.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ChatService {
    private GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    constructor(private config: ConfigService) { }

    async askGemini(prompt: string): Promise<string> {
        const apiKey = this.config.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
            throw new InternalServerErrorException('GEMINI_API_KEY not set');
        }

        try {
            const res = await axios.post(
                `${this.GEMINI_URL}?key=${apiKey}`,
                {
                    contents: [
                        {
                            parts: [{ text: prompt }],
                        },
                    ],
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            return (
                res.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
                '[no response]'
            );
        } catch (e: any) {
            const msg = e?.response?.data?.error?.message ?? e.message;
            throw new InternalServerErrorException(`Gemini error: ${msg}`);
        }
    }
}
