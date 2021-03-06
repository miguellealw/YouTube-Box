import { AxiosResponse } from "axios";
import { Api } from "./api";
import { Category } from "../../modules/categories";

export interface CategoryResponse {
  kind: string;
  categories?: Category[] | [] | null;
  category?: Category | null;
  errorMessage: any;
}

export class CategoryApi extends Api {
  // NOT USED ANYMORE
  async getUserCategories(token?: string): Promise<CategoryResponse> {
    try {
      const response: AxiosResponse<any> = await this.axios.get(
        "/api/v1.0/users/current_user/categories",
        // { headers: { Authorization: `Bearer ${token}` } }
      );

      return {
        kind: "ok",
        categories: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        categories: null,
        errorMessage: err,
      };
    }
  }

  // NOT USED ANYMRE
  async getUserCategoryById(
    id: string | string[] | undefined
  ): Promise<CategoryResponse> {
    try {
      const response: AxiosResponse<any> = await this.axios.get(
        `/api/v1.0/users/current_user/categories/${id}`
      );

      return {
        kind: "ok",
        category: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        category: null,
        errorMessage: err,
      };
    }
  }

  // NOT USED ANYMORE
  async createCategory(name: string): Promise<CategoryResponse> {
    if (name.trim() === "") throw Error;

    try {
      const response: AxiosResponse<any> = await this.axios.post(
        `/api/v1.0/users/current_user/categories`,
        {
          name,
        }
      );

      return {
        kind: "ok",
        category: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        category: null,
        errorMessage: err,
      };
    }
  }

  // NOT USED ANYMORE
  async deleteCategory(id: number): Promise<CategoryResponse> {
    try {
      const response: AxiosResponse<any> = await this.axios.delete(
        `/api/v1.0/users/current_user/categories/${id}`
      );

      return {
        kind: "ok",
        category: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        category: null,
        errorMessage: err,
      };
    }
  }

  // NOT USED ANYMORE
  async updateCategory(id: number, newName: string): Promise<CategoryResponse> {
    try {
      const response: AxiosResponse<any> = await this.axios.put(
        `/api/v1.0/users/current_user/categories/${id}`,
        {
          name: newName,
        }
      );

      return {
        kind: "ok",
        category: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        category: null,
        errorMessage: err,
      };
    }
  }

  async addChannelToCategory(
    categoryId: number | string,
    channelName: string,
    channelId: string
  ) {
    try {
      const response: AxiosResponse<any> = await this.axios.post(
        `/api/v1.0/users/current_user/categories/${categoryId}/add_channel`,
        {
          name: channelName,
          yt_channel_id: channelId,
        }
      );

      return {
        kind: "ok",
        category: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        category: null,
        errorMessage: err,
      };
    }
  }

  async removeChannelFromCategory(
    categoryId: number | string,
    channelName: string,
    channelId: string
  ) {
    try {
      const response: AxiosResponse<any> = await this.axios.post(
        `/api/v1.0/users/current_user/categories/${categoryId}/remove_channel`,
        {
          name: channelName,
          yt_channel_id: channelId,
        }
      );

      return {
        kind: "ok",
        category: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        category: null,
        errorMessage: err,
      };
    }
  }
}
