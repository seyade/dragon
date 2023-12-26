import express from "express";
import { auth } from "express-openid-connect";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || "5000";

dotenv.config();

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.NEXT_APP_AUTH0_SECRET,
	baseURL: process.env.NEXT_APP_AUTH0_BASEURL,
	clientID: process.env.NEXT_APP_AUTH0_CLIENTID,
	issuerBaseURL: process.env.NEXT_APP_AUTH0_ISSUER_BASEURL,
};

app.use(cors());
app.use(auth(config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/auth", (req, res) => {
	res.status(200).json({
		appName: "Dragon",
		appVersion: "1.0.0",
		message: "Dragon platform launched!",
		isAuthenticated: req.oidc.isAuthenticated(),
	});
});

app.listen(PORT, () => console.log(`Dragon platform running on ${PORT}...`));
