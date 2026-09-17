import conf from "../conf/conf.js";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create Post
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
    }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            });
        } catch (error) {
            console.log(
                "Appwrite service :: createPost :: error",
                error
            );
        }
    }

    // Update Post
    async updatePost(
        slug,
        {
            title,
            content,
            featuredImage,
            status,
        }
    ) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                },
            });
        } catch (error) {
            console.log(
                "Appwrite service :: updatePost :: error",
                error
            );
        }
    }

    // Delete Post
    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });

            return true;
        } catch (error) {
            console.log(
                "Appwrite service :: deletePost :: error",
                error
            );

            return false;
        }
    }

    // Get Single Post
    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });
        } catch (error) {
            console.log(
                "Appwrite service :: getPost :: error",
                error
            );

            return false;
        }
    }

    // Get All Posts
    async getPosts(
        queries = [Query.equal("status", "active")]
    ) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries,
            });
        } catch (error) {
            console.log(
                "Appwrite service :: getPosts :: error",
                error
            );

            return false;
        }
    }

    // Upload File
    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.log(
                "Appwrite service :: uploadFile :: error",
                error
            );

            return false;
        }
    }

    // Delete File
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId,
            });

            return true;
        } catch (error) {
            console.log(
                "Appwrite service :: deleteFile :: error",
                error
            );

            return false;
        }
    }

    // Get File Preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId,
        });
    }
}

const service = new Service();

export default service;