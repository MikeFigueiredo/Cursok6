//1. Inicialização - Importar os recursos necessários para a implementação do script de teste

import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';

//2. Configuração - Definir configurações para quantidade de usuários virtuais e tempo de carga  que será executado

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter('Quantidade de chamadas') //Métrica contador
const myGauge = new Gauge('Tempo bloqueado') //Métrica medidor
const myRate = new Rate('Taxa req 200') //Métrica taxa
const myTrend = new Trend('Taxa de espera') //Métrica tendência

//3. Execução - Implementação do teste que será realizado
export default function(){
    const req = http.get('http://test.k6.io')
    chamadas.add(1)
    myGauge.add(req.timings.blocked)
    myRate.add(req.status === 200)
    myTrend.add(req.timings.waiting)
}

//4. desmontagem - Etapa opcional, onde podemos processar os resultados da etapa de execução
/*export function teardown(data){
    console.log(data)
}*/