//1. Inicialização - Importar os recursos necessários para a implementação do script de teste

import http from 'k6/http';
import { check } from 'k6'

//2. Configuração - Definir configurações para quantidade de usuários virtuais e tempo de carga  que será executado

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        //O p(95) quer dizer que 95% das requisições precisam estar abaixo do valor 200
        //http_req_duration: ['p(95) < 200', 'p(90) < 400'] //É possível passar mais de um parâmetro para esse critério
        http_req_duration: [{threshold: 'p(95) < 200', abortOnFail: true, delayAbortEval: '10s'}],
        checks: ['rate > 0.99'] //Critério de porcentagem para o check, configurado para 99%
    }
}

//3. Execução - Implementação do teste que será realizado
export default function(){
    const res = http.get('http://test.k6.io')
    check(res, {
        'status code é 200': (r) => r.status === 200
    })
}

//4. desmontagem - Etapa opcional, onde podemos processar os resultados da etapa de execução
/*export function teardown(data){
    console.log(data)
}*/