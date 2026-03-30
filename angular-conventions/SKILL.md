---
name: angular-conventions
description: Convenciones obligatorias de Angular. Activar SIEMPRE antes de escribir, modificar o revisar cualquier código Angular (.ts, .html, .scss), ya sea un componente, servicio, módulo, entidad, guard, pipe, interceptor o formulario. También activar ante cualquier mención de NgModule, inject(), FormService, @Type, signal, takeUntilDestroyed, SharedModule o cualquier elemento del stack Angular.
---

# Angular Conventions

Convenciones **obligatorias**. Aplícalas siempre, incluso si el código existente no las sigue.

## Módulos

Estructura **NgModule** — nunca standalone components.
- **Feature modules** — uno por feature
- **SharedModule** — componentes, pipes y directivas reutilizables

## Inyección de dependencias

Siempre `inject()`, nunca constructor injection.

```typescript
// ✅
private clientService = inject(ClientService);

// ❌
constructor(private clientService: ClientService) {}
```

## Formularios

`FormService` de `@digitalascetic/ngx-form`. Nunca `FormBuilder` o `FormGroup` directamente.

```typescript
import { FormService } from '@digitalascetic/ngx-form';

private formService = inject(FormService);
const obj = this.client ?? Client;
form = this.formService.getControl(obj);
```

API disponible:
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

## Entidades — @Type

Todas las propiedades llevan `@Type`. Con función `() => Tipo` en objetos, fechas y arrays; sin función en primitivos.

```typescript
export class Client {
  @Type() id: number;
  @Type() name: string;
  @Type(() => Date) createdAt: Date;
  @Type(() => Address) address: Address;
  @Type(() => Property) properties: Property[];
}
```

## Estado local

`signal()` para estado local, nunca `BehaviorSubject` en componentes.

```typescript
// ✅
clients = signal<Client[]>([]);

// ❌
clients$ = new BehaviorSubject<Client[]>([]);
```

## Suscripciones

Siempre `takeUntilDestroyed()`, nunca `ngOnDestroy` + `Subject`.

```typescript
private destroyRef = inject(DestroyRef);

this.myService.getData()
  .pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe(data => this.data.set(data));
```