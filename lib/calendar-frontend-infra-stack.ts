import * as cdk from "aws-cdk-lib";
import { SymlinkFollowMode } from "aws-cdk-lib";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";
import path = require("path");

export class CalendarFrontendInfraStack extends cdk.Stack {
  private frontEndFargate: ApplicationLoadBalancedFargateService;
  private vpc: Vpc;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.vpc = new Vpc(this, "FrontEndVpc", {
      maxAzs: 2,
      subnetConfiguration: [
        { name: "frontEndPublicSubnet", subnetType: SubnetType.PUBLIC },
      ],
    });
    this.frontEndFargate = new ApplicationLoadBalancedFargateService(
      this,
      "FrontEndFargate",
      {
        assignPublicIp: true,
        vpc: this.vpc,
        taskSubnets: { subnetType: SubnetType.PUBLIC },
        desiredCount: 1,
        publicLoadBalancer: true,
        taskImageOptions: {
          containerName: "FrontEndContainer",
          containerPort: 80,
          image: ContainerImage.fromAsset(
            path.resolve(__dirname, "..", "..", "Calendar-Frontend")
          ),
        },
      }
    );
  }
}
