import { App, AppProps } from "aws-cdk-lib";
import { HelloStack } from "./lib/services/hello";
import { utils } from "./lib/utils/utils";

export class FusionApp extends App {
    protected helloStack: HelloStack;
    protected helloWorldStack: HelloStack;

    constructor(props?: AppProps) {
        super(props);

        this.helloStack = new HelloStack(this, "HelloStack", {
            stackName: utils.formatedName("hello", "stage"),
            envName: "stage",
            description: "Hello stack",
        });

        this.helloWorldStack = new HelloStack(this, "HelloWorldStack", {
            stackName: utils.formatedName("hello-world", "stage"),
            envName: "stage",
            description: "Hello world stack",
        });
    }
}
