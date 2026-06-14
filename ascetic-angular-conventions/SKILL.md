---
name: ascetic-angular-conventions
description: Angular conventions for @digitalascetic libraries. Activate only when package.json or import paths contain @digitalascetic/ngx-form, @digitalascetic/ngx-object-transformer, or @digitalascetic/ngx-reflection.
license: Apache-2.0
metadata:
  author: edezacas
  version: "1.0"
---

# Ascetic Angular Conventions

Conventions for projects that use `@digitalascetic` libraries. Only apply when these packages are present in the project.

## Entities — @Type

All entity class properties must have `@Type` from `@digitalascetic/ngx-object-transformer`. Use arrow function `() => Type` for objects, dates, and arrays; no decorator argument for primitives.

```typescript
import { Type } from '@digitalascetic/ngx-object-transformer';

export class Client {
  @Type() id: number;
  @Type() name: string;
  @Type(() => Date) createdAt: Date;
  @Type(() => Address) address: Address;
  @Type(() => Property) properties: Property[];
}
```

## Forms — FormService

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
