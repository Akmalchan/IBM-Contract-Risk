import { NextRequest, NextResponse } from "next/server";

const IAM_TOKEN_URL = "https://iam.cloud.ibm.com/identity/token";

type AnalyzePayload = {
    contractText: string;
    contractType: string;
    partyPerspective: string;
    jurisdiction: string;
    reviewMode: string;
    focusAreas: string[];
};

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as AnalyzePayload;

        if (!body.contractText?.trim()) {
            return NextResponse.json(
                { error: "Contract text is required." },
                { status: 400 }
            );
        }

        const apiKey = process.env.IBM_WATSONX_API_KEY;
        const projectId = process.env.IBM_WATSONX_PROJECT_ID;
        const baseUrl = process.env.IBM_WATSONX_URL;

        if (!apiKey || !projectId || !baseUrl) {
            return NextResponse.json(
                { error: "Missing IBM watsonx environment variables." },
                { status: 500 }
            );
        }

        const iamToken = await getIamToken(apiKey);

        const prompt = buildPrompt(body);

        const generationUrl = `${baseUrl}/ml/v1/text/generation?version=2023-05-29`;

        const watsonResponse = await fetch(generationUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${iamToken}`,
            },
            body: JSON.stringify({
                model_id: "meta-llama/llama-3-3-70b-instruct",
                project_id: projectId,
                input: prompt,
                parameters: {
                    decoding_method: "greedy",
                    max_new_tokens: 900,
                    min_new_tokens: 0,
                    repetition_penalty: 1.05,
                },
            }),
        });

        const raw = await watsonResponse.json();

        if (!watsonResponse.ok) {
            return NextResponse.json(
                {
                    error: "watsonx request failed.",
                    details: raw,
                },
                { status: 500 }
            );
        }

        const generatedText =
            raw?.results?.[0]?.generated_text ||
            raw?.results?.[0]?.generated_text?.trim?.() ||
            "";

        const parsed = safeParseJson(generatedText);

        if (!parsed) {
            return NextResponse.json(
                {
                    error: "Model returned non-JSON output.",
                    rawText: generatedText,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(parsed);
    } catch (error) {
        console.error("Analyze route error:", error);

        return NextResponse.json(
            { error: "Unexpected server error." },
            { status: 500 }
        );
    }
}

async function getIamToken(apiKey: string): Promise<string> {
    const form = new URLSearchParams();
    form.set("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
    form.set("apikey", apiKey);

    const response = await fetch(IAM_TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
    });

    const data = await response.json();

    if (!response.ok || !data.access_token) {
        throw new Error(`Failed to get IAM token: ${JSON.stringify(data)}`);
    }

    return data.access_token;
}

function buildPrompt(payload: AnalyzePayload): string {
    return `
You are a contract risk analysis assistant for business users.

Analyze the contract and return VALID JSON ONLY.
Do not use markdown.
Do not include explanation outside JSON.

JSON schema:
{
  "overallRiskLevel": "Low | Medium | High",
  "riskScore": 0,
  "flaggedClauses": [
    {
      "clauseName": "",
      "riskLevel": "Low | Medium | High",
      "reason": "",
      "suggestedFix": ""
    }
  ],
  "missingClauses": [],
  "negotiationPoints": [],
  "executiveSummary": ""
}

Rules:
- Use plain English
- Be concise
- Do not invent clauses that are not supported by the text
- Evaluate from the perspective given by the user
- If something is missing, include it in missingClauses
- riskScore must be a number from 0 to 100

Context:
Contract type: ${payload.contractType}
Party perspective: ${payload.partyPerspective}
Jurisdiction: ${payload.jurisdiction}
Review mode: ${payload.reviewMode}
Focus areas: ${payload.focusAreas.join(", ") || "General"}

Contract text:
${payload.contractText}
`.trim();
}

function safeParseJson(text: string) {
    try {
        return JSON.parse(text);
    } catch {
        const match = text.match(/\{[\s\S]*\}/);
        if (!match) return null;

        try {
            return JSON.parse(match[0]);
        } catch {
            return null;
        }
    }
}