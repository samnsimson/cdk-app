import { Code, Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { utils } from "../utils/utils";
import { config } from "../config/config";
import { FusionRuntime } from "./FusionRuntime";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { resolve } from "path";

export interface FusionLambdaProps
    extends Omit<NodejsFunctionProps, "runtime" | "code" | "handler" | "tracing" | "bundling"> {
    functionName: string;
    description: string;
    envName: string;
    entry: string;
}

export class FusionLambda extends NodejsFunction {
    constructor(scope: Construct, id: string, props: FusionLambdaProps) {
        const { memorySize, timeout, environment, ...rest } = props;
        super(scope, utils.pascalCase(id), {
            runtime: Runtime.NODEJS_20_X,
            handler: "handler",
            memorySize: memorySize ?? config.lambda.memorySize,
            timeout: timeout ?? config.lambda.timeoutDuration,
            tracing: Tracing.ACTIVE,
            environment: { ...environment },
            depsLockFilePath: resolve(__dirname, "../../yarn.lock"),
            ...rest,
        });

        // Define Layers
        const fusionRuntimeLayer = new FusionRuntime(this, "FusionRuntime", { envName: props.envName });

        // Include Layers
        this.addLayers(fusionRuntimeLayer);
    }
}
