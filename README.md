# Software Development Kit - Javascript DDD

Conjunto de utilitários para aplicações javascript com abordagens de Domain-Driven Design.

## Validações

> <em>A principal razão para usar a validação no modelo é para verificar a exatidão de qualquer um atributo/propriedade, qualquer objeto inteiro ou qualquer composição de objetos. [Implementando Domain-Driven Design](https://books.google.com/books/about/Implementando_Domain_Driven_Design.html?id=zc9KvgAACAAJ&source=kp_book_description). </em>

### Validando atributos ou propriedades com decoradores

Para facilitar a implementação de validadores de atributos ou propriedades, é disponibilizado neste SDK, um conjunto de decoradores que definem restrições para estes.

> <em>O Decorator é um padrão estrutural que permite adicionar novos comportamentos aos objetos dinamicamente, colocando-os dentro de objetos wrapper especiais. [Decorator em TypeScript](https://refactoring.guru/pt-br/design-patterns/decorator/typescript/example);
> Veja também: [Typescript Lang](https://www.typescriptlang.org/docs/handbook/decorators.html#decorators) | [Decorate your code with TypeScript decorators](https://codeburst.io/decorate-your-code-with-typescript-decorators-5be4a4ffecb4).</em>

Ao decorar um atributo ou propriedade com um ou mais decoradores de restrições, você apenas define quais validações deverão ser aplicadas, porém, apenas será realizada a validação quando for invocado o método `validate` do utilitário `ConstraintValidation` para o objeto, ficando a critério do desenvolvedor realizar a validação no construtor, fábrica ou método específico. Também fica a critério do desenvolvedor o tratamento das validações, lançando um erro ou não, por exemplo, com o resultado do método `validate`.

| _Decorator_ | Validação                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| @Valid      | Marca uma propriedade do tipo objeto para que também possua suas propriedades validadas em cascata.                |
| @NotNull    | Propriedade não deve ser nulo ou indefinido.                                                                       |
| @NotBlank   | Propriedade não deve ser nulo ou indefinido e deve conter, pelo menos, um caractere diferente de espaço em branco. |
| @Size       | O tamanho da propriedade deve respeitas as condições passadas para o decorador.                                    |

### Exemplo

```typescript
class Address {
  @NotBlank()
  id: string;

  @NotNull({
    message: 'Situation must not be null.',
  })
  situation: Situation;

  @Valid()
  zipCode: ZipCode;

  constructor(id: string, situation: Situation, zipCode: ZipCode) {
    this.id = id;
    this.situation = situation;
    this.zipCode = zipCode;
    const invalidConstraints = ConstraintValidation.validate(this);
    // Você pode avaliar o resultado de `invalidConstraints` para lançar ou não uma exceção ou realizar outro tratamento...
  }
}
```
