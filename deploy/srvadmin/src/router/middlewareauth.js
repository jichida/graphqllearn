import jwt from 'jsonwebtoken';
import config from '../config';
const secretkey = `${config.get('app:secretkey')}` ;

const middlewareauth = (req,res,next)=>{
    const token = req.headers['authorization'];
    if (!token) {
      res.sendStatus(401);
      res.end();
    } else {
        try {
            const decodeduser = jwt.verify(token.replace('Bearer ', ''), secretkey);
            req.userid = decodeduser._id;
            next();
        } catch (e) {
            res.sendStatus(401);
            res.end();
        }
    }

};


export default middlewareauth;
