import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { config } from "../config/config";
import { FusionRuntime } from "./FusionRuntime";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { resolve } from "path";
import { utils } from "../utils/utils";

export interface FusionLambdaProps {
    environment?: Record<string, string>;
    functionName: string;
    description: string;
    lambdaPath: string;
    envName: string;
}

export class FusionLambda extends Construct {
    public readonly lambda: NodejsFunction;

    constructor(scope: Construct, id: string, props: FusionLambdaProps) {
        super(scope, utils.pascalCase(id));

        // Lambda Construct
        this.lambda = new NodejsFunction(this, utils.pascalCase(id), {
            functionName: props.functionName,
            description: props.description,
            runtime: Runtime.NODEJS_20_X,
            entry: props.lambdaPath,
            handler: "handler",
            memorySize: config.lambda.memorySize,
            timeout: config.lambda.timeoutDuration,
            tracing: Tracing.ACTIVE,
            environment: { ...props.environment },
            depsLockFilePath: resolve(__dirname, "../../yarn.lock"),
        });

        // Runtime Layer
        const fusionRuntimeLayer = new FusionRuntime(this, "FusionRuntime", { envName: props.envName });
        this.lambda.addLayers(fusionRuntimeLayer);
    }
}
