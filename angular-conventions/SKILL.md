---
name: angular-conventions
description: Convenciones obligatorias de Angular para Bluplat. Activar SIEMPRE antes de escribir, modificar o revisar cualquier código Angular (.ts, .html, .scss), ya sea un componente, servicio, módulo, entidad, guard, pipe, interceptor o formulario. También activar ante cualquier mención de NgModule, inject(), FormService, @Type, signal, takeUntilDestroyed, SharedModule o cualquier elemento del stack Angular del proyecto.
---

# Angular Conventions — Bluplat

Convenciones **obligatorias**. Aplícalas siempre, incluso si el código existente en el contexto no las sigue.

## Naming

- Todos los nombres en **inglés**
- Sufijos obligatorios en ficheros y clases:
  - `*.component.ts` → `ClientListComponent`
  - `*.service.ts` → `ClientService`
  - `*.module.ts` → `ClientModule`
  - `*.guard.ts` → `AuthGuard`
  - `*.pipe.ts` → `CurrencyFormatPipe`
  - `*.interceptor.ts` → `AuthInterceptor`

## Módulos

Estructura **NgModule** (no standalone components). Dos tipos:
- **Feature modules** — uno por feature (`ClientModule`, `PropertyModule`)
- **SharedModule** — componentes, pipes y directivas reutilizables entre features

## Inyección de dependencias

Usar siempre `inject()`. **Nunca** constructor injection.

```typescript
// ✅
export class ClientListComponent {
  private clientService = inject(ClientService);
  private router = inject(Router);
}

// ❌
export class ClientListComponent {
  constructor(private clientService: ClientService) {}
}
```

## Formularios

Usar siempre `FormService` de `@digitalascetic/ngx-form`. **Nunca** `FormBuilder` o `FormGroup` directamente en componentes.

```typescript
import { FormService } from '@digitalascetic/ngx-form';

// ✅
export class ClientFormComponent {
  private formService = inject(FormService);
  form = this.formService.getControl(new Client());
}

// ❌
export class ClientFormComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({ ... });
}
```

### Métodos principales

```typescript
// Crear un AbstractControl a partir de un objeto — entiende @Type
form = this.formService.getControl(obj, propertiesObj?, options?);

// Actualizar objeto desde el formulario
this.formService.updateFromControl(object, control, updateJustModifiedValues?);
this.formService.updateFromValue(object, value);

// Obtener objeto tipado desde el valor del control
const client = this.formService.getObject(form.value, Client);

// Solo valores modificados — ideal para PATCHs parciales
const changes = this.formService.getModifiedValues(control, {
  forceInclude?: boolean;
  includeEntireArray?: boolean;
  alwaysIncludeProps?: string[];
});

// Patch parcial
this.formService.patchValue(control, { name: 'John' });

// Reordenar FormArrays
this.formService.reorderByValues(arrayControl, 'order', reorderedValues, pristineValues);
this.formService.reorderByProperty(arrayControl, 'order');
```

### Patrón típico

```typescript
export class ClientFormComponent {
  private formService = inject(FormService);

  client = new Client();
  form = this.formService.getControl(this.client);

  save() {
    // Opción A — solo campos modificados (PATCH)
    const changes = this.formService.getModifiedValues(this.form);

    // Opción B — actualizar objeto completo
    this.formService.updateFromControl(this.client, this.form);
  }
}
```

## Entidades — @Type

Todas las propiedades de entidades que sean objetos, fechas o arrays deben llevar `@Type`. Los primitivos (`string`, `number`, `boolean`) no lo necesitan.

```typescript
// ✅
export class Client {
  id: number;           // primitivo — sin @Type
  name: string;         // primitivo — sin @Type
  active: boolean;      // primitivo — sin @Type

  @Type(() => Date) createdAt: Date;
  @Type(() => Address) address: Address;
  @Type(() => Property) properties: Property[];
}

// ❌
export class Client {
  createdAt: Date;      // objeto — necesita @Type
  address: Address;     // objeto — necesita @Type
}
```

## Estado local

Usar `signal()` para estado local. Evitar `BehaviorSubject` en componentes.

```typescript
// ✅
clients = signal<Client[]>([]);
isLoading = signal(false);

// ❌
clients$ = new BehaviorSubject<Client[]>([]);
```

## Suscripciones

Usar siempre `takeUntilDestroyed()`. **Nunca** `ngOnDestroy` + `Subject`.

```typescript
// ✅
private destroyRef = inject(DestroyRef);

ngOnInit() {
  this.clientService.getClients()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(clients => this.clients.set(clients));
}

// ❌
private destroy$ = new Subject<void>();
ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
```

## Resumen

| Regla | ✅ | ❌ |
|---|---|---|
| Naming | Inglés + sufijos obligatorios | Español, sin sufijo |
| Módulos | NgModule (feature + shared) | Standalone components |
| Inyección | `inject()` | Constructor |
| Formularios | `FormService` | `FormBuilder` directo |
| Entidades | `@Type()` en objetos, fechas y arrays | `@Type()` en primitivos, o sin decorar objetos |
| Estado | `signal()` | `BehaviorSubject` |
| Suscripciones | `takeUntilDestroyed()` | `ngOnDestroy` + Subject |
