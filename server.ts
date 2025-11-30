import express, { Router } from "express";
import cors from "cors";

interface Options {
    port: number;
    routes: Router;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        this.port = options.port;
        this.routes = options.routes;
    }

    start() {
        this.app.use(cors());
        this.app.use(express.json());

        // Cargar rutas
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
