import app from './app';


app.listen(3000, err=>{
    return err
    ? console.log('Servidor não foi aberto !!!')
    : console.log('Servidor aberto com sucesso - http://localhost:3000/')
});
