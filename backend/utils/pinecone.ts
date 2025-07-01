import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();

export const initPinecone = async () => {
  try {
    await pinecone.init({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    });
    console.log("✅ Pinecone client initialized");
  } catch (err) {
    console.error("❌ Error initializing Pinecone:", err);
    throw err;
  }
};

export const getPineconeIndex = () => {
  const indexName = process.env.PINECONE_INDEX!;
  return pinecone.Index(indexName);
};
