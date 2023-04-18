import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: configService.get('CONNECTION_STRING'),
		...getMongoOptions()
	};
};



const getMongoOptions = () => ({
	useNewUrlParser: true,
	useUnifiedTopology: true
});