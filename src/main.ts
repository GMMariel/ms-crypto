import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('API de Gestión de Criptoactivos')
		.setDescription('Estas APIs permiten la compra y venta de bitcoins, y la consulta de saldos.')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.startAllMicroservices();
	await app.listen(3000);
}
bootstrap();
