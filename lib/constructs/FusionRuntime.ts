import { RemovalPolicy } from "aws-cdk-lib";
import { Architecture, Code, LayerVersion, LayerVersionProps, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";
import { utils } from "../utils/utils";

export interface FusionRuntimeProps extends Omit<LayerVersionProps, "code"> {
    envName: string;
}

export class FusionRuntime extends LayerVersion {
    constructor(scope: Construct, id: string, { envName, ...props }: FusionRuntimeProps) {
        super(scope, utils.pascalCase(id), {
            ...props,
            layerVersionName: utils.formatedName("runtime-layer", envName),
            compatibleRuntimes: [Runtime.NODEJS_20_X],
            compatibleArchitectures: [Architecture.X86_64],
            description: "Runtime layer for lambda function",
            removalPolicy: RemovalPolicy.RETAIN,
            code: Code.fromAsset(join(__dirname, "../layers")),
        });
    }
}
