# TypeScript Patterns Reference

This reference provides detailed patterns for common TypeScript use cases. Read this file when you need in-depth guidance on specific type patterns beyond what the SKILL.md covers.

## Builder Pattern with Types

```typescript
class QueryBuilder<T extends Record<string, unknown>> {
  private filters: Partial<T> = {};
  private sortField?: keyof T;
  private sortOrder: 'asc' | 'desc' = 'asc';
  private limitValue?: number;

  where<K extends keyof T>(field: K, value: T[K]): this {
    this.filters[field] = value;
    return this;
  }

  sortBy(field: keyof T, order: 'asc' | 'desc' = 'asc'): this {
    this.sortField = field;
    this.sortOrder = order;
    return this;
  }

  limit(n: number): this {
    this.limitValue = n;
    return this;
  }

  build(): Query<T> {
    return {
      filters: this.filters,
      sort: this.sortField ? { field: this.sortField, order: this.sortOrder } : undefined,
      limit: this.limitValue,
    };
  }
}
```

## Singleton with Type Safety

```typescript
export class DatabaseService {
  private static instance: DatabaseService | null = null;

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }
}
```

## Factory Pattern

```typescript
interface PaymentGateway {
  process(amount: number): Promise<PaymentResult>;
}

class StripeGateway implements PaymentGateway {
  async process(amount: number): Promise<PaymentResult> { /* ... */ }
}

class PayPalGateway implements PaymentGateway {
  async process(amount: number): Promise<PaymentResult> { /* ... */ }
}

type GatewayType = 'stripe' | 'paypal';

function createGateway(type: GatewayType): PaymentGateway {
  switch (type) {
    case 'stripe': return new StripeGateway();
    case 'paypal': return new PayPalGateway();
  }
}
```

## Event Emitter with Typed Events

```typescript
type EventMap = {
  userCreated: { id: string; name: string };
  userDeleted: { id: string };
  error: { message: string; code: number };
};

class TypedEmitter {
  private listeners: { [K in keyof EventMap]?: ((data: EventMap[K]) => void)[] } = {};

  on<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): void {
    (this.listeners[event] ??= []).push(listener as (data: EventMap[K]) => void);
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    this.listeners[event]?.forEach(listener => listener(data));
  }
}
```

## Mapped Type Utilities

```typescript
// Make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Pick properties that match a value type
type PickByType<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] };

// Add prefix to all keys
type PrefixedKeys<T, P extends string> = { [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K] };
```
