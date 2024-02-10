import * as Yup from 'yup';

const envSchema = Yup.object().shape({

  POSTGRES_USER: Yup.string().required(),
  POSTGRES_PASSWORD: Yup.string().required(),
  POSTGRES_DB: Yup.string().required(),
  PGADMIN_DEFAULT_EMAIL: Yup.string().required(),
  PGADMIN_DEFAULT_PASSWORD: Yup.string().required(),
  DATABASE_URL: Yup.string().required(),
  JWT_PASS: Yup.string().required()

});

export const env = envSchema.validateSync(process.env);
