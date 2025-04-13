import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Change if self-hosted
  .setProject("67d3c7120020408db210");

const databases = new Databases(client);

export { databases };
