import {Router} from "express";
import * as api from '@api/controllers'

const router = Router({caseSensitive: true});
router.get('/roman/:input', api.convert);
router.get('/events/:id', api.convert_event);
export default router;