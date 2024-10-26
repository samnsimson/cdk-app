import { Construct } from "constructs";
import { FusionStack, FusionStackProps } from "../../core/FusionStack";
import { FusionLambda } from "../../core/FusionLambda";
import { resolve } from "path";

export class HelloStack extends FusionStack {
    constructor(scope: Construct, id: string, props: FusionStackProps) {
        super(scope, id, props);

        const helloLambda = new FusionLambda(this, "HelloLambda", {
            functionName: this.formatedName("hello-lambda"),
            lambdaPath: resolve(__dirname),
            description: "Hello Lambda",
            envName: props.envName,
        });
    }
}
