//1. Inicialização - Importar os recursos necessários para a implementação do script de teste

import http from 'k6/http';

//2. Configuração - Definir configurações para quantidade de usuários virtuais e tempo de carga  que será executado

/*export const options = {
    vus:1,
    duration: '10s'
}*/

//3. Execução - Implementação do teste que será realizado
export default function(){
    http.get('http://test.k6.io')
}

//4. desmontagem - Etapa opcional, onde podemos processar os resultados da etapa de execução
/*export function teardown(data){
    console.log(data)
}*/