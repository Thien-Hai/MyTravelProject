import {
  ApiOperation,
  ApiTags as SwgApiTags,
  ApiBearerAuth,
  ApiProperty,
} from '@nestjs/swagger';
import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export * from '@nestjs/swagger';

const createApiOperation = (defaultOptions: ApiOperationOptions) => {
  return (options?: ApiOperationOptions): MethodDecorator =>
    ApiOperation({
      ...defaultOptions,
      ...options,
    });
};

export const ApiListOperation = createApiOperation({ summary: 'List all' });
export const ApiRetrieveOperation = createApiOperation({
  summary: 'Get information a record',
});
export const ApiCreateOperation = createApiOperation({ summary: 'Create new' });
export const ApiUpdateOperation = createApiOperation({
  summary: 'Edit a record',
});
export const ApiDeleteOperation = createApiOperation({
  summary: 'Delete a record',
});
export const ApiBulkDeleteOperation = createApiOperation({
  summary: 'Delete multiple records',
});

const header = ApiBearerAuth();

export function ApiTagsAndBearer(...tags: string[]) {
  return applyDecorators(
    ApiBearerAuth(), //
    SwgApiTags(...tags),
    header,
  );
}
