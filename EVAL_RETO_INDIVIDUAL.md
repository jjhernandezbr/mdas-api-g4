## Hace todos los puntos pedidos (40%)

#### El nombre del repositorio es el correcto (mdas-api-${nombre}_${apellido})

OK

#### Permite obtener los detalles de un pokemon vía endpoint (datos + número de veces que se ha marcado como favorito)

OK

#### Actualiza el contador de favoritos vía eventos

No me funciona, me devuelve "Internal server error", aunque parece que debería hacerlo por el código que hay escrito

#### ¿Se controlan las excepciones de dominio? Y si se lanza una excepción desde el dominio, ¿se traduce en infraestructura a un código HTTP?

OK

#### Tests unitarios

OK

#### Tests de aceptación

KO

#### Tests de integración

OK

**Puntuación: 32/40**

## Se aplican conceptos explicados (50%)

#### Separación correcta de capas (application, domain, infrastructure + BC/module/layer)

OK

#### Aggregates + VOs

En el agregado de pokemon, en lugar de sumar al atributo de clase `PokemonNumsFav` y después guardar la información en
el repositorio, se hace directamente en el repositorio. El agregado de user está OK

#### No se trabajan con tipos primitivos en dominio

OK

#### Hay use cases en aplicación reutilizables

OK

#### Se aplica el patrón repositorio

Sólo se puede tener un repositorio por módulo. Además, el repositorio no debería tener métodos del
tipo `sumFavouritePokemon`. Tiene que tener métodos acordes a un repositorio: `save`, `findBy`...

En este caso, lo correcto hubiese sido que hubiese una única interfaz (`PokemonRepository`) que actúe de "proxy" entre
el dominio y la infra, dándole igual al dominio cómo se construya el agregado. Si en infra hay que buscar parte de la
información en la API y otra parte en un in memory, que lo haga.

#### Se usan subscribers

OK

#### Se lanzan eventos de dominio

OK

#### Se utilizan object mothers

KO

**Puntuación: 33/50**

## Facilidad setup + README (10%)

#### El README contiene al menos los apartados ""cómo ejecutar la aplicación"", ""cómo usar la aplicación""

OK

#### Es sencillo seguir el apartado ""cómo ejecutar la aplicación""

No me arranca rabbit con este commando:

```docker compose up rabbitmq server
no such service: server
```

Lo he arrancado lanzando `docker-compose up -d rabbitmq`

**Puntuación: 7/10**

## Extra

- Se ha entregado tarde

**Puntuación: -8**

**PUNTUACIÓN FINAL: 64/100**
