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

  /**
   * Creates a new account
   * @param {Object} data - contains email, password and name of the user
   * @returns {Promise} - resolves with the created user account
   * @memberof AuthService
   */
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

  /**
   * Logs the user in
   * @param {Object} data - contains email and password of the user
   * @returns {Promise} - resolves with the logged in user account
   * @memberof AuthService
   */
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets the current logged in user
   * @returns {Promise} - resolves with the current user account
   * @memberof AuthService
   */
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  /**
   * Logs the user out
   * @returns {Promise} - resolves when the user is logged out
   * @memberof AuthService
   */
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
