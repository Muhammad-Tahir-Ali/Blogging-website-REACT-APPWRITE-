import config from "../configg/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  /**
   * Creates an instance of AuthService.
   * @memberof AuthService
   */
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const UserAccoint = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (UserAccoint) {
        // call another method....
        return this.login({ email, password });
      } else {
        return UserAccoint;
      }
    } catch (error) {
      throw error;
    }
  }

  
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

 
  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }
}


const authservice = new AuthService();

export default authservice;
