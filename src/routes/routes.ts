import express from 'express';

import { userRouter } from './user/use-routes';

const appRoutes = express();

appRoutes.use('/users', userRouter);

export { appRoutes };
