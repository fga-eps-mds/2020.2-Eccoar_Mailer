# 2020.2 Eccoar Email Service

Este serviço é referente ao serviço de Emails.
Para poder utilizá-lo, certifique de que você possui o [Docker](https://www.docker.com/) e o 
[Docker Compose](https://docs.docker.com/compose/) em sua máquina.
Caso contrário será necessário baixá-los. Para isso basta seguir os links:

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

Para rodar o projeto, basta executar o seguinte comando na raíz:
```
docker-compose up --build
```

Como testar o serviço de email:

```
1º Crie um arquivo chamado .env, na raiz do projeto

2º Insira nesse arquivo as variáveis:

* SERVICE ---> Responsável por dizer qual é o host SMTP que você vai utilizar;
* EMAIL ---> Responsável por dizer qual é o email que você deseja utilizar para enviar emails;
* PASS ---> Credencial de acesso ao email que você deseja utilizar para enviar o email.

3º Depois de configurar o .env, rode o projeto e faça uma requisição para a rota /api/sendMail
```

Para executar os testes basta rodar:
```
docker run 20202-eccoar_emails_backend_mailer npm run test
```

Para executar o lint rode:
```
docker run 20202-eccoar_emails_backend_mailer npm run lint
```
