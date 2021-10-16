import { Router } from 'express';
import AutheticateUserController from './controllers/AutheticateUserController';
import CreateComplimentController from './controllers/CreateComplimentController';
import CreateTagController from './controllers/CreateTagController';
import CreateUserController from './controllers/CreateUserController';
import ListTagsController from './controllers/ListTagsController';
import ListUserReceiverComplimentsController from './controllers/ListUserReceiverComplimentsController';
import ListUsersController from './controllers/ListUsersController';
import ListUserSenderComplimentsController from './controllers/ListUserSenderComplimentsController copy';
import ensureAdmin from './middlewares/ensureAdmin';
import ensureAuthetenticated from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autheticateUserController = new AutheticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.Handle);
router.post('/login', autheticateUserController.Handle);
router.post('/tags', ensureAuthetenticated, ensureAdmin, createTagController.Handle);
router.post('/compliment', ensureAuthetenticated, createComplimentController.Handle);
router.get('/users/receiver/compliments', ensureAuthetenticated, listUserReceiverComplimentsController.Handle);
router.get('/users/sender/compliments', ensureAuthetenticated, listUserSenderComplimentsController.Handle);
router.get('/tags', ensureAuthetenticated, listTagsController.Handle);
router.get('/users', ensureAuthetenticated, ensureAdmin, listUsersController.Handle);

export default router;
