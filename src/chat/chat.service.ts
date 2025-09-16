import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {
    async askLLM(prompt: string): Promise<string> {
        // ตัวอย่าง: OpenAI Responses API (ปรับตามค่ายที่ใช้)
        const res = await axios.post(
            'https://api.openai.com/v1/responses',
            { model: 'gpt-4.1-mini', input: prompt },
            { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } },
        );
        const text = res.data?.output_text ?? res.data?.choices?.[0]?.message?.content ?? '';
        return text;
    }
}
