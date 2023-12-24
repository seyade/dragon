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
	secret: process.env.NEXT_APP_AUTH_0_SECRET,
	baseURL: process.env.NEXT_APP_AUTH_0_BASEURL,
	clientID: process.env.NEXT_APP_AUTH_0_CLIENTID,
	issuerBaseURL: process.env.NEXT_APP_AUTH_0_ISSUER_BASEURL,
};

app.use(cors());
app.use(auth(config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/auth", (req, res) => {
	res.status(200).json({
		message: "Dragon platform on!",
		isAuthenticated: req.oidc.isAuthenticated(),
	});
});

app.listen(PORT, () => console.log(`Dragon platform running on ${PORT}...`));
