# 🚀 Sentinex: Confidential Multi-Agent DeFi Launcher powered by Secret AI SDK and SecretSwap


*Powering limitless tasks with Secret AI SDK and SNIP20*  

### 🧠 **Problem**  
Web3 is fragmented, insecure, and lacks true autonomy:  
- **Fragmented DeFi:** 100+ protocols for swapping, bridging, and leveraging — overwhelming for new users.  
- **Rugpull Token Launches:** 1000s of tokens launched without real community engagement.  
- **Privacy Risks:** Front-running, data leaks, and surveillance.  
- **Limited Autonomy:** Hard to automate event-driven tasks.  
- **Complex Workflows:** Managing state, memory, and long-term decisions.  

---

### 🛠️ **High Level Overview**  

Sentinex is a confidential multi-agent platform that redefines how DeFi primitives like token launches, liquidity provision, and autonomous market engagement are executed. Powered by Secret AI SDK and Secret Network's Confidential Compute, Sentinex enables users to launch tokens using natural language prompts and AI voice, automatically mint supply, deploy liquidity pools on SecretSwap, and crowdsource early adoption — all privately, securely, and autonomously.

Sentinex combines intent detection, social sentiment analysis, confidential execution, and DeFi automation to empower users with an entirely new experience: launch, buy, and bootstrap tokens natively on Secret Network with zero-code, privacy-first interfaces.

---

### Installation and Setup
1. Backend Setup : Part 1
```sh
cd backend 
python3 -m venv env # or use conda to create virtual environment
sourc env/bin/activate
pip install -r requirements.txt
# Copy and paste everything in backend/commands.txt to your terminal 
cp .env.example .env
python3 src/main.py
```
Note : Make sure to create and fill the .env in `backend/.env` using the `backend/.env.example`

Troubleshoot: For troubleshooting `certificate verification error`: Use conda as virtual environment

2. Backend Setup : Part 2
```sh
cd Zerepy
cp .env.example .env
poetry install --extras server
poetry run python main.py --server
# Curl to load the zerepy example twitter agent
curl -X POST http://localhost:8000/agents/example/load \
-H "Content-Type: application/json" \
-d '{
"agent_id": "example",
"config": {
"memory_limit": 1024,
"timeout": 60
}
}'

```
Note : Make sure to create and fill the .env in `Zerepy/.env` using the `Zerepy/.env.example`

3. SNIP20 contract compilation and server to deploy and transfer tokens via secretjs express server
```sh
cd snip20-reference-impl/
make build-mainnet-reproducible
cd node 
npm install 
node server.js
```

4. Frontend setup 
```sh
cd frontend 
npm install 
npm run dev
```

Now you're project is running on localhost!

---
### ⚡ **Architecture & Agent Usage**  
1. **Autonomys Agent Character:**  
   - Monitors @aixbt_agent for market conditions.  
   - Tweets new token launches and engages in crypto discussions.  

2. **Secret AI SDK:**  
   - Intent detection and slot filling.  
   - Token launches
   - DeFi protocol analysis, and arbitrage optimization.   

3. **Cohere Agent:**  
   - Ensures structured and accurate outputs.  

4. **AI Agent Overall work:**  
   - Drives token launch logic, security audits, and sentiment analysis via Secret SDK and Autonomys Agent.  

---

### 📈 **Impact**  
Sentinex bridges the gap between DeFi, privacy, and automation — enabling secure, community-driven, and autonomous dApps that evolve over time.  
