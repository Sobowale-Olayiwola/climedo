import dotenv from "dotenv";
import appRootPath from "app-root-path";

dotenv.config({ path: `${appRootPath.path}/src/.env` });

const { NODE_ENV } = process.env;

const environment = {
    test: {
        PORT: process.env.PORT || 3000,
        APP_NAME: "Climedo_IAM_Service",
        APP_DB_URI: "mongodb://localhost:27017/climedo-test",
        SIGNATURE: "23deMerh5SuP3R_z3krss3({34v\t",
        SALT: 10,
    },
    development: {
        PORT: process.env.PORT || 3000,
        APP_NAME: "Climedo_IAM_Service",
        APP_DB_URI: "mongodb://localhost:27017/climedo",
        SIGNATURE: "23deMerh5SuP3R_z3krss3({34v\t",
        SALT: 10,
    },
    production: {
        PORT: process.env.PORT || 3000,
        APP_NAME: "Climedo_IAM_Service",
        APP_DB_URI: "mongodb://mongo:27017/climedo",
        SIGNATURE: "23deMerh5SuP3R_z3krss3({34v\t",
        SALT: 10,
    },
};

export default {
    PORT: environment[NODE_ENV].PORT,
    APP_NAME: environment[NODE_ENV].APP_NAME,
    APP_DB_URI: environment[NODE_ENV].APP_DB_URI,
    SIGNATURE: environment[NODE_ENV].SIGNATURE,
    SALT: environment[NODE_ENV].SALT,
};
