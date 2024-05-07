//Módulo embutido
import http from 'k6/http'
import { check } from 'k6'

//Módulo remoto - Utilizar os módulos do jslib.k6.io
import { AWSConfig, s3Client } from 'https:/jslib.k6.io/aws/0.4.0/s3.js'

//Módulo do sistema (local)
import runTest from './test1.js'