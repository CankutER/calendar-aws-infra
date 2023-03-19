#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CalendarFrontendInfraStack } from "../lib/calendar-frontend-infra-stack";

const app = new cdk.App();
new CalendarFrontendInfraStack(app, "CalendarFrontendInfraStack", {
  stackName: "CalendarFrontEndInfraStack",
});
