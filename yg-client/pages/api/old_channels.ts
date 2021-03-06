import { AxiosResponse } from "axios";
import { Api } from "./api";
import { Channel } from "../../modules/channels";

export type ChannelResponse = {
  kind: string;
  channels: Channel[] | [] | Channel | null;
  errorMessage: any;
};
export class ChannelsApi extends Api {
  // NOT USED
  async get_channels(): Promise<ChannelResponse> {
    try {
      const response: AxiosResponse<any> = await this.axios.get(
        "/api/v1.0/users/current_user/channels"
      );

      return {
        kind: "ok",
        channels: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        channels: null,
        errorMessage: err,
      };
    }
  }

  async getChannelById(channelId: string): Promise<ChannelResponse> {
    try {
      const response: AxiosResponse<any> = await this.axios.get(
        `/api/v1.0/users/current_user/channels/${channelId}`
      );

      return {
        kind: "ok",
        channels: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        channels: null,
        errorMessage: err,
      };
    }
  }

  async get_yt_channels(nextPageToken?: string): Promise<any> {
    try {
      // const response: AxiosResponse<any> = await this.axios.get(
      //   `/api/v1.0/users/current_user/yt-channels${nextPageToken ? `?nextPageToken=${nextPageToken}` : ''}`
      // );

      const response: AxiosResponse<any> = await this.axios.get(
        `/api/channels${nextPageToken ? `?nextPageToken=${nextPageToken}` : ""}`
      );

      return {
        kind: "ok",
        channels: response.data,
        errorMessage: null,
      };
    } catch (err) {
      return {
        kind: "bad-data",
        channels: null,
        errorMessage: err,
      };
    }
  }
}
