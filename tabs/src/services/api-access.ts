import * as axios from "axios";
import {
  TeamsUserCredential,
  getResourceConfiguration,
  ResourceType,
} from "@microsoft/teamsfx";

export const callApiGet = async (functionName: string, groupId: string) => {
  try {
    const credential = new TeamsUserCredential();
    const accessToken = await credential.getToken("");
    const apiConfig = getResourceConfiguration(ResourceType.API);
    const response = await axios.default.get(
      apiConfig.endpoint + "/api/" + functionName + "?groupId=" + groupId,
      {
        headers: {
          authorization: "Bearer " + accessToken?.token || "",
        },
      }
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.default.isAxiosError(err)) {
      let funcErrorMsg = "";

      if (err?.response?.status === 404) {
        funcErrorMsg = `There may be a problem with the deployment of Azure Function App, please deploy Azure Function (Run command palette "Teams: Deploy to the cloud") first before running this App`;
      } else if (err.message === "Network Error") {
        funcErrorMsg =
          "Cannot call Azure Function due to network error, please check your network connection status and ";
        if (err.config?.url && err.config.url.indexOf("localhost") >= 0) {
          funcErrorMsg += `make sure to start Azure Function locally (Run "npm run start" command inside api folder from terminal) first before running this App`;
        } else {
          funcErrorMsg += `make sure to provision and deploy Azure Function (Run command palette "Teams: Provision in the cloud" and "Teams: Deploy to the cloud) first before running this App`;
        }
      } else {
        funcErrorMsg = err.message;
        if (err.response?.data?.error) {
          funcErrorMsg += ": " + err.response.data.error;
        }
      }

      throw new Error(funcErrorMsg);
    }
    throw err;
  }
};