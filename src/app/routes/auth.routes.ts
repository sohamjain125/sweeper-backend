import { Router } from 'express';
import { registerUserController, loginUserController, loginAdminController } from '../controllers/auth.controller';
import { validateUserRegister, validateUserLogin, validateAdminRegister, validateAdminLogin } from '../middlewares/validators/auth.validator';


const router = Router();

// User routes
router.post('/user/register', validateUserRegister, registerUserController);
router.post('/user/login', validateUserLogin, loginUserController);

// Admin routes
router.post('/admin/login', validateAdminLogin, loginAdminController);

export default router;
