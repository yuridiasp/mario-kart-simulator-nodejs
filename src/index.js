const players = [
    {
        nome: 'Mario',
        velocidade: 4,
        manobrabilidade: 3,
        poder: 3
    },
    {
        nome: 'Peach',
        velocidade: 3,
        manobrabilidade: 4,
        poder: 2
    },
    {
        nome: 'Yoshi',
        velocidade: 2,
        manobrabilidade: 4,
        poder: 3
    },
    {
        nome: 'Bowser',
        velocidade: 5,
        manobrabilidade: 2,
        poder: 5
    },
    {
        nome: 'Luigi',
        velocidade: 3,
        manobrabilidade: 4,
        poder: 4
    },
    {
        nome: 'Donkey Kong',
        velocidade: 2,
        manobrabilidade: 2,
        poder: 5
    }
]

function showStatus(jogadores) {
    for (let index = 0; index < jogadores.length; index++) {

        const {nome, velocidade, manobrabilidade, poder, points} = jogadores[index];

        console.log(`=======================[ Player ${index + 1} ]=======================`);
        console.log(`\nNome: ${nome}\nVelocidade: ${velocidade}\nManobrabilidade: ${manobrabilidade}\nPoder: ${poder}\nPontos: ${points}`);
        console.log(`==========================================================\n\n`);
    }
}

function showPlacar(jogadores) {
    console.log(`\n==========[ Placar ]==========`);
    console.log(`${jogadores[0].nome}: ${jogadores[0].points} ponto(s)`);
    console.log(`${jogadores[1].nome}: ${jogadores[1].points} ponto(s)`);
    console.log(`==============================\n`);
}

function sortearPista () {
    const blocosPistas = ['reta', 'curva', 'confronto']
    const index = rolarDado(0, 2)

    const pistaSelecionada = blocosPistas[index]

    console.log(`O jogadores estão em um(a) ${pistaSelecionada}...`);

    return pistaSelecionada
}

function rolarDado(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function drive (players, atributo) {
    
    const resultados = players.map((player) => {
        const dado = rolarDado(1, 6)

        console.log(`${player.nome} rolou o 🎲 e saiu ${dado}`)

        return player[atributo] + dado
    })

    const index = resultados[0] < resultados[1] ? 1 : 0

    players[index].points++

    console.log(`${players[index].nome} foi melhor nesse trecho e recebeu 1 ponto!\n\n`);
}

function confronto (players) {
    
    const resultados = players.map(({ nome, poder }) => {
        const dado = rolarDado(1, 6)

        console.log(`${nome} rolou o 🎲 e saiu ${dado}`)

        return poder + dado
    })

    const index = resultados[0] < resultados[1] ? 0 : 1

    players[index].points = players[index].points > 0 ? --players[index].points : 0

    console.log(`${players[index].nome} venceu o confronto e o seu adversário perdeu 1 ponto!\n\n`);
}

function inicializarJogadores () {
    let optionsPlayers = [...players]
    const jogadores = []

    for (let c = 0; c < 2; c++) {
        const lastIndex = optionsPlayers.length-1
        const index = rolarDado(0, lastIndex)

        jogadores.push({...optionsPlayers[index], points: 0})
        
        optionsPlayers = optionsPlayers.filter((_, i) => i !== index)
    }

    console.log("\n 🕹 Jogadores selecionados... 🎮\n");gitg

    return jogadores
}

function finish(player1, player2) {

    if (player1.points > player2.points) {
        console.log(`O vencedor é... ${player1.nome} 🏁`)
    } else if (player1.points < player2.points) {
        console.log(`O vencedor é... ${player2.nome} 🏁`)
    } else {
        console.log(`A corrida terminou e houve EMPATE! 🏁`)
    }

}

function run (players) {
    const action = {
        'reta': () => drive(players, 'velocidade'),
        'curva': () => drive(players, 'manobrabilidade'),
        'confronto': () => confronto(players)
    }

    action[sortearPista()]()
}

function playRacing(player1, player2, rodadas) {

    console.log(`\n\n🚦 Corrida iniciada! ${player1.nome} x ${player2.nome} 🚦 \n\n`);

    for (let index = 0; index < rodadas; index++) {
        run([player1, player2])
        showPlacar([player1, player2])
    }
}

(function start () {
    const rodadas = 5
    
    const [ player1, player2 ] = inicializarJogadores()

    showStatus([player1, player2])

    playRacing(player1, player2, rodadas)

    finish(player1, player2)
})()