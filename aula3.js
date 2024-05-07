//1. Inicialização - Importar os recursos necessários para a implementação do script de teste

import http from 'k6/http';
import { check } from 'k6'

//2. Configuração - Definir configurações para quantidade de usuários virtuais e tempo de carga  que será executado

export const options = {
    vus: 1,
    duration: '3s'
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