import { Router } from 'express';
import AutheticateUserController from './controllers/AutheticateUserController';
import CreateComplimentController from './controllers/CreateComplimentController';
import CreateTagController from './controllers/CreateTagController';
import CreateUserController from './controllers/CreateUserController';
import ensureAdmin from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autheticateUserController = new AutheticateUserController();
const createComplimentController = new CreateComplimentController();

router.post('/users', createUserController.Handle);
router.post('/login', autheticateUserController.Handle);
router.post('/tags', ensureAdmin, createTagController.Handle);
router.post('/compliment', ensureAdmin, createComplimentController.Handle);

export default router;
