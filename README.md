# Academia
**🏋️‍♂️Aplicativo para alunos e professores de uma academia🏋️‍♂️**

# Forma Academia – React Native/Expo

Aplicativo mockado da Forma Academia pronto para rodar em um ambiente mobile real (ADB/Android Studio ou Expo Go).

## Requisitos

- Node.js 18+ e npm
- [Expo CLI](https://docs.expo.dev/) (`npm install expo --global`) — opcional, os scripts npm já chamam o executável local
- Android Studio instalado com um dispositivo virtual ou um aparelho conectado via ADB

## Scripts principais

| Script            | Descrição                                                                 |
| ----------------- | ------------------------------------------------------------------------- |
| `npm run start`   | Inicia o Metro bundler. Use `a` para abrir no emulador Android.           |
| `npm run android` | Executa `expo run:android`, gera o APK nativo e instala via ADB.          |
| `npm run ios`     | Gera build para iOS (requer macOS).                                       |
| `npm run web`     | Executa o bundle via navegador (útil para inspeção rápida).               |
| `npm run lint`    | Lint dos arquivos `.ts`/`.tsx`.                                           |

## Como rodar no Android Studio / dispositivo via ADB

1. `npm install`
2. Abra o Android Studio e inicie um emulador **ou** conecte um aparelho físico com a depuração USB ativada (`adb devices` deve listá-lo).
3. Execute `npm run android`. O Expo irá gerar o projeto nativo, compilar e instalar o app no dispositivo conectado.
4. Para desenvolvimento iterativo, use `npm run start` e pressione `a` no terminal para abrir rapidamente o app já em modo Metro bundler.

## Estrutura resumida

- `App.tsx`: ponto de entrada carregado pelo Expo.
- `src/App.tsx`: controla a navegação mockada entre as telas.
- `src/screens/*`: telas mobile (landing, login, cadastro e área do aluno).
- `src/components/BrandWordmark.tsx`: componente compartilhado da marca.

## Observações

- Todo o fluxo é mockado — nenhum dado é enviado para APIs reais.
- Os estilos foram escritos apenas com propriedades suportadas pelo React Native, garantindo compatibilidade ao rodar via Expo/ADB.
