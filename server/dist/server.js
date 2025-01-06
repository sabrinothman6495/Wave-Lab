"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_js_1 = __importDefault(require("./config/connection.js"));
const server_1 = require("@apollo/server"); // Note: Import from @apollo/server-express
const index_js_1 = require("./schemas/index.js");
const db_1 = require("./config/db");
const auth_1 = __importDefault(require("./routes/auth"));
const server = new server_1.ApolloServer({
    typeDefs: index_js_1.typeDefs,
    resolvers: index_js_1.resolvers
});
const startApolloServer = async () => {
    await server.start();
    await (0, connection_js_1.default)();
    const app = (0, express_1.default)();
    // Connect to MongoDB
    (0, db_1.connectDB)();
    // Middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Routes
    app.use('/api/auth', auth_1.default);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startApolloServer();
