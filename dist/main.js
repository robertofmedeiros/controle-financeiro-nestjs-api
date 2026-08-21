"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exception_filter_1 = require("./frameWork/exceptions/exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            const allowedOrigins = [
                'http://192.168.10.9:3000',
                'http://localhost:3000',
            ];
            const isCloudflare = /\.trycloudflare\.com$/.test(origin);
            const isAllowed = allowedOrigins.includes(origin) || isCloudflare;
            if (isAllowed) {
                callback(null, true);
            }
            else {
                callback(new Error('Origem não permitida pelo CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
    });
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    app.use((req, res, next) => {
        console.log(`[${req.method}] ${req.url} - Origin: ${req.headers.origin}`);
        next();
    });
    await app.listen(3010, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map