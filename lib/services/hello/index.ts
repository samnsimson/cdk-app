import { Construct } from "constructs";
import { FusionStack, FusionStackProps } from "../../core/FusionStack";
import { FusionLambda } from "../../core/FusionLambda";
import { join } from "path";

export class HelloStack extends FusionStack {
    constructor(scope: Construct, id: string, props: FusionStackProps) {
        super(scope, id, props);

        const helloLambda = new FusionLambda(this, "HelloLambda", {
            functionName: this.formatedName("hello-lambda"),
            description: "Hello Lambda",
            entry: join(__dirname, "./lambdas/hello.ts"),
            envName: props.envName,
        });
    }
}
