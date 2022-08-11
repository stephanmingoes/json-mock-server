"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is live",
    });
});
app.get("/:username/:reponame/:jsonfile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, reponame, jsonfile } = req.params;
    try {
        const data = yield axios_1.default.get(`https://api.github.com/repos/${username}/${reponame}/contents/${jsonfile}`);
        const jsonContent = JSON.parse(Buffer.from(data.data.content, "base64").toString("ascii"));
        res.json(jsonContent);
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong, ensure that the *JSON* file is in the root of the repository.",
        });
        console.log(error);
    }
}));
app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
