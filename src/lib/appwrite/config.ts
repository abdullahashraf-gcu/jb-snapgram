import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig={
url:'https://nyc.cloud.appwrite.io/v1',
projectId:'685c579600171c287634',
databaseId: '685d85c6001239aee256',
storageId:'685d8cf90020fc68dea1',
userCollectionId: '685d86120022ac7fa472',
postCollectionId: '685d85d30000de72dad3',
savesCollectionId: '685d863c002688f80019',
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
