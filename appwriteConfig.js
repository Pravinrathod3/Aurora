import { Client, Account,  Databases, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Change if self-hosted
  .setProject("67d3c7120020408db210");

const databases = new Databases(client);
const account = new Account(client);

export { databases , account, client, ID };
