import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ven.aora',
    projectId: '662b1ef9c560cecbe4ad',
    databaseId: '662b304723168ddaf6bd',
    usersCollectionId: '662b305145698a2487c2',
    videoCollectionId: '662b5820c7392f157d0b',
    storageId: '662b22736e725797f1e2'
};

// Init your react-native SDK
const client = new Client();
client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({ username, email, password }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await sigIn({ email, password });

        const newUser = await databases.createDocument(config.databaseId, config.usersCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        });

        return newUser;
    } catch (error) {
        console.log(error, 'Error Creating User');
        throw new Error(error);
    }
};

export const signIn = async ({ email, password }) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(config.databaseId, config.usersCollectionId, [
            Query.equal('accountId', currentAccount.$id)
        ]);
        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId);
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)]);
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.search('title', query)]);
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export const getUsersPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.equal('creator', userId)]);
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === 'image') {
            fileUrl = storage.getFilePreview(config.storageId, fileId, 500, 500, 'top', 100);
        } else if (type === 'video') {
            fileUrl = storage.getFileView(config.storageId, fileId);
        } else {
            throw new Error('File type not supported');
        }
        if (!fileUrl) throw new Error('File not found');

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
};

export const uploadFile = async (file, type) => {
    if (!file) return;
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.filesize,
        uri: file.uri
    };
    try {
        const uploadedFile = await storage.createFile(config.storageId, ID.unique(), asset);

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
};

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([uploadFile(form.thumbnail, 'image'), uploadFile(form.video, 'video')]);

        const newPost = await databases.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
            ...form,
            thumbnail: thumbnailUrl,
            video: videoUrl
        });
        return newPost;
    } catch (error) {
        throw new Error(error);
    }
};
