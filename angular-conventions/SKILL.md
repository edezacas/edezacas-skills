---
name: angular-conventions
description: Mandatory Angular conventions. Activate ALWAYS before writing, modifying, or reviewing any Angular code (.ts, .html, .scss) — components, services, modules, entities, guards, pipes, interceptors, or forms. Also activate on any mention of NgModule, inject(), FormService, @Type, signal, takeUntilDestroyed, SharedModule, or any Angular stack element.
license: Apache-2.0
metadata:
  author: edezacas
  version: "1.0"
---

# Angular Conventions

**Mandatory** conventions. Apply always, even if existing code does not follow them.

## Modules

**NgModule** structure — never standalone components.
- **Feature modules** — one per feature
- **SharedModule** — reusable components, pipes, and directives

## Dependency Injection

Always `inject()`, never constructor injection.

```typescript
// ✅
private clientService = inject(ClientService);

// ❌
constructor(private clientService: ClientService) {}
```

## Forms

Use `FormService` from `@digitalascetic/ngx-form`. Never use `FormBuilder` or `FormGroup` directly.

```typescript
import { FormService } from '@digitalascetic/ngx-form';

private formService = inject(FormService);
const obj = this.client ?? Client;
form = this.formService.getControl(obj);
```

Available API:
```typescript
this.formService.getControl(obj, propertiesObj?, options?)
this.formService.updateFromControl(object, control, updateJustModifiedValues?)
this.formService.updateFromValue(object, value)
this.formService.getObject(form.value, Client)
this.formService.getModifiedValues(control, { forceInclude?, includeEntireArray?, alwaysIncludeProps? })
this.formService.patchValue(control, { key: value })
this.formService.reorderByValues(arrayControl, 'order', reorderedValues, pristineValues)
this.formService.reorderByProperty(arrayControl, 'order')
```

## Entities — @Type

All properties must have `@Type`. Use arrow function `() => Type` for objects, dates, and arrays; no function for primitives.

```typescript
export class Client {
  @Type() id: number;
  @Type() name: string;
  @Type(() => Date) createdAt: Date;
  @Type(() => Address) address: Address;
  @Type(() => Property) properties: Property[];
}
```

## Local State

Use `signal()` for local state, never `BehaviorSubject` in components.

```typescript
// ✅
clients = signal<Client[]>([]);

// ❌
clients$ = new BehaviorSubject<Client[]>([]);
```

## Subscriptions

Always use `takeUntilDestroyed()`, never `ngOnDestroy` + `Subject`.

```typescript
private destroyRef = inject(DestroyRef);

this.myService.getData()
  .pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe(data => this.data.set(data));
```
