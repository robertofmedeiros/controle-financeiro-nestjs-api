"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exception_filter_1 = require("./frameWork/exceptions/exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    app.use((req, res, next) => {
        console.log(req.method, req.url);
        console.log('Origin:', req.headers.origin);
        next();
    });
    app.use((req, res, next) => {
        res.on('finish', () => {
            console.log('Access-Control-Allow-Origin:', res.getHeader('Access-Control-Allow-Origin'));
        });
        next();
    });
    app.enableCors({
        origin: [
            'http://192.168.10.9:3000',
            'http://localhost:3000',
            /\.trycloudflare\.com$/,
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    await app.listen(3010, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map