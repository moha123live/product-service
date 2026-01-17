import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const ResponseMessage = (message: string): CustomDecorator<string> =>
  SetMetadata('responseMessage', message);

export const ResponseKey = (key: string): CustomDecorator<string> =>
  SetMetadata('responseKey', key);
