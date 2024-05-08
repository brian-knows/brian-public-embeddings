# 🧠 Brian Public Embeddings

This repository contains the code to store and retrieve embeddings on **Swarm**.

## ❓ Why this repository?

Public embeddings play a significant role in various fields and applications, and these are the reasons why we wanted to create such repository:

- **Knowledge Sharing**: Public embeddings facilitate the sharing of knowledge and information in a structured and computationally efficient way. They encode semantic information, making it easier to understand and utilize data across different applications;
- **Interoperability**: Public embeddings provide a common framework for interoperability among diverse systems, platforms, and languages. They enable data and models to be understood and used consistently across the AI and machine learning community;
- **Facilitating Research**: Researchers in natural language processing (NLP), computer vision, and other AI domains heavily rely on pre-trained embeddings. A repository of public embeddings can serve as a valuable resource for researchers to access and compare different embeddings for their experiments and models;
- **Reducing Redundancy**: Instead of reinventing the wheel and training embeddings from scratch, developers and researchers can use publicly available embeddings as a starting point. This reduces redundancy, saves computational resources, and accelerates the development of AI applications;
- **Enhancing Accessibility**: By making public embeddings readily accessible, the repository can democratize AI and make advanced technologies available to a wider audience. This inclusivity can foster innovation and creativity in various domains;
- **Open Data and Transparency**: Hosting public embeddings in a centralized repository promotes transparency and openness in AI research and development. It allows for scrutiny and peer review, fostering trust in the AI community;
- **Cross-Domain Applications**: Public embeddings are versatile and can be used across different domains and applications, from text analysis and recommendation systems to image recognition and sentiment analysis. This versatility enhances their value;
- **Community Collaboration**: A repository for public embeddings encourages collaboration within the AI community. Developers, researchers, and practitioners can contribute their embeddings, share their knowledge, and collectively improve the quality of available embeddings;
- **Education and Learning**: Public embeddings can be a valuable resource for educational purposes. Students, educators, and AI enthusiasts can access these embeddings to learn and experiment with AI techniques without the need for extensive computational resources.

Storing and retrieving public embeddings on **Swarm** serves as a catalyst for advancing AI research, fostering collaboration, and making AI more accessible and transparent. It plays a pivotal role in the development of AI technologies with far-reaching implications across various industries and domains.

## 📦 Installation

You need to clone this repository to your local machine first. Then, in order to install the required dependencies, you can run the following command:

```bash
npm install # using npm
# or
yarn install # using yarn
# or
pnpm install # using pnpm
```

You need to populate the `.env` file with the following environment variables:

```bash
TURSO_DB="" # optional
TURSO_AUTH_TOKEN="" # optional
CHROMA_NODE_URL=""
BEE_NODE_URL=""
BEE_NODE_DEBUG_URL=""
DEBUG="" # optional
```

The Turso environment variables are optional in case you want to save the Swarm references to a database. The `CHROMA_NODE_URL` is the URL of the Chroma node (where the embeddings are retrieved), and the `BEE_NODE_URL` and `BEE_NODE_DEBUG_URL` are the URLs of the Bee nodes. The `DEBUG` environment variable is optional and can be used to start the cron job immediately for testing purposes.

## 🛠️ Usage

You need to build the typescript code into javascript by running:

```bash
npm run build # using npm
# or
yarn build # using yarn
# or
pnpm build # using pnpm
```

Then, you can start the cron job by running:

```bash
npm run start # using npm
# or
yarn start # using yarn
# or
pnpm start # using pnpm
```

If you enabled the debug mode, it will start immediately, otherwise it will start the first day of each month. You can change how often the cron job runs by adding a `CRON_SCHEDULE` environment variable with your desired cron schedule string.

## 📜 ETHSwarm Grant

This repository is related to the [ETHSwarm Grant]() application with reference code **J24**.
