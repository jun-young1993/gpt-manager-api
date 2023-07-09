import {GoogleGeoCode} from "../google-trends/google-trends.interface";
import {CreateChatCompletionRequest} from "openai";

export const _GUEST = 'guest';
export const guestUser = {
  id: _GUEST,
  email: _GUEST,
  name: _GUEST,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const prompts = {
  article : (title:string, url:string, geo: GoogleGeoCode): CreateChatCompletionRequest => {
    return {
      model: 'gpt-3.5-turbo',
      messages : [
        { "role" : "system", "content": `As a blog writer, please write a blog post in the language associated with the country code (${geo}) using the'article title(URL)'.` },
        { "role": "user", "content": `${title}(${url})` }
      ]
    }
  }

}