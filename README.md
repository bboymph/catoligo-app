# catoliGO

Aplicativo React Native com Expo, Expo Router e TypeScript.
A cor primária do projeto é `#F8BD2A`.

O aplicativo abre na tela de login, que autentica as credenciais pela API.
Em **Criar conta**, informe nome, e-mail válido e uma senha de pelo menos seis
caracteres, confirmando-a para concluir o cadastro. Após a confirmação de
sucesso, faça login com a nova conta. A opção
**Esqueci minha senha** informa que a recuperação ainda não está disponível.
Após o login, o dashboard apresenta quatro notícias fictícias com ilustrações
locais. A pesquisa filtra títulos e descrições. As abas Eventos e
Bíblia são telas reservadas para funcionalidades futuras.

## Requisitos

- Node.js e npm.
- Para testar no celular, instale o Expo Go pela
  [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  ou pela [App Store](https://apps.apple.com/app/expo-go/id982107779).
  O Expo Go é um aplicativo para o celular, não uma biblioteca instalada no projeto.

## Executar

Na pasta do projeto, instale as dependências e inicie o servidor:

```bash
npm install
npm start
```

Para abrir no celular, conecte o computador e o celular à mesma rede Wi-Fi e
leia o QR code exibido no terminal: no Android, use o leitor do Expo Go; no
iPhone, use a câmera. Em um iPhone físico, entre na mesma conta Expo no Expo Go
e no terminal com `npx expo login`.

Para abrir no computador, execute `npm run web` ou pressione `w` no terminal
do servidor. Também é possível usar `npm run android` com um emulador Android
configurado. O simulador iOS requer macOS e Xcode.

Se a conexão pela rede local falhar, tente `npx expo start --tunnel`; o Expo
pode solicitar a instalação da dependência necessária para o túnel.

## Estrutura

```text
src/app/              Rotas e layout do Expo Router
src/components/       Componentes compartilhados
src/data/             Dados de demonstração
src/screens/          Telas do aplicativo
src/theme/            Valores compartilhados de tema
assets/               Imagens e ícones
app.json              Configuração do Expo
```
