import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Der S3 Bucket (Webserver)
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      // WICHTIG: Website Hosting aktivieren
      websiteIndexDocument: 'index.html',
      
      // Damit die Seite öffentlich ist:
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS_ONLY, // Erlaubt öffentlichen Zugriff via Policy
      
      // Aufräum-Regeln (nur für Dev-Projekte empfohlen!)
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 2. Das Deployment (Code hochladen)
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      // Wir gehen vom 'lib' Ordner zwei Stufen hoch (in Root) und dann ins frontend
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../frontend'))],
      destinationBucket: websiteBucket,
    });

    // 3. Output: Die URL der Webseite im Terminal/GitHub anzeigen
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'Die URL meiner Website',
    });
  }
}