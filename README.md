<h3>Local Setup</h3>

<h4>1. Clone repository</h4>

 ```bash
   git clone https://github.com/Ontonieja/treeline-ai-task.git
```

<h4>2. Create .env files for the server</h4>

- For the server, create `server/.env` and add required variables. AI API key is from the free resource so feel free to use it (might be a little laggy 😄)
```bash
PORT = 3000
DATABASE_URL="file:./dev.db"
API_KEY = "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"
```


<h4>3. Install dependencies for server and client</h4>

```bash
cd server && yarn install
```
```bash
cd ../client && yarn install
```
<h4>4. Run Prisma migration</h4>

 ```bash
cd ../server
npx prisma migrate dev
```

<h4>5. Start the backend</h4>

 ```bash
 yarn dev
```

<h4>6. Start the client</h4>

 ```bash
cd ../client && yarn dev
