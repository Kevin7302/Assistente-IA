const apiKeyInput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

const markdownToHTML = (text) => {
    console.log('showdown', showdown) // <- Deve mostrar o objeto com método .Converter
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const requestAI = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const requestLol = `
        ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}

        ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas

        ##Regras
        - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao ${game}, responda com 'Essa pergunta não está relacionada ao ${game}'
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual
        - Se a ${question} não for identificada corretamente, não tente adivinhar a pergunta do usuário. Apenas responda que não entendeu a pergunta.
        - Identifique a linguagem do usuário e dê sua resposta de acordo com a linguagem que ele escrever dentro do campo de pergunta.

        ## Resposta
        - Economize na resposta, seja direto e responda no máximo 500 caracteres.
        - Responda em markdown
        - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

        ## Exemplo de resposta
        Pergunta do usuário: Melhor build rengar jungle
        Resposta: A builda mais atual é: \n\n **Itens:**\n\n coloque os itens aqui.\n\n**Runas:**\n\n exemplo de runas\n\n

        ---
        Aqui está a pergunta do usuário: ${question}
    `
    const requestValorant = `
        ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}

        ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas

        ## Regras
        - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao ${game}, responda com 'Essa pergunta não está relacionada ao ${game}'
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda algo que você não tenha certeza de que existe no patch atual
        - Se a ${question} não for identificada corretamente, não tente adivinhar a pergunta do usuário. Apenas responda que não entendeu a pergunta.
        - Identifique a linguagem do usuário e dê sua resposta de acordo com a linguagem que ele escrever dentro do campo de pergunta.

        ## Resposta
        - Economize na resposta, seja direto e responda no máximo 500 caracteres.
        - Responda em markdown
        - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

        ## Exemplo de Resposta
        Pergunta do usuário: Me fale sobre estratégias para aplicar durante o jogo e quais campeões são mais recomendados para essa estratégia.
        Resposta: A estratégia é: \n\n O melhor campeão para utilizar essa estratégia é: \n\n

        ---
        Aqui está a pergunta do usuário: ${question}

    `
    const requestCsgo = `
        ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}

        ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas

        ## Regras
        - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao ${game}, responda com 'Essa pergunta não está relacionada ao ${game}'
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
        - Nunca responda algo que você não tenha certeza de que existe no patch atual
        - Se a ${question} não for identificada corretamente, não tente adivinhar a pergunta do usuário. Apenas responda que não entendeu a pergunta.
        - Identifique a linguagem do usuário e dê sua resposta de acordo com a linguagem que ele escrever dentro do campo de pergunta.

        ## Resposta
        - Economize na resposta, seja direto e responda no máximo 500 caracteres.
        - Responda em markdown
        - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

        ## Exemplo de resposta
        Pergunta do usuário: Fale sobre como é a jogabilidade do CS:GO e como colocar em prática a economia na compra de armas ou outros artefatos. Me fale também quais são as armas mais clássicas usadas durante o jogo.
        Resposta: A jogabilidade do CS:GO é: \n\n Você pode economizar das seguintes formas: \n\n As armas mais clássicas e recomendadas são: \n\n

        ---
        Aqui está a pergunta do usuário: ${question}
    `

    let request = ''

    switch (game) {
        case 'lol':
            request = requestLol
            break;

        case 'valorant':
            request = requestValorant
            break;

        case 'csgo':
            request = requestCsgo
            break;
    }

    const contents = [{
        role: "user",
        parts: [{
            text: request
        }]
    }]

    const tools = [{
        google_search: {}
    }]

    //Chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text


}

const sendForm = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    console.log({ apiKey, game, question })

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    askButton.disabled = true;
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
        // Perguntar para a IA
        const text = await requestAI(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
        aiResponse.classList.remove('hidden')
    }

    catch (error) {
        console.log('Erro: ', error)
    }

    finally {
        askButton.disabled = false
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')
    }

}
form.addEventListener('submit', sendForm)
