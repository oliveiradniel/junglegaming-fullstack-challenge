import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validate<T extends object>(
  config: Record<string, unknown>,
  dtoClass: new (...args: any[]) => T,
): T {
  const validatedConfig = plainToInstance(dtoClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
