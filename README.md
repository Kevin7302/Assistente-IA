# 🧠 Assistente de Meta para Jogos (com IA Gemini)

Este projeto é um assistente inteligente desenvolvido com foco em jogos competitivos como **League of Legends**, **Valorant** e **CS:GO**. Ele utiliza **IA generativa da Google (Gemini)** para responder perguntas sobre estratégias, builds e dicas de gameplay com base em atualizações recentes dos jogos.

A aplicação permite que o usuário escolha o jogo, insira uma pergunta e obtenha uma resposta objetiva e personalizada, formatada em **Markdown** e renderizada diretamente na interface. Todas as respostas são geradas dinamicamente com base nas instruções específicas do contexto e com suporte ao idioma utilizado pelo próprio usuário.

---

## 🎯 Objetivo do Projeto

O projeto foi criado com o intuito de:

- Explorar o uso da **API Gemini da Google**.
- Criar uma interface acessível e moderna usando **HTML, CSS e JavaScript puro**.
- Aplicar conceitos de **prompts estruturados**, controle de **fluxo de requisições assíncronas**, e **formatação de resposta com markdown**.
- Garantir que a IA **responda com base na linguagem do usuário** (português, por padrão).
- Oferecer respostas **contextuais, diretas e coerentes com o patch atual** de cada jogo.

---

## ⚙️ Funcionalidades

- 🔐 Campo para inserir a chave da API Gemini.
- 🎮 Seletor para os jogos: League of Legends, Valorant e CS:GO.
- 🧾 Respostas diretas, objetivas, com limite de 500 caracteres.
- 🗣️ Suporte dinâmico à linguagem da pergunta.
- 🖌️ Exibição de resposta formatada via Markdown usando **Showdown.js**.
- 💡 Regras claras de uso para garantir qualidade e veracidade nas respostas.
- ⚠️ É necessário o uso de uma chave de API do Gemini própria, para que o sistema funcione corretamente ⚠️
  

---

## 🚀 Tecnologias Utilizadas

- **HTML5**, **CSS3** (com animações e responsividade)
- **JavaScript (Vanilla)** com `fetch` assíncrono
- **Gemini API** da Google (via endpoint REST)
- **Showdown.js** para conversão de markdown para HTML

---

## 📷 Demonstração

> <img width="1921" height="1033" alt="image" src="https://github.com/user-attachments/assets/99129947-ddf5-464b-a78f-01f12cc03940" />


---

## 📝 Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   
## 🔐 Como obter sua própria chave da API do Gemini

Para utilizar este assistente, você precisa de uma chave da API do Gemini. Siga os passos abaixo:

1. Acesse [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Faça login com sua conta Google.
3. Copie sua chave de API e cole no campo "API KEY" ao iniciar o aplicativo.

> ⚠️ Sua chave é privada e pessoal. Ela permite acesso à IA da Google e pode gerar custos em caso de uso excessivo. Nunca compartilhe essa chave publicamente. ⚠️
