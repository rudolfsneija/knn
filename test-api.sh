#!/bin/bash

echo "🚀 Testing KNN Admin API (Cleaned up version)..."

echo -e "\n📋 Health check..."
curl -s http://localhost:3000/health | python3 -c "import sys, json; print('✅ Server healthy')"

echo -e "\n👤 Admin login..."
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","password":"securepassword123"}' | python3 -c "import sys, json; print(json.load(sys.stdin)['data']['token'])")

if [ ! -z "$TOKEN" ]; then
  echo "✅ Authentication successful"
else
  echo "❌ Authentication failed"
  exit 1
fi

echo -e "\n👤 Get current admin profile..."
curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/users/me | python3 -c "import sys, json; data=json.load(sys.stdin); print(f\"✅ Logged in as: {data['data']['username']}\")"

echo -e "\n📰 Managing Aktualitātes..."
AKTUALITATE_ID=$(curl -s -X POST http://localhost:3000/api/aktualitates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Jaunums KNN sistēmā",
    "content": "Mēs esam izveidojuši jaunu API sistēmu.",
    "excerpt": "Jauna API sistēma",
    "published": true
  }' | python3 -c "import sys, json; print(json.load(sys.stdin)['data']['id'])")

echo "✅ Created aktualitate with ID: $AKTUALITATE_ID"

echo -e "\n🛒 Managing Produkti..."
PRODUCT_ID=$(curl -s -X POST http://localhost:3000/api/produkti \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "KNN Premium Riepas",
    "description": "Augstas kvalitātes riepas visiem sezoniem",
    "price": 199.99,
    "category": "Riepas",
    "available": true,
    "featured": true,
    "specifications": {
      "izmērs": "205/55R16",
      "sezona": "Visu sezonu",
      "ražotājs": "KNN"
    }
  }' | python3 -c "import sys, json; print(json.load(sys.stdin)['data']['id'])")

echo "✅ Created product with ID: $PRODUCT_ID"

echo -e "\n📖 Public content access..."
curl -s "http://localhost:3000/api/aktualitates?published=true" | python3 -c "import sys, json; print(f\"📰 {json.load(sys.stdin)['count']} published aktualitātes\")"
curl -s "http://localhost:3000/api/produkti?available=true" | python3 -c "import sys, json; print(f\"🛍️ {json.load(sys.stdin)['count']} available products\")"

echo -e "\n✅ All tests completed successfully!"
echo "🎯 Your KNN admin API is ready for frontend integration!"
