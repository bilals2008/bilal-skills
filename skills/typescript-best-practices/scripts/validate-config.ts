import { readFileSync } from 'fs';
import { resolve } from 'path';

interface TsConfig {
  compilerOptions?: Record<string, unknown>;
  include?: string[];
  exclude?: string[];
}

const REQUIRED_STRICT_OPTIONS = {
  strict: true,
  noUncheckedIndexedAccess: true,
  exactOptionalPropertyTypes: true,
  verbatimModuleSyntax: true,
};

const RECOMMENDED_OPTIONS = {
  skipLibCheck: true,
  incremental: true,
  isolatedModules: true,
};

function validateTsConfig(configPath: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const fullPath = resolve(configPath);

  try {
    const content = readFileSync(fullPath, 'utf-8');
    const config: TsConfig = JSON.parse(content);
    const opts = config.compilerOptions ?? {};

    for (const [key, expected] of Object.entries(REQUIRED_STRICT_OPTIONS)) {
      if (opts[key] !== expected) {
        issues.push(`Missing required option: "${key}" should be ${JSON.stringify(expected)}`);
      }
    }

    for (const [key, expected] of Object.entries(RECOMMENDED_OPTIONS)) {
      if (opts[key] !== expected) {
        issues.push(`Recommend enabling: "${key": ${JSON.stringify(expected)}}`);
      }
    }

    return { valid: issues.length === 0, issues };
  } catch (error) {
    return {
      valid: false,
      issues: [`Failed to parse tsconfig at ${fullPath}: ${(error as Error).message}`],
    };
  }
}

// Example usage
const result = validateTsConfig('./tsconfig.json');
console.log(result.valid ? 'Config is valid' : 'Config issues found:');
result.issues.forEach(i => console.log(`  - ${i}`));
