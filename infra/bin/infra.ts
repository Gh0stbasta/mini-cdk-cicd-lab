#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// Hier importieren wir unsere Klasse aus dem lib-Ordner
// WICHTIG: './infra-stack' muss zum Dateinamen in 'lib/' passen (ohne .ts)
import { InfraStack } from '../lib/infra-stack'; 

const app = new cdk.App();

// Hier erstellen wir den Stack
// 'MiniCdkCicdLabStack' ist der Name, der später in der AWS CloudFormation Konsole steht.
// Du kannst ihn nennen wie du willst, aber er muss eindeutig sein.
new InfraStack(app, 'MiniCdkCicdLabStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});