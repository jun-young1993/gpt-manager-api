import { GoogleGeoCode } from '../google-trends/google-trends.interface';
import { CreateChatCompletionRequest } from 'openai';

export const _GUEST = 'guest';
export const guestUser = {
  id: _GUEST,
  email: _GUEST,
  name: _GUEST,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const prompts = {
  article: (
    title: string,
    url: string,
    geo: GoogleGeoCode,
  ): CreateChatCompletionRequest => {
    return {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          // content: `As a blog writer, please write a blog post in the language associated with the country code (${geo}) using the'article title(URL)'.`,
          content: `As a blog writer, please write a blog post in the language associated with the country code (${geo}) using the 'article title(URL)'. Also, responses will be provided using HTML syntax: 1. <strong>A sentence you want to emphasize</strong> 2.Line break <br> 3.<strong className='underline decoration-sky-500/30'> An important sentence </strong>`,
        },
        { role: 'user', content: `${title}(${url})` },
      ],
    };
  },
};
