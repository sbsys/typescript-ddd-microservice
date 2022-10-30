import express from 'express';
import { SignInUseCase } from '../../contexts/authentication/application/commands';

const app = express();

app.get('/api', (req, res) => {
    console.log(req.body);

    console.log('USE_CASE', new SignInUseCase().execute({ name: 'admin', password: 'qwerty' }));

    res.json({});
});

app.listen(8000);
