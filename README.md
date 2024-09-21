# Quiz_app


Homepage 
funcionalidades: boas vindas
                botão para o menu

Menu
Funcionalidades:    barra de navegação  -> lista de buttons sobre a categoria 
                                        -> cadastro de temas 
                                        -> cadastro de perguntas 


tela de Jogo
    selecionar qtd de perguntas e mostra qtd total de perguntas de acordo com o tema (validação de perguntas)
    formulario 

Tela Resultado
    acertos e erros em porcent

Cruid temas
lista de tema
button para add tema

regras: se apagar um tema precisa apagar todas as perguntas.


Cruid perguntas(parte 1)
lista de temas para selecionar e vincular a pergunta

cruid perguntas(parte 2)
lista de perguntas -> button para editar 
button para add 

cruid perguntas(parte 3)
formulario 

Organização do projeto: 
quiz_tematico/
├─ .expo/
├─ assets/
├─ node_modules/
├─ Screen/
│  ├─ HomePage/
│  │  ├─ index.js
│  │  └─ styles.js
│  ├─ ScreenForms/
│  │  ├─ index.js
│  │  └─ styles.js
│  ├─ ScreenGame/
│  │  ├─ index.js
│  │  └─ styles.js
│  ├─ ScreenRegistrationQuestions/
│  │  ├─ index.js
│  │  └─ styles.js
│  └─ ScreenRegistrationTheme/
│     ├─ index.js
│     └─ styles.js
├─ App.js
├─ app.json
├─ package.json
├─ package-lock.json
├─ babel.config.js
└─ README.md
