import { Construct } from "constructs";
import { utils } from "../utils/utils";
import { ApiMethods } from "../types/types";
import { Cors, IResource, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export interface FusionRestApiResourceMethods {
    type: keyof typeof ApiMethods;
    lambdaIntegration: NodejsFunction;
}

export interface FusionRestApiResource {
    name: string;
    methods: Array<FusionRestApiResourceMethods>;
    children?: Array<FusionRestApiResource>;
}

export interface FusionRestApiProps {
    name: string;
    description: string;
}

export class FusionRestApi extends Construct {
    private readonly fusionRestApi: RestApi;

    constructor(scope: Construct, id: string, props: FusionRestApiProps) {
        super(scope, utils.pascalCase(id));

        // REST API
        this.fusionRestApi = new RestApi(this, id, {
            restApiName: props.name,
            description: props.description,
            deploy: true,
            cloudWatchRole: true,
            defaultMethodOptions: {},
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
            },
        });
    }

    public createApiResources = (resources: Array<FusionRestApiResource>, parent: IResource = this.fusionRestApi.root) => {
        resources.forEach(({ name, methods, children }) => {
            const apiResource = parent.addResource(name);
            methods.forEach(({ type, lambdaIntegration }) => {
                const integration = new LambdaIntegration(lambdaIntegration);
                apiResource.addMethod(type, integration);
            });
            if (children) this.createApiResources(children, apiResource);
        });
    };
}
