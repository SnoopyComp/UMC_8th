import express from 'express';
import { tempRouter } from './src/routes/temp.route.js';
import { response } from './src/config/response.js';
import { status } from './src/config/response.status.js';
import { BaseError } from './src/config/error.js';

const app = express();
const port = 3000;

// router setting
app.use('/temp', tempRouter);


app.use((err,req,res,next)=>{
  console.log('\nhave err arg\n');
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
  res.status(err.data.status).send(response(err.data));
});

app.use((req,res,next)=>{
  console.log('\nno err arg\n');
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});