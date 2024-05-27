# Pw Animes

Pw Animes é um aplicativo para assistir animes, desenvolvido com Ionic, React, TypeScript e Capacitor. Ele utiliza tecnologias modernas como Axios para requisições HTTP, Ionicons para ícones, e React Router DOM para gerenciamento de rotas.

## Índice

- [Download](#download)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Capturas de Tela](#capturas-de-tela)
- [Solução de problemas](#solução-de-problemas)
- [Capturas de Tela](#capturas-de-tela)
- [Licença](#licença)

## Download

Em breve.

## Funcionalidades

- Assistir: Assista aos episódios diretamente no aplicativo.
- Catálogo de Animes: Explore uma vasta lista de animes disponíveis.
- Detalhes do Anime: Veja informações detalhadas sobre cada anime.
- Pesquisa: Encontre seus animes favoritos através da funcionalidade de pesquisa.

## Tecnologias Utilizadas

- Ionic: Framework para construir aplicativos móveis híbridos.
- React: Biblioteca JavaScript para construção de interfaces de usuário.
- TypeScript: Superset de JavaScript que adiciona tipagem estática.
- Capacitor: Plataforma para construir aplicativos nativos modernos usando tecnologias web.
- Axios: Cliente HTTP para fazer requisições assíncronas.
- Ionicons: Conjunto de ícones integrados ao Ionic.
- React Router DOM: Biblioteca para gerenciamento de rotas no React.

## Solução de Problemas

### Construir a Capa do Aplicativo

   ```sh
   npm install @capacitor/assets --save-dev && npx @capacitor/assets generate --iconBackgroundColor '#062720' --splashBackgroundColor '#062720' && npm uninstall @capacitor/assets && npm run aplication:build
   ```

### Consertar o Visual

Navegue até a pasta `android/app/src/main/res/values` do seu projeto Ionic e abra o arquivo `strings.xml`. Adicione as seguintes linhas de código dentro da tag `<style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">`

   ```xml
      <item name="android:background">@android:color/black</item>
      <item name="android:navigationBarColor">@android:color/black</item>
      <item name="android:windowFullscreen">true</item>
   ```

### Comandos de Build APK

   ```sh
   cd android/
   ```

   ```sh
   ./gradlew assembleDebug
   ```

## Capturas de Tela

![tela-inicial](https://github.com/KevinWillyan456/pw-animes-app/assets/115520107/5d628d5d-2152-4c81-9162-28046c2c7faf)
_Tela Inicial_

![tela-favoritos](https://github.com/KevinWillyan456/pw-animes-app/assets/115520107/3ecba1c8-082a-4e56-8c0b-bac1f430f349)
_Tela Favoritos_

![tela-anime](https://github.com/KevinWillyan456/pw-animes-app/assets/115520107/3c93ce5f-ef43-4ec5-ab52-33789ec0b015)
_Tela Anime_

![tela-pesquisa](https://github.com/KevinWillyan456/pw-animes-app/assets/115520107/d359479c-9e74-43eb-859b-c32654492fa0)
_Tela Pesquisa_

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Pw Animes © 2024. Todos os direitos reservados.

---

_Desenvolvido por [Kevin Souza](https://github.com/KevinWillyan456)._
