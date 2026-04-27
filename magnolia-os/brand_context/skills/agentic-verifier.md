# Skill: Agentic Verifier

## Goal
Verify that generated output meets Allenix quality standards for brand voice, factual accuracy, and citation integrity before it reaches the client.

## Verification Rules

### 1. Brand Voice (Reference: brand_context/med-spa-voice.md)
- **No Buzzwords**: Strip "revolutionize", "cutting-edge", "game-changer".
- **Correct Naming**: Ensure "practice" (not business) and "patients" (not customers).
- **Tone Check**: Is it professional but approachable? Is it partnership-focused?

### 2. Hallucination & Truth
- **Data Check**: Every number in the output must be traceable back to the provided raw data.
- **Pricing**: Ensure revenue recovery calculations follow the pricing benchmarks in `methodology-revenue-recovery.md`.
- **Citations**: If the data mentions a specific patient or treatment, the output must cite it correctly.

### 3. Structural Integrity
- **Readability**: Is the information structured for a 50-year-old founder-CEO? Short sentences, no em dashes.
- **Formatting**: Is it clean markdown? Are the key ROI figures bolded?

## Output Format
Return a JSON object:
```json
{
  "status": "pass" | "fail",
  "score": 0-100,
  "issues": ["string"],
  "recommendations": "string",
  "refined_output": "string" (If status is fail, provide a corrected version)
}
```