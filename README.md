# Bacuri - The Custom Framework

## Sobre

Bacuri é um framework minimalista que faz uso de Material Design, e que possui
um sistema de Plugins para aumentar suas capacidades.

## Instalação

O framework é composto por um Core, que são as classes básicas, e um Plugin Manager.
Instale o framework com o NPM:

```bash
npm i bacuri
```

Ou com o Yarn
```bash
yarn add bacuri
```

## Uso
### Core
Após a instalação importe o Core adicionando este código no principal arquivo scss.

```scss
@import '~/bacuri/core/main';
@import './plugins.scss';
```

### Plugin Manager
O Manager é instalado em sua máquina automaticamente após a instalação, e pode ser executado digitando ```psys``` no terminal. Para facilitar o gerenciamento, o sistema faz uso dos arquivos registry.json e plugins.scss, que podem ser criados com o comando
```bash
$ psys -i
```
#### Adicionar um plugin e salvar
Para adicionar um novo plugin, execute os comandos nessa ordem.
```bash
$ psys -a nome-do-plugin

$ psys -s nome-do-plugin
```

Outros comandos disponíveis estão listados em ```psys -h```.

## Plugins

Bacuri basicamente adiciona uma paleta de cores, uma tipografia, estilizar
os botões e um flex layout à sua página. Qualquer código CSS/Sass que não
interfira na estilização trazida pelo framework pode ser adicionado manualmente,
mas há também um sistema de plugins para caso queira uma estilização que demande
mais código.

## HTML Semântico

Muitas das classes estão ligadas diretamente a uma tag html5 específica,
então o entendimento de HTML Semântico é necessário para usar este framework.

## Tecnologias

-   HTML5
-   SCSS
-   Typescript
-   Rollup

## Autor

Luigi Moraes

-   [Github](https://github.com/luigi-ms)
