#!/bin/bash
# Magnolia OS Bootstrap Script

echo "🌸 Welcome to Magnolia OS"
echo "-------------------------"

# Check for API Key
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "❌ Error: ANTHROPIC_API_KEY environment variable is not set."
  exit 1
fi

# Create missing directories
mkdir -p backend/src/lib/db

echo "🚀 Spinning up Magnolia OS via Docker Compose..."
docker-compose up --build -d

echo "✨ Magnolia OS is coming online!"
echo "- Custom UI: http://localhost:3000"
echo "- Business API: http://localhost:3001"
echo "- Agentic Engine: http://localhost:3090"

echo -e "\n📊 Running Canary ROI Check..."
curl -X POST http://localhost:3001/api/projects/canary/audit      -H "Content-Type: application/json"      -d '{"companyName": "Canary Med Spa", "appointment_volume": 100, "no_show_rate_pct": 15}'
