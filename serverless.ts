import { AWS } from '@serverless/typescript';
import { config } from 'dotenv';

config();

const serverlessConfiguration: AWS = {
  service: 'api-to-do',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    region: 'us-east-2',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_PORT: process.env.DATABASE_PORT,
      DATABASE_USER: process.env.DATABASE_USER,
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      AUTHENTICATION_SECRET: process.env.AUTHENTICATION_SECRET,
    },
  },
  functions: {
    // user
    CreateUser: {
      handler: './src/modules/user/handlers/CreateUserHandler.handle',
      events: [{ http: { method: 'POST', path: '/user', cors: false } }],
    },
    AuthenticateUser: {
      handler: './src/modules/user/handlers/AuthenticateUserHandler.handle',
      events: [
        { http: { method: 'POST', path: '/user/authenticate', cors: false } },
      ],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      external: ['pg-native'],
    },
  },
};

module.exports = serverlessConfiguration;
