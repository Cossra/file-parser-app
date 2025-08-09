'use server';

import { currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_API_KEY!;
const client = new SchematicClient({ apiKey });

export async function getTemporaryAccessToken() {
  console.log("Getting temporary access token");

  const user = await currentUser();

  if (!user) {
    console.log("No user found, returning null");
    return null;
  }

  console.log(`Issuing temporary access token for user: ${user.id}`);

  const resp = await client.accesstokens.issueTemporaryAccessToken({
  resourceType: "user",
  lookup: { id: user.id },
} as any); // 👈 full object is cast to 'any' to shut up TypeScript

  console.log(
    "Token response received:",
    resp.data ? "Token received" : "No token in response"
  );

  console.log("Access token:", resp.data?.token);

  return resp.data?.token;
}