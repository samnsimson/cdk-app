import { Construct } from "constructs";
import { FusionStack, FusionStackProps } from "../../constructs/FusionStack";
import { FusionLambda } from "../../constructs/FusionLambda";
import { join } from "path";
import { FusionRestApi } from "../../constructs/FusionRestApi";

export class HelloStack extends FusionStack {
    constructor(scope: Construct, id: string, props: FusionStackProps) {
        super(scope, id, props);

        const helloLambda = new FusionLambda(this, "HelloLambda", {
            functionName: this.formatedName("hello-lambda"),
            description: "Hello Lambda",
            lambdaPath: join(__dirname, "./lambdas/hello.ts"),
            envName: props.envName,
        });

        const restApi = new FusionRestApi(this, "HelloRestApi", { name: "", description: "" });
        restApi.createApiResources([
            { name: "hello", methods: [{ type: "GET", lambdaIntegration: helloLambda.lambda }] },
            { name: "world", methods: [{ type: "POST", lambdaIntegration: helloLambda.lambda }] },
        ]);
    }
}
