Esse projeto foi criado durante a realização do curso "Testes de Performance com K6". 

Ele executa exemplos práticos dos tipos de teste de performance que podemos criar utilizando a ferramenta K6. 

Deixarei aqui uma descrição dos tipos de testes que podem ser realizados utilizando o K6 (Essas são as minhas anotações durante a realização do curso, espero que seja útil) 

Smoke testing -> Visa validar o mínimo funcionamento após uma modificação no sistema, para o k6 as suas características são:
 - 01: Carga mínima
 - 02: Cenário simples
 - 03: Funcionalidade Core.
 - 04: Rápido Resultado.

Exemplo:

export const carga = {
	vus: 1,
	duration: '1m'
}

----------------------------------------------------------------------------------------------------------------------------------------------------------

Performance Testing / Load test -> Quantidade de tráfego em horários normais e horário de pico

 - 01 - Quantidade de tráfego.
 - 02 - Condições normais e de pico.
 - 03 - Garantir funcionamento.

Exemplo:

//Carga constante
export const carga1 = {
	vus: 100,
	duration: '20m'
}

//Carga variável
export carga2 = {
	stages: [
		{ duration: '5m', target: 100 }, //Aceleração, em 5 minutos o sistema sai de 0 para 100 usuários
		{ duration: '10m', target: 100 }, // Carga constante de 100 usuários por 10 minutos
		{ duration: '5m', target: 0 } //Desaceleração, em 5 minutos ele diminui para 0 usuários conectados
	]
}


Benefícios:
 - Permite que o seu sistema aqueça ou redimensione automaticamente para lidar com o tráfego
 - Permite que você compare o tempo de resposta entre os estágios de carga baixa e carga nominal

----------------------------------------------------------------------------------------------------------------------------------------------------------

Stress Testing -> Como o sistema se comportará sobre alta carga? (situações adversas)

 - 01 - Como seu sistema se comporta em condições extremas?
 - 02 - Qual é a capacidade máxima do seu sistema em termos de usuários ou taxa de transferência?
 - 03 - O ponto de ruptura do seu sistema? (Até onde o seu sistema suporta requisições? Em qual ponto o seu sistema não suporta mais acesso?)
 - 04 - O sistema se recupera sem intervenção manual após o término do teste de estresse?


O stress testing pode validar a arquitetura de uma aplicação, identificando gargalos que podem ser prejudiciais na aplicação

Exemplo:

export carga = {
	stages: [
		{ duration: '2m', target: 100 }, 
		{ duration: '5m', target: 100 }, 
		{ duration: '2m', target: 200 },
		{ duration: '5m', target: 200 }, 
		{ duration: '2m', target: 300 }, 
		{ duration: '5m', target: 300 },
		{ duration: '2m', target: 400 }, 
		{ duration: '5m', target: 400 }, 
		{ duration: '10m', target: 0 }
	]
}

O aumento repentino de carga consegue validar:
 - A rapidez com que os mecanismos de redimensionamento automático reagem ao aumento da carga.
 - Se houver alguma falha durante os eventos de dimensionamento.



Spike testing:
 - Como seu sistema funcionará sob um aumento repentino de tráfego?
 - O seu sistema irá se recuperar assim que o tráfego diminuir?

Principal diferença entre spike testing e stress testing -> No spike testing não aumentamos gradualmente a carga, em vez disso atingimos uma carga extrema em um período de tempo muito curto (poucos segundos).

Resultados possíveis:
 - Excelente -> O sistema não é degradado com o aumento considerável de tráfego
 - Bom -> O sistema fica um pouco mais lento, porém o sistema não produz falhas
 - Insatisfatório -> Produz algumas falhas, porém ele volta a atender quando o tráfego diminui
 - Ruim -> Trava e não se recupera quando o tráfego diminui

Exemplo:

export carga = {
	stages: [
		{ duration: '10s', target: 100 }, 
		{ duration: '1m', target: 100 }, 
		{ duration: '10s', target: 1400 },
		{ duration: '3m', target: 1400 }, 
		{ duration: '10s', target: 100 }, 
		{ duration: '3m', target: 100 },
		{ duration: '10s', target: 0 }
	]
}

----------------------------------------------------------------------------------------------------------------------------------------------------------

Soak Testing -> Confiabilidade em longos períodos de tempo, esse teste busca alcançar os seguintes resultados:
 - O sistema não sofre de bugs ou vazamento de memória
 - Verifique se as reinicializações inesperadas do aplicativo não perdem solicitações
 - Encontre bugs relacionados a condições de corrida que aparecem esporadicamente.
 - Certificar que seu banco de dados não esgote o espaço de armazenamento alocado e pare.
 - Certifique-se de que seus logs não esgotam o armazenamento em disco alocado.
 - Certifique-se de que os serviços externos dos quais você depende não parem de funcionar após a execução de um certa quantidade de solicitações.

export carga = {
	stages: [
		{ duration: '2m', target: 400 }, 
		{ duration: '3h56m', target: 400 }, 
		{ duration: '2m', target: 0 }
	]
}


O Soak testing não busca atingir o ponto de ruptura. Utilize cerca de 80% da capacidade do seu sistema
Faça uma análise da infraestrutura do sistema antes de executar o teste, veja se ele faz sentido (o custo e planejamento desse teste é muito grande)

----------------------------------------------------------------------------------------------------------------------------------------------------------

Métricas -> Medem o desempenho do sistema em situações de teste.

1 - Contadores -> Somas e incrementos
2 - Medidores -> Utilizado para rastrear maiores e menores valores
3 - Taxas -> Rastreiam a frequência
4 - tendência -> Cálculo de média, moda, mediana

----------------------------------------------------------------------------------------------------------------------------------------------------------

Thresholds (Limites) -> Utilizados como critérios de reprovação ou aprovação, são métricas que o teste deve atender, caso não sejam atendidos o teste irá falhar.

----------------------------------------------------------------------------------------------------------------------------------------------------------

Módulos com k6

Existem 3 tipos diferentes de módulos, são eles:
 - Módulos embutidos
 - Módulos remotos
 - Módulos do sistema local de arquivos

----------------------------------------------------------------------------------------------------------------------------------------------------------

Tags - Uma maneira de rotular elementos com o k6

Podemos rotular, adicionando uma tag aos seguintes itens:
 - Requests
 - Checks
 - Thresholds
 - Métricas customizadas
 - Todas as métricas de um teste

Tags podem ser utilizadas em conjunto com groups

----------------------------------------------------------------------------------------------------------------------------------------------------------

Teste de performance em sistemas web

Frontend
 - Se as páginas do aplicativo são otimizadas para renderizar rapidamente na tela de um usuário
 - Quanto tempo leva para um usuário interagir com os elementos de interface do aplicativo

Navegador
 - O teste de carga baseado em navegador verifica o desempenho do frontend de um aplicativo simulando usuários reais usuando um navegador para acessar seu site

Protocolo
 - O teste de carga baseado em protocolo verifica o desempenho do backend de um aplicativo simulando as solicitações subjacentes às ações do usuário.

Híbrido
 - O teste de carga híbrido é uma combinação do teste de carga baseado em protocolo e baseado em navegador


Como é feito?
 - K6 versão >= 0.43.0

Métricas importantes
 - browser_web_vital_cls -> Medida do maior bust de pontuação de troca de layout pra cada mudança inesperada que ocorre durante toda a vida útil de uma página 
 - browser_web_vital_lcp -> Informa o tempo de renderização da maior imagem ou bloco de texto visível na página em relação ao momento em que a página começou a ser carregada
 - browser_web_vital_fid -> Mede o tempo entre a primeira interação do usuário coma a página até o momento em que o navegador pode começar a processar manipuadores de eventos em resposta as interações do usuário


----------------------------------------------------------------------------------------------------------------------------------------------------------

Breakpoint Testing (teste de capacidade, teste de limite ou teste de carga pontual)

Desejamos encontrar o limite do sistema

1 - Ajustar/Cuidar de pontos fracos do sistema, buscando limites maiores suportador pelo sistema.
2 - Ajudar a planejar e verificar a correção de sistema com baixo limite de utilização.

Quando executar?
 - Após mudanças significativas na base de código/infraestrutura.
 - Consumo elevado de recursos pelo seu sistema
 - Carga do sistema cresce continuamente?

Pontos de atenção
 - Atenção a elasticidade de ambientes de nuvem (o objetivo é o sistema e não a infraestrutura)
 - Aumento de carga gradual para essa modalidade
 - Tipo de teste de ciclo iterativo
 - Interrupção manual ou automática

Seu sistema deve passar pelos outros tipos de testes antes do breaking point teste ser realizado








