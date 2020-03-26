# Ogólne informacje o projekcie
<br/>

# Architektura:
```
2020_4_KP_Fitbook
│   readme.md    
│
└───Frontend
│ 
└───Backend
│   
└───Projektowanie
```

<br/>

### Frontend

```
Frontend    
│
└───Fitbook-frontend
│   |
│   └───dist
│       │   ...
│   |
│   └───e2e
│       │   ...
│   |
│   └───node_modules
│       │   ...
│   |
│   └───src
│       │   
│       └───app
│       │   ... <-
│       │   
│       └───assets
│       │   ...
│       │   
│       └───environment
│       │   ...
|   |
|   |.editorconfig
|   |.gitignore
|   |angular.json
|   |...

```

<br/>

```
app    
│
└───@shared
│   |
|   |   shared.module.ts
│   └───topbar
│       │   ...
│
└───home
│   |
│   |   home.component.html
│   |   home.component.scss
|   |   ...
│   |
│   └───@components
│   |
│   └───about
│   |
│   └───register
│   |  
|   
TO DO: DOKOŃCZYĆ
```

<br/>

# Instrukcja zbudowania:

## frontend

1. należy pobrać oraz zainstalować oprogramowanie Node.js
<br/>
https://nodejs.org/en/download/ 

1. Należy otworzyć terminal systemowy w folderze `Frontend`

2. Następnie wykonać pokolei następujące komendy:
``` 
npm install -g @angular/cli@latest
```
3. Następnie przejść do folderu `Fitbook-frontend` i wykonać komendy:
``` 
npm install bootstrap
```
4. Następnie wystarczy wykonać komendę:
``` 
ng serve
```
5. Wejść w przeglądarce na stronę
<br/> http://localhost:4200/

## backend 

1. Należy przejść do folderu backend i uruchomić z wiersza poleceń komendą
```
mvn spring-boot:run
```

## baza danych

Baza danych jest postawiona na serwerze, więc nie trzeba jej konfigurować lokalnie