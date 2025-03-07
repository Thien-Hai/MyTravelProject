import { Transform } from 'class-transformer';
import * as HttpExc from '../api/exception/exception.resolver';

// CORE

function trimValue(value: string, key?: string) {
  if (typeof value !== 'string')
    throw new HttpExc.BadRequest({
      message: `${key} must be a string`,
      errorCode: `VALIDATE_TRANSFORMER`,
    });

  return value.trim();
}

/**
 * Function to automatically remove trailing whitespace from a string
 */
export function Trim() {
  return Transform(({ value, key }) => trimValue(value, key));
}
